import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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
  const cleanPath = decodedPath === 'home' ? '/' : decodedPath.replace(/^\/+|\/+$/g, '');

  try {
    // Try all path variants in order of priority
    const pathVariants = [
      cleanPath,
      `/${cleanPath}`,
      `${cleanPath}/`,
      `/${cleanPath}/`,
    ];

    let match = null;
    for (const variant of pathVariants) {
      match = await prisma.pageMetadata.findFirst({
        where: { pageSlug: variant },
        orderBy: { id: 'asc' },
      });
      if (match) break;
    }

    if (match) {
      return res.status(200).json({
        success: true,
        metadata: match,
      });
    }

    return res.status(404).json({ 
      success: false,
      error: 'Metadata not found',
      requestedPath: cleanPath,
    });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ 
      success: false,
      error: 'Internal server error',
    });
  } finally {
    await prisma.$disconnect();
  }
}