import db from "@/config/model";

export async function checkUserExistsWithUsername(username) {
  try {
    if (!username) return false;
    const user = await db.User.findOne({
      where: { username },
      attributes: ["username"],
    });

    return user !== null; // Return true if user exists, otherwise false
  } catch (error) {
    console.error("Error checking username:", error);
  }
}
export async function fetchAllProfiles({ page = 1, limit = 10 }) {
  // Ensure page and limit are integers
  page = parseInt(page, 10);
  limit = parseInt(limit, 10);

  // Default offset calculation
  const offset = (page - 1) * limit;

  try {
    // Fetch business profiles
    const { rows: user, count: totalRecords } = await db.User.findAndCountAll({
      where: {
        role: ["admin", "becreator", "reviewer", "editor"], // Filtering by roles
      },
      offset: offset,
      limit: limit, // Pagination limit
    });

    // Fetch ratings and total reviews for each profile
    const plainProfiles = await Promise.all(
      user.map(async (profile) => profile.toJSON())
    );

    // Calculate total pages for pagination
    const totalPages = Math.ceil(totalRecords / limit);

    return {
      user: plainProfiles, // Return enriched profiles with review data
      totalRecords,
      totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.error("Error fetching profiles:", error);
    throw new Error("Database query failed");
  }
}
