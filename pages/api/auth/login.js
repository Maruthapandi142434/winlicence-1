import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { serialize } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username = '', password = '' } = req.body || {};

  try {
    // Try customer user first
    let user = await prisma.user.findUnique({ where: { username: username.trim() } });
    let userType = 'user';
    if (!user) {
      // Try admin user
      user = await prisma.adminUser.findUnique({ where: { username: username.trim() } });
      userType = user ? user.role : null;
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      userId: user.id,
      username: user.username,
      role: userType,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('8h')
      .sign(secret);

    res.setHeader(
      'Set-Cookie',
      serialize('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 8 * 60 * 60,
      })
    );

    return res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: userType,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
}
