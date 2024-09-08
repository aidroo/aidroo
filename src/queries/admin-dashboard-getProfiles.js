/* eslint-disable no-dupe-keys */
import db from "@/config/model";
import { NextResponse } from "next/server";

import { Op } from "sequelize"; // Ensure these are imported

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
    status: "approved",
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
    const plainProfile = businessProfiles.map((profile) => profile.toJSON());
    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecords / limit);
    return {
      businessProfiles: plainProfile,
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
    // Fetch the user profile along with business profile and address
    const user = await db.User.findOne({
      where: { username },
      attributes: ["username", "email"],
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",
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

    // Calculate the total number of approved reviews for the profile
    const totalReviews = await db.Review.count({
      where: { profileId: username, status: "approved" },
    });

    // Calculate the average rating for the profile
    const averageRatingResult = await db.Review.findOne({
      where: { profileId: username, status: "approved" },
      attributes: [
        [db.Sequelize.fn("AVG", db.Sequelize.col("rating")), "averageRating"],
      ],
    });

    // Convert the Sequelize model to a plain object
    const plainUser = user.toJSON();
    const profile = {
      email: plainUser.email,
      username: plainUser.username,
      ...plainUser.businessProfile,
      ...plainUser.addresses,
      totalReviews: totalReviews || 0, // Fallback to 0 if no reviews
      averageRating: averageRatingResult?.dataValues?.averageRating
        ? parseFloat(averageRatingResult.dataValues.averageRating).toFixed(1)
        : 0, // Fallback to 0 if no reviews
    };

    return { profile };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
