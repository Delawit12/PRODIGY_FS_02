import nodemailer from "nodemailer";
import { EMAIL_PASSWORD, EMAIL } from "../config/secret.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (
  email: string,
  subject: string,
  text: string,
  html: string
): Promise<void> => {
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    console.log(`Email sent successfully to: ${email}`);
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
};

export default sendEmail;
