// Assuming the models are imported from a file

import db from "@/config/model";
import { Op } from "sequelize";
async function fetchAllJobsWithUserDetails(
  searchInput,
  category,
  subcategory,
  page = 1,
  limit = 10
) {
  page = parseInt(page);
  limit = parseInt(limit);

  // Default offset calculation
  const offset = (page - 1) * limit;

  const whereConditions = {
    ...(searchInput && { title: { [Op.like]: `%${searchInput}%` } }),
    ...(category && { category_id: category }),
    ...(subcategory && { subcategory_id: subcategory }),
    // Assuming you have an 'open' field
  };

  try {
    const { rows: jobs, count: totalRecords } =
      await db.JobPost.findAndCountAll({
        where: whereConditions,
        include: [
          {
            model: db.User, // Include the User who created the job
            as: "user", // Use the alias defined in associations
            attributes: ["username", "email", "role"], // Select the fields you want from the User model
            include: [
              {
                model: db.PersonalProfile, // Include PersonalProfile
                as: "personalProfile", // Alias defined in the association
                // Adjust based on your PersonalProfile model fields
              },
              {
                model: db.BusinessProfile, // Include BusinessProfile
                as: "businessProfile", // Alias defined in the association
                // Adjust based on your BusinessProfile model fields
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
        offset: offset,
        limit: limit,
      });
    const plainJobs = jobs.map((job) => job.toJSON());
    // console.log(plainJobs);
    const totalPages = Math.ceil(totalRecords / limit);

    return { plainJobs, totalRecords, totalPages, currentPage: page };
  } catch (error) {
    console.error("Error fetching jobs with user and profile details:", error);
    throw error;
  }
}

export default fetchAllJobsWithUserDetails;
