import { Balancer } from "react-wrap-balancer";

import Image from "next/image";
//import "app/style/notion2.css";

import { notFound } from "next/navigation";
import { getLilBit, getLilSlugs, type LilBits } from "lib/sanity/client";
import Cerealize from "components/mdxrsc";
import dynamic from "next/dynamic";
import { Suspense } from "react";

//xport const revalidate = 20;

/* interface ProjectPageProps {
  params: {
    pageID: string[];
  };
}
 */
/* async function getProjectParams(params: { pageID: any }) {
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
 */
export async function generateStaticParams () {
  const allLilSlugs = await getLilSlugs();
  return allLilSlugs.map((p) => ({
    slug: p.slug,
  }));
}

const Geezcuz = dynamic(() => import("components/Giscus/G"), {
  ssr: false,
});
export default async function LilPage ({
  params
}: {
  params: { slug: string };
}) {
  const p: LilBits = await getLilBit(params.slug);
  if (!p) {
    notFound();
  }

  return (
    <section>
      <div className="flex items-center space-x-6">
        <Image
          src={ p?.caption }
          width={ 80 }
          height={ 80 }
          alt={ `${p?.title} icon` }
          className={ "rounded-2xl" }
        />
        <div>
          <h1 className="mb-5 font-serif text-3xl font-bold">
            <Balancer>{ p?.title }</Balancer>
          </h1>
          <span className="text-tertiary inline-block leading-snug">
            { p?.date }
          </span>
        </div>
      </div>

      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center text-sm">
        {/* <div className="rounded-md bg-neutral-100 px-2 py-1 tracking-tighter dark:bg-neutral-800">
          {p.date}
        </div> */}
        <div className="mx-2 h-[0.2em] bg-neutral-50 dark:bg-neutral-800" />
        {/*   <PageViews slug={project.pageId} trackView /> */ }
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

      <Cerealize source={ p?.content } />
      <Suspense><Geezcuz /></Suspense>

    </section>
  );
}
