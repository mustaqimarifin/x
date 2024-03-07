"use client";
import Link from "next/link";

import { usePathname, useSelectedLayoutSegments } from "next/navigation";
import { useEffect, useState } from "react";
import { cx, formatDate } from "lib/utils";

import ThemeSwitch from "components/Theme/Switch";
import { ArrowLeftIcon, BurgerIcon } from "components/UI/icons";

function SidebarLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isSelected = href === pathname;

  return (
    <Link
      href={href}
      className={cx(
        "group block rounded px-2 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-50 max-lg:text-xs",
        isSelected ? "is-selected bg-accent-100" : "hover:bg-neutral-50",
      )}
    >
      {children}
    </Link>
  );
}

function TopMenu() {
  return (
    <>
      <div className="flex flex-col gap-1 px-2 py-2">
        <SidebarLink href="/">home</SidebarLink>
        <SidebarLink href="/posts">posts</SidebarLink>
        <SidebarLink href="/lilbits">lilbits</SidebarLink>
        <SidebarLink href="/scribbles">scribbles</SidebarLink>
      </div>
      <ThemeSwitch />
    </>
  );
}

function PostsList({ posts }) {
  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      {posts.map((post) => (
        <SidebarLink href={`/posts/${post?.slug}`} key={post?.slug}>
          <div>{post?.title}</div>
          {post?.date !== undefined ? (
            <div className="text-xs font-normal text-neutral-600 text-opacity-50">
              {formatDate(post?.date)}
            </div>
          ) : null}
        </SidebarLink>
      ))}
    </div>
  );
}

function BitList({ lilbits }) {
  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      {lilbits.map((p) => (
        <SidebarLink href={`/lilbits/${p?.slug}`} key={p.slug}>
          <div>{p?.title}</div>
          {p?.overview !== undefined ? (
            <div className="text-xs font-normal text-neutral-600 text-opacity-50">
              {p?.overview}
            </div>
          ) : null}
        </SidebarLink>
      ))}
    </div>
  );
}

//type PickPost = typeof posts

export function Sidebar({ posts, lilbits }) {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const [showCollapsed, setShowCollapsed] = useState(false);

  useEffect(() => {
    setShowCollapsed(false);
    setForceShowTopMenu(false);
  }, [pathname]);
  if (
    segments.length === 1 &&
    ["posts", "lilbits"].includes(segments[0]) &&
    !showCollapsed
  ) {
    setShowCollapsed(true);
  }

  const [forceShowTopMenu, setForceShowTopMenu] = useState(false);
  if (!["posts", "lilbits"].includes(segments[0]) && forceShowTopMenu) {
    setForceShowTopMenu(false);
  }

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsInitialLoad(false);
    }, 100);
  }, []);

  let currentMarker;
  switch (segments[0]) {
    case "posts":
      currentMarker = (
        <Link href="/posts" className="font-medium">
          posts
        </Link>
      );
      break;
    case "lilbits":
      currentMarker = (
        <Link href="/lilbits" className="font-medium">
          lilbits
        </Link>
      );
      break;
  }

  return (
    <>
      <button
        onClick={() => {
          setShowCollapsed((v) => !v);
        }}
        className="absolute left-5 top-5 z-10 p-1 text-neutral-400 transition hover:text-neutral-600 md:hidden"
      >
        <BurgerIcon />
      </button>
      {showCollapsed ? (
        <div
          onClick={() => {
            setShowCollapsed(false);
          }}
          className="fixed bottom-0 left-0 right-0 top-0 z-10 md:hidden"
        />
      ) : null}
      <div
        className={cx(
          "fixed bottom-0 left-0 top-0 z-10 flex w-80 flex-shrink-0 transform flex-col border-r border-neutral-100 bg-white transition dark:bg-gray-950 max-lg:w-64",
          { transition: !isInitialLoad },
          !showCollapsed ? "max-md:-translate-x-full max-md:opacity-50" : "",
        )}
      >
        <div className="flex items-center gap-3 border-b border-neutral-100 py-5 pl-4 pr-2 text-xs">
          <Link
            href="/"
            onClick={(e) => {
              if (segments.length >= 2 && !forceShowTopMenu) {
                setForceShowTopMenu(true);
                e.preventDefault();
              }
            }}
            className="text-neutral-400 transition hover:text-neutral-600 dark:text-neutral-50"
          >
            mustaqim arifin
          </Link>
          {currentMarker}
          <div className="grow" />
          {segments.length === 1 &&
          ["posts", "lilbits"].includes(segments[0]) ? null : (
            <button
              onClick={() => {
                setShowCollapsed(false);
              }}
              className="text-neutral-400 transition hover:text-neutral-600 dark:text-neutral-50 md:hidden"
            >
              <ArrowLeftIcon />
            </button>
          )}
        </div>
        <div className="grow overflow-auto">
          {segments[0] === "posts" && !forceShowTopMenu ? (
            <PostsList posts={posts} />
          ) : segments[0] === "lilbits" && !forceShowTopMenu ? (
            <BitList lilbits={lilbits} />
          ) : (
            <TopMenu />
          )}
        </div>
      </div>
    </>
  );
}
