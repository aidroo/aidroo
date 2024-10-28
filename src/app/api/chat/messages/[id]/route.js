import Message from "@/config/model/message";
import { NextResponse } from "next/server";
import { chats } from "../../data";

export async function GET(request, response) {
  const id = response.params.id||1;
   if(!id){
    throw new Error("ID is required")
   }

   const message = await Message.findAll({
    conversationId: id
   })
   if(!message){
    return NextResponse.json({
      message: "no conversation message found"
    },{
      status: 404,

    })
   }
 
 
    return NextResponse.json(message, { status: 200 });
  
}

export async function DELETE(request,  ) {
  const { selectedChatId, index } = await request.json();

  const chatIndex = chats.findIndex(
    (chat) => chat.id === parseInt(selectedChatId)
  );

  if (chatIndex !== -1) {
    const chat = chats[chatIndex];
    if (index >= 0 && index < chat.chat.length) {
      // Remove the message from the chat based on the received index
      chat.chat.splice(index, 1);
      return NextResponse.json(
        { message: "Message deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid message index" },
        { status: 400 }
      );
    }
  } else {
    return NextResponse.json({ message: "Chat not found" }, { status: 404 });
  }
}
