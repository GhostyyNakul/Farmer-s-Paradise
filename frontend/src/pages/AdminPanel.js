import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [farmers, setFarmers] = useState([]);
  const [reports, setReports] = useState([]);
  const [selectedFarmer, setSelectedFarmer] = useState('');
  const [soil, setSoil] = useState({ ph: '', nitrogen: '', phosphorus: '', potassium: '', fertility: '' });

  useEffect(() => {
    axios.get('http://localhost:4000/api/admin/farmers', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => {
      setFarmers(res.data.farmers);
      setReports(res.data.reports);
    });
  }, []);

  const uploadSoil = async () => {
    await axios.post('http://localhost:4000/api/soilreport', { farmerId: selectedFarmer, ...soil }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    alert('Uploaded!');
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Upload Soil Test</h3>
      <select onChange={e => setSelectedFarmer(e.target.value)}>
        <option value="">Select Farmer</option>
        {farmers.map(f => <option key={f.id} value={f.id}>{f.name} ({f.institution})</option>)}
      </select>
      <input placeholder="pH" onChange={e => setSoil({ ...soil, ph: e.target.value })} />
      <input placeholder="Nitrogen" onChange={e => setSoil({ ...soil, nitrogen: e.target.value })} />
      <input placeholder="Phosphorus" onChange={e => setSoil({ ...soil, phosphorus: e.target.value })} />
      <input placeholder="Potassium" onChange={e => setSoil({ ...soil, potassium: e.target.value })} />
      <input placeholder="Fertility" onChange={e => setSoil({ ...soil, fertility: e.target.value })} />
      <button onClick={uploadSoil}>Upload</button>
      <h3>All Farmers</h3>
      <ul>{farmers.map(f => <li key={f.id}>{f.name} ({f.institution})</li>)}</ul>
      <h3>All Reports</h3>
      <ul>{reports.map(r => <li key={r.id}>{r.farmerId}: {r.ph}, {r.nitrogen}, {r.phosphorus}, {r.potassium}, {r.fertility}</li>)}</ul>
    </div>
  );
}
