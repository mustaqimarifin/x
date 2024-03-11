import type { MDXRemoteProps } from "next-mdx-remote/rsc";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { JSX } from "react";
import { components } from "./mdx";
import rehypePrettyCode, { type Options } from "rehype-pretty-code";
//import imageMetadata from "lib/image-size";

const options: Options = {
  keepBackground: false,
  filterMetaString: (string) => string.replace(/filename="[^"]*"/, ""),
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
  },
  onVisitTitle(node) {
    node.properties!.className = ["title"];
  },
  onVisitHighlightedLine(node) {
    node.properties.className!.push("highlighted");
  },
  onVisitHighlightedChars(node) {
    node.properties.className = ["word"];
  },
};
export default function Cerealize(
  props: JSX.IntrinsicAttributes & MDXRemoteProps,
) {
  return (
    <article className="prose prose-neutral prose-quoteless max-w-3xl dark:prose-invert lg:prose-lg">
      <MDXRemote
        {...props}
        options={{
          mdxOptions: {
            //@ts-expect-error
            rehypePlugins: [[rehypePrettyCode, options]],
          },
        }}
        components={{ ...components, ...(props.components || {}) }}
      />
    </article>
  );
}
