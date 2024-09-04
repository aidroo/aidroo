import db from "@/config/model";
import { Op } from "sequelize";

export async function searchProfiles({ searchQuery = "aido" }) {
  // Define where conditions based on the search query
  const whereConditions = searchQuery
    ? { businessName: { [Op.like]: `%${searchQuery}%` } }
    : {};

  try {
    const businessProfiles = await db.User.findAll({
      attributes: ["email", "username"],
      include: [
        {
          model: db.BusinessProfile,
          as: "businessProfile",
          where: whereConditions,
          required: true,
        },
      ],
    });

    // If no profiles are found, return an empty array
    if (businessProfiles.length === 0) {
      return {
        businessProfiles: [],
      };
    }

    const plainProfile = businessProfiles.map((profile) => profile.toJSON());

    return {
      businessProfiles: plainProfile,
    };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Database query failed");
  }
}
