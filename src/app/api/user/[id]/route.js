import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectToDatabase();

  const transaction = await db.sequelize.transaction();

  try {
    // Parse the request body
    const body = await req.json();
    const {
      username,
      profileThumb,
      email,
      role,
      firstName,
      lastName,
      description,
      businessName,
      funds,
      phoneNumber,
      street,
      city,
      employees,
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
    const user = await db.User.findOne({ where: { username }, transaction });

    if (!user) {
      await transaction.rollback();
      return NextResponse.json(
        { status: 404, message: "User not found." },
        { status: 404 }
      );
    }

    // Update user fields
    if (email) user.email = email;

    // if (role) user.role = role;

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
        if (description) personalProfile.description = description;
        if (phoneNumber) personalProfile.phoneNumber = phoneNumber;
        if (profileThumb) personalProfile.profileThumb = profileThumb;
        // if (dob) personalProfile.dob = dob;
        // if (gender) personalProfile.gender = gender;
        await personalProfile.save({ transaction });
      }
    } else if (role === "business") {
      const businessProfile = await db.BusinessProfile.findOne({
        where: { username: user.username },
        transaction,
      });

      if (businessProfile) {
        if (businessName) businessProfile.businessName = businessName;
        // if (businessType) businessProfile.businessType = businessType;
        if (phoneNumber) businessProfile.phoneNumber = phoneNumber;
        if (funds) businessProfile.funds = funds;
        if (employees) businessProfile.employees = employees;
        if (description) businessProfile.description = description;
        if (category) businessProfile.category = category;
        if (subcategory) businessProfile.subcategory = subcategory;
        if (profileThumb) businessProfile.profileThumb = profileThumb;
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

export async function DELETE(req) {
  const { id } = req.url.split("/").pop();
  try {
    const deleted = await db.User.destroy({ where: { id } });
    if (!deleted) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
