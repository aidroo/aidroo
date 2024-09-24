import nodemailer from "nodemailer";
import { generateAccessToken } from "./jwt";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    user: "aidrooteam@gmail.com",
    pass: "n0FbUrIzN1cwAYEJ",
  },
});

// Function to send verification email
export async function sendVerificationEmail(email, username, role) {
  try {
    // Generate a verification token (JWT)
    const token = await generateAccessToken({
      username: email,
      role: role,
    });

    // Create the verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email?token=${token}`;

    // Send email with verification link
    const info = await transporter.sendMail({
      from: "aidrooteam@gmail.com", // Correctly formatted sender address
      to: email, // User's email
      subject: "Please verify your email", // Subject line
      html: `
        <h1>Email Verification</h1>
        <p>Hello ${username},</p>
        <p>Thank you for signing up. Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `, // HTML body
    });

    console.log("Verification email sent: %s", info.accepted);
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}
