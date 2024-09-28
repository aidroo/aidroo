// Assuming the models are imported from a file

import db from "@/config/model";
import { Op } from "sequelize";
async function fetchAllJobsWithUserDetails(
  searchQuery,
  category,
  subcategory,
  country,
  all = false,
  filter,
  page = 1,
  limit = 10
) {
  page = parseInt(page);
  limit = parseInt(limit);

  // Default offset calculation
  const offset = (page - 1) * limit;

  const whereConditions = {
    ...(!all && { status: "approved" }),
    ...(searchQuery && { title: { [Op.like]: `%${searchQuery}%` } }),
    ...(filter === "top" && { applications: { [Op.gt]: 0 } }),
    ...(country && { country: { [Op.like]: `%${country}%` } }),
    ...(category && { category_id: category }),
    ...(subcategory && { subcategory_id: subcategory }),
    // Assuming you have an 'open' field
  };
  // let order = [["createdAt", "DESC"]]; // Default to latest
  let order;
  if (filter === "top") {
    // If 'top', order by the number of applications (highest first)
    order = [["applications", "DESC"]];
  } else if (filter === "latest") {
    // If 'latest', order by the latest jobs based on the creation date
    order = [["createdAt", "DESC"]];
  } else {
    // Default order if no filter is applied (e.g., 'latest' as fallback)
    order = [["createdAt", "DESC"]];
  }
  try {
    const { rows: jobs, count: totalRecords } =
      await db.JobPost.findAndCountAll({
        where: whereConditions,
        // include: [
        //   {
        //     model: db.User, // Include the User who created the job
        //     as: "user", // Use the alias defined in associations
        //     attributes: ["username", "email", "role"], // Select the fields you want from the User model
        //     include: [
        //       {
        //         model: db.PersonalProfile, // Include PersonalProfile
        //         as: "personalProfile", // Alias defined in the association
        //         // Adjust based on your PersonalProfile model fields
        //       },
        //       {
        //         model: db.BusinessProfile, // Include BusinessProfile
        //         as: "businessProfile", // Alias defined in the association
        //         // Adjust based on your BusinessProfile model fields
        //       },
        //     ],
        //   },
        // ],
        order: order,
        offset: offset,
        limit: limit,
      });
    const plainJobs = jobs.map((job) => job.toJSON());

    const totalPages = Math.ceil(totalRecords / limit);

    return { plainJobs, totalRecords, totalPages, currentPage: page };
  } catch (error) {
    console.error("Error fetching jobs with user and profile details:", error);
    throw error;
  }
}

export default fetchAllJobsWithUserDetails;
