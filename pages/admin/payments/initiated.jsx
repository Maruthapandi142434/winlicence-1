// pages/admin/orders/initiated.js

import { useEffect, useState } from 'react';
import AdminLayout from '../../../components/AdminLayout';

export default function InitiatedOrders() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const params = new URLSearchParams({ page });

    if (startDate && endDate) {
      params.append('startDate', startDate);
      params.append('endDate', endDate);
    }

    fetch(`/api/payments/initiated?${params.toString()}`)
      .then((res) => res.json())
      .then(({ data, totalPages }) => {
        setOrders(data);
        setTotalPages(totalPages);
      })
      .catch(console.error);
  }, [page, startDate, endDate]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString('en-GB');

  const handleFilter = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page when filtering
  };

  return (
    <AdminLayout>
      <div className="p-2 sm:p-4 md:p-5">
        <h2 className="text-2xl font-semibold mb-4">Initiated Orders</h2>

        {/* Filter Form */}
        <form onSubmit={handleFilter} className="mb-6 flex flex-wrap gap-4 items-end">
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-3 py-1 rounded w-full"
            />
          </div>
          <div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Filter
            </button>
          </div>
        </form>

        {/* Orders Table */}
        <div className="order-table-con">
          <table className="border-collapse border border-gray-300 text-xs sm:text-sm w-full">
            <thead className="bg-gray-100">
              <tr>
                {[
                  'ID',
                  'Name',
                  'Email',
                  'Phone',
                  'Company',
                  'Subject',
                  'Product',
                  'License Type',
                  'Cores',
                  'Package',
                  'Billing',
                  'Quantity',
                  'Total',
                  'Created At',
                ].map((heading) => (
                  <th key={heading} className="border px-2 sm:px-4 py-1 sm:py-2 text-left">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.id}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.name}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.email}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.phone}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.company}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.subject}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.product}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.license_type}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.cores}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.package}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.billing}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.quantity}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{order.total ? Number(order.total).toLocaleString('en-IN') : '-'}</td>
                    <td className="border px-2 sm:px-4 py-1 sm:py-2">{(order.createdAt || order.created_at) && !isNaN(Date.parse(order.createdAt || order.created_at)) ? new Date(order.createdAt || order.created_at).toLocaleDateString('en-GB') : '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center border px-2 sm:px-4 py-2 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page <= 1}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page >= totalPages}
            className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}