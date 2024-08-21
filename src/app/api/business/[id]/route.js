import db from "@/config/model";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { username } = params;

  try {
    const user = await db.BusinessProfile.findOne({
      where: { username: username },
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",
          required: true,
        },
      ],
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    return NextResponse.json({ data: user, status: 201 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ status: 500, message: "An error occurred" });
  }
}

// export async function PUT(req) {
//   await connectToDatabase();

//   try {
//     // Parse the request body
//     const body = await req.json();
//     const { profileId, rating, totalReviews } = body;
//     console.log(profileId, rating, totalReviews);
//     // Check if required fields are present
//     if (!profileId || !rating || !totalReviews) {
//       return NextResponse.json(
//         { message: "ProfileId, rating, and totalReviews are required." },
//         { status: 400 }
//       );
//     }

//     // Find the business profile by username (profileId)
//     const businessProfile = await db.BusinessProfile.findOne({
//       where: { username: profileId },
//     });

//     // Check if business profile exists
//     if (!businessProfile) {
//       return NextResponse.json(
//         { message: "Business profile not found." },
//         { status: 404 }
//       );
//     }

//     // Update the business profile with new rating and total reviews
//     businessProfile.rating = rating;
//     businessProfile.totalReviews = totalReviews;

//     // Save the updated profile to the database
//     await businessProfile.save();

//     return NextResponse.json(
//       { message: "Business profile updated successfully." },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating business profile:", error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
