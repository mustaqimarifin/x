import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: " /api/og/*",
    },
    sitemap: "https://mstqmarfn.vercel.app/sitemap.xml",
    host: "https://mstqmarfn.vercel.app",
  };
}
