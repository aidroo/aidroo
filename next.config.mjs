/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude Sequelize and database drivers from client-side bundle
      config.externals.push(
        "sequelize",
        "mysql2" // If you're using MySQL
      );
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        hostname: "swiperjs.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "cdn.builder.io",
      },
      {
        hostname: "aidroo.com",
      },
      {
        hostname: "www.aidroo.com",
      },
      {
        hostname: "admin.aidroo.com",
        
      },
      {
        hostname: "localhost",

      },
    ],
  },
};

export default nextConfig;
