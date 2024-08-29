import nodemailer from "nodemailer";
import { EMAIL_USER, EMAIL_PASS } from "../config/secret.js"; // Add your email credentials in the config

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

export default sendEmail;
