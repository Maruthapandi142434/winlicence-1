import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';

export default function ActiveOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('ACTIVE');
  const router = useRouter();
  const ORDER_STATUSES = [
    'PENDING',
    'PROCESSING',
    'ACTIVE',
    'COMPLETED',
    'CANCELLED',
  ];
  const PAYMENT_STATUSES = [
    'PENDING',
    'PAID',
    'FAILED',
  ];
  const [editing, setEditing] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      let url = `/api/admin/orders`;
      if (tab === 'ACTIVE') {
        url += `?status=ACTIVE_OR_PROCESSING`;
      } else {
        url += `?status=${tab}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setOrders(data.orders || []);
      setLoading(false);
    }
    fetchOrders();
  }, [tab]);

  const handleEdit = (id, field, value) => {
    setEditing((prev) => ({ ...prev, [id]: { ...prev[id], [field]: value } }));
  };

  const handleSave = async (id) => {
    const edit = editing[id];
    if (!edit) return;
    setMessage('');
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          status: edit.status,
          paymentStatus: edit.paymentStatus,
          purchasedAt: edit.purchasedAt,
          renewalAt: edit.renewalAt,
        }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === id ? { ...order, ...edit } : order
          )
        );
        setEditing((prev) => {
          const newEdit = { ...prev };
          delete newEdit[id];
          return newEdit;
        });
        setMessage('Order updated successfully!');
      } else {
        setMessage('Failed to update order.');
      }
    } catch (err) {
      setMessage('Error updating order.');
    }
  };

  return (
    <AdminLayout>
      <div className="w-full p-2 sm:p-6">
        <h1 className="text-2xl font-bold mb-6">Active Orders</h1>
        <div className="mb-4 flex gap-4">
          <button
            className={`px-4 py-2 rounded ${tab === 'ACTIVE' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('ACTIVE')}
          >
            Active
          </button>
          <button
            className={`px-4 py-2 rounded ${tab === 'COMPLETED' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setTab('COMPLETED')}
          >
            Completed
          </button>
        </div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="w-full max-w-[85%] overflow-x-auto">
            <div className="text-xs text-gray-500 mb-2 block md:hidden">Scroll right to see more →</div>
            <table className="min-w-max border border-gray-200 bg-white rounded-lg shadow text-xs sm:text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">ID</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Name</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Email</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Phone</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Company</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Product</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Total</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Status</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Payment Status</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Purchased</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Renewal</th>
                  <th className="px-2 sm:px-4 py-1 sm:py-2 border">Update</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td className="px-4 py-2 border font-semibold">{order.id}</td>
                    <td className="px-4 py-2 border">{order.name || order.user?.username || '-'}</td>
                    <td className="px-4 py-2 border">{order.email || order.user?.email || '-'}</td>
                    <td className="px-4 py-2 border">{order.phone || '-'}</td>
                    <td className="px-4 py-2 border">{order.company || '-'}</td>
                    <td className="px-4 py-2 border">{order.product}</td>
                    <td className="px-4 py-2 border">{order.total ? Number(order.total).toLocaleString('en-IN') : '-'}</td>
                    <td className="px-4 py-2 border font-semibold">
                      {editing[order.id] ? (
                        <select
                          value={editing[order.id].status}
                          onChange={(e) => handleEdit(order.id, 'status', e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          {ORDER_STATUSES.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={
                          order.status === 'ACTIVE' ? 'text-green-600' :
                          order.status === 'PROCESSING' ? 'text-yellow-600' :
                          order.status === 'COMPLETED' ? 'text-blue-600' :
                          order.status === 'CANCELLED' ? 'text-red-600' :
                          'text-gray-700'
                        }>
                          {order.status}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 border font-semibold">
                      {editing[order.id] ? (
                        <select
                          value={editing[order.id].paymentStatus}
                          onChange={(e) => handleEdit(order.id, 'paymentStatus', e.target.value)}
                          className="border rounded px-2 py-1"
                        >
                          {PAYMENT_STATUSES.map((status) => (
                            <option key={status} value={status}>{status}</option>
                          ))}
                        </select>
                      ) : (
                        <span className={
                          order.paymentStatus === 'PAID' ? 'text-green-600' :
                          order.paymentStatus === 'FAILED' ? 'text-red-600' :
                          'text-yellow-600'
                        }>
                          {order.paymentStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {editing[order.id] ? (
                        <input
                          type="date"
                          value={editing[order.id].purchasedAt || ''}
                          onChange={(e) => handleEdit(order.id, 'purchasedAt', e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        order.purchasedAt ? new Date(order.purchasedAt).toLocaleDateString() : '-'
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {editing[order.id] ? (
                        <input
                          type="date"
                          value={editing[order.id].renewalAt || ''}
                          onChange={(e) => handleEdit(order.id, 'renewalAt', e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        order.licenseType && order.licenseType.toLowerCase() === 'perpetual'
                          ? 'N/A'
                          : (order.renewalAt ? new Date(order.renewalAt).toLocaleDateString() : '-')
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {editing[order.id] ? (
                        <>
                          <button
                            onClick={() => handleSave(order.id)}
                            className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditing((prev) => { const n = { ...prev }; delete n[order.id]; return n; })}
                            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                          onClick={() => setEditing((prev) => ({ ...prev, [order.id]: {
                            status: order.status,
                            paymentStatus: order.paymentStatus,
                            purchasedAt: order.purchasedAt ? new Date(order.purchasedAt).toISOString().slice(0, 10) : '',
                            renewalAt: order.renewalAt ? new Date(order.renewalAt).toISOString().slice(0, 10) : '',
                          } }))}
                        >
                          Update
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
} 