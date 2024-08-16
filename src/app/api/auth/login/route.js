// app/api/auth/login/route.js
import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import Address from "@/config/model/address";
import BusinessProfile from "@/config/model/business-profile";
import PersonalProfile from "@/config/model/personal-profile";
import ApiError from "@/utils/ApiError";
import { generateToken } from "@/utils/jwt";
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

    const user = await db.User.findOne({
      where: { email },
      include: [
        {
          model: BusinessProfile,
          as: "businessProfile",
          required: false,
        },
        {
          model: PersonalProfile,
          as: "personalProfile",
          required: false,
        },
        {
          model: Address,

          as: "addresses",
          required: false,
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

    // Generate JWT token
    const token = await generateToken(user.id);
    if (!token) {
      throw new ApiError(500, "Failed to generate token");
    }

    // Set cookie options
    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24,
    };

    const userData = {
      userId: user.id,
      username: user.username,
      businessProfile: user?.businessProfile,
      personalProfile: user?.personalProfile,
      addresses: user?.addresses,
    };

    // Create a response
    const response = NextResponse.json({
      user: userData,
      status: 200,
      message: "User logged in successfully",
    });

    // Set the Set-Cookie header properly
    response.cookies.set("token", token, options);

    return response;
  } catch (error) {
    console.error("Error in POST /api/auth/login:", error);
    return NextResponse.json({ status: 501, message: error.message });
  }
}
