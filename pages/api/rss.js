import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        title: true,
        excerpt: true,
        content: true,
        createdAt: true,
        slug: true,
      },
    });

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
        <description>${escapeXml(post.excerpt || '')}</description>
        <pubDate>${new Date(post.createdAt).toUTCString()}</pubDate>
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
  } finally {
    await prisma.$disconnect();
  }
}

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'\"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case "'": return '&apos;';
      case '"': return '&quot;';
    }
  });
} 