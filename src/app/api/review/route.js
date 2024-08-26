import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import { NextResponse } from "next/server";

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

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const page = parseInt(searchParams.get("page")) || 1;
//     const limit = parseInt(searchParams.get("limit")) || 10;
//     const profileId = searchParams.get("profileId") || null;

//     await connectToDatabase();

//     const offset = (page - 1) * limit;

//     // Fetch reviews with associated user, profile, and address details
//     const { rows: reviews, count: totalRecords } =
//       await db.Review.findAndCountAll({
//         where: { profileId },
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
//         order: [["createdAt", "DESC"]],
//         offset: offset,
//         limit: limit,
//       });

//     const totalPages = Math.ceil(totalRecords / limit);

//     // Fetch overall rating and total reviews
//     const overallRating = await db.BusinessProfile.findOne({
//       where: { username: profileId },
//       attributes: ["rating", "totalReviews"],
//     });

//     return NextResponse.json({
//       status: 201,
//       message: "Reviews fetched successfully.",
//       totalRecords,
//       totalPages,
//       currentPage: page,
//       data: reviews,
//       totalReview: overallRating?.totalReviews || 0,
//       rating: overallRating?.rating || 0,
//     });
//   } catch (error) {
//     console.error("Error fetching reviews:", error);
//     return NextResponse.json({
//       status: 500,
//       message: "Internal Server Error: " + error.message,
//     });
//   }
// }
