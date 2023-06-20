import "app/style/global.css";
import { kaisei, inter, sfmono } from "app/style/fonts";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { cx } from "lib/utils";
//import { PageTransition } from "components/UI/PageTransition";
import { NAV } from "components/UI/sidebar";
import { PanesLayer } from "components/UI/PanesLayer";
import { Providers } from "components/Providers";

export const metadata: Metadata = {
  title: {
    default: "Mustaqim Arifin",
    template: "%s | Mustaqim Arifin",
  },
  description: "Developer, writer, and creator.",
  openGraph: {
    title: "Mustaqim Arifin",
    description: "Developer, writer, and creator.",
    url: "https://eff1gy.xyz",
    siteName: "Mustaqim Arifin",
    images: [
      {
        url: "https://eff1gy.xyz/og.png",
        width: 1200,
        height: 626,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Mustaqim Arifin",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

/* export const metadata2 = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
  ],
  authors: [
    {
      name: "shadcn",
      url: "https://shadcn.com",
    },
  ],
  creator: "shadcn",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}; */

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "bg-white text-black dark:bg-[#111010] dark:text-white",
        kaisei.variable,
        inter.variable,
        sfmono.variable
      )}
    >
      <body className="mx-4 mb-40 mt-8 flex max-w-4xl flex-col md:mt-20  md:flex-row lg:mx-auto lg:mt-32 ">
        <NAV />
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">
          <Providers>{children}</Providers>
          <Analytics />
        </main>
        <PanesLayer />
      </body>
    </html>
  );
}
