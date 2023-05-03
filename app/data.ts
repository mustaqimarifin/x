/* eslint-disable no-case-declarations */
//import { getPreviewImageMap } from "lib/notion/previewImages"
//import { NotionAPI } from "notion-client"
//import { getPage } from "lib/notion"
import { NotionAPI } from "notion-client";
import { Collection, Decoration, PageBlock } from "notion-types";
import { getDateValue, getPageProperty } from "notion-utils";
import { cache } from "react";

export type DatabaseItem = { id: string } & { [key: string]: any };

export type PostDatabaseItem = {
  id: string;
  date: string;
  slug: string;
  title: Decoration[];
  URL: string;
  summary: Decoration[];
  status?: boolean;
};
export type ScribbleDatabaseItem = {
  id: string;
  Image: string;
};

export type PostStatus = "Draft" | "Published";

export type ProjectDatabaseItem = {
  id: string;
  date: string;
  pageId: string;
  title: Decoration[];
  URL: string;
  summary: Decoration[];
  status?: boolean;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function processDatabaseItem<T>(
  page: PageBlock,
  collection: Collection
): T {
  const item: DatabaseItem = {
    id: page.id,
  };
  if (page.properties === undefined) {
    throw new Error(`missing properties`);
  }
  for (const [key, value] of Object.entries(page.properties)) {
    const propertyName = collection.schema[key].name;
    switch (collection.schema[key].type) {
      case "text":
      case "title":
        item[propertyName] = value;
        break;
      case "date":
        const formattedDate = getDateValue(value);
        if (formattedDate?.type === "date") {
          const date = new Date(formattedDate.start_date);
          item[propertyName] = `${
            MONTHS[date.getMonth()]
          } ${date.getFullYear()}`;
        }
        break;
      case "url":
        item[propertyName] = value[0][0];
        break;
      case "file":
        item[propertyName] = value[0][1]?.[0][1];
        break;
      case "checkbox":
        item[propertyName] = value[0]?.[0] === "Yes";
        break;
      case "select":
        item[propertyName] = value[0][1]?.[0][1];
        break;
      default:
        console.log(`unsupported schema type: ${collection.schema[key].type}`);
    }
  }
  // @ts-ignore
  return item;
}
//https://mstqmarfn.notion.site/a67d691f76a94b22ae50d2ebee843745?v=68618f81fc1c41b7ab58ff0e428602ce
//https://mstqmarfn.notion.site/7fbb331398e64512842d8e5d37f99681?v=3ab906f235c548689c180d54f8cd9007https://mstqmarfn.notion.site/e55363fd2d2441d0bc00b9a26cccf7a0?v=1b09afd3bd7f4961a620ea550c8a8368
const notion = new NotionAPI();

export const getPostDatabase = async () => {
  const recordMap = await notion.getPage("7fbb331398e64512842d8e5d37f99681");
  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block): block is PageBlock => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<PostDatabaseItem>(pageBlock, collection)
    )
    .filter((item) => item.status);
};

export const getDatabasePage = cache(async <T>(id: string) => {
  const recordMap = await notion.getPage(id);

  const pageBlock = recordMap.block[id].value;
  const collection = Object.values(recordMap.collection)[0].value;
  if (pageBlock.type !== "page") {
    throw new Error();
  }
  return {
    item: processDatabaseItem<T>(pageBlock, collection),
    recordMap,
  };
});

export const getScribblesDatabase = cache(async () => {
  const recordMap = await notion.getPage("6b46257aea3846269127f8990c614400");

  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block): block is PageBlock => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<ScribbleDatabaseItem>(pageBlock, collection)
    );
});
//https://mstqmarfn.notion.site/7bd3c8a3acee431a942e6e2ef2cadddb?v=60f4ad35e94f4a1fb33a81379f761e38
export const getProjectsDatabase = cache(async () => {
  const recordMap = await notion.getPage("7bd3c8a3acee431a942e6e2ef2cadddb");

  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block): block is PageBlock => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<ProjectDatabaseItem>(pageBlock, collection)
    )
    .filter((item) => item.status);
});
