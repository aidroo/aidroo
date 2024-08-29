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
