import db from "@/config/model";
import { NextResponse } from "next/server";
import { Op } from "sequelize";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const searchText = searchParams.get("searchText");

  try {
    const contacts = await db.User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${searchText}%` } },
         
        ],
      },
      attributes: ["username", "email"],
      include: [
        {
          model: db.PersonalProfile,
          as: "personalProfile",
          required: false,
          attributes: ["firstName", "lastName", "profileThumb"],
        },
        {
          model: db.BusinessProfile,
          as: "businessProfile",
          required: false,
          attributes: ["businessName", "profileThumb"],
        },
      ],
      limit: 20, // Limit the number of contacts returned
    });

    // Map over contacts to flatten and rename fields
    const formattedContacts = contacts.map((contact) => {
      const { username, email, personalProfile, businessProfile } =
        contact.toJSON();

      return {
        username,
        email,
        firstName: personalProfile?.firstName || null,
        lastName: personalProfile?.lastName || null,
        profileThumb: personalProfile?.profileThumb ||businessProfile?.profileThumb|| null,
        businessName: businessProfile?.businessName || null,
        
      };
    });

    return NextResponse.json({
      message: "Profile received successfully",
      contacts: formattedContacts,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
