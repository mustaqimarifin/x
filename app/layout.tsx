import "./global.css";
import "react-notion-x/src/styles.css";
import "./notion.css";
import "react-custom-soundcloud/dist/style.css";
//import "./prism.css";

import type { Metadata } from "next";
import localFont from "next/font/local";
import Sidebar from "../components/sidebar";
import { Analytics } from "@vercel/analytics/react";
import { cx } from "lib/utils";
import { PageTransition } from "components/PageTransition";
import { AuthProvider } from "components/supabase-provider";
import supabase from "lib/supabase";

const kaisei = localFont({
  src: "../public/fonts/kaisei-tokumin-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-kaisei",
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
    url: "https://x-three-steel.vercel.app",
    siteName: "Mustaqim Arifin",
    images: [
      {
        url: "https://x-three-steel.vercel.app/og.jpg",
        width: 1920,
        height: 1080,
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const accessToken = session?.access_token || null;
  return (
    <AuthProvider accessToken={accessToken}>
      <html
        lang="en"
        className={cx(
          "bg-white text-black dark:bg-[#111010] dark:text-white",
          kaisei.variable,
          sohne.variable
        )}
      >
        <body className="mx-4 mb-40 mt-8 flex max-w-4xl flex-col subpixel-antialiased md:mt-20 md:flex-row lg:mx-auto lg:mt-32">
          <Sidebar />
          <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 md:mt-0 md:px-0">
            <PageTransition> {children}</PageTransition>

            <Analytics />
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}
