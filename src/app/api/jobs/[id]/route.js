import db from "@/config/model";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params; // Fetch the username from the URL
  const body = await request.json();

  const { verified, status } = body;

  try {
    const job = await db.JobPost.findByPk(id);

    if (!job) {
      return NextResponse.json(
        { status: 404, message: "Jobs not found" },
        { status: 404 }
      );
    }

    job.verified = verified;
    job.status = status;
    await job.save();
    return NextResponse.json({
      status: 201,
      message: "job update successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while job.",
    });
  }
}
export async function DELETE(request, { params }) {
  const { id } = params; // Get review ID from URL params

  try {
    // Find the review by its primary key (id)
    const job = await db.JobPost.findByPk(id);

    // If review not found, return 404
    if (!job) {
      return NextResponse.json(
        { status: 404, message: "job not found" },
        { status: 404 }
      );
    }

    // Delete the review
    await job.destroy();

    return NextResponse.json({
      status: 200,
      message: "job deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "An error occurred while deleting the job.",
    });
  }
}
