import db from "@/config/model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const user = await db.User.findOne({
      where: { username: id },
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",
          required: true, // Inner join - only fetch users with BusinessProfiles
        },
        {
          model: db.Address,
          as: "addresses",
          required: false, // Left join - fetch users with or without Addresses
        },
      ],
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    return NextResponse.json({ data: user, status: 201 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}
