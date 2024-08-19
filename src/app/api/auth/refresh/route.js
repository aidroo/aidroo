import { generateAccessToken, verifyRefreshToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function POST(req) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  try {
    // Verify refresh token
    const decoded = await verifyRefreshToken(refreshToken);

    // Generate new access token
    const newAccessToken = await generateAccessToken({
      username: decoded.username,
      role: decoded.role,
    });

    const accessOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    };

    const response = NextResponse.json({
      status: 200,
      message: "Token refreshed",
    });
    response.cookies.set("accessToken", newAccessToken, accessOptions);

    return response;
  } catch (error) {
    return NextResponse.json({ status: 401, message: "Invalid refresh token" });
  }
}
