import { transporter, mailOptions } from '../../config/nodemailer';
import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    name, email, phone, company,
    subject, product, package: pkg,
    billing, quantity, total,
    licenseType, cores, productId
  } = req.body;

  try {
    // 1. First send email
    await transporter.sendMail({
      ...mailOptions,
      subject: `New Order: ${product}`,
      text: `New order received for ${product}`,
      html: `
        <h1>New Order Received</h1>
        <h2>Customer Details</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Company: ${company}</p>
        
        <h2>Order Details</h2>
        <p>Product: ${product}</p>
        <p>Package: ${pkg}</p>
        ${licenseType ? `<p>License Type: ${licenseType}</p>` : ''}
        ${cores ? `<p>Cores: ${cores}</p>` : ''}
        <p>Billing Option: ${billing}</p>
        <p>Quantity: ${quantity}</p>
        <p>Total Price: ₹${total.toLocaleString()}</p>
        <p>Order Time: ${new Date().toLocaleString()}</p>
      `,
    });

    // 2. Then store in database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DATABASE_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DATABASE_SSL === 'true'
    });

    const query = `
      INSERT INTO initiated_orders 
      (name, email, phone, company, subject, product, package, billing, quantity, total, license_type, cores, product_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      name, email, phone, company,
      subject, product, pkg,
      billing, quantity, total,
      licenseType || "NA", cores || "NA", productId || "NA"
    ];

    await connection.execute(query, values);
    await connection.end();

    return res.status(200).json({ message: 'Order submitted successfully!' });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ message: 'Failed to process order' });
  }
}