import "app/style/global.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { cx } from "lib/utils";
import { PageTransition } from "components/UI/PageTransition";
import { NAV } from "components/UI/sidebar";
import { PanesLayer } from "components/UI/PanesLayer";
import { Providers } from "components/Providers";

const kaisei = localFont({
  src: "../public/fonts/kaisei-tokumin-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-kaisei",
  display: "swap",
});

const sfmono = localFont({
  src: "../public/fonts/SFMono-300.woff2",
  weight: "300",
  variable: "--font-sfmono",
  display: "swap",
});

const sohne = localFont({
  src: [
    {
      path: "../public/fonts/Sohne-400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Sohne-500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Sohne-600.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-sohne",
  display: "swap",
});

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
        sohne.variable,
        sfmono.variable
      )}
    >
      <body className="mx-4 mb-40 mt-8 flex max-w-4xl flex-col subpixel-antialiased md:mt-20 md:flex-row lg:mx-auto lg:mt-32">
        <NAV />
        <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">
          <PageTransition>
            <Providers>{children}</Providers>
          </PageTransition>
          <Analytics />
        </main>
        <PanesLayer />
      </body>
    </html>
  );
}
