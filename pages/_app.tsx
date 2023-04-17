import "the-new-css-reset";
import "styles/app.css";

import { Analytics } from "@vercel/analytics/react";
import { Banner } from "components/Banner";
import { CommandPalette } from "components/CommandPalette";
import { ContentInfo } from "components/ContentInfo";
import { Provider as TooltipProvider } from "components/primitives/Tooltip";
import { SkipLink } from "components/SkipLink";
import { MotionConfig } from "framer-motion";
import type { AppProps } from "next/app";
import { DefaultSeo } from "next-seo";
import SEO from "next-seo.config";
import { ThemeProvider } from "next-themes";
import * as React from "react";

const composeProviders =
  (...providers: any[]) =>
  ({ children }: { children: React.ReactNode }) =>
    providers.reduceRight((acc, provider) => {
      const [Provider, props] = provider;
      return <Provider {...props}>{acc}</Provider>;
    }, children);

const Providers = composeProviders(
  [MotionConfig, { reducedMotion: "user" }],
  [
    ThemeProvider,
    {
      attribute: "class",
      defaultTheme: "system",
      disableTransitionOnChange: true,
    },
  ],
  [TooltipProvider]
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Providers>
        <SkipLink />
        <DefaultSeo {...SEO} />
        <div className="container">
          <Banner />
          <main id="main">
            <Component {...pageProps} />
          </main>
          <ContentInfo />
        </div>
        <CommandPalette />
      </Providers>
      <Analytics />
    </>
  );
}

export default MyApp;
