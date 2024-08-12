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
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return NextResponse.json({
        status: 400,
        message: "Page and limit must be positive integers.",
      });
    }

    await connectToDatabase();

    // Fetch subcategories with pagination
    const { rows: categories, count: totalRecords } =
      await db.Category.findAndCountAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });

    const totalPages = Math.ceil(totalRecords / limit);

    return NextResponse.json({
      status: 201,
      message: "Categories fetched successfully.",
      data: categories,
      totalRecords,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error("Error fetching Categories:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error: " + error.message,
    });
  }
}
