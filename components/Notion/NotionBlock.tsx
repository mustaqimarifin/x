import { AudioBlock, BaseBlock, ExtendedRecordMap } from "notion-types";
import React from "react";
import { processDatabaseItem } from "../../app/data";
import { NotionText } from "./NotionText";
import { cx, textDecorationsToString } from "lib/utils";
import dynamic from "next/dynamic";
import KodeBlock from "components/Code/KodeBlock";
import Image from "next/image";

declare const B: { properties: { title: string; source: string } };

const Exercise = dynamic(() => import("components/Code/Exercise"), {
  ssr: false,
});
/* const MeatTweet = dynamic(() => import("components/Embed/Tweet"), {
  ssr: false,
}); */

const AudioBlock = dynamic(() => import("components/Embed/Audio"), {
  ssr: false,
});

const YoutubeEmbed = dynamic(() => import("components/Embed/YoutubeEmbed"), {
  ssr: false,
});

function BlockIcon({ block }: { block: BaseBlock }) {
  const pageIcon = block.format.page_icon;
  if (!pageIcon) {
    return null;
  }

  return <div>{pageIcon}</div>;
}

// https://github.com/NotionX/react-notion-x/blob/3aef81f18d79dfa5c86a27bf3934d13c77664323/packages/react-notion-x/src/utils.ts#L66
const youtubeDomains = new Set([
  "youtu.be",
  "youtube.com",
  "www.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
]);
export const getYoutubeId = (url: string): string | null => {
  try {
    const { hostname } = new URL(url);
    if (!youtubeDomains.has(hostname)) {
      return null;
    }
    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/i;

    const match = url.match(regExp);
    if (match && match[2].length == 11) {
      return match[2];
    }
  } catch {
    // ignore invalid urls
  }
  return null;
};

async function BlockRenderer({
  block,
  recordMap,
  children,
}: {
  block: BaseBlock;
  recordMap: ExtendedRecordMap;
  children: React.ReactNode;
  previews?: boolean;
}) {
  const { type, id } = block;
  //@ts-ignore
  const value = block[type];
  switch (block.type) {
    case "paragraph":
      return (
        <p>
          <NotionText value={value.text} recordMap={recordMap} />
        </p>
      );
    case "page": {
      return (
        <div className=" leading-relaxed text-neutral-900 dark:text-neutral-100">
          {block.content?.map((blockId) => (
            <NotionBlock
              blockId={blockId}
              recordMap={recordMap}
              key={blockId}
            />
          ))}
        </div>
      );
    }
    case "text":
      if (block.properties === undefined) {
        return <div className=""> </div>;
      }
      return (
        /*         <div className="prose my-4 whitespace-pre-wrap dark:prose-invert">
                  <NotionText value={block.properties.title} recordMap={recordMap} />
                </div> */
        <div className="my-4 whitespace-pre-wrap ">
          <NotionText value={block.properties.title} recordMap={recordMap} />
        </div>
      );
    case "header":
    case "sub_header":
    case "sub_sub_header":
      return (
        /*         <div className="prose mb-2 mt-6 text-xl font-semibold dark:prose-invert">
          <NotionText value={ block.properties.title } recordMap={ recordMap } />
        </div> */
        <div className=" mb-2 mt-6 text-xl font-semibold ">
          <NotionText value={block.properties.title} recordMap={recordMap} />
        </div>
      );
    case "image":
      return (
        <div className="relative aspect-square overflow-hidden rounded-md">
          <Image
            alt=""
            src={`https://www.notion.so/image/${encodeURIComponent(
              block.properties.source[0][0],
            )}?table=block&id=${block.id}`}
            fill
          />
        </div>
      );

    // const cacheKey = normalizeUrl(url);

    //const preimg =  getPreviewImage(url, { cacheKey });
    //preimg.then((b64) => {

    case "bulleted_list": {
      const wrapList = (content: React.ReactNode, start?: number) =>
        block.type === "bulleted_list" ? (
          <ul className="list-disc pl-6">{content}</ul>
        ) : (
          <ol start={start}>{content}</ol>
        );

      let output =
        block.properties !== undefined ? (
          <li className="py-px">
            <NotionText value={block.properties.title} recordMap={recordMap} />
          </li>
        ) : null;
      if (block.content !== undefined) {
        output = (
          <>
            {output}
            {wrapList(children)}
          </>
        );
      }
      const isTopLevel =
        block.type !== recordMap.block[block.parent_id]?.value?.type;
      return isTopLevel ? wrapList(output) : output;
    }
    case "to_do":
      return (
        <div>
          <label
            htmlFor={id}
            className="flex items-center justify-start space-x-3"
          >
            <input
              id={id}
              aria-describedby={value.text}
              name={id}
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-teal-500 focus:ring-teal-500"
            />
            <NotionText value={block.properties.title} recordMap={recordMap} />
          </label>
        </div>
      );
    case "divider":
      return (
        <hr className="my-16 h-10 w-full border-none text-center before:text-2xl before:text-[#D1D5DB] before:content-['∿∿∿']"></hr>
      );
    /*     case "code": {
          //const match = /language-(\w+)/.exec(block.properties.language || '')
    
          return (
            <div className="-mx-2 my-6 md:-mx-4">
              <CodeBlock text={ textDecorationsToString(block.properties.title) } language={ textDecorationsToString(
                block.properties.language
              ).toLowerCase() } />
            </div>
          )
        } */
    case "code": {
      return (
        <div className="-mx-2 my-6 md:-mx-4">
          <KodeBlock
            language={textDecorationsToString(
              block.properties.language,
            ).toLowerCase()}
            code={textDecorationsToString(block.properties.title)}
          />
        </div>
      );
    }

    case "toggle": {
      if (block.properties?.title[0][0] === "Ignore") {
        return null;
      }
      return (
        <div>
          <div>toggle</div>
          <NotionText value={block.properties?.title} recordMap={recordMap} />
        </div>
      );
    }
    case "alias": {
      const blockPointerId = block?.format?.alias_pointer?.id;
      const linkedBlock = recordMap.block[blockPointerId]?.value;
      if (linkedBlock === undefined) {
        //     console.log('"alias" missing block', blockPointerId);
        return null;
      }
      const collection = recordMap.collection[linkedBlock.parent_id]?.value;
      if (collection !== undefined) {
        if (collection.name[0][0] === "Exercises") {
          if (linkedBlock.type !== "page") {
            throw new Error();
          }
          const item: any = processDatabaseItem(linkedBlock, collection);
          return (
            <Exercise
              blockId={blockPointerId}
              prompt={<NotionText value={item.Prompt} recordMap={recordMap} />}
              exerciseCode={textDecorationsToString(item.Exercise)}
              solutionCode={
                <KodeBlock
                  code={textDecorationsToString(item.Solution)}
                  language="typescript"
                />
              }
            />
          );
        }
      }
      return <div>alias {blockPointerId}</div>;
    }

    case "callout": {
      return (
        <div className="flex items-start gap-4 rounded bg-neutral-100 p-4">
          <BlockIcon block={block} />
          <NotionText value={block.properties?.title} recordMap={recordMap} />
          {children}
        </div>
      );
    }
    case "quote": {
      return (
        <div className="bg-neutral-100 p-4">
          <NotionText value={block.properties?.title} recordMap={recordMap} />
        </div>
      );
    }
    /*   case "tweet": {
      const source =
        recordMap.signed_urls?.[block.id] ?? block.properties?.source?.[0]?.[0];
      const id = source.split("?")[0].split("/").pop();

      if (id === undefined) {
        return null;
      }
      return (
        <div className="my-4">
          <MeatTweet id={id} />
        </div>
      );
    } */
    case "embed": {
      return (
        <div className="w-full rounded-md">
          <AudioBlok block={block as AudioBlock} recordMap={recordMap} />
        </div>
      );
    }
    case "column_list":
      return <div className={cx("notion-row", id)}>{children}</div>;

    case "column": {
      // note: notion uses 46px
      const spacerWidth = `min(32px, 4vw)`;
      const ratio = block.format?.column_ratio || 0.5;
      const parent = recordMap.block[block.parent_id]?.value;
      const columns =
        parent?.content?.length ?? Math.max(2, Math.ceil(1.0 / ratio));

      const width = `calc((100% - (${
        columns - 1
      } * ${spacerWidth})) * ${ratio})`;
      const style = { width };

      return (
        <>
          <div className={cx("notion-column", id)} style={style}>
            {children}
          </div>

          <div className="notion-spacer" />
        </>
      );
    }

    case "video": {
      const source: string =
        recordMap.signed_urls?.[block.id] ?? block.properties?.source?.[0]?.[0];
      const youtubeVideoId = getYoutubeId(source);
      if (youtubeVideoId !== null) {
        //const startTime = params.get("t");
        return (
          <div className="my-4">
            <YoutubeEmbed embedId={youtubeVideoId} />
          </div>
        );
      }
      return (
        <div className="my-4">
          <video src={source} controls={true} playsInline={true} />
        </div>
      );
    }
    default:
      //    console.log(`unsupported: ${block.type}`);

      // console.log(block);

      return null;
  }
}

export default async function NotionBlock({
  blockId,
  recordMap,
}: {
  blockId: string;
  recordMap: ExtendedRecordMap;
}) {
  const block = recordMap?.block[blockId]?.value;
  return (
    <article className="prose prose-neutral prose-quoteless max-w-3xl dark:prose-invert lg:prose-lg">
      <BlockRenderer block={block} recordMap={recordMap} previews>
        {block.content?.map((childBlockId) => {
          return (
            <NotionBlock
              blockId={childBlockId}
              recordMap={recordMap}
              key={childBlockId}
            />
          );
        })}
      </BlockRenderer>
    </article>
  );
}
