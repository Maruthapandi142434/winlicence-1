import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DATABASE_SSL === 'true',
  waitForConnections: true,
  connectionLimit: 15,
  queueLimit: 30
});

export default async function handler(req, res) {
  // Handle catch-all route parameter
  const { slug } = req.query;
  
  // Join slug array if it exists
  const fullPath = Array.isArray(slug) ? slug.join('/') : slug || '';

  if (!fullPath) {
    return res.status(400).json({ success: false, error: 'Missing path parameter' });
  }

  // Decode only once and normalize
  let decodedPath;
  try {
    decodedPath = decodeURIComponent(fullPath);
  } catch (e) {
    return res.status(400).json({ success: false, error: 'Invalid URL encoding' });
  }

  // Normalize path (remove leading/trailing slashes except for home)
  const cleanPath = decodedPath === 'home' ? '/' : decodedPath.replace(/^\/|\/$/g, '');

  let connection;
  try {
    connection = await pool.getConnection();
    
    // Query with multiple possible path formats
    const [matches] = await connection.query(
      `SELECT * FROM page_metadata 
       WHERE page_slug = ? OR page_slug = ? OR page_slug = ? OR page_slug = ?
       ORDER BY 
         CASE 
           WHEN page_slug = ? THEN 1
           WHEN page_slug = ? THEN 2
           WHEN page_slug = ? THEN 3
           WHEN page_slug = ? THEN 4
           ELSE 5
         END
       LIMIT 1`,
      [
        cleanPath,
        `/${cleanPath}`,
        `${cleanPath}/`,
        `/${cleanPath}/`,
        cleanPath,        // Exact match priority
        `/${cleanPath}`,  // With leading slash
        `${cleanPath}/`,  // With trailing slash
        `/${cleanPath}/`  // With both slashes
      ]
    );

    if (matches.length > 0) {
      return res.status(200).json({
        success: true,
        metadata: matches[0]
      });
    }

    return res.status(404).json({ 
      success: false,
      error: 'Metadata not found',
      requestedPath: cleanPath
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error'
    });
  } finally {
    if (connection) connection.release();
  }
}