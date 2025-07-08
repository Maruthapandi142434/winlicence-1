import { PrismaClient } from '@prisma/client';
import { jwtVerify } from 'jose';
import { parse } from 'cookie';
import { transporter, mailOptions } from '../../../config/nodemailer';

const prisma = new PrismaClient();

async function isAdmin(req) {
  try {
    const cookies = parse(req.headers.cookie || '');
    const token = cookies.auth_token;
    if (!token) return false;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    // Accept any admin role (admin, editor, etc. from AdminUser)
    return payload.role && payload.role !== 'user';
  } catch {
    return false;
  }
}

export default async function handler(req, res) {
  if (!(await isAdmin(req))) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'GET') {
    try {
      const { status } = req.query;
      let where = {};
      if (status === 'ACTIVE_OR_PROCESSING') {
        where = { OR: [{ status: 'ACTIVE' }, { status: 'PROCESSING' }] };
      } else if (status) {
        where = { status };
      }
      const orders = await prisma.initiatedOrder.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, username: true, email: true } } },
      });
      return res.status(200).json({ orders });
    } catch (error) {
      console.error('Error fetching orders:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }

  if (req.method === 'PUT') {
    const { id, status, paymentStatus, purchasedAt, renewalAt } = req.body;
    if (!id) return res.status(400).json({ message: 'Order ID required' });
    try {
      // Fetch order and user info
      const order = await prisma.initiatedOrder.findUnique({
        where: { id },
        include: { user: true },
      });
      if (!order) return res.status(404).json({ message: 'Order not found' });

      let newPurchasedAt = purchasedAt ? new Date(purchasedAt) : order.purchasedAt || new Date();
      let newRenewalAt = renewalAt ? new Date(renewalAt) : order.renewalAt;
      // Auto-calculate renewalAt if status is ACTIVE or COMPLETED
      if ((status === 'ACTIVE' || status === 'COMPLETED') && !renewalAt) {
        const billing = order.billing?.toLowerCase() || '';
        let renewalDate = new Date(newPurchasedAt);
        if (billing.includes('month')) {
          renewalDate.setMonth(renewalDate.getMonth() + 1);
        } else if (billing.includes('year') && billing.includes('three')) {
          renewalDate.setFullYear(renewalDate.getFullYear() + 3);
        } else if (billing.includes('year')) {
          renewalDate.setFullYear(renewalDate.getFullYear() + 1);
        } else {
          renewalDate.setMonth(renewalDate.getMonth() + 1); // Default to 1 month
        }
        newRenewalAt = renewalDate;
      }

      const updated = await prisma.initiatedOrder.update({
        where: { id },
        data: {
          status,
          paymentStatus,
          purchasedAt: newPurchasedAt,
          renewalAt: newRenewalAt,
        },
      });

      // Send email to user about status change
      if (
        order.user?.email &&
        status === 'ACTIVE' &&
        paymentStatus === 'PAID' &&
        (order.status !== 'ACTIVE' || order.paymentStatus !== 'PAID')
      ) {
        const isPerpetual = (order.licenseType?.toLowerCase() === 'perpetual' || order.package?.toLowerCase().includes('perpetual'));
        await transporter.sendMail({
          from: mailOptions.from,
          to: order.user.email,
          subject: `winlicense - Your order for ${order.product} is now ACTIVE!`,
          html: `
            <h1>winlicense - Thank you for your order!</h1>
            <p>Dear ${order.user.username},</p>
            <p>Your order for <strong>${order.product}</strong> is now <b>ACTIVE</b> and payment is <b>PAID</b>. You can now access your product or service.</p>
            <h2>Your Details</h2>
            <ul>
              <li>Name: ${order.user.username}</li>
              <li>Email: ${order.user.email}</li>
            </ul>
            <h2>Order Details</h2>
            <ul>
              <li>Order ID: ${order.id}</li>
              <li>Product: ${order.product}</li>
              <li>Status: ACTIVE</li>
              <li>Payment: PAID</li>
              <li>Purchased: ${newPurchasedAt ? new Date(newPurchasedAt).toLocaleDateString() : '-'}</li>
              ${isPerpetual ? `<li>Renewal: N/A</li>` : (newRenewalAt ? `<li>Renewal: ${new Date(newRenewalAt).toLocaleDateString()}</li>` : '')}
            </ul>
            <p>If you have any questions, reply to this email. <a href="mailto:sales@winlicense.in">sales@winlicense.in</a></p>
            <p>Best regards,<br/>WinLicense Team</p>
          `,
        });
      }
      // Send email to user when order is COMPLETED
      if (
        order.user?.email &&
        status === 'COMPLETED' &&
        paymentStatus === 'PAID' &&
        (order.status !== 'COMPLETED' || order.paymentStatus !== 'PAID')
      ) {
        const isPerpetual = (order.licenseType?.toLowerCase() === 'perpetual' || order.package?.toLowerCase().includes('perpetual'));
        await transporter.sendMail({
          from: mailOptions.from,
          to: order.user.email,
          subject: `winlicense - Your order for ${order.product} is now COMPLETED!`,
          html: `
            <h1>winlicense - Your order is now completed!</h1>
            <p>Dear ${order.user.username},</p>
            <p>Your order for <strong>${order.product}</strong> is now <b>COMPLETED</b> and payment is <b>PAID</b>. Thank you for your business.</p>
            <h2>Your Details</h2>
            <ul>
              <li>Name: ${order.user.username}</li>
              <li>Email: ${order.user.email}</li>
            </ul>
            <h2>Order Details</h2>
            <ul>
              <li>Order ID: ${order.id}</li>
              <li>Product: ${order.product}</li>
              <li>Status: COMPLETED</li>
              <li>Payment: PAID</li>
              <li>Purchased: ${newPurchasedAt ? new Date(newPurchasedAt).toLocaleDateString() : '-'}</li>
              ${isPerpetual ? `<li>Renewal: N/A</li>` : (newRenewalAt ? `<li>Renewal: ${new Date(newRenewalAt).toLocaleDateString()}</li>` : '')}
            </ul>
            <p>If you have any questions, reply to this email. <a href="mailto:sales@winlicense.in">sales@winlicense.in</a></p>
            <p>Best regards,<br/>WinLicense Team</p>
          `,
        });
      }

      return res.status(200).json({ order: updated });
    } catch (error) {
      console.error('Error updating order:', error);
      return res.status(500).json({ message: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
} 