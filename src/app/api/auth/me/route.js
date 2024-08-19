import connectToDatabase from "@/config/db/db";
import db from "@/config/model";
import Address from "@/config/model/address";
import BusinessProfile from "@/config/model/business-profile";
import PersonalProfile from "@/config/model/personal-profile";
import { verifyAccessToken } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function GET(req) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  try {
    // Verify access token
    const decoded = await verifyAccessToken(accessToken);

    await connectToDatabase();

    const user = await db.User.findOne({
      where: { username: decoded.username },
      attributes: ["username", "role"], // Limit fields fetched for the user
      include: [
        {
          model: BusinessProfile,
          as: "businessProfile",
          required: false,
          attributes: ["businessName", "profileThumb"], // Limit fields fetched for businessProfile
        },
        {
          model: PersonalProfile,
          as: "personalProfile",
          required: false,
          attributes: ["firstName", "lastName", "profileThumb"], // Limit fields fetched for personalProfile
        },
        {
          model: Address,
          as: "addresses",
          required: false,
          attributes: ["address", "city", "country"], // Limit fields fetched for addresses
        },
      ],
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "User not found" });
    }

    // Limit the user data being returned

    const firstName = user?.personalProfile?.firstName || null;
    const lastName = user?.personalProfile?.lastName || null;
    const businessName = user?.businessProfile?.businessName || null;
    const personalThumbnail = user?.personalProfile?.profileThumb || null;
    const businessThumbnail = user?.businessProfile?.profileThumb || null;
    const country = user?.addresses?.country || null;
    const city = user?.addresses?.city || null;
    const address = user?.addresses?.address || null;

    const userData = {
      username: user.username,
      role: user.role,
      profile: {
        businessName: businessName,
        fullName: firstName + " " + lastName,
        profileThumb: personalThumbnail || businessThumbnail,
      },
      address: {
        country,
        city,
        address,
      },
    };

    return NextResponse.json({ status: 201, user: userData });
  } catch (error) {
    return NextResponse.json({ status: 401, message: "Invalid access token" });
  }
}
