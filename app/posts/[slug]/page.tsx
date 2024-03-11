import { notFound } from "next/navigation";

import {
  getPost,
  type Post,
  getPostSlugs,
  allPostSlugs,
} from "lib/sanity/client";
import Cerealize from "components/mdxrsc";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { rdx } from "lib/redis/connect";
import ViewCounter from "components/counter";
import { increment } from "app/actions";

export const revalidate = 30;

/* async function getPostParams(params: { slug: any }) {
  const slug = params?.slug;
  //const posts = await getPostDatabase();
  //const post = posts?.find((post) => post.slug[0][0] === slug);
  const post = posts?.find((post) => post.slug === slug);

  if (!post) {
    null;
  }

  return post;
}
 */
/* export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostParams(params);
  const postTitle = post?.title//[0][0];
  const postSlug = post?.slug//[0][0];
  //console.log(postSlug);

  if (!post) {
    return {};
  }

  const ogUrl = new URL(`${CurrentENV}/api/og`);
  ogUrl.searchParams.set("title", postTitle);

  return {
    title: postTitle,
    description: post.excerpt,
    openGraph: {
      title: postTitle,
      description: post.excerpt,
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
      card: "excerpt_large_image",
      title: postTitle,
      description: post.excerpt,
      images: [ogUrl.toString()],
    }, 
  };
} */
//const baseUrl = "http://localhost:3000";

export async function generateStaticParams() {
  //const allPostSlugs = await getPostSlugs();

  return allPostSlugs.map((post) => ({
    slug: post.slug,
  }));
}

const Giscus = dynamic(() => import("components/Giscus/load"), {
  ssr: false,
});

export default async function PostPage({ params: { slug } }) {
  const post: Post = await getPost(slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="px-6 lg:pl-24">
      <div className="w-full max-w-3xl pt-16 pb-24 max-3xl:mx-auto">
        <div className="mb-8 text-3xl font-quad font-semibold dark:text-gray-50 text-neutral-900">
          {post.title}
        </div>
        <Suspense fallback={<p className="h-5" />}>
          <Views slug={post.slug} />
        </Suspense>
        <Cerealize source={post?.content} />
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
