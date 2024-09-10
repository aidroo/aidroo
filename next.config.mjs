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
    ],
  },
};

export default nextConfig;
