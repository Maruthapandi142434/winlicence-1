import { transporter, mailOptions } from '../../config/nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
     await transporter.sendMail({
  ...mailOptions,
  subject: `Contact Form: Product Enquiry - ${data.subject || 'N/A'}`,
  text: data.message,
  html: `
    <h2>Contact Form: Product Enquiry</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Company Name:</strong> ${data.CompanyName}</p>
    <p><strong>Message:</strong> ${data.message}</p>

    <h3>Product Details:</h3>
    <table border="1" cellpadding="8" cellspacing="0">
      <tr>
        <th align="left">Field</th>
        <th align="left">Value</th>
      </tr>
      <tr>
        <td>Name</td>
        <td>${data.subject?.title || 'N/A'}</td>
      </tr>
       <tr>
        <td>Price</td>
        <td>₹ ${data.subject?.price || 'N/A'}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>${data.subject?.description || 'N/A'}</td>
      </tr>
      <tr>
        <td>Category</td>
        <td>${data.subject?.category || 'N/A'}</td>
      </tr>
    </table>
  `,
});




      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
