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
    title,
    comment,
    rating,
    description,
    uploadUrl,
    images,
    city,
    address,
    country,
    profileId,
  } = body;

  // Validate required fields
  if (!username || !email || !password) {
    return NextResponse.json({
      status: 400,
      message: "Username, email, and password are required.",
    });
  }

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

    const lowercaseUsername = username.toLowerCase();

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
          username: username,
          firstName,
          lastName,
          profileThumb: uploadUrl,
          description,
        },
        { transaction }
      ),
      db.Address.create(
        {
          username: username,
          country,
          city,
          address,
        },
        { transaction }
      ),
      db.Review.create(
        {
          username: username,
          title,
          comment,
          rating,
          profileId, // Use the created user's username for profileId
          images,
        },
        { transaction }
      ),
    ]);

    // Find the business profile and update the totalReviews and rating

    const businessProfile = await db.BusinessProfile.findOne({
      where: { username: profileId },
      transaction,
    });

    if (!businessProfile) {
      return NextResponse.json(
        { message: "Business profile not found." },
        { status: 404 }
      );
    }

    // Calculate new rating
    const { rating: currentRating, totalReviews } = businessProfile;
    const newTotalReviews = totalReviews + 1;
    const updatedRating = (
      (currentRating * totalReviews + parseFloat(rating)) /
      newTotalReviews
    ).toFixed(2);
    businessProfile.rating = updatedRating;
    businessProfile.totalReviews = newTotalReviews;
    await businessProfile.save();

    // Update businessProfile totalReviews and calculate the new average rating
    businessProfile.totalReviews += 1;
    businessProfile.rating =
      (businessProfile.rating * (businessProfile.totalReviews - 1) + rating) /
      businessProfile.totalReviews;

    await businessProfile.save({ transaction });

    // Commit the transaction
    await transaction.commit();

    return NextResponse.json(
      { status: 201, message: "User registered successfully." },
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

export async function GET() {
  return NextResponse.json({ status: 200, message: "review and profile" });
}
