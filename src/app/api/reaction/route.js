import db from "@/config/model";
import { NextResponse } from "next/server";

// POST handler for toggling a reaction (create or delete if it exists)
export async function POST(req) {
  try {
    // Get the request body data
    const { reviewId, reactionType, profileId, createdBy } = await req.json();

    // Check if the necessary fields are provided
    if (!reviewId || !reactionType || !profileId || !createdBy) {
      return NextResponse.json(
        {
          message:
            "All fields (reviewId, reactionType, profileId, createdBy) are required",
        },
        { status: 400 }
      );
    }

    // Check if the reaction already exists (i.e., the user has reacted to the review)
    const existingReaction = await db.Reaction.findOne({
      where: {
        reviewId,
        profileId,
        createdBy,
        type: reactionType,
      },
    });

    // If a reaction already exists, delete it (i.e., toggle off the reaction)
    if (existingReaction) {
      await existingReaction.destroy();
      return NextResponse.json(
        { message: "Reaction removed successfully" },
        { status: 200 }
      );
    }

    // If the reaction does not exist, create a new one
    const newReaction = await db.Reaction.create({
      reviewId,
      type: reactionType,
      profileId,
      createdBy, // Ensure createdBy is added to the reaction creation
    });

    // Return a success response
    return NextResponse.json(
      { message: "Reaction added successfully", newReaction },
      { status: 201 }
    );
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error creating/deleting reaction:", error);

    // Return an error response
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}
