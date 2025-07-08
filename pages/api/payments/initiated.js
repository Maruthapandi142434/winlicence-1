// pages/api/payments/initiated.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { page = 1, startDate, endDate } = req.query;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const where = {};
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const [rows, count] = await Promise.all([
      prisma.initiatedOrder.findMany({
        where,
        orderBy: { id: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.initiatedOrder.count({ where }),
    ]);

    res.status(200).json({
      data: rows,
      total: count,
      page: Number(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
