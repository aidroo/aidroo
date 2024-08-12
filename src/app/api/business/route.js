import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { paginationCalculator } from "@/utils/paginationCalculator";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET(req) {
  await connectToDatabase();

  const { searchParams } = new URL(req.url);

  // Extract query parameters
  const businessName = searchParams.get("searchTerm");
  const category = searchParams.get("category");
  const subcategory = searchParams.get("subcategory");
  const rating = searchParams.get("rating");
  const verified = searchParams.get("verified");
  const claimed = searchParams.get("claimed");
  const guaranteed = searchParams.get("guaranteed");
  const city = searchParams.get("city");
  const country = searchParams.get("country");

  // Extract pagination options
  const paginationOptions = {
    page: searchParams.get("page"),
    limit: searchParams.get("limit"),
    sortBy: searchParams.get("sortBy"),
    sortOrder: searchParams.get("sortOrder"),
  };

  const { page, limit, offset, sortBy, sortOrder } =
    paginationCalculator(paginationOptions);

  // Define filtering conditions
  const whereConditions = {
    ...(businessName && { businessName: { [Op.like]: `%${businessName}%` } }),
    ...(category && { category: { [Op.like]: `%${category}%` } }),
    ...(subcategory && { subcategory: { [Op.like]: `%${subcategory}%` } }),

    ...(rating && { rating: { [Op.lte]: rating } }),
    ...(verified !== null && { verified: verified === "true" }),
    ...(claimed !== null && { claimed: claimed === "true" }),
    ...(guaranteed !== null && { guaranteed: guaranteed === "true" }),
  };

  // Define address filtering conditions
  const addressConditions = {
    ...(country && { country: { [Op.like]: `%${country}%` } }),
    ...(city && { city: { [Op.like]: `%${city}%` } }),
  };

  try {
    // Fetch business profiles
    const { rows: businessProfiles, count: totalRecords } =
      await db.BusinessProfile.findAndCountAll({
        where: whereConditions,
        include: [
          {
            model: db.Address,
            as: "addresses",
            where: addressConditions,
            required: true,
          },
        ],
        limit,
        offset,
        order: [[sortBy, sortOrder]],
      });

    return NextResponse.json({
      data: businessProfiles,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: parseInt(page, 10),
      status: 200,
      message: "Business profiles fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      error: error.message || "Internal Server Error",
      status: error.status || 500,
    });
  }
}
