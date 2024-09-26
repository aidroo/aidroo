import db from "@/config/model";
import { verifyAccessToken } from "@/utils/jwt";

export async function GET(request) {
  try {
    // Extract token from query params
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    // Check if the token is provided
    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Token not provided" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = await verifyAccessToken(token);
      console.log("Decoded Token:", decodedToken);
    } catch (error) {
      console.error("Access token expired or invalid:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or expired token" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Find the user in the database based on the token payload
    const user = await db.User.findOne({
      where: { username: decodedToken.username },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if the user's email is already verified
    if (user.isVerified) {
      return new Response(
        JSON.stringify({ success: false, error: "Email already verified" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the user's email verification status
    user.isVerified = true;
    await user.save();

    // Return success response
    return new Response(
      JSON.stringify({ success: true, message: "Email verified successfully" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
