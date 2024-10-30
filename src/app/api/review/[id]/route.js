import db from "@/config/model";
import { NextResponse } from "next/server";
export async function PUT(request, { params }) {
  const { id } = params; // Fetch the review ID from the URL
  const body = await request.json();
  const { verified, status, type, username } = body;

  try {
    const review = await db.Review.findByPk(id);

    // Check if review exists
    if (!review) {
      return NextResponse.json(
        { status: 404, message: "Review not found" },
        { status: 404 }
      );
    }

    // Initialize likes and loves if they are null
    review.likes = review.likes || [];
    review.loves = review.loves || [];

    // Update verified and status only if provided
    if (verified !== undefined) {
      review.verified = verified;
    }
    if (status !== undefined) {
      review.status = status;
    }

    // Handle likes and loves
    if (type && username) {
      if (type === "like") {
        // Add username to likes array if not already present, otherwise remove it
        if (!review.likes.includes(username)) {
          review.likes.push(username); // Add username to the array
        } else {
          // Remove username if already exists
          review.likes = review.likes.filter((user) => user !== username);
        }
      } else if (type === "love") {
        // Add username to loves array if not already present, otherwise remove it
        if (!review.loves.includes(username)) {
          review.loves.push(username); // Add username to the array
        } else {
          // Remove username if already exists
          review.loves = review.loves.filter((user) => user !== username);
        }
      }
    }

    // Log the changes before saving
     

    await review.save(); // Save the updated review

   

    return NextResponse.json({
      status: 200,
      message: "Review updated successfully",
      review,
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
