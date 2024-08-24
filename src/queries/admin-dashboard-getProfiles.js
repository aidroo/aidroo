import db from "@/config/model";
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
}) {
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
  // const paginationOptions = {
  //   page: searchParams.get("page"),
  //   limit: searchParams.get("limit"),
  //   sortBy: searchParams.get("sortBy"),
  //   sortOrder: searchParams.get("sortOrder"),
  // };

  // const { page, limit, offset, sortBy, sortOrder } =
  //   paginationCalculator(paginationOptions);
  try {
    const { rows: businessProfiles, count: totalRecords } =
      await db.User.findAndCountAll({
        // Select only email and username from User
        attributes: ["email", "username"],
        include: [
          {
            model: db.BusinessProfile,
            as: "businessProfile",
            where: whereConditions, // Conditions for filtering BusinessProfile
            required: true, // Inner join - only fetch users with BusinessProfiles
          },
          {
            model: db.Address,
            as: "addresses",
            where: addressConditions, // Conditions for filtering Address
            required: true, // Left join - fetch users with or without Addresses
          },
        ],

        // limit, // Limit the number of records
        // offset, // Offset for pagination
        // order: [[sortBy, sortOrder]], // Order by specific field and order
      });
    return { businessProfiles: businessProfiles, totalRecords: totalRecords };
  } catch (error) {
    console.log(error);
  }
}
