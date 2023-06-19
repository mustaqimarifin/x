import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: " /api/og/*",
    },
    sitemap: "https://eff1gy.xyz/sitemap.xml",
    host: "https://eff1gy.xyz",
  };
}
