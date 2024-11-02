import db from "@/config/model";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const senderUser = searchParams.get("senderUser");

  if (!senderUser) {
    return NextResponse.json(
      { message: "senderUser is required." },
      { status: 400 }
    );
  }

  try {
    const conversations = await db.Conversation.findAll({
      where: { senderUser },
      attributes: ["id", "receiverUser", "senderUser"],
      include: [
        {
          model: db.User,
          as: "sender",
          attributes: ["username", "email"],
        },
        {
          model: db.User,
          as: "receiver",
          attributes: ["username", "email"],
          include: [
            {
              model: db.PersonalProfile,
              as: "personalProfile",
              attributes: ["firstName", "lastName", "profileThumb"],
              required: false,
            },
            {
              model: db.BusinessProfile,
              attributes: ["businessName", "profileThumb"],
              as: "businessProfile",
              required: false,
            },
          ],
        },
        {
          model: db.Message,
          as: "messages",
          attributes: ["content", "readStatus", "createdAt"],
          limit: 1,
          order: [["createdAt", "DESC"]], // Ensures the latest message is fetched
        },
      ],
    });

    const result = conversations.map((conversation) => {
      const lastMessage = conversation.messages[0];
      return {
        ...conversation.dataValues,
        lastMessageContent: lastMessage ? lastMessage.content : null,
        lastMessageTime: lastMessage ? lastMessage.createdAt : null,
      };
    });

    if (result.length === 0) {
      return NextResponse.json(
        { message: "No conversations found." },
        { status: 404 }
      );
    }

    // Sort the result array based on lastMessageTime in descending order
    const sortedResult = result.sort(
      (a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime)
    );

    return NextResponse.json({
      status: 200,
      data: sortedResult,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching conversations", error: error.message },
      { status: 500 }
    );
  }
}
