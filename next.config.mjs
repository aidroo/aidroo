/** @type {import('next').NextConfig} */
const nextConfig = {
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
