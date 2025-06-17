import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  try {
    switch (req.method) {
      case 'GET':
        const [rows] = await pool.query('SELECT * FROM page_metadata ORDER BY page_slug');
        return res.status(200).json(rows);

      case 'POST':
        const {
          page_slug,
          title,
          description,
          canonical_url = null,
          og_title = null,
          og_description = null,
          og_image = null,
          og_url = null,
        } = req.body;

        if (!page_slug || !title || !description) {
          return res.status(400).json({ 
            success: false, 
            message: "Page slug, title and description are required" 
          });
        }

        await pool.execute(
          `INSERT INTO page_metadata (
            page_slug, title, description,
            canonical_url, og_title, og_description,
            og_image, og_url
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            page_slug,
            title,
            description,
            canonical_url,
            og_title,
            og_description,
            og_image,
            og_url,
          ]
        );

        return res.status(201).json({ success: true });

      case 'PUT':
        const { id, ...updateData } = req.body;
        
        // Prepare fields and values for dynamic update
        const fields = [];
        const values = [];

        // Add automatic timestamps
        updateData.updated_at = new Date();
        if ('article_modified_time' in updateData) {
          updateData.article_modified_time = new Date();
        }

        // Build dynamic query
        for (const [key, value] of Object.entries(updateData)) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
        values.push(id);

        const query = `UPDATE page_metadata SET ${fields.join(', ')} WHERE id = ?`;
        await pool.execute(query, values);
        return res.status(200).json({ success: true });

      case 'DELETE':
        await pool.execute('DELETE FROM page_metadata WHERE id = ?', [req.body.id]);
        return res.status(200).json({ success: true });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Admin metadata error:', error);
    return res.status(500).json({ 
      success: false,
      message: 'Database error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  } finally {
    await pool.end();
  }
}