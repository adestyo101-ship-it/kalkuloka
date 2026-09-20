/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [],
  },
  // Next.js 15: suppress hydration warnings from browser extensions
  reactStrictMode: true,
};

module.exports = nextConfig;
