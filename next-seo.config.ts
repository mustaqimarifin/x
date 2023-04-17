import type { NextSeoProps } from "next-seo";

export default {
  titleTemplate: "%s // Mustaqim Arifin",
  title: "Mustaqim Arifin",
  description: "Product Operations",
  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://alexcarpenter.me",
    site_name: "Mustaqim Arifin",
    images: [
      {
        url: "https://alexcarpenter.me/apple-touch-icon.png",
      },
    ],
  },
  twitter: {
    handle: "@hybrid_alex",
    cardType: "summary",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.svg",
    },
    {
      rel: "apple-touch-icon",
      href: "https://alexcarpenter.me/apple-touch-icon.png",
      sizes: "180x180",
    },
  ],
} as NextSeoProps;
