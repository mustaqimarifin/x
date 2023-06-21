import "app/style/global.css";
import { kaisei, inter, sfmono } from "app/style/fonts";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { cx } from "lib/utils";
//import { PageTransition } from "components/UI/PageTransition";
import { NAV } from "components/UI/sidebar";
import { PanesLayer } from "components/UI/PanesLayer";
import { Providers } from "components/Providers";
import { meta } from "data/meta";

export const metadata: Metadata = {
  metadataBase: new URL(meta.url),
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: meta.url,
    title: meta.name,
    description: meta.description,
    siteName: meta.name,
    images: [
      {
        url: `${meta.url}/og.png`,
        width: 1200,
        height: 626,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: meta.name,
    description: meta.description,
    images: [`${meta.url}/og.png`],
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
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-icon.png",
  },
  manifest: `${meta.url}/site.webmanifest`,
};

export default function RootLayout({
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
