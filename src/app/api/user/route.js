import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST(req) {
  await connectToDatabase();

  // Parse the request body
  const body = await req.json();
  const {
    username,
    email,
    password,
    role,
    firstName,
    lastName,
    dob,
    gender,
    businessName,
    businessType,
    phoneNumber,
    profileThumb,
    city,
    address,
    country,
    category,
    subcategory,
  } = body;

  // Validate required fields
  if (!username || !email || !password) {
    return NextResponse.json(
      { status: 400, message: "Username, email, and password are required." },
      { status: 400 }
    );
  }

  try {
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // Check if the user already exists
    const existingUser = await db.User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { status: 400, message: "User already exists." },
        { status: 400 }
      );
    }

    // Create the new user
    const user = await db.User.create({
      username,
      email,
      password: hashPassword,
      role,
    });

    // Send the initial response to the client
    const response = NextResponse.json(
      { status: 201, message: "User registered successfully." },
      { status: 201 }
    );

    // Perform additional operations asynchronously
    (async () => {
      try {
        if (role === "personal") {
          await db.PersonalProfile.create({
            username: user.username,
            firstName,
            lastName,
            dob,
            profileThumb,
            gender,
          });
        } else if (role === "business") {
          await db.BusinessProfile.create({
            username: user.username,
            businessName,
            businessType,
            phoneNumber,
            category,

            profileThumb,
            subcategory,
          });
        }

        await db.Address.create({
          username: user.username,
          country,
          city,
          address,
        });
      } catch (error) {
        console.error("Error registering user profiles or address:", error);
      }
    })();

    return response;
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { status: 400, message: "Username is required." },
      { status: 400 }
    );
  }

  try {
    const user = await db.User.findOne({
      where: { username },
      attributes: ["username", "email"],
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",
          required: false, // Inner join - only fetch users with BusinessProfiles
        },
        {
          model: db.PersonalProfile,
          as: "personalProfile",
          required: false, // Inner join - only fetch users with BusinessProfiles
        },
        {
          model: db.Address,
          as: "addresses",
          required: true, // Left join - fetch users with or without Addresses
        },
      ],
    });

    if (!user) {
      return NextResponse.json(
        { status: 404, message: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 201,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
