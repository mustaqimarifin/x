import type { NextSeoProps } from "next-seo";

export default {
  titleTemplate: "%s // Mustaqim Arifin",
  title: "Mustaqim Arifin",
  description: "Product Operations",
  openGraph: {
    locale: "en_US",
    type: "website",
    url: "https://eff1gy.xyz",
    site_name: "Mustaqim Arifin",
    images: [
      {
        url: "https://x-three-steel.vercel.app//logo.png",
      },
    ],
  },
  twitter: {
    handle: "@vmprmyth",
    cardType: "summary",
  },
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.svg",
    },
    {
      rel: "logo ",
      href: "https://x-three-steel.vercel.app//logo.png",
      sizes: "180x180",
    },
  ],
} as NextSeoProps;
