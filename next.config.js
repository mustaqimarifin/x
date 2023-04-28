const { get } = require("@vercel/edge-config");
//const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "mdx"],
  swcMinify: true,
  reactStrictMode: true,
  staticPageGenerationTimeout: 300,
  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],

    domains: [
      "i.scdn.co", // Spotify Album Art
      "pbs.twimg.com", // Twitter Profile Picture
      "cdn.sanity.io",
      "www.notion.so",
      "flowbite.s3.amazonaws.com",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
      "avatars.githubusercontent.com",
      "img1-tw.alphaxcdn.com",
    ],
  },

  experimental: {
    appDir: true,
    // serverComponentsExternalPackages: ["@prisma/client"],
  },
  // @ts-ignore
  redirects() {
    try {
      return get("redirects");
    } catch {
      return [];
    }
  },
};

module.exports = nextConfig;
