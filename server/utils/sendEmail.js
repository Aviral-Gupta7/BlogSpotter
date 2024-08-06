import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.NODEMAILER_EMAIL_SERVICE,
      auth: {
        user: process.env.NODEMAILER_EMAIL_USER,
        pass: process.env.NODEMAILER_EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL_USER,
      to: email,
      subject: subject,
      text: text,
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log(err);
  }
};
