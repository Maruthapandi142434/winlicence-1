import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE' && req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (req.method === 'POST') {
      const { name } = req.body;
      const slug = slugify(name, { lower: true });

      const category = await prisma.blogCategory.create({
        data: {
          name,
          slug,
        },
      });

      return res.status(201).json({ id: category.id, name, slug });
    }

    if (req.method === 'DELETE') {
      const { id } = req.body;
      await prisma.blogCategory.delete({ where: { id } });
      return res.status(200).json({ message: 'Category deleted successfully' });
    }

    if (req.method === 'PUT') {
      const { id, name, slug } = req.body;
      if (!id || !name || !slug) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      const updated = await prisma.blogCategory.update({
        where: { id },
        data: { name, slug },
      });
      return res.status(200).json({ message: 'Category updated successfully', category: updated });
    }
  } catch (error) {
    console.error('Error handling category:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 