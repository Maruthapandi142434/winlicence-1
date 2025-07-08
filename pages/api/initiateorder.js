import { transporter, mailOptions } from '../../config/nodemailer';
import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import { parse } from 'cookie';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check user authentication
  let userId = null;
  let userInfo = null;
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    if (!token) throw new Error('Not authenticated');
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    userId = payload.userId;
    // Fetch user info from DB
    userInfo = await prisma.user.findUnique({ where: { id: userId } });
    if (!userInfo) throw new Error('User not found');
  } catch (err) {
    return res.status(401).json({ message: 'Not authenticated' });
  }

  // Use user info for order
  const {
    subject, product, package: pkg,
    billing, quantity, total,
    licenseType, cores, productId
  } = req.body;

  try {
    // 1. First send email to admin
    await transporter.sendMail({
      ...mailOptions,
      subject: `winlicense - New Order Received: ${product}`,
      text: `New order received for ${product}`,
      html: `
        <h1>winlicense - New Order Received</h1>
        <h2>Customer Details</h2>
        <p>Name: ${userInfo.username}</p>
        <p>Email: ${userInfo.email}</p>
        <p>Phone: ${userInfo.mobile || '-'}</p>
        <p>Company: ${userInfo.company || '-'}</p>
        <h2>Order Details</h2>
        <p>Product: ${product}</p>
        <p>Package: ${pkg}</p>
        ${licenseType ? `<p>License Type: ${licenseType}</p>` : ''}
        ${cores ? `<p>Cores: ${cores}</p>` : ''}
        <p>Billing Option: ${billing}</p>
        <p>Quantity: ${quantity}</p>
        <p>Total Price: ₹${total?.toLocaleString()}</p>
        <p>Order Time: ${new Date().toLocaleString()}</p>
      `,
    });

    // Calculate purchasedAt and renewalAt
    const now = new Date();
    let renewalDate = new Date(now);
    const billingLower = (billing || '').toLowerCase();
    const packageLower = (pkg || '').toLowerCase();
    let renewalAt = null;
    if (packageLower.includes('perpetual') || billingLower.includes('perpetual')) {
      renewalAt = null;
    } else if (billingLower.includes('month')) {
      renewalDate.setMonth(renewalDate.getMonth() + 1);
      renewalAt = renewalDate;
    } else if (billingLower.includes('year') && billingLower.includes('three')) {
      renewalDate.setFullYear(renewalDate.getFullYear() + 3);
      renewalAt = renewalDate;
    } else if (billingLower.includes('year')) {
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
      renewalAt = renewalDate;
    } else {
      renewalDate.setMonth(renewalDate.getMonth() + 1); // Default to 1 month
      renewalAt = renewalDate;
    }

    // 3. Store in database using Prisma
    await prisma.initiatedOrder.create({
      data: {
        name: userInfo.username,
        email: userInfo.email,
        phone: userInfo.mobile || null,
        company: userInfo.company || null,
        subject,
        product,
        package: pkg,
        billing,
        quantity,
        total,
        licenseType: licenseType || 'NA',
        cores: cores || 'NA',
        productId: productId ? Number(productId) : null,
        userId,
        status: 'PROCESSING',
        purchasedAt: now,
        renewalAt: renewalAt,
        paymentStatus: 'PENDING',
      },
    });

    return res.status(200).json({ message: 'Order submitted successfully!' });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ message: 'Failed to process order' });
  } finally {
    await prisma.$disconnect();
  }
}