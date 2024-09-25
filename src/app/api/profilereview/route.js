import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { trimStrings } from "@/utils/trimString";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST(req) {
  await connectToDatabase();

  // Parse the request body

  // Parse the request body
  const body = await req.json();

  // Trim all string properties
  const trimmedBody = trimStrings(body);

  const {
    username,
    email,
    password,
    role,
    firstName,
    lastName,
    title,
    comment,
    rating,
    description,
    profileThumb,
    images,
    verified,
    userVerified,
    city,
    address,
    country,
    profileId,
  } = trimmedBody;
  // Validate required fields
  if (!username || !email || !password) {
    return NextResponse.json({
      status: 400,
      message: "Username, email, and password are required.",
    });
  }
  // console.log(images, profileThumb);
  // Start a transaction
  const transaction = await db.sequelize.transaction();

  try {
    // Check if the user already exists
    const existingUser = await db.User.findOne({
      where: {
        [Op.or]: [{ email }],
      },
      transaction, // Include the transaction in the query
    });

    if (existingUser) {
      await transaction.rollback();
      return NextResponse.json({
        status: 400,
        message: "User already exists.",
      });
    }

    const lowercaseUsername = username.toLowerCase().replace(/[^a-z0-9@]/g, "");

    // Create the new user
    await db.User.create(
      {
        username: lowercaseUsername,
        email,
        password: await bcrypt.hash(password, 10),
        role,
      },
      { transaction }
    );

    // Perform additional operations within the same transaction
    await Promise.all([
      db.PersonalProfile.create(
        {
          username: lowercaseUsername,
          firstName,
          lastName,
          profileThumb: profileThumb,
          description,
          verified: userVerified,
          status: "approved",
        },
        { transaction }
      ),
      db.Address.create(
        {
          username: lowercaseUsername,
          country,
          city,
          address,
        },
        { transaction }
      ),
      db.Review.create(
        {
          username: lowercaseUsername,
          title,
          comment,
          rating,
          profileId, // Use the created user's username for profileId
          images,
          verified,
          status: "approved",
        },
        { transaction }
      ),
    ]);

    // Commit the transaction
    await transaction.commit();

    return NextResponse.json(
      { status: 201, message: "User and review  create successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);

    // Rollback the transaction in case of any error
    await transaction.rollback();

    return NextResponse.json(
      { status: 500, message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

// export async function GET() {
//   return NextResponse.json({ status: 200, message: "review and profile" });
// }
