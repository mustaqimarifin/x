const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  images: {
    dangerouslyAllowSVG: true,
    formats: ["image/avif", "image/webp"],
    domains: [
      "i.scdn.co", // Spotify Album Art
      "pbs.twimg.com", // Twitter Profile Picture
      "cdn.sanity.io",
      "abs.twimg.com",
      "www.notion.so",
      "flowbite.s3.amazonaws.com",
      "lh3.googleusercontent.com",
      "i.ytimg.com",
      "avatars.githubusercontent.com",
      "img1-tw.alphaxcdn.com",
    ],
  },
};

export default nextConfig;
