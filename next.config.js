/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  typescript: { ignoreBuildErrors: false },
  eslint:     { ignoreDuringBuilds: false },
};
module.exports = nextConfig;
