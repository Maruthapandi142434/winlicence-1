import mysql from 'mysql2/promise';


export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, published } = req.body;

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    await connection.execute(
      'UPDATE blog_posts SET published = ? WHERE id = ?',
      [published, id]
    );

    await connection.end();
    return res.status(200).json({ message: 'Post status updated successfully' });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 