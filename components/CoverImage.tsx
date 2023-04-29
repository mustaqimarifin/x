//@ts-nocheck
"use client";
import { cx } from "lib/utils";
import Image from "next/image";
import React from "react";
import { useState } from "react";

function ClientOnly({ children, ...delegated }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <div {...delegated}>{children}</div>;
}

export default function CoverImage({ src, blurDataUrl }) {
  const [isLoading, setLoading] = useState(true);

  return (
    <ClientOnly>
      <div
        suppressHydrationWarning
        className="mb-6  max-w-3xl content-center justify-center overflow-hidden md:rounded-lg   "
      >
        <Image
          src={src}
          alt={""}
          width={680}
          height={503}
          className={cx(
            " mx-auto flex aspect-[21/9] w-full items-center justify-center object-cover object-top duration-700 ease-in-out group-hover:opacity-75 lg:max-w-7xl",
            isLoading
              ? "scale-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoadingComplete={() => setLoading(false)}
          blurDataURL={blurDataUrl}
        />
        {/*       <figcaption className="text-center ">
        {caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {caption}
          </span>
        )}
      </figcaption> */}
      </div>
    </ClientOnly>
  );
}
