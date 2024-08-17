import connectToDatabase from "@/config/db/db";
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

// update business profile
export async function PUT(req) {
  await connectToDatabase();

  const transaction = await db.sequelize.transaction();

  try {
    // Parse the request body
    const body = await req.json();
    const {
      username,
      email,
      role,
      firstName,
      lastName,
      dob,
      gender,
      businessName,
      businessType,
      phoneNumber,
      street,
      city,
      state,
      zipCode,
      country,
      category,
      subcategory,
    } = body;

    // Validate required fields
    if (!username) {
      return NextResponse.json(
        { status: 400, message: "Username is required." },
        { status: 400 }
      );
    }

    // Find the existing user
    const user = await db.User.findOne({ where: { email }, transaction });

    if (!user) {
      await transaction.rollback();
      return NextResponse.json(
        { status: 404, message: "User not found." },
        { status: 404 }
      );
    }

    // Update user fields
    if (username) user.username = username;

    await user.save({ transaction });

    // Update related profiles and address within the transaction
    if (role === "personal") {
      const personalProfile = await db.PersonalProfile.findOne({
        where: { username: user.username },
        transaction,
      });

      if (personalProfile) {
        if (firstName) personalProfile.firstName = firstName;
        if (lastName) personalProfile.lastName = lastName;
        if (dob) personalProfile.dob = dob;
        if (gender) personalProfile.gender = gender;
        await personalProfile.save({ transaction });
      }
    } else if (role === "business") {
      const businessProfile = await db.BusinessProfile.findOne({
        where: { username: user.username },
        transaction,
      });

      if (businessProfile) {
        if (businessName) businessProfile.businessName = businessName;
        if (businessType) businessProfile.businessType = businessType;
        if (phoneNumber) businessProfile.phoneNumber = phoneNumber;
        if (category) businessProfile.category = category;
        if (subcategory) businessProfile.subcategory = subcategory;
        await businessProfile.save({ transaction });
      }
    }

    const address = await db.Address.findOne({
      where: { username: user.username },
      transaction,
    });

    if (address) {
      if (street) address.street = street;
      if (city) address.city = city;
      if (state) address.state = state;
      if (zipCode) address.zipCode = zipCode;
      if (country) address.country = country;
      await address.save({ transaction });
    }

    // Commit the transaction
    await transaction.commit();

    return NextResponse.json(
      { status: 200, message: "User updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    // Rollback the transaction in case of an error
    await transaction.rollback();
    console.error("Error updating user:", error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
