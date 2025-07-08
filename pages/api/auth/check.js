import { jwtVerify } from 'jose';
import { parse } from 'cookie';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    let userInfo = null;
    if (payload.role === 'admin' || payload.role === 'editor' || payload.role === 'author') {
      // Admin user
      const admin = await prisma.adminUser.findUnique({
        where: { id: payload.userId },
        select: { id: true, username: true, email: true, role: true },
      });
      if (admin) {
        userInfo = admin;
      }
    } else {
      // Regular user
      const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: { id: true, username: true, name: true, email: true, mobile: true, company: true },
      });
      if (user) {
        userInfo = { ...user, role: 'user' };
      }
    }

    if (!userInfo) {
      return res.status(401).json({ message: 'User not found' });
    }

    return res.status(200).json({ user: userInfo });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(401).json({ message: 'Not authenticated' });
  } finally {
    await prisma.$disconnect();
  }
}
