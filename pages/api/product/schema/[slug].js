import mysql from 'mysql2/promise';

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DATABASE_SSL === 'true',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM product_schema WHERE slug = ?',
      [slug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Schema not found' });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 