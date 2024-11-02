import Message from "@/config/model/message";
import { NextResponse } from "next/server";

export async function GET(request, response) {
  const id = response.params.id||'';
   if(!id){
    throw new Error("ID is required")
   }

   const message = await Message.findAll({
     where: { conversationId: id },
    
   });
   if(!message){
    return NextResponse.json({
      message: "no conversation message found"
    },{
      status: 404,

    })
   }
 
 
    return NextResponse.json(message, { status: 200 });
  
}

export async function DELETE(request, {params} ) {
    const { id } = params;
  if(!id){
    throw new Error("ID is required")
   }
   const message = await Message.findByPk(id);
   if(!message){
    return NextResponse.json({
      message: "message not found",
      },{
        status: 404,
      })
    }

    await message.destroy();
    return NextResponse.json({ message: "message deleted successfully" }, { status: 200 });

}
