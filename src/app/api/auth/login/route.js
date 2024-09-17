import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import Address from "@/config/model/address";
import BusinessProfile from "@/config/model/business-profile";
import PersonalProfile from "@/config/model/personal-profile";
import ApiError from "@/utils/ApiError";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Parse request body
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }

    // Fetch only necessary fields
    const user = await db.User.findOne({
      where: { email },
      attributes: ["username", "password", "role"], // Limit fields fetched for the user
      include: [
        {
          model: BusinessProfile,
          as: "businessProfile",
          required: false,
          attributes: ["businessName", "profileThumb", "verified", "status"], // Limit fields fetched for businessProfile
        },
        {
          model: PersonalProfile,
          as: "personalProfile",
          required: false,
          attributes: [
            "firstName",
            "lastName",
            "profileThumb",
            "verified",
            "status",
          ], // Limit fields fetched for personalProfile
        },
        {
          model: Address,
          as: "addresses",
          required: false,
          attributes: ["address", "city", "country"], // Limit fields fetched for addresses
        },
      ],
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ status: 401, message: "Invalid password" });
    }

    if (
      user?.businessProfile?.status === "pending" ||
      user?.personalProfile?.status === "pending"
    ) {
      return NextResponse.json({
        status: 401,
        message: "Still we are reviewing !",
      });
    }

    console.log(user);
    // Generate JWT token
    const accessToken = await generateAccessToken({
      username: user.username,
      role: user.role,
    });
    const refreshToken = await generateRefreshToken({
      username: user.username,
      role: user.role,
    });
    // Set tokens in cookies
    const accessOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 15, // 15 minutes
    };

    const refreshOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 days
    };

    const response = NextResponse.json({
      status: 201,
      message: "Login successful",
    });
    response.cookies.set("accessToken", accessToken, accessOptions);
    response.cookies.set("refreshToken", refreshToken, refreshOptions);

    // Create a response

    return response;
  } catch (error) {
    console.error("Error in POST /api/auth/login:", error);
    return NextResponse.json({ status: 501, message: error.message });
  }
}
