// components/MetadataFormModal.js
import { useState, useEffect } from 'react';

export default function MetadataFormModal({ currentItem, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    page_slug: '',
    title: '',
    description: '',
    canonical_url: '',
    og_title: '',
    og_description: '',
    og_image: '',
    og_url: '',
  });

  useEffect(() => {
    if (currentItem) {
      setFormData({
        page_slug: currentItem.page_slug === '/' ? 'home' : currentItem.page_slug || '',
        title: currentItem.title || '',
        description: currentItem.description || '',
        canonical_url: currentItem.canonical_url || '',
        og_title: currentItem.og_title || '',
        og_description: currentItem.og_description || '',
        og_image: currentItem.og_image || '',
        og_url: currentItem.og_url || '',
      });
    }
  }, [currentItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submissionData = { 
      ...formData,
      page_slug: formData.page_slug === 'home' ? '/' : formData.page_slug,
    };

    onSubmit(submissionData);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl max-h-[70vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            {currentItem?.id ? 'Edit Metadata' : 'Add New Metadata'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Page Slug* <span className="text-gray-500"></span>
              </label>
              <input
                type="text"
                name="page_slug"
                value={formData.page_slug}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title*</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Canonical URL</label>
              <input
                type="url"
                name="canonical_url"
                value={formData.canonical_url}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG URL</label>
              <input
                type="url"
                name="og_url"
                value={formData.og_url}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Title</label>
              <input
                type="text"
                name="og_title"
                value={formData.og_title}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Description</label>
              <textarea
                name="og_description"
                value={formData.og_description}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={2}
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">OG Image URL</label>
              <input
                type="url"
                name="og_image"
                value={formData.og_image}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save Metadata
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}