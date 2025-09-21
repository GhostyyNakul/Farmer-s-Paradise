import React, { useState } from 'react';
import axios from 'axios';

export default function AdminLogin() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const login = async () => {
    try {
      const res = await axios.post('http://localhost:4000/api/login', { name, password, admin: true });
      localStorage.setItem('token', res.data.token);
      window.location = '/admin/panel';
    } catch (e) {
      setMsg('Login failed');
    }
  };
  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Admin Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <div>{msg}</div>
    </div>
  );
}
