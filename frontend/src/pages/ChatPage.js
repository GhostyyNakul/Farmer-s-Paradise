import React, { useState } from 'react';
import axios from 'axios';

export default function ChatPage() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const ask = async () => {
    const res = await axios.post('http://localhost:4000/api/ask', { question }, {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
    });
    setAnswer(res.data.answer);
  };
  return (
    <div>
      <h2>AI Farming Chatbot</h2>
      <textarea placeholder="Ask a question..." value={question} onChange={e => setQuestion(e.target.value)} />
      <button onClick={ask}>Ask</button>
      <div><b>Answer:</b> {answer}</div>
    </div>
  );
}
