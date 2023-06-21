import "app/style/global.css";
//import { kaisei, robotoFlex, sfmono } from "app/style/fonts";

import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { cx } from "lib/utils";
//import { PageTransition } from "components/UI/PageTransition";
import { NAV } from "components/UI/sidebar";
import { PanesLayer } from "components/UI/PanesLayer";
import { Providers } from "components/Providers";
import { meta } from "data/meta";
import { CurrentENV } from "lib/env";

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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cx(
        "bg-white text-black dark:bg-[#111010] dark:text-white"
        /*      kaisei.variable,
        robotoFlex.variable,
        sfmono.variable */
      )}
    >
      <body className="mx-4 mb-40 mt-8 flex max-w-4xl flex-col subpixel-antialiased md:mt-20  md:flex-row lg:mx-auto lg:mt-32 ">
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
