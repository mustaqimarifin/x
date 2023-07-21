import { Balancer } from "react-wrap-balancer";
import {
  ProjectDatabaseItem,
  getDatabasePage,
  getProjectsDatabase,
} from "app/data";
import NotionBlock from "components/Notion/NotionBlock";

import { PageViews } from "components/PageViews";
import "app/style/notion2.css";
import { textDecorationsToString } from "lib/utils";
import { Suspense } from "react";
import { Metadata } from "next/types";
import { CurrentENV } from "lib/env";
import { notFound } from "next/navigation";
import { LoadingDots } from "components/States";

export const revalidate = 14400;

interface ProjectPageProps {
  params: {
    pageID: string[];
  };
}

async function getProjectParams(params: { pageID: any }) {
  const pageID = params?.pageID;
  const projects = await getProjectsDatabase();
  const project = projects?.find((p) => p.pageId[0][0] === pageID);

  if (!project) {
    null;
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectParams(params);
  const projectTitle = project?.title[0][0];
  const projectID = project?.pageId;
  //console.log(projectproject);

  if (!project) {
    return {};
  }

  const ogUrl = new URL(`${CurrentENV}/api/og`);
  ogUrl.searchParams.set("title", projectTitle);

  return {
    title: projectTitle,
    description: project.summary,
    openGraph: {
      title: projectTitle,
      description: project.summary,
      type: "article",
      url: `${CurrentENV}/projects/${projectID}`,

      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 626,
          alt: projectTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: projectTitle,
      description: project.summary,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams() {
  const projects: ProjectDatabaseItem[] = await getProjectsDatabase();

  return projects.map((project) => ({
    id: project.id,
  }));
}

export default async function ProjectsPage({
  params,
}: {
  params: { pageId: string };
}) {
  const projects = await getProjectsDatabase();
  const projectId = projects.find((p) => p.pageId[0][0] === params.pageId)?.id;
  if (projectId === undefined) {
    notFound();
  }

  const { item: project, recordMap } =
    await getDatabasePage<ProjectDatabaseItem>(projectId);

  return (
    <section>
      <h1 className="mb-5 font-serif text-3xl font-bold">
        <Balancer>{textDecorationsToString(project.title)}</Balancer>
      </h1>
      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center text-sm">
        <div className="rounded-md bg-neutral-100 px-2 py-1 tracking-tighter dark:bg-neutral-800">
          {project.date}
        </div>
        <div className="mx-2 h-[0.2em] bg-neutral-50 dark:bg-neutral-800" />
        <PageViews slug={project.pageId} trackView />
      </div>
      {/*         { project.tags && (
          <div className="py-4 xl:py-8">

            <div className="flex flex-wrap">
              { project.tags.map((tag) => (
                <Tag key={ tag } text={ tag } />
              )) }
            </div>
          </div>
        ) } */}

      <Suspense fallback={<LoadingDots />}>
        <NotionBlock recordMap={recordMap} blockId={projectId} />
      </Suspense>
      {/*  <div suppressHydrationWarning className=" max-w-2xl">
        <NotionBlock2
          recordMap={recordMap}
          rootPageId={projectId}
          rootDomain={ rootDomain }
          previewImagesEnabled={ previewImagesEnabled }
        />
      </div>  */}
    </section>
  );
}
