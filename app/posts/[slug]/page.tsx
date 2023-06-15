import { notFound } from "next/navigation";
import Balancer from "react-wrap-balancer";
import { PostDatabaseItem, getDatabasePage, getPostDatabase } from "app/data";
import { NotionBlock } from "components/Notion/NotionBlock";

import PageViews from "components/PageViews";

import "app/style/notion.css";
//import "app/style/override.css";

import { textDecorationsToString } from "lib/utils";

export async function generateStaticParams() {
  const posts = await getPostDatabase();

  return posts.map((post) => ({
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
      <div className="mb-8 mt-4 grid max-w-[650px] grid-cols-[auto_1fr_auto] items-center font-mono text-sm">
        <div className="rounded-md bg-neutral-100 px-2 py-1 tracking-tighter dark:bg-neutral-800">
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
      <div
        suppressHydrationWarning
        className=" prose max-w-2xl dark:prose-invert"
      >
        <NotionBlock recordMap={recordMap} blockId={postId} />
      </div>
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
