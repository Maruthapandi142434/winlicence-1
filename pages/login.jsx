import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  function validateLoginForm() {
    // If username looks like an email, validate as email
    if (formData.username.includes('@')) {
      if (!/^\S+@\S+\.\S+$/.test(formData.username.trim())) {
        return 'Please enter a valid email address.';
      }
    } else if (/^\d{10}$/.test(formData.username.trim())) {
      // If username is 10 digits, validate as Indian phone
      if (!/^[6-9]\d{9}$/.test(formData.username.trim())) {
        return 'Please enter a valid 10-digit Indian mobile number.';
      }
    }
    return '';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const errorMsg = validateLoginForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        window.dispatchEvent(new Event('authChanged'));
        if (data.user && (data.user.role === 'admin' || data.user.role === 'editor' || data.user.role === 'author')) {
          router.push('/admin/dashboard');
        } else {
          router.push('/dashboard');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Login
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  username: e.target.value
                }))}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  password: e.target.value
                }))}
              />
              <div className="mt-2 text-right">
                <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm">Forgot password?</Link>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Don't have an account?</span>
              <a href="/register" className="ml-2 text-blue-600 hover:underline">Register</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 