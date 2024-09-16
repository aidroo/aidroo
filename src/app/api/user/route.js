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
    status,
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
    verified,
    subcategory,
  } = body;

  // Validate required fields

  if (!username || !email || !password) {
    return NextResponse.json({
      status: 400,
      message: "Username, email, and password are required.",
    });
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
      return NextResponse.json({
        status: 400,
        message: "User already exists.",
      });
    }
    const lowercaseUsername = username.toLowerCase().replace(/[^a-z0-9@]/g, "");

    // Create the new user
    const user = await db.User.create({
      username: lowercaseUsername,
      email,
      password: hashPassword,
      role,
    });

    // Send the initial response to the client
    const response = NextResponse.json({
      status: 201,
      message: "User registered successfully.",
    });

    // Perform additional operations asynchronously
    (async () => {
      try {
        if (role === "personal") {
          await db.PersonalProfile.create({
            username: user.username,
            firstName,
            lastName,
            dob,
            verified,
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
            status,

            verified,
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

export async function GET(request) {
  // Extract the search query from the request's URL
  const { searchParams } = new URL(request.url);
  const businessName = searchParams.get("businessName");

  if (!businessName) {
    return NextResponse.json(
      { message: "Business name is required" },
      { status: 400 }
    );
  }

  // Pagination parameters
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const offset = (page - 1) * limit;

  const whereConditions = {
    status: "approved",
    businessName: { [Op.like]: `%${businessName}%` }, // Case-insensitive match
  };

  try {
    // Fetch business profiles
    const { rows: businessProfiles, count: totalRecords } =
      await db.User.findAndCountAll({
        attributes: ["username", "email"], // Select only the needed fields from User
        include: [
          {
            model: db.BusinessProfile,
            as: "businessProfile",
            where: whereConditions,
            attributes: [
              "businessName",
              "profileThumb",
              "description",
              "rating",
              "verified",
              "category",
              "subcategory",
            ],
            required: true, // Only fetch users with matching business profiles
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit, // Pagination limit
      });

    // Enrich profiles with review data
    const enrichedProfiles = await Promise.all(
      businessProfiles.map(async (profile) => {
        const totalReviews = await db.Review.count({
          where: { profileId: profile.username, status: "approved" },
        });

        const averageRatingResult = await db.Review.findOne({
          where: { profileId: profile.username, status: "approved" },
          attributes: [
            [
              db.Sequelize.fn("AVG", db.Sequelize.col("rating")),
              "averageRating",
            ],
          ],
          raw: true,
        });

        const averageRating = averageRatingResult?.averageRating || 0;

        return {
          ...profile.toJSON(),
          totalReviews,
          averageRating: parseFloat(averageRating).toFixed(1), // Format to one decimal place
        };
      })
    );

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecords / limit);

    // Return the enriched profiles with pagination info
    return NextResponse.json({
      businessProfiles: enrichedProfiles,
      totalRecords,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching profiles:", error);
    return NextResponse.json(
      { message: "Error fetching profiles" },
      { status: 500 }
    );
  }
}
