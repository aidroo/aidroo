export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin*",
    },
    sitemap: "https://aidroo.com/sitemap.xml",
  };
}
