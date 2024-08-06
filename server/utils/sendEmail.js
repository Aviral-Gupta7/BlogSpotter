import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_EMAIL_SERVICE,
      host: process.env.NODEMAILER_EMAIL_HOST,
      port: process.env.NODEMAILER_EMAIL_PORT,
      secure: process.env.NODEMAILER_EMAIL_SECURE,
      auth: {
        user: process.env.NODEMAILER_EMAIL_USER,
        pass: process.env.NODEMAILER_EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: {
        name: process.env.NODEMAILER_EMAIL_NAME,
        address: process.env.NODEMAILER_EMAIL_USER,
      },
      to: email,
      subject: subject,
      text: text,
    }
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (err) {
    console.log(err);
  }
};
