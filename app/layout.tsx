import 'app/style/global.css';

import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { cx } from 'lib/utils';
import { NAV } from 'components/UI/sidebar';
import { PanesLayer } from 'components/UI/PanesLayer';
import { Providers } from 'components/Providers';
import { meta } from 'data/meta';
import { CurrentENV } from 'lib/env';
import { kK, rFlex, sfmono } from './style/fonts';
import { Sidebar } from 'components/Menu/SydeBar';
import { getPostDatabase, getProjectsDatabase } from './data';

export const metadata: Metadata = {
  title: {
    default: meta.name,
    template: `%s | ${meta.name}`,
  },
  description: meta.description,
  keywords: ['Music Production', 'Audio Engineering', 'Editorial', 'Blog'],
  authors: [
    {
      name: meta.name,
      url: meta.url,
    },
  ],
  creator: meta.name,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
    card: 'summary_large_image',
    title: meta.name,
    description: meta.description,
    images: [`${CurrentENV}/og.png`],
    creator: '@vmprmyth',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
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
  const posts = await getPostDatabase();
  const projects = await getProjectsDatabase();
  return (
    <html
      lang="en"
      className={cx(
        'bg-white text-black dark:bg-[#111010] dark:text-white',
        rFlex.variable,
        kK.variable,
        sfmono.variable
      )}>
      <body className="">
        <Sidebar posts={posts} projects={projects} />
        <main className="mx-4 pl-80 max-lg:pl-64 max-md:pl-0">
          <Providers>{children}</Providers>
          <Analytics />
          <PanesLayer />
        </main>
      </body>
    </html>
  );
}
