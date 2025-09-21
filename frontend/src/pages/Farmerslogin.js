import React, { useState } from 'react';
import axios from 'axios';

export default function FarmerLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const login = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/login', { name, password });
      localStorage.setItem('token', res.data.token);
      window.location = '/dashboard';
    } catch (e) {
      setMsg('Login failed');
    }
  };
  return (
    <div>
      <h2>Farmer Login</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <a href="/register">Register</a>
      <div>{msg}</div>
    </div>
  );
}
