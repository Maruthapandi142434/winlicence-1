import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const tags = await prisma.blogTag.findMany({
      orderBy: { name: 'asc' },
    });
    res.status(200).json(tags);
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({ message: 'Error fetching tags' });
  } finally {
    await prisma.$disconnect();
  }
} 