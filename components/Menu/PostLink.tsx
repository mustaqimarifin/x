"use client";
import type { PostDatabaseItem } from "app/data";
import { cx, textDecorationsToString } from "lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Decoration } from "notion-types";

export function PostsSidebarLink(post: Decoration[] & PostDatabaseItem) {
  const pathname = usePathname();
  const postPath = `/posts/${post}`;
  const isSelected = postPath === pathname;

  return (
    <Link
      href={postPath}
      className={cx(
        "block rounded px-2 py-2",
        isSelected ? "bg-sky-800 text-white" : "hover:bg-neutral-100"
      )}
    >
      <div className="text-sm font-medium max-lg:text-xs">
        {textDecorationsToString(post)}
      </div>
      {post.date !== undefined ? (
        <div
          className={cx(
            "text-xs text-opacity-50",
            isSelected ? "text-white" : "text-neutral-600"
          )}
        >
          {post.date} WHOS A MUNKEH?!@
        </div>
      ) : null}
    </Link>
  );
}
