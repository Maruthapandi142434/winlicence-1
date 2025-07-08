import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';

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

export default function AdminOrders() {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function checkAdminAndFetch() {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) throw new Error('Not authenticated');
        const data = await res.json();
        if (!data.user || data.user.role === 'user') throw new Error('Not admin');
        // Fetch orders
        const ordersRes = await fetch('/api/admin/orders');
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders || []);
        }
      } catch (err) {
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    }
    checkAdminAndFetch();
  }, [router]);

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
            order.id === id
              ? { ...order, ...edit }
              : order
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

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">All Orders</h1>
        {message && <div className="mb-4 text-green-600">{message}</div>}
        <div className="overflow-x-auto">
          <div className="text-xs text-gray-500 mb-2 block md:hidden">Scroll right to see more →</div>
          <table className="min-w-full border border-gray-200 bg-white rounded text-xs sm:text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Order ID</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">User</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Product</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Status</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Payment Status</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Total</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Purchased</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Renewal</th>
                <th className="px-2 sm:px-4 py-1 sm:py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const isEditing = !!editing[order.id];
                return (
                  <tr key={order.id}>
                    <td className="px-4 py-2 border">{order.id}</td>
                    <td className="px-4 py-2 border">
                      {order.user ? (
                        <>
                          <div>{order.user.username}</div>
                          <div className="text-xs text-gray-500">{order.user.email}</div>
                        </>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-2 border">{order.product}</td>
                    <td className="px-4 py-2 border">
                      {isEditing ? (
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
                    <td className="px-4 py-2 border">
                      {isEditing ? (
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
                    <td className="px-4 py-2 border">₹{order.total?.toLocaleString()}</td>
                    <td className="px-4 py-2 border">
                      {isEditing ? (
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
                      {isEditing ? (
                        <input
                          type="date"
                          value={editing[order.id].renewalAt || ''}
                          onChange={(e) => handleEdit(order.id, 'renewalAt', e.target.value)}
                          className="border rounded px-2 py-1"
                        />
                      ) : (
                        order.renewalAt ? new Date(order.renewalAt).toLocaleDateString() : '-'
                      )}
                    </td>
                    <td className="px-4 py-2 border">
                      {isEditing ? (
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
                          onClick={() => setEditing((prev) => ({ ...prev, [order.id]: {
                            status: order.status,
                            paymentStatus: order.paymentStatus,
                            purchasedAt: order.purchasedAt ? new Date(order.purchasedAt).toISOString().slice(0, 10) : '',
                            renewalAt: order.renewalAt ? new Date(order.renewalAt).toISOString().slice(0, 10) : '',
                          } }))}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
} 