import mysql from 'mysql2/promise';
import slugify from 'slugify';

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    if (req.method === 'GET') {
      const [tags] = await connection.execute('SELECT * FROM blog_tags ORDER BY name');
      await connection.end();
      return res.status(200).json(tags);
    }

    if (req.method === 'POST') {
      const { name } = req.body;
      const slug = slugify(name, { lower: true });

      const [result] = await connection.execute(
        'INSERT INTO blog_tags (name, slug) VALUES (?, ?)',
        [name, slug]
      );

      const [newTag] = await connection.execute(
        'SELECT * FROM blog_tags WHERE id = ?',
        [result.insertId]
      );

      await connection.end();
      return res.status(201).json(newTag[0]);
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await connection.execute('DELETE FROM blog_tags WHERE id = ?', [id]);
      await connection.end();
      return res.status(200).json({ message: 'Tag deleted successfully' });
    }

    await connection.end();
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Error handling tags:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 