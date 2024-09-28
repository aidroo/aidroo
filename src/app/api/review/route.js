import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST(req) {
  await connectToDatabase();

  try {
    const body = await req.json();
    const { profileId, username, title, images, comment, rating } = body;

    if (!profileId || !username || !title || !comment || !rating) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    // Find the business profile by username (profileId)
    const businessProfile = await db.BusinessProfile.findOne({
      where: { username: profileId },
    });

    if (!businessProfile) {
      return NextResponse.json(
        { message: "Business profile not found." },
        { status: 404 }
      );
    }

    // Calculate new rating
    const { rating: currentRating, totalReviews } = businessProfile;
    const newTotalReviews = totalReviews + 1;
    const updatedRating = (
      (currentRating * totalReviews + parseFloat(rating)) /
      newTotalReviews
    ).toFixed(1);

    // Update the business profile with new rating and total reviews
    businessProfile.rating = updatedRating;
    businessProfile.totalReviews = newTotalReviews;
    await businessProfile.save();

    // Save the review (assuming you have a review model)
    await db.Review.create({
      profileId,
      username,
      title,
      images,
      comment,
      rating,
    });

    return NextResponse.json({
      status: 201,
      message: "Review submitted and profile updated successfully.",
    });
  } catch (error) {
    console.error("Error processing review:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page")) || 1;
  const limit = parseInt(searchParams.get("limit")) || 10;
  const username = searchParams.get("profileId") || null;
  const search = searchParams.get("search");
  try {
    // Calculate the offset for pagination
    const offset = (page - 1) * limit;
    if (!username) {
      return [];
    }

    // Define where condition (filter by profileId if provided)
    const whereCondition = username
      ? { profileId: username, status: "approved" }
      : {
          ...(search && { title: { [Op.like]: `%${search}%` } }),
        };

    // Fetch reviews with pagination, but exclude replies from pagination
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
        order: [["createdAt", "DESC"]], // Sort reviews in descending order
        offset: offset,
        limit: limit,
      });

    // Fetch replies for each review (sorted in descending order)
    const reviewsWithReplies = await Promise.all(
      reviews.map(async (review) => {
        // Fetch replies for the review, sorted in descending order
        const replies = await db.ReplyReview.findAll({
          where: { reviewId: review.id },
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
          order: [["createdAt", "DESC"]], // Sort replies in descending order
        });

        // Attach the sorted replies to the review object
        return {
          ...review.toJSON(),
          replies: replies.map((reply) => reply.toJSON()),
        };
      })
    );

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

    const allreviews = {
      totalRecords,
      totalPages,
      currentPage: page,
      totalReview: totalRecords,
      rating: averageRating,
      reviewsWithReplies,
    };
    return NextResponse.json({
      reviews: allreviews || [],
      status: 201,
      message: "reviews fetch successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, message: error.message });
  }
}
