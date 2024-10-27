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
  verifiedStatus,
  openNow,
  page = 1,
  limit = 10,
  all = false,
}) {
  // Ensure page and limit are integers
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Default offset calculation
  

  // Base condition for fetching approved profiles only
  const whereConditions = {
    ...(!all && { status: "approved" }),
    ...(searchQuery && { businessName: { [Op.like]: `%${searchQuery}%` } }),
    ...(categoryFilter && { category: categoryFilter }),
    ...(subcategoryFilter && { subcategory: subcategoryFilter }),
    ...(verifiedStatus !== null && { verified: verifiedStatus === "true" }),

    ...(openNow && { open: openNow }), // Assuming you have an 'open' field
  };

  // Address-related conditions
  const addressConditions = {
    ...(countryFilter && { country: countryFilter }),
    ...(searchCity && { city: { [Op.like]: `%${searchCity}%` } }),
  };

  try {
    // Fetch business profiles
    const { rows: businessProfiles } = await db.User.findAndCountAll({
      attributes: ["username", "email"], // Select only the needed fields from User
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",
          where: whereConditions,
          required: true, // Only fetch users with matching business profiles
        },
        {
          model: db.Address,
          as: "addresses",
          where: addressConditions,
          required: true, // Only fetch users with matching addresses
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Fetch ratings and total reviews for each profile
    const plainProfiles = await Promise.all(
      businessProfiles.map(async (profile) => {
        // Get the total number of approved reviews for the profile
        const totalReviews = await db.Review.count({
          where: { profileId: profile.username, status: "approved" },
        });

        // Get the average rating for approved reviews
        const averageRatingResult = await db.Review.findOne({
          where: { profileId: profile.username, status: "approved" },
          attributes: [
            [
              db.Sequelize.fn("AVG", db.Sequelize.col("rating")),
              "averageRating",
            ],
          ],
          raw: true,
        });

        // Parse the average rating or default to 0 if not available
        const averageRating = parseFloat(
          averageRatingResult?.averageRating || 0
        );

        // Check if the profile meets the rating filter criteria (range like 3-4 or 4-5)
        if (ratingFilter) {
          const [minRating, maxRating] = ratingFilter.split("-").map(Number);

          if (averageRating < minRating || averageRating > maxRating) {
            return null; // Skip profiles that don't meet the filter criteria
          }
        }

        // Return the profile as a plain object, along with total reviews and average rating
        return {
          ...profile.toJSON(), // Convert Sequelize instance to a plain object
          totalReviews,
          averageRating: averageRating.toFixed(1), // Format average rating to one decimal place
        };
      })
    );

    // Filter out any null profiles (those that didn't meet the rating filter)
    const filteredProfiles = plainProfiles.filter(
      (profile) => profile !== null
    );

    // Apply pagination on the filtered profiles
    const paginatedProfiles = filteredProfiles.slice(
      (page - 1) * limit,
      page * limit
    );

    // Calculate total pages for pagination
    const totalRecords = filteredProfiles.length;
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      businessProfiles: paginatedProfiles, // Return enriched profiles with review data
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

// todo: implement

export async function fetchPersonalProfiles({
  searchQuery,
  countryFilter,
  // searchCity,
  page = 1,
  limit = 10,
}) {
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Default offset calculation
  const offset = (page - 1) * limit;
  // Define where conditions based on the search query
  const whereConditions = searchQuery
    ? {
        [Op.or]: [
          { firstName: { [Op.like]: `%${searchQuery}%` } },
          { lastName: { [Op.like]: `%${searchQuery}%` } },
        ],
      }
    : {};
  const addressConditions = {
    ...(countryFilter && { country: countryFilter }),
    // ...(searchCity && { city: { [Op.like]: `%${searchCity}%` } }),
  };

  try {
    const { rows: personalProfiles, count: totalRecords } =
      await db.User.findAndCountAll({
        attributes: ["email", "username"],
        include: [
          {
            model: db.PersonalProfile,
            as: "personalProfile",
            where: whereConditions,
            required: true,
          },
          {
            model: db.Address,
            as: "addresses",
            where: addressConditions,
            required: true, // Only include users with matching addresses and personal profiles.
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
      });

    // If no profiles are found, return an empty array
    if (personalProfiles.length === 0) {
      return {
        personalProfiles: [],
      };
    }
    const totalPages = Math.ceil(totalRecords / limit);

    const plainProfile = personalProfiles.map((profile) => profile.toJSON());

    return {
      personalProfiles: plainProfile,
      totalRecords,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Database query failed");
  }
}

export async function fetchSinglePersonalProfile(username) {
  try {
    // Fetch the user profile along with business profile and address
    const user = await db.User.findOne({
      where: { username },
      attributes: ["username", "email"],
      include: [
        {
          model: db.PersonalProfile,
          as: "personalProfile",
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
    // const totalReviews = await db.Review.count({
    //   where: { profileId: username, status: "approved" },
    // });

    // // Calculate the average rating for the profile
    // const averageRatingResult = await db.Review.findOne({
    //   where: { profileId: username, status: "approved" },
    //   attributes: [
    //     [db.Sequelize.fn("AVG", db.Sequelize.col("rating")), "averageRating"],
    //   ],
    // });

    // Convert the Sequelize model to a plain object
    const plainUser = user.toJSON();
    // const profile = {
    //   email: plainUser.email,
    //   username: plainUser.username,
    //   ...plainUser.businessProfile,
    //   ...plainUser.addresses,
    //   totalReviews: totalReviews || 0, // Fallback to 0 if no reviews
    //   averageRating: averageRatingResult?.dataValues?.averageRating
    //     ? parseFloat(averageRatingResult.dataValues.averageRating).toFixed(1)
    //     : 0, // Fallback to 0 if no reviews
    // };

    return { profile: plainUser };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function getAllBusinessProfile() {
  // Ensure page and limit are integers

  // Base condition for fetching approved profiles only

  // Address-related conditions

  try {
    // Fetch business profiles
    const businessProfiles = await db.User.findAll({
      attributes: ["email", "username"],
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",

          required: true, // Only fetch users with matching business profiles
        },
        {
          model: db.Address,
          as: "addresses",

          required: true, // Only fetch users with matching addresses
        },
      ],
    });

    // Fetch ratings and total reviews for each profile

    const filteredProfiles = businessProfiles.map((profile) =>
      profile.toJSON()
    );

    return {
      businessProfiles: filteredProfiles, // Return enriched profiles with review data
    };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Database query failed");
  }
}
