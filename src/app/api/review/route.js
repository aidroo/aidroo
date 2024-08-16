import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { comment, title, username, rating } = body;

  if (!comment && !title && !username) {
    return NextResponse.json({
      status: 400,
      message: "title,comment,  is required.",
    });
  }

  await connectToDatabase();
  try {
    // Create the category
    const newReview = await db.Review.create({
      comment,
      title,
      rating,
      username,
    });

    return NextResponse.json({
      status: 201,
      message: "Review  created successfully.",
      data: newReview,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error: " + error.message,
    });
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // Fetch and parse pagination parameters if provided
  const page = parseInt(searchParams.get("page"));
  const limit = parseInt(searchParams.get("limit"));

  await connectToDatabase();

  try {
    // Fetch all categories if no limit or page is provided
    let queryOptions = {
      order: [["createdAt", "DESC"]],
    };

    // If page and limit are provided, apply pagination
    if (!isNaN(page) && !isNaN(limit) && page > 0 && limit > 0) {
      const offset = (page - 1) * limit;
      queryOptions = {
        ...queryOptions,
        offset,
        limit,
      };
    }

    const { rows: categories, count: totalRecords } =
      await db.Review.findAndCountAll(queryOptions);

    const totalPages = limit ? Math.ceil(totalRecords / limit) : 1;

    return NextResponse.json({
      status: 201,
      message: "Reviews fetched successfully.",
      totalRecords,
      totalPages,
      currentPage: page || 1,
      data: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error: " + error.message,
    });
  }
}
