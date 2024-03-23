const { withContentlayer } = require("next-contentlayer");
const path = require("node:path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	//reactStrictMode: false,
	sassOptions: {
		includedPaths: [path.join(__dirname, "styles")],
	},
	images: {
		formats: ["image/avif", "image/webp"],
		remotePatterns: [
			{ protocol: "https", hostname: "*.twimg.com", pathname: "/**" },
			{ protocol: "https", hostname: "unavatar.io", pathname: "/**" },
			{ protocol: "https", hostname: "cdn.sanity.io", pathname: "/**" },
			{ protocol: "https", hostname: "i.scdn.co", pathname: "/**" },
			{
				protocol: "https",
				hostname: "ik.imagekit.io",
				pathname: "/mstqmarfn/**",
			},
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "avatars.githubusercontent.com",
				pathname: "/**",
			},
		],
		dangerouslyAllowSVG: true,
	},
};

// @ts-ignore
module.exports = withContentlayer(nextConfig);
