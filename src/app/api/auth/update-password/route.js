import db from "@/config/model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { username, oldPassword, newPassword } = body;
  if (!username || !oldPassword || !newPassword) {
    return NextResponse.json(
      {
        error: "Missing required fields",
        status: 400,
      },
      { status: 400 } // Set the HTTP response status code
    );
  }

  try {
    // Check if user exists
    const user = await db.User.findOne({
      where: { username },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: "User not found",
          status: 404,
        },
        { status: 404 } // Set the HTTP response status code
      );
    }

    // Validate old password
    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) {
      return NextResponse.json(
        {
          error: "Invalid old password",
          status: 401,
        },
        { status: 401 }
      );
    }

    // Hash new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user password in the database
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json(
      {
        message: "Password updated successfully",
        status: 200,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json(
      {
        error: "Failed to update password",
        status: 500,
      },
      { status: 500 }
    );
  }
}
