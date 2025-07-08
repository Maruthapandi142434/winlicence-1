import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (!['POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (req.method === 'POST') {
      const { title, content, excerpt, category_id, author, featured_image, published, scheduled_for, status } = req.body;

      if (!title || !content || !category_id || !author) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const slug = slugify(title, { lower: true });

      const post = await prisma.blogPost.create({
        data: {
          title,
          slug,
          content,
          excerpt,
          categoryId: category_id,
          author,
          featuredImage: featured_image || null,
          published: published || false,
          scheduledFor: scheduled_for ? new Date(scheduled_for) : null,
          status: status || 'draft',
        },
      });

      return res.status(201).json({ id: post.id, slug, message: 'Post created successfully' });
    }

    if (req.method === 'PUT') {
      const { id, title, content, excerpt, category_id, author, featured_image, published, scheduled_for, status } = req.body;

      if (!id || !title || !content || !category_id || !author) {
        return res.status(400).json({ message: 'Missing required fields' });
      }

      const slug = slugify(title, { lower: true });

      const post = await prisma.blogPost.update({
        where: { id },
        data: {
          title,
          slug,
          content,
          excerpt,
          categoryId: category_id,
          author,
          featuredImage: featured_image || null,
          published: published || false,
          scheduledFor: scheduled_for ? new Date(scheduled_for) : null,
          status: status || 'draft',
        },
      });

      return res.status(200).json({ message: 'Post updated successfully' });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: 'Missing post ID' });
      }

      const deleted = await prisma.blogPost.delete({ where: { id } });

      return res.status(200).json({ message: 'Post deleted successfully' });
    }
  } catch (error) {
    console.error('Database Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
