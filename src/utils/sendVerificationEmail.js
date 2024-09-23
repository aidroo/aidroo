import nodemailer from "nodemailer";
import { generateAccessToken } from "./jwt";

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: "rhett41@ethereal.email",
    pass: "cMGqnpmUJQjVubKRfD", // Replace with your Ethereal credentials
  },
});

// Function to send verification email
export async function sendVerificationEmail(user) {
  // Generate a verification token (JWT)
  // send email verification email
  try {
    const token = await generateAccessToken({
      username: user.username,
      role: user.role,
    });
    // Create the verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email?token=${token}`;

    // Send email with verification link
    const info = await transporter.sendMail({
      from: "rhett41@ethereal.email", // Sender address
      to: user.email, // User's email
      subject: "Please verify your email", // Subject line
      html: `
        <h1>Email Verification</h1>
        <p>Hello ${user.username},</p>
        <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `, // HTML body
    });
    console.log("Verification email sent: %s", info.accepted);
  } catch (error) {
    console.log(error);
  }
}
