import mysql from 'mysql2/promise';
import slugify from 'slugify';

export default async function handler(req, res) {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  let connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT || 3306, // Default MySQL port
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: true } : false,
    });

    if (req.method === 'POST') {
      const { title, content, excerpt, category_id, author, featured_image, published, scheduled_for, status } = req.body;

      if (!title || !content || !category_id || !author) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const slug = slugify(title, { lower: true });

      const [result] = await connection.execute(
        `INSERT INTO blog_posts (title, slug, content, excerpt, category_id, author, featured_image, published, scheduled_for, status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          title,
          slug,
          content,
          excerpt,
          category_id,
          author,
          featured_image || null,
          published || null,
          scheduled_for ? new Date(scheduled_for).toISOString() : null,
          status || 'draft',
        ]
      );

      return res.status(201).json({ id: result.insertId, slug, message: 'Post created successfully' });
    }

    if (req.method === 'PUT') {
      const { id, title, content, excerpt, category_id, author, featured_image, published, scheduled_for, status } = req.body;

      if (!id || !title || !content || !category_id || !author) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const slug = slugify(title, { lower: true });

      const [result] = await connection.execute(
        `UPDATE blog_posts 
         SET title = ?, slug = ?, content = ?, excerpt = ?, category_id = ?, author = ?, featured_image = ?, published = ?, scheduled_for = ?, status = ? 
         WHERE id = ?`,
        [
          title,
          slug,
          content,
          excerpt,
          category_id,
          author,
          featured_image || null,
          published || null,
          scheduled_for ? new Date(scheduled_for).toISOString() : null,
          status || 'draft',
          id,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({ message: 'Post updated successfully' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Missing post ID' });
      }

      const [result] = await connection.execute('DELETE FROM blog_posts WHERE id = ?', [id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
