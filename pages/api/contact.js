import { transporter, mailOptions } from '../../config/nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: 'Contact form - Winlicense',
        text: data.message,
        html: `
          <h1>Contact Us Page Form</h1>
          <p>Name: ${data.name}</p>
          <p>Email: ${data.email}</p>
          <p>Phone: ${data.phone}</p>
          <p>Subject: ${data.subject}</p>
          <p>Company: ${data.company}</p>
          <p>Message: ${data.message}</p>
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
