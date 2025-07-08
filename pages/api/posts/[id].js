import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const postId = parseInt(id);

    if (req.method === 'PUT') {
      const { title, content, category_id, published, tags } = req.body;

      // Update post
      const post = await prisma.blogPost.update({
        where: { id: postId },
        data: {
          title,
          content,
          categoryId: category_id,
          published,
        },
      });

      // Update tags if provided
      if (tags && tags.length > 0) {
        // Remove old tags
        await prisma.blogPostTag.deleteMany({ where: { postId } });
        // Add new tags
        await prisma.blogPostTag.createMany({
          data: tags.map((tagId) => ({ postId, tagId })),
          skipDuplicates: true,
        });
      }

      return res.status(200).json({ message: 'Post updated successfully' });
    }

    if (req.method === 'DELETE') {
      // Delete associated tags first
      await prisma.blogPostTag.deleteMany({ where: { postId } });
      // Delete the post
      await prisma.blogPost.delete({ where: { id: postId } });
      return res.status(200).json({ message: 'Post deleted successfully' });
    }

    // If method is not allowed
    return res.status(405).json({ message: 'Method not allowed' });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
