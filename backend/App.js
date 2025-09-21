const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const { OpenAIApi, Configuration } = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

const db = new sqlite3.Database('./farmers_paradise.db');

// JWT secret
const JWT_SECRET = 'supersecretkey';

// OpenAI setup (replace with your key)
const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

// Utility: Authenticate middleware
function authenticate(role = null) {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'No token' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ msg: 'Invalid token' });
      if (role && user.role !== role) return res.status(403).json({ msg: 'Forbidden' });
      req.user = user;
      next();
    });
  };
}

// Farmer registration
app.post('/api/register', async (req, res) => {
  const { name, institution, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.run('INSERT INTO Farmers (name, institution, password) VALUES (?, ?, ?)', [name, institution, hash], function (err) {
    if (err) return res.status(400).json({ msg: 'Registration failed' });
    res.json({ msg: 'Registered', id: this.lastID });
  });
});

// Farmer & admin login
app.post('/api/login', (req, res) => {
  const { name, password, admin } = req.body;
  const table = admin ? 'Admins' : 'Farmers';
  db.get(`SELECT * FROM ${table} WHERE name = ?`, [name], async (err, user) => {
    if (!user) return res.status(400).json({ msg: 'User not found' });
    if (!(await bcrypt.compare(password, user.password))) return res.status(401).json({ msg: 'Wrong password' });
    const token = jwt.sign({ id: user.id, role: admin ? 'admin' : 'farmer', name: user.name }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, institution: user.institution } });
  });
});

// Upload soil report (admin only)
app.post('/api/soilreport', authenticate('admin'), (req, res) => {
  const { farmerId, ph, nitrogen, phosphorus, potassium, fertility } = req.body;
  db.run('INSERT INTO SoilReports (farmerId, ph, nitrogen, phosphorus, potassium, fertility, timestamp) VALUES (?, ?, ?, ?, ?, ?, datetime("now"))',
    [farmerId, ph, nitrogen, phosphorus, potassium, fertility], function (err) {
      if (err) return res.status(400).json({ msg: 'Insert failed' });
      res.json({ msg: 'Soil report uploaded', id: this.lastID });
    });
});

// Get farmer dashboard data
app.get('/api/dashboard', authenticate('farmer'), (req, res) => {
  const farmerId = req.user.id;
  db.all('SELECT * FROM SoilReports WHERE farmerId = ?', [farmerId], (err, reports) => {
    db.all('SELECT * FROM CropSuggestions WHERE farmerId = ?', [farmerId], (err2, crops) => {
      db.all('SELECT * FROM Questions WHERE farmerId = ?', [farmerId], (err3, questions) => {
        res.json({ reports, crops, questions });
      });
    });
  });
});

// Crop suggestion logic
app.post('/api/suggestcrop', authenticate('farmer'), async (req, res) => {
  const { ph, nitrogen, phosphorus, potassium } = req.body;
  let suggestions = [];
  if (ph >= 6 && ph <= 7 && nitrogen > 5) suggestions.push({ crop: 'Rice', reason: 'pH 6-7 and high nitrogen' });
  if (potassium > 5) suggestions.push({ crop: 'Corn', reason: 'High potassium' }, { crop: 'Sugarcane', reason: 'High potassium' });
  if (phosphorus >= 3 && phosphorus <= 6) suggestions.push({ crop: 'Wheat', reason: 'Medium phosphorus' }, { crop: 'Mustard', reason: 'Medium phosphorus' });
  suggestions = suggestions.slice(0, 3);
  suggestions.forEach(s => {
    db.run('INSERT INTO CropSuggestions (farmerId, cropName, reason, createdAt) VALUES (?, ?, ?, datetime("now"))', [req.user.id, s.crop, s.reason]);
  });
  res.json({ suggestions });
});

// Get diseases for a crop
app.get('/api/diseases/:crop', authenticate('farmer'), (req, res) => {
  db.all('SELECT * FROM Diseases WHERE cropName = ?', [req.params.crop], (err, rows) => {
    res.json({ diseases: rows });
  });
});

// Q&A chatbot (OpenAI)
app.post('/api/ask', authenticate('farmer'), async (req, res) => {
  const { question } = req.body;
  // Call OpenAI
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'Answer as a friendly rural farming expert.' }, { role: 'user', content: question }]
  });
  const answer = response.data.choices[0].message.content;
  db.run('INSERT INTO Questions (farmerId, question, answer, createdAt) VALUES (?, ?, ?, datetime("now"))', [req.user.id, question, answer]);
  res.json({ answer });
});

// Admin: list farmers/reports
app.get('/api/admin/farmers', authenticate('admin'), (req, res) => {
  db.all('SELECT * FROM Farmers', [], (err, farmers) => {
    db.all('SELECT * FROM SoilReports', [], (err2, reports) => {
      res.json({ farmers, reports });
    });
  });
});

// Logout is handled client-side (just forget JWT)

// ---- DB INIT (run once) ----
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Farmers (id INTEGER PRIMARY KEY, name TEXT, institution TEXT, password TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS Admins (id INTEGER PRIMARY KEY, name TEXT, password TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS SoilReports (id INTEGER PRIMARY KEY, farmerId INTEGER, ph REAL, nitrogen REAL, phosphorus REAL, potassium REAL, fertility TEXT, timestamp TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS CropSuggestions (id INTEGER PRIMARY KEY, farmerId INTEGER, cropName TEXT, reason TEXT, createdAt TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS Diseases (id INTEGER PRIMARY KEY, cropName TEXT, diseaseName TEXT, symptoms TEXT, treatment TEXT, prevention TEXT)`);
  db.run(`CREATE TABLE IF NOT EXISTS Questions (id INTEGER PRIMARY KEY, farmerId INTEGER, question TEXT, answer TEXT, createdAt TEXT)`);
  db.run(`INSERT OR IGNORE INTO Admins (id, name, password) VALUES (1, 'admin', '${bcrypt.hashSync('adminpass', 10)}')`);
});

app.listen(4000, () => console.log('API running on http://localhost:4000'));
