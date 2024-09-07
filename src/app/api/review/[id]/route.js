import db from "@/config/model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params; // Fetch the username from the URL
  const body = await request.json();

  const { verified, status } = body;

  try {
    const review = await db.Review.findByPk(id);

    if (!review) {
      return NextResponse.json(
        { status: 404, message: "review not found" },
        { status: 404 }
      );
    }

    review.verified = verified;
    review.status = status;
    await review.save();
    return NextResponse.json({
      status: 201,
      message: "review update successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while review.",
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
