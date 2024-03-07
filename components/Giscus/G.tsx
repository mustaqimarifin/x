"use client";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useEffect, useRef } from "react";

const themeMapping = {
  light: "noborder_light",
  dark: "noborder_gray",
};

function Giscus () {
  const { resolvedTheme } = useTheme();
  const theme = useRef(resolvedTheme);

  useEffect(() => {
    const hasLoaded = theme.current && theme.current !== resolvedTheme;
    theme.current = resolvedTheme;
    if (!resolvedTheme || hasLoaded) return;

    const script = document.createElement("script");
    const attributes = {
      src: "https://giscus.app/client.js",
      "data-repo": "mustaqimarifin/x",
      "data-repo-id": "R_kgDOJXfxTg",
      "data-category-id": "DIC_kwDOJXfxTs4CdxxC",
      "data-mapping": "pathname",
      "data-theme": themeMapping[resolvedTheme as keyof typeof themeMapping],
      crossorigin: "anonymous",
      "data-reactions-enabled": "1",
      "data-input-position": "top",
      "data-emit-metadata": "0",
      "data-lang": "en",
      "data-loading": "lazy",
      async: "async",
    };

    Object.entries(attributes).forEach(([name, value]) =>
      script.setAttribute(name, value),
    );
    document.body.appendChild(script);

    return () => {
      const existingScript = document.body.querySelector("#giscus-script");
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, [resolvedTheme]);

  useEffect(() => {
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame",
    );
    iframe?.contentWindow?.postMessage(
      {
        giscus: {
          setConfig: {
            theme: themeMapping[resolvedTheme as keyof typeof themeMapping],
          },
        },
      },
      "https://giscus.app",
    );
  }, [resolvedTheme]);

  return (
    <>
      <Head>
        { Object.values(themeMapping).map((theme) => (
          <link
            key={ theme }
            rel="prefetch"
            href={ `https://giscus.app/themes/${theme}.css` }
            as="style"
            type="text/css"
            crossOrigin="anonymous"
          />
        )) }
      </Head>
      <div className="giscus" />
    </>
  );
}

export default function Geezcuz () {
  return (
    <div
      className="select-none pb-6 pt-6 text-center text-gray-700 dark:text-gray-300"
      id="comment"
    >
      <Giscus />
    </div>
  )
}
