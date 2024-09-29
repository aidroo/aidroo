// app/api/jobs/route.js
import db from "@/config/model";
import { NextResponse } from "next/server";
// assuming you use Prisma for your database

export async function POST(request) {
  try {
    // Get the job data from the request body
    const body = await request.json();

    // Ensure all required fields are present
    const {
      username,
      title,
      description,
      price,
      category_id,
      subcategory_id,
      priceType,
      currency,
      location,
      country,
      startDate,
      endDate,
      images,
      tags,
      status,
    } = body;

    if (!username || !title) {
      return NextResponse.json(
        { message: "Missing username or title required fields" },
        { status: 400 }
      );
    }

    // Save the job data to the database
    const job = await db.JobPost.create({
      username,
      title,
      description,
      price,
      category_id,
      subcategory_id,
      priceType,
      currency,
      location,
      country,
      startDate,
      endDate,
      images,
      tags,
      status: status || "pending",
    });

    // Return success response
    return NextResponse.json({
      job,
      status: 201,
      message: "jobs created successfully",
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: "Failed to create job" },
      { status: 500 }
    );
  }
}
