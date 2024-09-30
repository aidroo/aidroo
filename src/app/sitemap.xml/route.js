import { fetchProfiles } from "@/queries/admin-dashboard-getProfiles";
import { escapeXml } from "@/utils/escapedUsername";
import { NextResponse } from "next/server";

// Helper function to escape special characters for XML

export async function GET() {
  // Fetch all approved profiles
  const { businessProfiles } = await fetchProfiles({
    limit: 1000, // You can adjust the limit as per your needs
    all: true, // Assuming this fetches all profiles, including unapproved ones
  });

  // Create the sitemap URL entries
  const sitemapEntries = businessProfiles.map((profile) => {
    // Ensure the username and other dynamic content is escaped
    const escapedUsername = escapeXml(profile.username);

    return `
      <url>
        <loc>https://aidroo.com/business/${escapedUsername}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    `;
  });

  // XML sitemap structure
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapEntries.join("")}
    </urlset>
  `;

  // Return the sitemap response
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
