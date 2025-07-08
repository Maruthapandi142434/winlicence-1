import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSidebarDetails, setShowSidebarDetails] = useState(false);

  useEffect(() => {
    async function fetchUserAndOrders() {
      try {
        const res = await fetch('/api/auth/check');
        if (!res.ok) throw new Error('Not authenticated');
        const data = await res.json();
        setUser(data.user);
        if (data.user && (data.user.role === 'admin' || data.user.role === 'editor' || data.user.role === 'author')) {
          router.replace('/admin/dashboard');
          return;
        }
        const ordersRes = await fetch('/api/orders');
        if (ordersRes.ok) {
          const ordersData = await ordersRes.json();
          setOrders(ordersData.orders || []);
        }
      } catch (err) {
        router.push('/login');
      } finally {
        setLoading(false);
      }
    }
    fetchUserAndOrders();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  // Responsive: show details by default on desktop, toggle on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setShowSidebarDetails(true);
      } else {
        setShowSidebarDetails(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row min-h-[80vh]  gap-4 lg:gap-8 mx-auto px-0 sm:px-4">
      {/* Responsive Sidebar */}
      <aside className="w-full lg:w-80 min-w-0 max-w-full lg:max-w-xs h-auto lg:h-screen bg-gray-800 shadow flex flex-col justify-between p-4 sm:p-6 lg:mb-0">
        <div>
          <div className="flex flex-col items-left mb-6">
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-4xl mb-2 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 1115 0v.75a.75.75 0 01-.75.75h-13.5a.75.75 0 01-.75-.75v-.75z" />
              </svg>
            </div>
            <div className="font-bold text-xl text-white text-center">{user.name || user.username}</div>
            {/* Chevron toggle for mobile */}
            <button
              className="block lg:hidden mx-auto mt-2 text-white focus:outline-none"
              aria-label={showSidebarDetails ? 'Hide details' : 'Show details'}
              onClick={() => setShowSidebarDetails((v) => !v)}
            >
              <svg className={`w-6 h-6 transition-transform duration-200 ${showSidebarDetails ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          {/* Details: show on desktop, toggle on mobile */}
          {(showSidebarDetails || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
            <div>
              <div className="space-y-2 text-white text-md mb-6">
                <div><span className="font-semibold">User Name:</span> {user.username}</div>
                <div><span className="font-semibold">Email:</span> {user.email || '-'}</div>
                <div><span className="font-semibold">Mobile:</span> {user.mobile || '-'}</div>
                <div><span className="font-semibold">Company:</span> {user.company || '-'}</div>
              </div>
              {/* Order Summary */}
              <div className="mt-4">
                <div className="font-semibold text-white mb-1">Active Orders: <span className="text-blue-600">{orders.filter(o => o.status === 'ACTIVE').length}</span></div>
                <ul className="ml-2 mb-2 text-xs text-white list-disc">
                  {orders.filter(o => o.status === 'ACTIVE').map(o => (
                    <li key={o.id}>{o.product}</li>
                  ))}
                </ul>
                <div className="font-semibold text-white mb-1">Pending Orders: <span className="text-yellow-600">{orders.filter(o => o.status === 'PROCESSING' || o.status === 'PENDING').length}</span></div>
                <ul className="ml-2 text-sm text-white list-disc pl-4">
                  {orders.filter(o => o.status === 'PROCESSING' || o.status === 'PENDING').map(o => (
                    <li key={o.id}>{o.product}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="mt-8 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 shadow self-center w-2/3 sm:w-1/2 md:w-2/5 lg:w-full"
        >
          Logout
        </button>
      </aside>
      {/* Main Content */}
      <main className="flex-1 m-3">
        <h2 className="text-xl font-semibold mb-4 border-b-2 border-red-400 inline-block pb-1">Your Orders</h2>
        {orders.length === 0 ? (
          <div className="bg-yellow-50 p-6 rounded text-yellow-800">You have not placed any orders yet.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow border border-gray-100 p-4 sm:p-5 flex flex-col gap-2 min-w-0 w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-lg">Order #{order.id}</span>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${order.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : order.status === 'PROCESSING' ? 'bg-yellow-100 text-yellow-700' : order.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700'}`}>{order.status}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">Product:</span> {order.product}
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">Payment:</span> <span className={`px-2 py-1 rounded text-xs font-semibold ${order.paymentStatus === 'PAID' ? 'bg-green-100 text-green-700' : order.paymentStatus === 'FAILED' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{order.paymentStatus}</span>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">Total:</span> ₹{order.total ? Number(order.total).toLocaleString('en-IN') : '-'}
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">Purchased:</span> {(order.status === 'ACTIVE' || order.status === 'COMPLETED') && order.paymentStatus === 'PAID' && order.purchasedAt ? new Date(order.purchasedAt).toLocaleDateString() : '-'}
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">Renewal:</span> {((order.status === 'ACTIVE' || order.status === 'COMPLETED') && order.paymentStatus === 'PAID' && order.renewalAt && !((order.licenseType && order.licenseType.toLowerCase().includes('perpetual')) || (order.package && order.package.toLowerCase().includes('perpetual')))) ? new Date(order.renewalAt).toLocaleDateString() : 'N/A'}
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">Quantity:</span> {order.quantity || '-'}
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">Package:</span> {order.package || order.billing || '-'}
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="font-semibold">License Type:</span> {order.licenseType || '-'}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 