import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT || 3306,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await pool.getConnection();

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) as total FROM blog_posts p';
    const countParams = [];
    if (search) {
      countQuery += ' WHERE p.title LIKE ?';
      countParams.push(`%${search}%`);
    }
    const [countResult] = await connection.execute(countQuery, countParams);
    const totalPosts = countResult[0].total;
    const totalPages = Math.ceil(totalPosts / limit);

    // Fetch posts with pagination and search
    let query = `
      SELECT 
        p.*, 
        COALESCE(c.name, 'Uncategorized') AS category_name
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
    `;

    const queryParams = [];
    if (search) {
      query += ' WHERE p.title LIKE ?';
      queryParams.push(`%${search}%`);
    }

    query += ' ORDER BY p.created_at DESC LIMIT ? OFFSET ?';
    queryParams.push(limit, offset);

    const [posts] = await connection.execute(query, queryParams);

    const formattedPosts = posts.map(post => ({
      ...post,
      created_at: post.created_at ? new Date(post.created_at).toISOString().split('T')[0] : null,
      updated_at: post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : null,
      scheduled_for: post.scheduled_for ? new Date(post.scheduled_for).toISOString() : null,
    }));

    await connection.release();

    res.status(200).json({
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasMore: page < totalPages
      }
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 