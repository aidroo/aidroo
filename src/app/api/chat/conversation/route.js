import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST() {
 

  try {
 
   const conversation = await db.Conversation.create({})

    
    return NextResponse.json({
      status: 201,
      conversation,
      message: " conversation successfully.",
    });
  } catch (error) {
    console.error("Error processing review:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req, res, ) {

 const { searchParams } = new URL(req.url);
 const senderUser = parseInt(searchParams.get("senderUser")) ;
 const receiverUser = parseInt(searchParams.get("receiverUser")); 
 
  if (!senderUser || !receiverUser) {
    return res
      .status(400)
      .json({ message: "senderUser and reciverUser are required." });
  }
  const conversations = await db.Conversation.findAll({
    where: {
      [Op.or]: [{ senderUser }, { receiverUser }],
    },
  });
  

  NextResponse.json({
    status: 200,
    data: conversations,
  })

}
// 
// // import Conversation from "./models/Conversation"; // Adjust the import based on your file structure
// import User from "./models/User"; // Adjust the import based on your file structure

// async function fetchConversationsWithProfiles() {
//   try {
//     const conversations = await Conversation.findAll({
//       include: [
//         {
//           model: User,
//           as: 'sender', // Make sure this matches the alias in your associations
//           attributes: ['username', 'profilePicture', 'email'], // Adjust based on the fields you want
//         },
//         {
//           model: User,
//           as: 'receiver', // Make sure this matches the alias in your associations
//           attributes: ['username', 'profilePicture', 'email'], // Adjust based on the fields you want
//         },
//       ],
//     });

//     return conversations;
//   } catch (error) {
//     console.error("Error fetching conversations:", error);
//     throw error; // or handle the error as needed
//   }
// }
