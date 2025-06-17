export default async function handler(req, res) {
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

    const [tags] = await connection.execute('SELECT * FROM blog_tags ORDER BY name ASC');
    await connection.end();

    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Error fetching tags' });
  }
} 