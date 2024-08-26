import db from "@/config/model";
import { NextResponse } from "next/server";

// This function retrieves all reviews with pagination and additional details.
export async function getAllProfileReviews(id, page = 1, limit = 10) {
  try {
    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Define where condition (filter by profileId if provided)
    const whereCondition = id ? { profileId: id } : {};

    // Fetch reviews with pagination and related user details
    const { rows: reviews, count: totalRecords } =
      await db.Review.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["username", "email", "role"],
            include: [
              {
                model: db.PersonalProfile,
                as: "personalProfile",
                attributes: [
                  "firstName",
                  "lastName",
                  "profileThumb",
                  "verified",
                ],
              },
              {
                model: db.BusinessProfile,
                as: "businessProfile",
                attributes: ["businessName", "profileThumb", "verified"],
              },
              {
                model: db.Address,
                as: "addresses",
                attributes: ["city", "country"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
      });

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecords / limit);

    // Fetch overall rating and total reviews for the business profile associated with the provided profileId
    const overallRating = await db.BusinessProfile.findOne({
      where: { id },
      attributes: ["rating", "totalReviews"],
    });

    return {
      totalRecords,
      totalPages,
      currentPage: page,
      reviews,
      totalReview: overallRating?.totalReviews || 0,
      rating: overallRating?.rating || 0,
    };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function getAllReviews(page = 1, limit = 10) {
  try {
    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Fetch reviews with pagination and related user details
    const { rows: reviews, count: totalRecords } =
      await db.Review.findAndCountAll({
        attributes: ["id", "comment"],
        include: [
          {
            model: db.User,
            as: "user",
            attributes: ["username", "email", "role"],
            include: [
              {
                model: db.PersonalProfile,
                as: "personalProfile",
                attributes: ["firstName", "lastName"],
              },
              {
                model: db.BusinessProfile,
                as: "businessProfile",
                attributes: ["businessName", "verified"],
              },
              {
                model: db.Address,
                // where: addressConditions,
                as: "address",
                attributes: ["city", "country"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
      });

    // Calculate total pages for pagination   const totalPages = Math.ceil(totalRecords / limit);

    // Fetch overall rating and total reviews for the business profile associated with the provided profileId
    const totalPages = Math.ceil(totalRecords / limit);
    return {
      totalRecords,
      totalPages,
      currentPage: page,
      reviews,
    };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}
