const express = require('express');
const cors = require('cors');
const cropsRouter = require('./routes/crops');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/crops', cropsRouter);

app.get('/', (req, res) => {
  res.send('Farmer\'s Paradise Backend is Running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
