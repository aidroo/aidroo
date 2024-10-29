import db from "@/config/model";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { content, senderUser, receiverUser, conversationId } =
    await req.json();
  // console.log(content, senderUser, receiverUser, conversationId);

  if ((!content, !senderUser, !receiverUser)) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }
  try {
    const message = await db.Message.create({
      content,
      senderUser,
      receiverUser,
      conversationId,
    });

    if (!message) {
      NextResponse.json({
        status: 201,
        message: "Message  Create  faield.",
      });
    }
    return NextResponse.json({
      message: "Message successfully created",
      status: 201,
    });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message" },
      { status: 500 }
    );
  }
}

// export async function POST(request, response) {
//   const obj = await request.json();

//   let activeChat = chats.find((item) => item.id === parseInt(obj.contact.id));

//   const newMessageData = {
//     message: obj.message,
//     time: new Date(),
//     senderId: 11,
//     replayMetadata: obj.replayMetadata,
//   };
//   if (!activeChat) {
//     activeChat = {
//       id: obj.contact.id,
//       userId: obj.contact.id,
//       unseenMsgs: 0,
//       chat: [newMessageData],
//     };
//     chats.push(activeChat);
//   } else {
//     activeChat.chat.push(newMessageData);
//   }

//   return NextResponse.json(
//     {
//       chat: activeChat,
//       contact: obj.contact,
//       newMessageData,
//       id: obj.contact.id,
//     },
//     { status: 201 }
//   );
// }
