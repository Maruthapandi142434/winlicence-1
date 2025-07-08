import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '../../components/AdminLayout';
import mysql from 'mysql2/promise';

export default function Dashboard({ stats }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/check');
      const data = await res.json();
      if (!res.ok) throw new Error('Not authenticated');
      setUser(data.user);
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/admin/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!loading && user && user.role !== 'admin' && user.role !== 'editor' && user.role !== 'author') {
      router.replace('/dashboard');
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const dashboardStats = stats || {
    totalPosts: 0,
    publishedPosts: 0,
    totalCategories: 0,
    totalTags: 0,
    recentPosts: [],
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-2 sm:px-4 md:px-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { label: 'Total Posts', value: dashboardStats.totalPosts },
            { label: 'Published Posts', value: dashboardStats.publishedPosts },
            { label: 'Categories', value: dashboardStats.totalCategories },
            { label: 'Tags', value: dashboardStats.totalTags },
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4 sm:p-6">
              <h2 className="text-gray-500 text-xs sm:text-sm font-medium">{item.label}</h2>
              <p className="mt-2 text-2xl sm:text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow">
          <h2 className="text-base sm:text-lg font-medium p-4 sm:p-6 border-b">Recent Posts</h2>
          <div className="divide-y">
            {dashboardStats.recentPosts.length > 0 ? (
              dashboardStats.recentPosts.map((post) => (
                <div key={post.id} className="p-4 sm:p-6">
                  <h3 className="font-medium text-sm sm:text-base">{post.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center text-xs sm:text-sm text-gray-500 gap-x-2">
                    <span>{post.created_at}</span>
                    <span className="mx-2 hidden sm:inline">•</span>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-4 sm:p-6 text-gray-500">No recent posts available.</p>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT || 3306,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: true } : false,
    });

    const [stats] = await connection.execute(`
      SELECT 
        (SELECT COUNT(*) FROM blog_posts) AS totalPosts,
        (SELECT COUNT(*) FROM blog_posts WHERE published = 1) AS publishedPosts,
        (SELECT COUNT(*) FROM blog_categories) AS totalCategories,
        (SELECT COUNT(*) FROM blog_tags) AS totalTags
    `);

    const [recentPosts] = await connection.execute(`
      SELECT 
        p.id,
        p.title,
        DATE_FORMAT(p.created_at, '%Y-%m-%d') AS created_at,
        p.published,
        COALESCE(c.name, 'Uncategorized') AS category_name
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      ORDER BY p.created_at DESC
      LIMIT 5
    `);

    return {
      props: {
        stats: {
          totalPosts: stats[0].totalPosts,
          publishedPosts: stats[0].publishedPosts,
          totalCategories: stats[0].totalCategories,
          totalTags: stats[0].totalTags,
          recentPosts: recentPosts,
        },
      },
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      props: {
        stats: {
          totalPosts: 0,
          publishedPosts: 0,
          totalCategories: 0,
          totalTags: 0,
          recentPosts: [],
        },
      },
    };
  } finally {
    if (connection) await connection.end();
  }
}
