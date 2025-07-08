import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Load environment variables from .env file

// Load environment variables
const host = process.env.WEBMAIL_HOST;
const port = Number(process.env.WEBMAIL_PORT);
const user = process.env.WEBMAIL_USER;
const pass = process.env.WEBMAIL_PASS;

// const recipient = "sales@sixthstar.in";
// const ccRecipients = ["wm.seo@sixthstar.in", "sales2sixthstar@gmail.com"]
const ccRecipients = [""]
const recipient = "sixsatarseo@gmail.com";


// Check if environment variables are properly set
if (!host || !port || !user || !pass) {
  throw new Error("Missing required environment variables for email configuration");
}

// Create a transporter object using the default SMTP transport
export const transporter = nodemailer.createTransport({
  host: host,
  port: port,
  secure: port === 465, // true for port 465, false for other ports
  auth: {
    user: user,
    pass: pass,
  },
});

// Define default mail options
export const mailOptions = {
  from: `"winlicense" <${user}>`, // Sender name and address
  to: recipient, // List of recipients
  cc: ccRecipients, // Add your CC recipient here
};



