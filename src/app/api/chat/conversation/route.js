import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function POST(req) {
 

  try {

    const body = await req.json();
    const { senderUser, receiverUser } = body;
    
    if (!senderUser || !receiverUser) {
      return NextResponse.json({
        status: 400,
        message: "senderUser and receiverUser are required.",
      });
    }

    const ieExit = await db.Conversation.findOne({
      where: {
        [Op.or]: [{ senderUser ,   receiverUser }],
      },
    });
if (ieExit){
  return NextResponse.json({
    status: 400,
    message: "Conversation already exists.",
  });
 
}
 
   const conversation = await db.Conversation.create({
     senderUser,
     receiverUser,
   })

    
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

 

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const senderUser = searchParams.get("senderUser"); // Assuming this is now the ID of the sender
  

  if (!senderUser  ) {
    return NextResponse.json(
      { message: "senderUser and receiverUser are required." },
      { status: 400 }
    );
  }

  try {
    const conversations = await db.Conversation.findAll({
      where: {
        [Op.or]: [{ senderUser }],
      },
      attributes: ["id", "receiverUser", "senderUser"],
      include: [
        {
          model: db.User,
          as: "sender", // Use alias for sender user
          attributes: ["username", "email"],
          // include: [
          //   {
          //     model: db.PersonalProfile,
          //     as: "personalProfile",
          //     attributes: ["firstName", "lastName", "profileThumb"],
          //     required: false,
          //   },
          //   {
          //     model: db.BusinessProfile,
          //     attributes: ["businessName", "profileThumb"],
          //     as: "businessProfile",
          //     required: false,
          //   },
          // ],
        },
        {
          model: db.User,
          as: "receiver", // Use alias for receiver user
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
          as: "messages", // Ensure this is correctly set
          attributes: ["content", "readStatus", "createdAt"],
          limit: 1,
          order: [["createdAt", "DESC"]],
          where: { readStatus: false },
        },
      ],
    });

    return NextResponse.json({
      status: 200,
      data: conversations,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching conversations", error: error.message },
      { status: 500 }
    );
  }
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
