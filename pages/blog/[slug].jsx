import React from 'react';
import mysql from 'mysql2/promise';
import Head from 'next/head';

function BlogPost({ post }) {
  if (!post) return <div>Post not found</div>;

  // Format date consistently
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.featured_image || 'https://via.placeholder.com/800x400'} />
        <meta property="og:url" content={`/blog/${post.slug}`} />
        <meta property="canonical" content={`/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />

      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {post.featured_image && (
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-8"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x400';
              }}
            />
          )}
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="text-gray-800 mb-4">
            {formatDate(post.created_at)}
          </div>
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    const [posts] = await connection.execute(
      'SELECT * FROM blog_posts WHERE slug = ? AND published = 1',
      [params.slug]
    );

    await connection.end();

    if (posts.length === 0) {
      return {
        notFound: true
      };
    }

    return {
      props: {
        post: JSON.parse(JSON.stringify(posts[0]))
      }
    };
  } catch (error) {
    console.error('Database connection failed:', error);
    return {
      notFound: true
    };
  }
}

export default BlogPost; 