import db from "@/config/model";
import { verifyAccessToken } from "@/utils/jwt";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    // Extract token from query params
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    // Check if the token is provided
    if (!token) {
      return NextResponse.json({
        success: false,
        message: "Token not provided",
        status: 400,
      });
    }

    // Verify the token
    let decodedToken;
    try {
      decodedToken = await verifyAccessToken(token);
    } catch (error) {
      console.error("Access token expired or invalid:", error);

      return NextResponse.json({
        success: false,
        message: "Invalid or expired token",
        status: 400,
      });
    }

    // Find the user in the database based on the token payload
    const user = await db.User.findOne({
      where: { username: decodedToken.username },
    });

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
        status: 400,
      });
    }

    // Check if the user's email is already verified
    if (user.isVerified) {
      return NextResponse.json({
        success: false,
        message: "Email already verified",
        status: 400,
      });
    }

    // Update the user's email verification status
    user.isVerified = true;
    await user.save();

    // Return success response

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
      status: 201,
    });
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
      status: 500,
    });
  }
}
