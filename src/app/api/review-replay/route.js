// app/api/replyReview/route.js

import db from "@/config/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse the request body
    const { reviewId, username, content } = body;

    // Validate input
    if (!reviewId || !username || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if the review exists
    const review = await db.Review.findByPk(reviewId);
    if (!review) {
      return NextResponse.json({ error: "Review not found" }, { status: 404 });
    }

    // Create the reply review
    const replyReview = await db.ReplyReview.create({
      reviewId,
      username,
      content,
    });

    // Return success response
    return NextResponse.json({ success: true, replyReview }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
