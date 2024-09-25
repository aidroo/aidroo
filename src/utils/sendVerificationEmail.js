import { Resend } from "resend";
import { generateAccessToken } from "./jwt";

const resend = new Resend("re_VahzFhCu_PEHBAgeAhhb8KqFeDtLAUSMP");

// Function to send verification email using Resend
export async function sendVerificationEmail(email, username, role) {
  try {
    // Generate a verification token (JWT)
    const token = await generateAccessToken({
      username: email,
      role: role,
    });

    // Create the verification URL
    const verificationUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/verify-email?token=${token}`;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "support@aidroo.com",
      to: email, // Recipient email
      subject: "Please verify your email",
      html: `
        <h1>Email Verification</h1>
        <p>Hello ${username},</p>
        <p>Please verify your email by clicking the link below:</p>
        <a href="${verificationUrl}">Verify Email</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    console.log("Verification email sent successfully:", emailResponse);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
