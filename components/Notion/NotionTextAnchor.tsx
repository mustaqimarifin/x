"use client";
import { openPane } from "components/UI/AppState";
import Link from "next/link";
import React from "react";

export const NotionTextAnchor = ({
  blockId,
  paneContent,
  children,
}: {
  blockId: string;
  paneContent: React.ReactNode;
  children: React.ReactNode;
}) => {
  // const [isPending, startTransition] = useTransition()
  // const [isFetching, setIsFetching] = useState(false);
  return (
    <Link
      shallow
      prefetch={false}
      passHref
      href={blockId}
      onClick={(e) => {
        openPane(blockId, paneContent);
        e.preventDefault();
      }}
      className="underline decoration-neutral-600 decoration-dashed decoration-1 underline-offset-2 hover:decoration-neutral-700"
    >
      {children}
    </Link>
  );
};
