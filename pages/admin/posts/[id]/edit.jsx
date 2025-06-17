import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../../../components/AdminLayout';
import RichTextEditor from '../../../../components/RichTextEditor';
import TagManager from '../../../../components/TagManager';

export default function EditPost({ post, categories, tags: initialTags }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category_id: '',
    published: false,
  });
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState(initialTags || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // ✅ Load post data when it becomes available
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        content: post.content || '',
        category_id: post.category_id || '',
        published: post.published || false,
      });
      setSelectedTags(post.tags || []);
    }
  }, [post]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, tags: selectedTags }),
      });

      if (!res.ok) throw new Error('Failed to update post');

      router.push('/admin/posts');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

        {error && <div className="bg-red-50 text-red-500 p-4 rounded mb-6">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Content</label>
            <RichTextEditor value={formData.content} onChange={(content) => setFormData({ ...formData, content })} />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>

          {/* Published Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">Published</label>
          </div>

          {/* Tags */}
          <div>
            <label className="block mb-2">Tags</label>
            <TagManager selectedTags={selectedTags} availableTags={availableTags} onTagsChange={setSelectedTags} />
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => router.back()} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

// ✅ Updated `getServerSideProps` to Fetch Tags
export async function getServerSideProps({ params }) {
  try {
    const mysql = require('mysql2/promise');
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    const [posts] = await connection.execute('SELECT * FROM blog_posts WHERE id = ?', [params.id]);
    const [categories] = await connection.execute('SELECT * FROM blog_categories ORDER BY name ASC');
    const [tags] = await connection.execute('SELECT * FROM blog_tags ORDER BY name ASC');

    await connection.end();

    if (!posts.length) return { notFound: true };

    return {
      props: {
        post: JSON.parse(JSON.stringify(posts[0])),
        categories: JSON.parse(JSON.stringify(categories)),
        tags: JSON.parse(JSON.stringify(tags)),
      },
    };
  } catch (error) {
    console.error('Database error:', error);
    return { props: { post: null, categories: [], tags: [] } };
  }
}
