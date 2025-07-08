import { PrismaClient } from '@prisma/client';
import { transporter, mailOptions } from '../../../config/nodemailer';

const prisma = new PrismaClient();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, type } = req.body;
  if (!email || !type || !['register', 'reset'].includes(type)) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  try {
    // Registration: check if user already exists
    if (type === 'register') {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (existing) {
        return res.status(409).json({ message: 'Email already registered' });
      }
    }
    // Reset: check if user exists
    if (type === 'reset') {
      const existing = await prisma.user.findUnique({ where: { email } });
      if (!existing) {
        return res.status(404).json({ message: 'Email not found' });
      }
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    // Save OTP to DB
    await prisma.emailOTP.create({
      data: {
        email,
        otp,
        type,
        expiresAt,
      },
    });

    // Send OTP email
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: 'winlicense - Your OTP Code',
      text: `Your OTP code is: ${otp}`,
      html: `<h1>winlicense - OTP Verification</h1><p>Your OTP code is: <b>${otp}</b></p>`,
    });

    return res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Send OTP error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
} 