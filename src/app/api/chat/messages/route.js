import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST(req) {
  const { content, senderUser, receiverUser } = await req.json();

  if (!content || !senderUser || !receiverUser) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Check if a conversation between sender and receiver exists
    let conversation = await db.Conversation.findOne({
      where: {
        senderUser,
        receiverUser,
      },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await db.Conversation.create({
        senderUser,
        receiverUser,
      });
    }

    // Create a new message associated with the conversation
    const message = await db.Message.create({
      content,
      senderUser,
      receiverUser,
      conversationId: conversation.id,
    });

    if (!message) {
      return NextResponse.json(
        { error: "Message creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Message successfully created",
        status: 201,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}


export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const senderUser = searchParams.get("senderUser");
  const receiverUser = searchParams.get("receiverUser");

  if (!senderUser || !receiverUser) {
    return NextResponse.json(
      { error: "Both senderUser and receiverUser are required" },
      { status: 400 }
    );
  }



  try {
    const messages = await db.Message.findAll({
      where: {
        [Op.or]: [
          { senderUser, receiverUser },
          { senderUser: receiverUser, receiverUser: senderUser },
        ],
      },
      order: [["createdAt", "ASC"]], // Optional: Orders messages by creation time
    });

    if (!messages || messages.length === 0) {
      return NextResponse.json(
        { message: "No conversation messages found" },
        { status: 404 }
      );
    }

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }

}
