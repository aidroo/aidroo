import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { comment, title, username, rating, profileId } = body;

    // Validate required fields
    if (!comment || !title || !username || !rating || !profileId) {
      return NextResponse.json({
        status: 400,
        message:
          "All fields (comment, title, username, rating, profileId) are required.",
      });
    }

    await connectToDatabase();

    // Create the review
    const newReview = await db.Review.create({
      comment,
      title,
      rating,
      username,
      profileId,
    });

    return NextResponse.json({
      status: 201,
      message: "Review created successfully.",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error: " + error.message,
    });
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const username = searchParams.get("username") || null;
    const profileId = searchParams.get("profileId") || null;

    await connectToDatabase();

    // Set up query options with default values
    let queryOptions = {
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: db.User,
          as: "user",
          attributes: ["username", "email", "role"],
          include: [
            {
              model: db.PersonalProfile,
              as: "personalProfile",
              attributes: ["firstName", "lastName", "profileThumb"],
            },
            {
              model: db.BusinessProfile,
              as: "businessProfile",
              attributes: ["businessName", "profileThumb"],
            },
            {
              model: db.Address,
              as: "addresses",
              attributes: ["city", "country"],
            },
          ],
        },
      ],
    };

    // Apply filtering for username and profileId if provided
    if (username || profileId) {
      queryOptions.where = {
        profileId,
      };
    }

    // Apply pagination if valid page and limit are provided
    if (page > 0 && limit > 0) {
      const offset = (page - 1) * limit;
      queryOptions = {
        ...queryOptions,
        offset,
        limit,
      };
    }

    // Fetch reviews with associated user, profile, and address details
    const { rows: reviews, count: totalRecords } =
      await db.Review.findAndCountAll(queryOptions);

    const totalPages = Math.ceil(totalRecords / limit);

    return NextResponse.json({
      status: 200,
      message: "Reviews fetched successfully.",
      totalRecords,
      totalPages,
      currentPage: page,
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error: " + error.message,
    });
  }
}
