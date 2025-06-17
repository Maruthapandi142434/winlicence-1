import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import AdminLayout from '../../../components/AdminLayout';
import MetadataFormModal from '../../../components/MetadataFormModal';

export default function MetadataAdmin() {
  const [metadata, setMetadata] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const router = useRouter();

  const fetchMetadata = async () => {
    try {
      const res = await fetch('/api/admin/metadata');
      const data = await res.json();
      setMetadata(data);
    } catch (err) {
      setError('Failed to load metadata');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetadata();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      const url = '/api/admin/metadata';
      const method = currentItem?.id ? 'PUT' : 'POST';


      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentItem?.id ? { id: currentItem.id, ...formData } : formData)
      });

      if (response.ok) {
        fetchMetadata();
        setCurrentItem(null);
      }
    } catch (err) {
      setError('Failed to save metadata');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this metadata?')) {
      try {
        await fetch('/api/admin/metadata', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id })
        });
        fetchMetadata();
      } catch (err) {
        setError('Failed to delete metadata');
      }
    }
  };

  const filteredMetadata = metadata.filter(item =>
    item.page_slug?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.page_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMetadata.length / itemsPerPage);
  const currentItems = filteredMetadata.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="bg-[#f6f9fff7] blog-admin-sec">
        <AdminLayout>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setCurrentItem({})}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add New Metadata
            </button>

            <div className="flex items-center space-x-4 mx-2">
              <input
                type="text"
                placeholder="Search metadata..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border rounded"
              />

              <select
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="p-2 border rounded"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
          </div>

          {currentItem && (
            <MetadataFormModal
              currentItem={currentItem}
              onClose={() => setCurrentItem(null)}
              onSubmit={handleSubmit}
            />
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4">{item.page_slug}</td>
                    <td className="px-6 py-4 truncate max-w-xs">{item.title}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button 
                        onClick={() => setCurrentItem(item)} 
                        className="text-blue-500 hover:text-blue-700 pr-2"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="text-red-500 hover:text-red-700 pr-2"
                      >
                        Delete
                      </button>
                      <button 
                        onClick={() => router.push(`/${item.page_slug}`)} 
                        className="text-green-500 hover:text-green-700 pr-2"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-between items-center px-4 py-3 border-t bg-white">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2))
                  .map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={`px-4 py-2 border rounded ${currentPage === pageNum ? 'bg-blue-500 text-white' : 'bg-white'}`}
                    >
                      {pageNum}
                    </button>
                  ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </AdminLayout>
      </div>
    </div>
  );
}