import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { NextResponse } from "next/server";

// POST: Create a new subcategory
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, categoryId } = body;

    if (!name || !categoryId) {
      return NextResponse.json({
        status: 400,
        message: "Name and categoryId are required.",
      });
    }

    await connectToDatabase();

    // Check if the subcategory already exists for the given category
    const existingSubcategory = await db.Subcategory.findOne({
      where: { name },
    });

    if (existingSubcategory) {
      return NextResponse.json({
        status: 409,
        message: "Subcategory name already exists for this category.",
      });
    }

    // Create the subcategory
    const newSubcategory = await db.Subcategory.create({ name, categoryId });

    return NextResponse.json({
      status: 201,
      message: "Subcategory created successfully.",
      newSubcategory,
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
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
    const limit = parseInt(searchParams.get("limit")) || 5;
    const offset = (page - 1) * limit;

    if (page < 1 || limit < 1) {
      return NextResponse.json({
        status: 400,
        message: "Page and limit must be positive integers.",
      });
    }

    await connectToDatabase();

    // Fetch subcategories with pagination
    const { rows: subcategories, count: totalRecords } =
      await db.Subcategory.findAndCountAll({
        offset,
        limit,
        order: [["createdAt", "DESC"]],
      });

    const totalPages = Math.ceil(totalRecords / limit);

    return NextResponse.json({
      status: 201,
      message: "Subcategories fetched successfully.",
      totalRecords,
      totalPages,
      currentPage: page,
      data: subcategories,
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error: " + error.message,
    });
  }
}
