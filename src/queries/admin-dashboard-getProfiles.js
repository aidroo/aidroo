import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function fetchProfiles({
  searchQuery,
  categoryFilter,
  subcategoryFilter,
  countryFilter,
  ratingFilter,
  searchCity,
  claimedStatus,
  openNow,
  page = 1,
  limit = 10,
}) {
  // Ensure page and limit are integers
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Default offset calculation
  const offset = (page - 1) * limit;

  const whereConditions = {
    ...(searchQuery && { businessName: { [Op.like]: `%${searchQuery}%` } }),
    ...(categoryFilter && { category: categoryFilter }),
    ...(subcategoryFilter && { subcategory: subcategoryFilter }),
    ...(ratingFilter && { rating: ratingFilter }),
    ...(claimedStatus !== null && { claimed: claimedStatus === "true" }),
    ...(openNow && { open: openNow }),
  };

  const addressConditions = {
    ...(countryFilter && { country: countryFilter }),
    ...(searchCity && { city: { [Op.like]: `%${searchCity}%` } }),
  };

  try {
    const { rows: businessProfiles, count: totalRecords } =
      await db.User.findAndCountAll({
        attributes: ["email", "username"],
        include: [
          {
            model: db.BusinessProfile,
            as: "businessProfile",
            where: whereConditions,
            required: true,
          },
          {
            model: db.Address,
            as: "addresses",
            where: addressConditions,
            required: true,
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit, // Ensure limit is a number
      });

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecords / limit);
    return {
      businessProfiles: businessProfiles,
      totalRecords,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Database query failed");
  }
}
export async function fetchSingleProfile({ username }) {
  try {
    const user = await db.User.findOne({
      where: { username },
      attributes: ["username", "email"],
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",
          // attributes: ["businessName", "profileThumb", "description", "rating"],
          required: true,
        },
        {
          model: db.Address,
          as: "addresses",
        },
      ],
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    // Convert the Sequelize model to a plain object
    const plainUser = user.toJSON();
    const profile = {
      email: plainUser.email,
      username: plainUser.username,
      ...plainUser.businessProfile,
      ...plainUser.addresses,
    };

    return { profile };
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
