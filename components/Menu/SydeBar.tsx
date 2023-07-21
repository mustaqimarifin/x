'use client';
import Link from 'next/link';
import {
  ArrowsChevronLeftDouble,
  GenericBurgerRegular,
} from '@heathmont/moon-icons-tw';

import { usePathname, useSelectedLayoutSegments } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PostDatabaseItem, ProjectDatabaseItem } from 'app/data';
import { cx, textDecorationsToString } from 'lib/utils';
import { PageViews } from 'components/PageViews';

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
        'group block rounded px-2 py-2 text-sm font-medium text-neutral-900 max-lg:text-xs',
        isSelected ? 'is-selected bg-accent-100' : 'hover:bg-neutral-50'
      )}>
      {children}
    </Link>
  );
}

function TopMenu() {
  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      <SidebarLink href="/">home</SidebarLink>
      <SidebarLink href="/posts">posts</SidebarLink>
      <SidebarLink href="/projects">projects</SidebarLink>
      <SidebarLink href="/scribbles">scribbles</SidebarLink>
    </div>
  );
}

function PostsList({ posts }: { posts: PostDatabaseItem[] }) {
  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      {posts.map((post) => (
        <SidebarLink href={`/posts/${post.slug}`} key={post.id}>
          <div>{textDecorationsToString(post.title)}</div>
          {post.date !== undefined ? (
            <div className="text-xs font-normal text-neutral-600 text-opacity-50">
              {post.date} {<PageViews slug={post.slug} trackView={false} />}
            </div>
          ) : null}
        </SidebarLink>
      ))}
    </div>
  );
}

function ProjectsList({ projects }: { projects: ProjectDatabaseItem[] }) {
  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      {projects.map((project) => (
        <SidebarLink href={`/projects/${project.pageId}`} key={project.id}>
          <div>{textDecorationsToString(project.title)}</div>
          {project.summary !== undefined ? (
            <div className="text-xs font-normal text-neutral-600 text-opacity-50">
              {project.summary}{' '}
              {<PageViews slug={project.pageId} trackView={false} />}
            </div>
          ) : null}
        </SidebarLink>
      ))}
    </div>
  );
}

export function Sidebar({
  posts,
  projects,
}: {
  posts: PostDatabaseItem[];
  projects: ProjectDatabaseItem[];
}) {
  const pathname = usePathname();
  const segments = useSelectedLayoutSegments();
  const [showCollapsed, setShowCollapsed] = useState(false);

  useEffect(() => {
    setShowCollapsed(false);
    setForceShowTopMenu(false);
  }, [pathname]);
  if (
    segments.length === 1 &&
    ['posts', 'projects'].includes(segments[0]) &&
    !showCollapsed
  ) {
    setShowCollapsed(true);
  }

  const [forceShowTopMenu, setForceShowTopMenu] = useState(false);
  if (!['posts', 'projects'].includes(segments[0]) && forceShowTopMenu) {
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
    case 'posts':
      currentMarker = (
        <Link href="/posts" className="font-medium">
          posts
        </Link>
      );
      break;
    case 'projects':
      currentMarker = (
        <Link href="/projects" className="font-medium">
          projects
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
        className="absolute left-5 top-5 z-10 p-1 text-neutral-400 transition hover:text-neutral-600 md:hidden">
        <GenericBurgerRegular />
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
          'fixed bottom-0 left-0 top-0 z-10 flex w-80 flex-shrink-0 transform flex-col border-r border-neutral-100 bg-white transition max-lg:w-64',
          { transition: !isInitialLoad },
          !showCollapsed ? 'max-md:-translate-x-full max-md:opacity-50' : ''
        )}>
        <div className="flex items-center gap-3 border-b border-neutral-100 py-5 pl-4 pr-2 text-xs">
          <Link
            href="/"
            onClick={(e) => {
              if (segments.length >= 2 && !forceShowTopMenu) {
                setForceShowTopMenu(true);
                e.preventDefault();
              }
            }}
            className="text-neutral-400 transition hover:text-neutral-600">
            mustaqim arifin
          </Link>
          {currentMarker}
          <div className="grow" />
          {segments.length === 1 &&
          ['posts', 'projects'].includes(segments[0]) ? null : (
            <button
              onClick={() => {
                setShowCollapsed(false);
              }}
              className="text-neutral-400 transition hover:text-neutral-600 md:hidden">
              <ArrowsChevronLeftDouble />
            </button>
          )}
        </div>
        <div className="grow overflow-auto">
          {segments[0] === 'posts' && !forceShowTopMenu ? (
            <PostsList posts={posts} />
          ) : segments[0] === 'projects' && !forceShowTopMenu ? (
            <ProjectsList projects={projects} />
          ) : (
            <TopMenu />
          )}
        </div>
      </div>
    </>
  );
}
