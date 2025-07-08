import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        localStorage.removeItem('authToken'); // Clear auth token
        router.push('/admin/login'); // Redirect to login
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <button
          aria-label="Open sidebar"
          onClick={() => setSidebarOpen(true)}
          className="focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-xl font-bold">Blog Admin</span>
        <div></div>
      </div>

      {/* Sidebar */}
      {/* Desktop Sidebar */}
      <div className="hidden md:flex bg-gray-800 text-white p-4 flex-col justify-between min-h-screen" style={{ minWidth: '18%' }}>
        <div>
          <h1 className="text-xl font-bold mb-8">Blog Admin</h1>
          <nav className="space-y-2">
            <Link href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Dashboard
            </Link>
            <Link href="/admin/posts" className="block py-2 px-4 rounded hover:bg-gray-700">
              Posts
            </Link>
            <Link href="/admin/posts/metadata" className="block py-2 px-4 rounded hover:bg-gray-700">
              Meta Data
            </Link>
            <Link href="/admin/categories" className="block py-2 px-4 rounded hover:bg-gray-700">
              Categories
            </Link>
            <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700">
             Users
            </Link>
            <Link href="/admin/payments/initiated" className="block py-2 px-4 rounded hover:bg-gray-700">
            Initiated Orders
            </Link>
            <Link href="/admin/active-orders" className="block py-2 px-4 rounded hover:bg-gray-700">
            Active Orders
            </Link>
          </nav>
        </div>
        <button 
          onClick={handleLogout} 
          className="mt-8 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
        >
          Logout
        </button>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black opacity-40" onClick={() => setSidebarOpen(false)}></div>
          {/* Drawer */}
          <div className="relative bg-gray-800 text-white w-64 h-full flex flex-col justify-between p-4 animate-slide-in-left">
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-xl font-bold">Blog Admin</h1>
                <button
                  aria-label="Close sidebar"
                  onClick={() => setSidebarOpen(false)}
                  className="focus:outline-none"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-2">
                <Link href="/admin/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
                  Dashboard
                </Link>
                <Link href="/admin/posts" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
                  Posts
                </Link>
                <Link href="/admin/posts/metadata" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
                  Meta Data
                </Link>
                <Link href="/admin/categories" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
                  Categories
                </Link>
                <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
                 Users
                </Link>
                <Link href="/admin/payments/initiated" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
                Initiated Orders
                </Link>
                <Link href="/admin/active-orders" className="block py-2 px-4 rounded hover:bg-gray-700" onClick={() => setSidebarOpen(false)}>
                Active Orders
                </Link>
              </nav>
            </div>
            <button 
              onClick={() => { setSidebarOpen(false); handleLogout(); }} 
              className="mt-8 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded w-full"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 w-full">
        {children}
      </div>
    </div>
  );
}
