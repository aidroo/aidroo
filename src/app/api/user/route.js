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
    funds,
    employees,

    description,
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
    const lowercaseUsername = username.toLowerCase();
    // Create the new user
    const user = await db.User.create({
      username: lowercaseUsername,
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
            funds,
            employees,
            description,
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
  const businessName = searchParams.get("businessName");

  if (!businessName) {
    return NextResponse.json(
      { status: 400, message: "Business name is required." },
      { status: 400 }
    );
  }

  try {
    const { rows: businessProfiles } = await db.User.findAndCountAll({
      attributes: ["username", "email"],
      include: [
        {
          model: db.BusinessProfile,
          where: { businessName: { [Op.like]: `%${businessName}%` } }, // Partial match
          as: "businessProfile",
          required: true,
        },
        {
          model: db.Address,
          as: "addresses",
          required: true,
        },
      ],
      order: [["createdAt", "DESC"]],

      limit: 10, // Log the SQL query for debugging
    });

    return NextResponse.json({
      status: 200,
      message: "User fetched successfully.",
      user: businessProfiles,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
