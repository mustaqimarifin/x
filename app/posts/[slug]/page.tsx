import { notFound } from "next/navigation";

import { getPost, type Post, getPostSlugs } from "lib/sanity/client";
import Cerealize from "components/mdxrsc";

import dynamic from "next/dynamic";
import { Suspense } from "react";

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
  const allPostSlugs = await getPostSlugs();

  return allPostSlugs.map((post) => ({
    slug: post.slug,
  }));
}

const Geezcuz = dynamic(() => import("components/Giscus/G"), {
  ssr: false,
});

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post: Post = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <div className="px-6 lg:pl-24">
      <div className="w-full max-w-3xl pt-16 pb-24 max-3xl:mx-auto">
        <div className="mb-8 text-3xl font-semibold text-neutral-900">
          {post.title}
        </div>
        <Cerealize source={post?.content} />
        <Suspense>
          <Geezcuz />
        </Suspense>
      </div>
    </div>
  );
}
