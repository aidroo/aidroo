import { default as VerificationEmail } from "@/components/AccountVerificaitonEmail";
import { Resend } from "resend";
import { generateAccessToken } from "./jwt";

const resend = new Resend("re_VahzFhCu_PEHBAgeAhhb8KqFeDtLAUSMP");

// Function to send verification email using Resend
export async function sendVerificationEmail(email, username, role) {
  try {
    const lowercaseUsername = username.toLowerCase().replace(/[^a-z0-9@]/g, "");
    // Generate a verification token (JWT)
    const token = await generateAccessToken({
      username: lowercaseUsername,
      role: role,
    });

    // Create the verification URL
    const verificationLink = `${process.env.NEXT_PUBLIC_API_BASE_URL}/verify-email?token=${token}`;

    // Send email using Resend
    const emailResponse = await resend.emails.send({
      from: "support@aidroo.com",
      to: email, // Recipient email
      subject: "Please verify your email",
      react: VerificationEmail({ username, verificationLink }),
    });

    console.log("Verification email sent successfully:", emailResponse);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
