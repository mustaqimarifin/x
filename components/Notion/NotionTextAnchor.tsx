"use client";
import React from "react";
import { openPane } from "./AppState";
//import Link from "next/link"

export function NotionTextAnchor({
  blockId,
  paneContent,
  children,
}: {
  blockId: string;
  paneContent: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <a
      href={blockId}
      onClick={(e) => {
        openPane(blockId, paneContent);
        e.preventDefault();
      }}
      className="underline decoration-neutral-600 decoration-dashed decoration-1 underline-offset-2 hover:decoration-neutral-700"
    >
      {children}
    </a>
  );
}
