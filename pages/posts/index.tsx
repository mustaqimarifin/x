import * as Grid from "components/Grid";
import { Heading } from "components/Heading";
import { Link } from "components/Link";
import * as List from "components/List";
import { Spacer } from "components/Spacer";
import { Text } from "components/Text";
import type { Post } from "contentlayer/generated";
import { allPosts } from "contentlayer/generated";
import type { NextPage } from "next";
import NextLink from "next/link";
import { NextSeo } from "next-seo";
import * as React from "react";

export async function getStaticProps() {
  const posts = allPosts
    .sort((a, b) => {
      return Number(new Date(b.date)) - Number(new Date(a.date));
    })
    .map(({ body, _raw, ...p }) => {
      return p;
    });
  return { props: { title: "Posts", posts } };
}

type PostWithoutBody = Omit<Post, "body" | "_raw">;

const Posts: NextPage<{ posts: PostWithoutBody[] }> = ({ posts }) => {
  return (
    <>
      <NextSeo
        title="Posts"
        description="Strong opinions, loosely held."
        openGraph={{
          title: "Posts",
          description: "Strong opinions, loosely held.",
        }}
      />

      <Grid.Container>
        <Grid.Column
          colStart={{ xs: "1", md: "2" }}
          colEnd={{ xs: "-1", md: "4" }}
        >
          <Heading fontSize="xxl" as="h1">
            Posts
          </Heading>
          <Spacer height="xxs" />
          <Text color="foregroundNeutral" fontSize="lg">
            Strong opinions, loosely held.
          </Text>
        </Grid.Column>
      </Grid.Container>

      <Spacer height="xxxl" />

      <List.Container>
        {posts.map((post) => {
          return (
            <List.Item key={post._id}>
              <Grid.Container rowGap="md">
                <Grid.Column
                  colStart={{ xs: "1", sm: "2" }}
                  colEnd={{ xs: "-1", md: "4" }}
                >
                  <Heading>
                    <Link underlined={true}>
                      <NextLink href={`/posts/${post.slug}`}>
                        {post.title}
                      </NextLink>
                    </Link>
                  </Heading>
                  {post.description ? (
                    <>
                      <Spacer height="sm" />
                      <Text color="foregroundNeutral">{post.description}</Text>
                    </>
                  ) : null}
                </Grid.Column>

                <Grid.Column
                  colStart={{ xs: "1" }}
                  colEnd={{ xs: "-1", sm: "1" }}
                  rowStart={{ sm: "1" }}
                >
                  <Text
                    as="time"
                    dateTime={post.date}
                    color="foregroundNeutral"
                    fontSize="sm"
                  >
                    {post.formattedDate}
                  </Text>
                </Grid.Column>
              </Grid.Container>
            </List.Item>
          );
        })}
      </List.Container>
    </>
  );
};

export default Posts;
