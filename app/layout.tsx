import "app/style/global.css";

import type { Metadata } from "next";
//import { Analytics } from "@vercel/analytics/react";
import { cx } from "lib/utils";
//import { PanesLayer } from "components/UI/PanesLayer";
import { meta } from "data/meta";
import { CurrentENV } from "lib/env";
import { NewsReader, kK, rFlex, sfmono } from "./style/fonts";
import { Sidebar } from "components/Menu/SydeBar";
import { ThemeProviders } from "components/Theme";
import { PageTransition } from "components/UI/PageTransition";
import { getAllBits, getAllPosts } from "lib/sanity/client";
//import { posts } from "./posts/[slug]/page";

export const metadata: Metadata = {
  title: {
    default: meta.name,
    template: `%s | ${meta.name}`,
  },
  description: meta.description,
  keywords: ["Music Production", "Audio Engineering", "Editorial", "Blog"],
  authors: [
    {
      name: meta.name,
      url: meta.url,
    },
  ],
  creator: meta.name,
  /*   themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ], */
  openGraph: {
    type: "website",
    locale: "en_US",
    url: CurrentENV,
    title: meta.name,
    description: meta.description,
    siteName: meta.name,
    images: [
      {
        url: `${CurrentENV}/og.png`,
        width: 1200,
        height: 626,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.name,
    description: meta.description,
    images: [`${CurrentENV}/og.png`],
    creator: "@vmprmyth",
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
  icons: {
    icon: `${CurrentENV}/favicon.ico`,
    shortcut: `${CurrentENV}/icon.svg`,
    apple: `${CurrentENV}/apple-icon.png`,
  },
  manifest: `${CurrentENV}/manifest.json`,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 const allBits = await getAllBits();
 const allPosts = await getAllPosts();
  return (
    <html
      lang="en"
      className={cx(
        "bg-gray-50 text-black dark:bg-gray-950 dark:text-white",
        rFlex.variable,
        kK.variable,
        sfmono.variable,
        NewsReader.variable,
      )}
    >
      <body className="">
        <ThemeProviders>
          <Sidebar posts={allPosts} lilbits={allBits} />
          <main className="mx-4 pl-80 max-lg:pl-64 max-md:pl-0">
            <PageTransition>{children}</PageTransition>
          </main>
        </ThemeProviders>
      </body>
    </html>
  );
}
