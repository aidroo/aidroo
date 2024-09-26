// import { getAllBusinessProfile } from "../queries/admin-dashboard-getProfiles";

// export default async function sitemap() {
//   try {
//     // Fetch all business profiles
//     const { businessProfiles } = await getAllBusinessProfile();

//     // Create an array of dynamic business URLs for the sitemap
//     const business = businessProfiles.map((profile) => ({
//       url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/${profile.username}`,
//     }));

//     // Return the array of URLs, including static ones
//     return [
//       {
//         url: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
//         lastModified: new Date().toISOString(),
//       },
//       ...business,
//     ];
//   } catch (error) {
//     console.error("Error generating sitemap:", error);
//     return [];
//   }
// }
