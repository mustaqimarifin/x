"use client";
import { openPane } from "components/UI/AppState";
import Link from "next/link";
import React from "react";

export const MDXTextAnchor = ({
  slug,
  paneContent,
  children,
}: {
  slug: string;
  paneContent: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <Link
      shallow
      prefetch={false}
      passHref
      href={`${`${slug}`}`}
      onClick={(e) => {
        openPane(slug, paneContent);
        e.preventDefault();
      }}
      className="underline decoration-neutral-600 decoration-dashed decoration-1 underline-offset-2 hover:decoration-neutral-700"
    >
      {children}
    </Link>
  );
};
