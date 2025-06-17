import { useState } from 'react';
import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';
import mysql from 'mysql2/promise';

export default function Categories({ categories: initialCategories }) {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch('/api/admin/categories', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setCategories(categories.filter(cat => cat.id !== id));
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <AdminLayout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Categories</h1>
          <Link href="/admin/categories/new" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            New Category
          </Link>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        {/* Categories Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Posts Count
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.slug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {category.posts_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link href={`/admin/categories/${category.id}/edit`}
                      className="text-blue-600 hover:text-blue-900 mr-4">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="text-red-600 hover:text-red-900">
                      Delete
                    </button>
                  </td>
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

    // Get categories with post count
    const [categories] = await connection.execute(`
      SELECT 
        c.*,
        COUNT(p.id) as posts_count
      FROM blog_categories c
      LEFT JOIN blog_posts p ON p.category_id = c.id
      GROUP BY c.id
      ORDER BY c.name ASC
    `);

    await connection.end();

    return {
      props: {
        categories: JSON.parse(JSON.stringify(categories))
      }
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      props: {
        categories: []
      }
    };
  }
}
