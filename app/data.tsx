import { PostDB, GalleryDB, ProjectsDB } from "lib/env";
import { NotionAPI } from "notion-client";
import { Collection, Decoration, PageBlock } from "notion-types";
import { getDateValue } from "notion-utils";
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

  return item as any;
}

const notion = new NotionAPI();

export const getPostDatabase = cache(async () => {
  const recordMap = await notion.getPage(PostDB);
  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block) => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<PostDatabaseItem>(pageBlock, collection)
    )
    .filter((item) => item.status);
});

export const getDatabasePage = cache(async <T,>(id: string) => {
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
  const recordMap = await notion.getPage(GalleryDB);

  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block) => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<ScribbleDatabaseItem>(pageBlock, collection)
    );
});
export const getProjectsDatabase = cache(async () => {
  const recordMap = await notion.getPage(ProjectsDB);

  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block) => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<ProjectDatabaseItem>(pageBlock, collection)
    )
    .filter((item) => item.status);
});
