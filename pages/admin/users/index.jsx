import React, { useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';
import mysql from 'mysql2/promise';

function Users({ initialAdminUsers, initialCustomers }) {
  const [tab, setTab] = useState('admin');
  const [users, setUsers] = useState(initialAdminUsers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setUsers([...users, data.user]);
        setFormData({ username: '', email: '', password: '' });
        setShowAddForm(false);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await fetch('/api/admin/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Users</h1>
          {tab === 'admin' && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {showAddForm ? 'Cancel' : 'Add User'}
            </button>
          )}
        </div>
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded-t ${tab === 'admin' ? 'bg-white border-b-2 border-blue-500 font-bold' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => { setTab('admin'); setUsers(initialAdminUsers); setShowAddForm(false); }}
          >
            Admin Users
          </button>
          <button
            className={`px-4 py-2 rounded-t ${tab === 'customers' ? 'bg-white border-b-2 border-blue-500 font-bold' : 'bg-gray-100 text-gray-600'}`}
            onClick={() => { setTab('customers'); setShowAddForm(false); }}
          >
            Customers
          </button>
        </div>
        {/* Add User Form (only for admin users) */}
        {showAddForm && tab === 'admin' && (
          <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create User
              </button>
            </div>
          </form>
        )}
        {/* User Table */}
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="text-xs text-gray-500 mb-2 block md:hidden">Scroll right to see more →</div>
          <table className="min-w-full text-xs sm:text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left">Username</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left">Email</th>
                <th className="px-2 sm:px-6 py-2 sm:py-3 text-left">Created At</th>
                {tab === 'admin' && <th className="px-2 sm:px-6 py-2 sm:py-3 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {(tab === 'admin' ? users : initialCustomers).map(user => (
                <tr key={user.id}>
                  <td className="px-6 py-4">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{formatDate(user.created_at || user.createdAt)}</td>
                  {tab === 'admin' && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });
    const [adminUsers] = await connection.execute(
      'SELECT id, username, email, created_at FROM admin_users'
    );
    const [customers] = await connection.execute(
      'SELECT id, username, email, createdAt FROM user'
    );
    await connection.end();
    return {
      props: {
        initialAdminUsers: JSON.parse(JSON.stringify(adminUsers)),
        initialCustomers: JSON.parse(JSON.stringify(customers)),
      }
    };
  } catch (error) {
    console.error('Database connection failed:', error);
    return {
      props: {
        initialAdminUsers: [],
        initialCustomers: [],
      }
    };
  }
}

export default Users; 