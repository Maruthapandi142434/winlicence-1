import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;
    const search = req.query.search || '';

    // Count total posts
    const where = search
      ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }
      : {};

    const totalPosts = await prisma.blogPost.count({ where });
    const totalPages = Math.ceil(totalPosts / limit);

    // Fetch posts with pagination and search
    const posts = await prisma.blogPost.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: offset,
      take: limit,
      include: {
        categoryRel: true,
      },
    });

    // Format posts for response
    const formattedPosts = posts.map(post => ({
      ...post,
      featured_image: post.featured_image || post.featuredImage || '',
      category_name: post.categoryRel ? post.categoryRel.name : 'Uncategorized',
      created_at: post.createdAt ? post.createdAt.toISOString().split('T')[0] : null,
      updated_at: post.updatedAt ? post.updatedAt.toISOString().split('T')[0] : null,
      scheduled_for: post.scheduledFor ? post.scheduledFor.toISOString() : null,
    }));

    res.status(200).json({
      posts: formattedPosts,
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasMore: page < totalPages,
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 