import mysql from 'mysql2/promise';


export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    const [posts] = await connection.execute(`
      SELECT title, excerpt, content, created_at, slug 
      FROM blog_posts 
      WHERE published = 1 
      ORDER BY created_at DESC 
      LIMIT 10
    `);

    await connection.end();

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    
    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Your Blog Name</title>
    <link>${baseUrl}</link>
    <description>Your blog description</description>
    <language>en-us</language>
    ${posts.map(post => `
      <item>
        <title>${escapeXml(post.title)}</title>
        <link>${baseUrl}/blog/${post.slug}</link>
        <description>${escapeXml(post.excerpt)}</description>
        <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
        <guid>${baseUrl}/blog/${post.slug}</guid>
      </item>
    `).join('')}
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/xml');
    res.write(rss);
    res.end();
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
} 