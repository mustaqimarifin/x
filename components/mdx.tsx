import NextImage from "next/image";
import Link from "next/link";
import { createElement } from "react";

//import { TweetComponent } from "./tweet";

import dynamic from "next/dynamic";

const GhostImage = dynamic(() => import("./lazyboy"), { ssr: false });

function Table({ data }) {
  const headers = data.headers.map((header, index) => (
    <th key={header}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={row}>
      {row.map((cell, cellIndex) => (
        <td key={cell}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}
/*   <MDXTextAnchor
                      slug={linkedBlock.id}
                      paneContent={
                        <div className="px-4 py-2 sm:px-8 sm:py-4">
                          <div className="mb-4 text-xl font-semibold">
                            {textDecorationsToString(
                              linkedBlock.properties.title,
                            )}
                          </div>
                          <NotionBlock
                            blockId={linkedBlock.id}
                            recordMap={recordMap}
                          />
                        </div>
                      }
                    >
                      {element}
                    </MTextAnchor> */
function CustomLink(props) {
  const href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function BlockQuote({ children }) {
  return <blockquote className="font-itl">{children}</blockquote>;
}

function RoundedImage(props) {
  return <NextImage alt={props.alt} className="rounded-lg" {...props} />;
}

function Callout(props) {
  return (
    <div className="mb-8 flex items-center rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
      <div className="mr-4 flex w-4 items-center">{props.emoji}</div>
      <div className="callout w-full">{props.children}</div>
    </div>
  );
}

function ProsCard({ title, pros }) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6 dark:border-emerald-900 dark:bg-neutral-900">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {pros.map((pro) => (
          <div key={pro} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg className="h-4 w-4 text-emerald-500" viewBox="0 0 24 24">
                <title>{title}</title>
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsCard({ title, cons }) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6 dark:border-red-900 dark:bg-neutral-900">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {cons.map((con) => (
          <div key={con} className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500"
              >
                <title>{title}</title>
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters except for -
    .replace(/--+/g, "-"); // Replace multiple - with single -
}
function createAnchor(level) {
  // eslint-disable-next-line react/display-name
  return ({ children }) => {
    const slug = slugify(children);
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `$${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };
}
function createHeading(level) {
  // eslint-disable-next-line react/display-name
  return ({ children }) => {
    const slug = slugify(children);
    return createElement(
      `h${level}`,
      { id: slug },
      [
        createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };
}

function Bust(props) {
  return (
    <strong className="font-quad text-2xl italic text-orange-500 ">
      {props.children}
    </strong>
  );
}

export const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Bust,
  blockquote: BlockQuote,
  RoundedImage,
  img: GhostImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  //StaticTweet: TweetComponent,
  //pre: Code,
  Table,
};
