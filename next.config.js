const { withContentlayer } = require("next-contentlayer");
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,

  images: {
    formats: ["image/avif", "image/webp"],
    domains: [
      "i.scdn.co", // Spotify Album Art
      "pbs.twimg.com", // Twitter Profile Picture
      "cdn.sanity.io",
      "flowbite.com",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
      "avatars.githubusercontent.com",
      "img1-tw.alphaxcdn.com",
    ],
  },
  async redirects() {
    return [
      {
        source: "/posts/jon-gaffney-edc-winter-2021",
        destination:
          "https://gear.alexcarpenter.me/posts/jon-gaffney-edc-winter-2021",
        permanent: true,
      },
    ];
  },
};

module.exports = withContentlayer(withVanillaExtract(nextConfig));
