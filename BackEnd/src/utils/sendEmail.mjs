import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const sendEmail = async ({ to, subject, html, attachments = [] }) => {
  try {
    if (!to) {
      console.log("No recipient email provided");
      return;
    }

    const info = await transporter.sendMail({
      from: `"JobJunction" <${process.env.BREVO_USER}>`,
      to,
      subject,
      html,
      attachments,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error("Email sending failed:", error.message);
  }
};
