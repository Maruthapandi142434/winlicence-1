import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    const row = await prisma.productSchema.findUnique({
      where: { slug: String(slug) },
    });

    if (!row) {
      return res.status(404).json({ message: 'Schema not found' });
    }

    return res.status(200).json(row);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 