import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

// This function retrieves all reviews with pagination and additional details.
export async function getAllProfileReviews(username, page = 1, limit = 10) {
  try {
    // Calculate the offset for pagination
    const offset = (page - 1) * limit;
    console.log("username", page, offset);
    // Define where condition (filter by profileId if provided)
    const whereCondition = username
      ? { profileId: username, status: "approved" }
      : {};

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

    // Calculate the average rating for the profile from the approved reviews
    const averageRatingResult = await db.Review.findOne({
      where: { profileId: username, status: "approved" },
      attributes: [
        [db.Sequelize.fn("AVG", db.Sequelize.col("rating")), "averageRating"],
      ],
    });

    // Extract the average rating and convert it to a floating-point number
    const averageRating = averageRatingResult?.dataValues?.averageRating
      ? parseFloat(averageRatingResult.dataValues.averageRating).toFixed(1)
      : 0;

    // Convert reviews to plain objects
    const plainReviews = reviews.map((review) => review.toJSON());

    return {
      totalRecords,
      totalPages,
      currentPage: page,
      reviews: plainReviews,
      totalReview: totalRecords, // Use totalRecords for total reviews
      rating: averageRating, // Use the calculated average rating
    };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function getAllReviews(page = 1, limit = 10, searchQuery = "") {
  try {
    // Calculate the offset for pagination
    const offset = (page - 1) * limit;

    // Build the where clause for the review search
    const reviewWhereClause = {};

    if (searchQuery) {
      reviewWhereClause[Op.or] = [
        { title: { [Op.like]: `%${searchQuery}%` } },
        { comment: { [Op.like]: `%${searchQuery}%` } },
      ];
    }

    // Build the where clause for the user address filter

    // Fetch reviews with pagination
    const { rows: reviews, count: totalRecords } =
      await db.Review.findAndCountAll({
        attributes: [
          "id",
          "comment",
          "profileId",
          "title",
          "verified",
          "status",
        ], // `profileId` is the `username`
        where: reviewWhereClause,
        include: [
          {
            model: db.User,
            as: "user",
            include: [
              {
                model: db.PersonalProfile,
                as: "personalProfile",
                attributes: ["firstName", "lastName"], // Personal profile details
              },
              {
                model: db.BusinessProfile,
                as: "businessProfile",
                attributes: ["businessName", "verified"], // Business profile details
              },
              {
                model: db.Address,

                as: "addresses",
                attributes: ["country"],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
      });

    // If no reviews, return empty data
    if (reviews.length === 0) {
      return {
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        currentPage: page,
        reviews: [],
      };
    }

    // Fetch user details for each review based on the username (profileId)
    const reviewsWithProfileDetails = await Promise.all(
      reviews.map(async (review) => {
        const user = review.user;

        // Check if the user has a PersonalProfile or BusinessProfile
        let profileDetails = null;
        if (user?.personalProfile) {
          profileDetails = {
            profileType: "personal",
            firstName: user.personalProfile.firstName,
            lastName: user.personalProfile.lastName,
            country: user.addresses[0]?.country || "N/A", // Get country from user's address
          };
        } else if (user?.businessProfile) {
          profileDetails = {
            profileType: "business",
            businessName: user.businessProfile.businessName,
            verified: user.businessProfile.verified,
            country: user.addresses[0]?.country || "N/A", // Get country from user's address
          };
        }

        // Return review along with profile details
        return {
          reviewId: review.id,
          comment: review.comment,
          title: review.title,
          verified: review.verified, // Review verification status
          profileId: review.profileId,
          status: review.status, // The user's username
          profileDetails,
        };
      })
    );

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      totalRecords,
      totalPages,
      currentPage: page,
      reviews: reviewsWithProfileDetails, // Return reviews with profile details
    };
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}

export async function getRepliesWithProfile(reviewId) {
  try {
    const replies = await db.ReplyReview.findAll({
      where: { reviewId }, // Filter by the reviewId
      include: [
        {
          model: db.User,
          as: "user", // Get the user who created the reply
          attributes: ["username", "email"], // Include relevant user fields
          include: [
            {
              model: db.PersonalProfile, // Include the PersonalProfile if it exists
              as: "personalProfile",
              required: false, // This allows the user to not have a personal profile (optional)
            },
            {
              model: db.BusinessProfile, // Include the BusinessProfile if it exists
              as: "businessProfile",
              required: false, // This allows the user to not have a business profile (optional)
            },
          ],
        },
      ],
    });

    return replies;
  } catch (error) {
    console.error("Error fetching replies with profiles:", error);
    throw error;
  }
}
// export async function getAllProfileReviews(username, page = 1, limit = 10) {
//   try {
//     // Calculate the offset for pagination
//     const offset = (page - 1) * limit;
//     if (!username) {
//       return [];
//     }

//     // Define where condition (filter by profileId if provided)
//     const whereCondition = username
//       ? { profileId: username, status: "approved" }
//       : {};

//     // Fetch reviews with pagination, but exclude replies from pagination
//     const { rows: reviews, count: totalRecords } =
//       await db.Review.findAndCountAll({
//         where: whereCondition,
//         include: [
//           {
//             model: db.User,
//             as: "user",
//             attributes: ["username", "email", "role"],
//             include: [
//               {
//                 model: db.PersonalProfile,
//                 as: "personalProfile",
//                 attributes: [
//                   "firstName",
//                   "lastName",
//                   "profileThumb",
//                   "verified",
//                 ],
//               },
//               {
//                 model: db.BusinessProfile,
//                 as: "businessProfile",
//                 attributes: ["businessName", "profileThumb", "verified"],
//               },
//               {
//                 model: db.Address,
//                 as: "addresses",
//                 attributes: ["city", "country"],
//               },
//             ],
//           },
//         ],
//         order: [["createdAt", "DESC"]], // Sort reviews in descending order
//         offset: offset,
//         limit: limit,
//       });

//     // Fetch replies for each review (sorted in descending order)
//     const reviewsWithReplies = await Promise.all(
//       reviews.map(async (review) => {
//         // Fetch replies for the review, sorted in descending order
//         const replies = await db.ReplyReview.findAll({
//           where: { reviewId: review.id },
//           include: [
//             {
//               model: db.User,
//               as: "user",
//               attributes: ["username", "email", "role"],
//               include: [
//                 {
//                   model: db.PersonalProfile,
//                   as: "personalProfile",
//                   attributes: [
//                     "firstName",
//                     "lastName",
//                     "profileThumb",
//                     "verified",
//                   ],
//                 },
//                 {
//                   model: db.BusinessProfile,
//                   as: "businessProfile",
//                   attributes: ["businessName", "profileThumb", "verified"],
//                 },
//                 {
//                   model: db.Address,
//                   as: "addresses",
//                   attributes: ["city", "country"],
//                 },
//               ],
//             },
//           ],
//           order: [["createdAt", "DESC"]], // Sort replies in descending order
//         });

//         // Attach the sorted replies to the review object
//         return {
//           ...review.toJSON(),
//           replies: replies.map((reply) => reply.toJSON()),
//         };
//       })
//     );

//     // Calculate total pages for pagination
//     const totalPages = Math.ceil(totalRecords / limit);

//     // Calculate the average rating for the profile from the approved reviews
//     const averageRatingResult = await db.Review.findOne({
//       where: { profileId: username, status: "approved" },
//       attributes: [
//         [db.Sequelize.fn("AVG", db.Sequelize.col("rating")), "averageRating"],
//       ],
//     });

//     // Extract the average rating and convert it to a floating-point number
//     const averageRating = averageRatingResult?.dataValues?.averageRating
//       ? parseFloat(averageRatingResult.dataValues.averageRating).toFixed(1)
//       : 0;

//     return {
//       totalRecords,
//       totalPages,
//       currentPage: page,
//       reviews: reviewsWithReplies, // Return reviews with their replies
//       totalReview: totalRecords, // Use totalRecords for total reviews
//       rating: averageRating, // Use the calculated average rating
//     };
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ status: 500, error: error.message });
//   }
// }
