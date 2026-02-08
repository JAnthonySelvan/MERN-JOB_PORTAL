import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html,attachments=[] }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, 
    },
  });
  transporter.sendMail({
    from: `"Job Junction" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments
  });
};

