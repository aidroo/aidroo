// app/api/jobs/route.js
import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
// assuming you use Prisma for your database

export async function POST(request) {
  try {
    // Get the job data from the request body
    const body = await request.json();

    // Ensure all required fields are present
    const {
      profileUsername,
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

    if (!profileUsername || !title) {
      return NextResponse.json(
        { message: "Missing username or title required fields" },
        { status: 400 }
      );
    }

    // Save the job data to the database

    const job = await db.JobPost.create({
      profileUsername,
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

// Adjust the path as necessary

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const searchQuery = searchParams.get("search");

    const filter = searchParams.get("filter");
    const country = searchParams.get("country");
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const page = parseInt(searchParams.get("page"), 10) || 1;
    const limit = parseInt(searchParams.get("limit"), 10) || 10;

    // Set up where conditions
    const whereConditions = {
      status: "approved", // Only approved jobs are returned by default

      // ...(filter === "top" && { applications: { [Op.gt]: 0 } }),
      ...(searchQuery && { title: { [Op.like]: `%${searchQuery}%` } }),
      ...(filter === "top" && { applications: { [Op.gt]: 0 } }),
      ...(country && { country: { [Op.like]: `%${country}%` } }),
      ...(category && { category_id: category }),
      ...(subcategory && { subcategory_id: subcategory }),
      // Add other conditions as needed
    };

    const offset = (page - 1) * limit;

    // Fetch jobs with pagination and order by applications in descending order
    const { rows: jobs, count: totalRecords } =
      await db.JobPost.findAndCountAll({
        where: whereConditions,
        order: [["createdAt", "DESC"]],
        offset,
        limit,
        // Uncomment and adjust associations if needed
        // include: [
        //   {
        //     model: db.User,
        //     as: "user",
        //     attributes: ["username", "email", "role"],
        //     include: [
        //       { model: db.PersonalProfile, as: "personalProfile" },
        //       { model: db.BusinessProfile, as: "businessProfile" },
        //     ],
        //   },
        // ],
      });

    // Check if jobs are found
    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ message: "No jobs found" });
    }

    return NextResponse.json({ jobs, totalRecords });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { message: "Error fetching jobs" },
      { status: 500 }
    );
  }
}
