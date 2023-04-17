import * as Grid from "components/Grid";
import { Heading } from "components/Heading";
import { Components } from "components/MdxComponents";
import { Prose } from "components/Prose";
import { Spacer } from "components/Spacer";
import { Text } from "components/Text";
import { allPosts, Post } from "contentlayer/generated";
import { formatDate } from "lib/utils";
import type { NextPage } from "next/types";
import { useMDXComponent } from "next-contentlayer/hooks";
import { NextSeo } from "next-seo";

export async function getStaticPaths() {
  return {
    paths: allPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const post = allPosts.find((post) => post.slug === params.slug);
  return {
    props: {
      post,
    },
  };
}

const PostPage: NextPage<{ post: Post }> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <>
      <NextSeo
        title={post.title}
        description={post.description}
        openGraph={{
          title: post.title,
          description: post.description,
          url: `https://x-three-steel.vercel.app/posts/${post.slug}`,
          images: [
            {
              url: `https://x-three-steel.vercel.app/api/og?title=${post.title}`,
            },
          ],
        }}
        twitter={{
          cardType: "summary_large_image",
        }}
      />

      <article>
        <Grid.Container>
          <Grid.Column
            colStart={{ xs: "1", md: "2" }}
            colEnd={{ xs: "-1", md: "4" }}
          >
            <Heading fontSize="xxl" as="h1">
              {post.title}
            </Heading>
            <Heading fontSize="xs">{formatDate(post.date)}</Heading>
          </Grid.Column>
        </Grid.Container>

        <Spacer height="xl" />

        <Grid.Container>
          <Grid.Column
            colStart={{ xs: "1", md: "2" }}
            colEnd={{ xs: "-1", md: "4" }}
          >
            <Prose>
              <MDXContent components={Components} />
            </Prose>
          </Grid.Column>
        </Grid.Container>
      </article>
    </>
  );
};

export default PostPage;
