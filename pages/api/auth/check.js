import { jwtVerify } from 'jose';
import { parse } from 'cookie';

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

    return res.status(200).json({
      user: {
        id: payload.userId,
        username: payload.username,
        role: payload.role,
      },
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return res.status(401).json({ message: 'Not authenticated' });
  }
}
