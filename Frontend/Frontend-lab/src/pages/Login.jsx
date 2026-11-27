import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const { login } = useAuth();

  const [name, setName] = useState('');

  function handleLogin(e) {
    e.preventDefault();

    if (!name.trim()) return;

    login(name );
  }

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
