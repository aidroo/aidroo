import db from "@/config/model";
import { verifyAccessToken } from "@/utils/jwt";

export async function GET(request) {
  try {
    // Extract token from query params or headers
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, error: "Token not provided" }),
        { status: 400 }
      );
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = await verifyAccessToken(token);

      console.log("decodedToken", decodedToken);
    } catch (error) {
      console.log("Access token expired or invalid:", error);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    // Update the user's email verification status in the database
    const user = await db.User.findOne({
      where: { username: decodedToken.username },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ success: false, error: "User not found" }),
        { status: 404 }
      );
    }

    user.isVerified = true;
    await user.save();

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error verifying email:", error);
    return new Response(
      JSON.stringify({ success: false, error: "An error occurred" }),
      { status: 500 }
    );
  }
}
