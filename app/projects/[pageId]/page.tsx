import { Balancer } from "react-wrap-balancer";
import {
  ProjectDatabaseItem,
  getDatabasePage,
  getProjectsDatabase,
} from "app/data";
import { NotionBlock } from "components/Notion/NotionBlock";

import { PageViews } from "components/PageViews";
import "app/style/notion2.css";
import { textDecorationsToString } from "lib/utils";
import { KittyColor } from "components/UI/icons";
import { Suspense } from "react";
import { LoadingSpinner } from "components/UI/spinner";
import { Metadata } from "next/types";

export const revalidate = 60;

interface ProjectPageProps {
  params: {
    pageID: string[];
  };
}

async function getPostFromParams(params: { pageID: any }) {
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
  const project = await getPostFromParams(params);
  const projectTitle = project.title[0][0];
  const projectID = project.pageId[0][0];
  //console.log(projectproject);

  if (!project) {
    return {};
  }

  const environment = process.env.NODE_ENV || "development";
  const isDev = environment === "development";
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
  const preview = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
  const domain = "eff1gy.xyz";

  const host = isDev
    ? `http://localhost:${process.env.PORT || 3000}`
    : isPreview
    ? `https://${preview}`
    : `https://${domain}`;

  const ogUrl = new URL(`${host}/api/og`);
  //console.log(ogUrl);
  ogUrl.searchParams.set("title", projectTitle);
  //console.log(projectTitle);

  return {
    title: projectTitle,
    description: project.summary,
    openGraph: {
      title: projectTitle,
      description: project.summary,
      type: "article",
      url: `${host}/${projectID}`,

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
    return <div>project not found</div>;
  }

  const { item: project, recordMap } =
    await getDatabasePage<ProjectDatabaseItem>(projectId);

  return (
    <section>
      <h1 className="max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>{textDecorationsToString(project.title)}</Balancer>
      </h1>
      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center ">
        <div className=" rounded-md bg-neutral-100 px-2 py-1 text-sm font-semibold tracking-tighter dark:bg-neutral-800">
          {project.date}
        </div>
        <div className="mx-2 h-[0.2em] bg-neutral-50 dark:bg-neutral-800" />
        <PageViews slug={project.pageId} trackView />
        {/*         { project.tags && (
          <div className="py-4 xl:py-8">

            <div className="flex flex-wrap">
              { project.tags.map((tag) => (
                <Tag key={ tag } text={ tag } />
              )) }
            </div>
          </div>
        ) } */}
      </div>
      <Suspense fallback={<LoadingSpinner />}>
        <div
          suppressHydrationWarning
          className="prose max-w-2xl dark:prose-invert"
        >
          <NotionBlock recordMap={recordMap} blockId={projectId} />
        </div>
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
