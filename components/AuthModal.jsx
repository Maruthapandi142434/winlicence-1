import { useState } from 'react';

export default function AuthModal({ onClose, onAuthSuccess }) {
  const [tab, setTab] = useState('login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const url = tab === 'login' ? '/api/auth/login' : '/api/auth/register';
      const body = tab === 'login'
        ? { username: form.username, password: form.password }
        : { username: form.username, email: form.email, password: form.password };
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.ok) {
        onAuthSuccess(data.user || data);
        onClose();
      } else {
        setError(data.message || 'Error');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex mb-4">
          <button className={`flex-1 py-2 ${tab === 'login' ? 'font-bold border-b-2 border-blue-600' : ''}`} onClick={() => setTab('login')}>Login</button>
          <button className={`flex-1 py-2 ${tab === 'register' ? 'font-bold border-b-2 border-blue-600' : ''}`} onClick={() => setTab('register')}>Register</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" placeholder="Username" value={form.username} onChange={handleChange} className="w-full p-2 border rounded" required />
          {tab === 'register' && (
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" required />
          )}
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full p-2 border rounded" required />
          {error && <div className="text-red-600">{error}</div>}
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded" disabled={loading}>
            {loading ? 'Please wait...' : tab === 'login' ? 'Login' : 'Register'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 w-full bg-gray-400 text-white py-2 rounded">Close</button>
      </div>
    </div>
  );
} 