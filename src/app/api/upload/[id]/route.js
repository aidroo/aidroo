import db from "@/config/model";
import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json(); // Await the JSON body
    const { username, avatarId, role } = body;

    // Validate the publicId
    if (!username || !avatarId) {
      return NextResponse.json({
        status: 400,
        message: "Invalid publicId  or username",
      }); // Changed to '400 Bad Request'
    }

    if (role === "business") {
      const user = await db.BusinessProfile.findOne({
        where: { username: username },
      });

      // You would perform your deletion logic here
      user.profileThumb = "";
      user.save();
    }
    if (role === "personal") {
      const user = await db.PersonalProfile.findOne({
        where: { username: username },
      });
      user.profileThumb = "";
      user.save();
    }
    await cloudinary.uploader.destroy(avatarId);
    return NextResponse.json({
      status: 200,
      message: "File deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ status: 500, message: "Server error" });
  }
}
