"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import { KittyIcon } from "./icons";
import { cx } from "lib/utils";
import NowPlaying from "./NowPlaying";

const navItems = {
  "/": {
    name: "home",
  },
  "/about": {
    name: "about",
  },
  "/posts": {
    name: "posts",
  },
  "/projects": {
    name: "projects",
  },
  /*   "/notes": {
      name: "notes",
    }, */
  "/scribbles": {
    name: "scribbles",
  },
  /*   "/works": {
    name: "works",
  }, */
  "/hotline": {
    name: "guestbook",
  },
};

export const NAV = () => {
  let pathname = usePathname() || "/";
  if (pathname.includes("/projects/")) {
    pathname = "/projects";
  }

  return (
    <aside className="-mx-4  font-serif md:mx-0 md:w-[150px] md:flex-shrink-0 md:px-0">
      <div className="lg:sticky lg:top-20">
        <div className="mb-2 ml-2 flex flex-col items-start space-y-10 px-4 md:mb-8 md:ml-[12px] md:h-10 md:flex-row md:px-0 ">
          <KittyIcon />
        </div>
        <LayoutGroup>
          <nav
            className="fade relative flex scroll-pr-6 flex-col items-start overflow-x-auto px-4 pb-0 md:relative md:flex-row md:overflow-auto md:px-0"
            id="nav"
          >
            <div className="mb-2 mt-2 flex flex-row space-x-0 pr-10 md:mt-0 md:flex-col">
              {Object.entries(navItems).map(([path, { name }]) => {
                const isActive = path === pathname;
                return (
                  <Link
                    key={path}
                    href={path}
                    className={cx(
                      "flex align-middle transition-all hover:text-neutral-800 dark:hover:text-neutral-200",
                      {
                        "text-neutral-500": !isActive,
                        "font-bold": isActive,
                      }
                    )}
                  >
                    <span className="relative px-[10px] py-[5px]">
                      {name}
                      {path === pathname ? (
                        <motion.div
                          className="absolute inset-0 z-[-1] rounded-md bg-neutral-100 dark:bg-neutral-800"
                          layoutId="sidebar"
                          transition={{
                            type: "spring",
                            stiffness: 350,
                            damping: 30,
                          }}
                        />
                      ) : null}
                    </span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </LayoutGroup>
      </div>
    </aside>
  );
};
