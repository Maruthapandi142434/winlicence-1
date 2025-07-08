import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    company: '',
    email: '',
    username: '',
    password: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function validateRegisterForm() {
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      return 'Please enter a valid email address.';
    }
    if (!/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      return 'Please enter a valid 10-digit Indian mobile number.';
    }
    return '';
  }

  const handleSendOtp = async () => {
    setError('');
    setSuccess('');
    if (!formData.email) {
      setError('Please enter your email to receive OTP.');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, type: 'register' }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setSuccess('OTP sent to your email.');
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError('Failed to send OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const errorMsg = validateRegisterForm();
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        setError(data.message || 'Registration failed.');
      }
    } catch (err) {
      setError('Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Register</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
          )}
          {success && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">{success}</div>
          )}
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={formData.name}
                onChange={e => setFormData(f => ({ ...f, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Mobile"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={formData.mobile}
                onChange={e => setFormData(f => ({ ...f, mobile: e.target.value }))}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Company"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={formData.company}
                onChange={e => setFormData(f => ({ ...f, company: e.target.value }))}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={formData.email}
                onChange={e => setFormData(f => ({ ...f, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={formData.username}
                onChange={e => setFormData(f => ({ ...f, username: e.target.value }))}
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={formData.password}
                onChange={e => setFormData(f => ({ ...f, password: e.target.value }))}
                required
              />
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="OTP"
                className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10"
                value={formData.otp}
                onChange={e => setFormData(f => ({ ...f, otp: e.target.value }))}
                required
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={loading}
              >
                {otpSent ? 'Resend OTP' : 'Send OTP'}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account?</span>
              <a href="/login" className="ml-2 text-blue-600 hover:underline">Login</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 