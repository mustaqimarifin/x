import { Balancer } from "react-wrap-balancer";

import Image from "next/image";
//import "app/style/notion2.css";

import { notFound } from "next/navigation";
import {
  allLilSlugs,
  getLilBit,
  getLilSlugs,
  type LilBits,
} from "lib/sanity/client";
import Cerealize from "components/mdxrsc";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { increment } from "app/actions";
import ViewCounter from "components/counter";
import { rdx } from "lib/redis/connect";

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
export async function generateStaticParams() {
  //const allLilSlugs = await getLilSlugs();
  return allLilSlugs.map((p) => ({
    slug: p.slug,
  }));
}

const Giscus = dynamic(() => import("components/Giscus/load"), {
  ssr: false,
});
export default async function LilPage({
  params,
}: {
  params: { slug: string };
}) {
  const p: LilBits = await getLilBit(params.slug);
  if (!p) {
    notFound();
  }

  return (
    <div className="px-6 lg:pl-24">
      <div className="w-full max-w-3xl pt-16 pb-24 max-3xl:mx-auto">
        <Image
          src={p?.caption}
          width={80}
          height={80}
          alt={`${p?.title} icon`}
          className={"rounded-2xl"}
        />
        <div className="mb-8 text-3xl font-quad font-semibold dark:text-gray-50 text-neutral-900">
          {p.title}
        </div>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={p.slug} />
        </Suspense>
        <Cerealize source={p?.content} />
        <Suspense>
          <Giscus />
        </Suspense>
      </div>
    </div>
  );
}

async function Views({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;

  increment(slug);
  return <ViewCounter views={views} />;
}
