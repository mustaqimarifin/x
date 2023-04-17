import slugify from "@sindresorhus/slugify";
import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import { rehypeAccessibleEmojis } from "rehype-accessible-emojis";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

//import imageMetadata from "./lib/Meta"
import { formatDate, formatDateTime } from "./lib/utils";
import imageMetadata from "./lib/Meta"

////////////////////////////////////////////////////////////////////////////////
// Posts

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    formattedDate: {
      type: "string",
      resolve: (post) => formatDate(post.date),
    },
  },
}));

////////////////////////////////////////////////////////////////////////////////
// Jobs

const Event = defineNestedType(() => ({
  name: "Event",
  fields: {
    heading: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: false,
    },
    date: {
      type: "date",
      required: true,
    },
    link: {
      type: "string",
      required: false,
    },
  },
}));

export const Job = defineDocumentType(() => ({
  name: 'Job',
  filePathPattern: `jobs/*.mdx`,
  contentType: 'mdx',
  fields: {
    company: {
      type: 'string',
      required: true,
    },
    startDate: {
      type: 'date',
      required: true,
    },
    endDate: {
      type: 'date',
      required: false,
    },
    title: {
      type: 'string',
      required: true,
    },
    location: {
      type: 'string',
      required: false,
    },
    link: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: false,
    },
    logo: {
      type: 'string',
      required: false,
    },
    timeline: {
      type: 'list',
      of: Event,
      required: false,
    },
    clients: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: false,
    },
    currently: {
      type: 'string',
      required: false,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (job) => job._raw.sourceFileName.replace(/\.mdx$/, ''),
    },
  },
}));

////////////////////////////////////////////////////////////////////////////////
// Recommendations

export const Recommendation = defineDocumentType(() => ({
  name: "Recommendation",
  filePathPattern: `recommendations/*.mdx`,
  contentType: "mdx",
  fields: {
    date: {
      type: "date",
      required: true,
    },
    company: {
      type: "string",
      required: true,
    },
    title: {
      type: "string",
      required: true,
    },
    name: {
      type: "string",
      required: true,
    },
    text: {
      type: "string",
      required: true,
    },
    link: {
      type: "string",
      required: true,
    },
  },
  computedFields: {
    avatar: {
      type: "string",
      resolve: (r) => {
        return `/img/${slugify(r.name)}.jpeg`;
      },
    },
  },
}));

////////////////////////////////////////////////////////////////////////////////
// Activities

export const Activity = defineDocumentType(() => ({
  name: "Activity",
  filePathPattern: `activity/*.mdx`,
  contentType: "mdx",
  fields: {
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx$/, ""),
    },
    formattedDate: {
      type: "string",
      resolve: (post) => formatDateTime(post.date),
    },
  },
}));

const IceBath = defineNestedType(() => ({
  name: "IceBath",
  fields: {
    date: {
      type: "date",
      required: true,
    },
    duration: {
      type: "number",
      description: "Duration in seconds",
      required: true,
    },
    temp: {
      type: "number",
      required: true,
    },
  },
}));

////////////////////////////////////////////////////////////////////////////////
// Ice Baths

const IceBaths = defineDocumentType(() => ({
  name: "IceBaths",
  filePathPattern: `data/ice-baths.yaml`,
  isSingleton: true,
  fields: {
    data: {
      type: "list",
      of: IceBath,
      required: true,
    },
  },
  extensions: {},
}));

////////////////////////////////////////////////////////////////////////////////
// Rehype Pretty Code

const rehypePrettyCodeOptions= {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  tokensMap: {
    fn: "entity.name.function",
    objKey: "meta.object-literal.key",
  },
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{ type: "text", value: " " }];
    }
    node.properties.className.push("syntax-line");
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("syntax-line--highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["syntax-word--highlighted"];
  },
};

export default makeSource({
  contentDirPath: "content",
  documentTypes: [Activity, Job, Post, Recommendation, IceBaths],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeCodeTitles,
      [rehypePrettyCode, rehypePrettyCodeOptions],
      rehypeAccessibleEmojis, imageMetadata
    ],
  },
});
