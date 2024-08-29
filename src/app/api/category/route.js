import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { NextResponse } from "next/server";

// POST: Create a new subcategory
export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json({
        status: 400,
        message: "Name is required.",
      });
    }

    await connectToDatabase();

    // Check if the category already exists
    const existingCategory = await db.Category.findOne({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json({
        status: 409,
        message: "Category name already exists.",
      });
    }

    // Create the category
    const newCategory = await db.Category.create({ name });

    if (!newCategory) {
      return NextResponse.json({
        status: 500,
        message: "Failed to create category.",
      });
    }

    return NextResponse.json({
      status: 201,
      message: "Category created successfully.",
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error: " + error.message,
    });
  }
}

// GET: Fetch subcategories with pagination
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
      await db.Category.findAndCountAll(queryOptions);

    const totalPages = limit ? Math.ceil(totalRecords / limit) : 1;

    return NextResponse.json({
      status: 201,
      message: "Categories fetched successfully.",
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
