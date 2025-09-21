import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FarmerDashboard() {
  const [data, setData] = useState({});
  useEffect(() => {
    axios.get('http://localhost:4000/api/dashboard', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    }).then(res => setData(res.data));
  }, []);
  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Soil Reports</h3>
      <ul>{data.reports?.map(r => <li key={r.id}>pH: {r.ph}, N: {r.nitrogen}, P: {r.phosphorus}, K: {r.potassium}, {r.fertility}</li>)}</ul>
      <h3>Crop Suggestions</h3>
      <ul>{data.crops?.map(c => <li key={c.id}>{c.cropName} - {c.reason}</li>)}</ul>
      <h3>Q&A Chat</h3>
      <ul>{data.questions?.map(q => <li key={q.id}><b>Q:</b> {q.question} <br /><b>A:</b> {q.answer}</li>)}</ul>
      <button onClick={() => { localStorage.removeItem('token'); window.location = '/'; }}>Logout</button>
    </div>
  );
}
