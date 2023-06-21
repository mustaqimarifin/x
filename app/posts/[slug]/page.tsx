/* eslint-disable no-unsafe-optional-chaining */
import { notFound } from "next/navigation";
import { Balancer } from "react-wrap-balancer";
import { PostDatabaseItem, getDatabasePage, getPostDatabase } from "app/data";
import { NotionBlock } from "components/Notion/NotionBlock";

import { PageViews } from "components/PageViews";

import "app/style/notion2.css";

import { textDecorationsToString } from "lib/utils";
import { Suspense } from "react";
import { LoadingSpinner } from "components/UI/spinner";
import { Metadata } from "next/types";
import { CurrentENV } from "lib/env";

interface PostPageProps {
  params: {
    slug: string[];
  };
}

async function getPostParams(params: { slug: any }) {
  const slug = params?.slug;
  const posts = await getPostDatabase();
  const post = posts?.find((post) => post.slug[0][0] === slug);

  if (!post) {
    null;
  }

  return post;
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostParams(params);
  const postTitle = post.title[0][0];
  const postSlug = post.slug[0][0];
  //console.log(postSlug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL(`${CurrentENV}/api/og`);
  ogUrl.searchParams.set("title", postTitle);

  return {
    title: postTitle,
    description: post.summary,
    openGraph: {
      title: postTitle,
      description: post.summary,
      type: "article",
      url: `${CurrentENV}/posts/${postSlug}`,

      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 626,
          alt: postTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: postTitle,
      description: post.summary,
      images: [ogUrl.toString()],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPostDatabase();

  return posts?.map((post) => ({
    id: post.id,
    slug: post.slug[0][0],
  }));
}

export const revalidate = 60;

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getPostDatabase();
  const postId = posts.find((p) => p.slug[0][0] === params.slug)?.id;
  if (postId === undefined) {
    notFound();
  }

  const { item: post, recordMap } = await getDatabasePage<PostDatabaseItem>(
    postId
  );

  return (
    <section>
      <h1 className="max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>{textDecorationsToString(post.title)}</Balancer>
      </h1>
      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center ">
        <div className=" rounded-md bg-neutral-100 px-2 py-1 text-sm font-semibold tracking-tighter dark:bg-neutral-800">
          {post.date}
        </div>
        <div className="mx-2 h-[0.2em] bg-neutral-50 dark:bg-neutral-800" />
        <PageViews slug={post.slug} trackView />
        {/*         { post.tags && (
          <div className="py-4 xl:py-8">

            <div className="flex flex-wrap">
              { post.tags.map((tag) => (
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
          <NotionBlock recordMap={recordMap} blockId={postId} />
        </div>
      </Suspense>

      {/*  <div suppressHydrationWarning className=" max-w-2xl">
        <NotionBlock2
          recordMap={recordMap}
          rootPageId={postId}
          rootDomain={ rootDomain }
          previewImagesEnabled={ previewImagesEnabled }
        />
      </div>  */}
    </section>
  );
}
