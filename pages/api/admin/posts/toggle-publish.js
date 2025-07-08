import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { id, published } = req.body;

    await prisma.blogPost.update({
      where: { id },
      data: { published },
    });

    return res.status(200).json({ message: 'Post status updated successfully' });
  } catch (error) {
    console.error('Error toggling publish status:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 