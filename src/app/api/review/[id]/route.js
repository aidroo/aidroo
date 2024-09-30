import db from "@/config/model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params; // Fetch the review ID from the URL
  const body = await request.json();

  const { verified, status, type, username } = body;

  try {
    const review = await db.Review.findByPk(id);
    if (review.like === 0) {
      review.like = [];
    }
    if (review.love === 0) {
      review.love = [];
    }

    if (!review) {
      return NextResponse.json(
        { status: 404, message: "Review not found" },
        { status: 404 }
      );
    }

    // Update verified and status only if provided
    if (verified !== undefined) {
      review.verified = verified; // Update verified only if it exists in the request
    }
    if (status !== undefined) {
      review.status = status; // Update status only if it exists in the request
    }

    // Handle likes and loves
    if (type && username) {
      if (type === "like") {
        if (!review.like.includes(username)) {
          review.like.push(username); // Add username if not already in the array
        } else {
          // Remove username if already exists
          review.like = review.like.filter((user) => user !== username);
        }
      } else if (type === "love") {
        if (!review.love.includes(username)) {
          review.love.push(username); // Add username if not already in the array
        } else {
          // Remove username if already exists
          review.love = review.love.filter((user) => user !== username);
        }
      }
    }

    await review.save(); // Save the updated review
    return NextResponse.json({
      status: 200,
      message: "Review updated successfully",
      review, // Optional: include the updated review in the response
    });
  } catch (error) {
    console.error(error); // Log error for debugging
    return NextResponse.json({
      status: 500,
      message: "An error occurred while updating the review.",
    });
  }
}

export async function DELETE(request, { params }) {
  const { id } = params; // Get review ID from URL params

  try {
    // Find the review by its primary key (id)
    const review = await db.Review.findByPk(id);

    // If review not found, return 404
    if (!review) {
      return NextResponse.json(
        { status: 404, message: "Review not found" },
        { status: 404 }
      );
    }

    // Delete the review
    await review.destroy();

    return NextResponse.json({
      status: 200,
      message: "Review deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while deleting the review.",
    });
  }
}
