import { PostDB, GalleryDB, ProjectsDB, previews } from "lib/env";
import { getPage } from "lib/notion";
import { Collection, Decoration, PageBlock } from "notion-types";
import { getDateValue } from "notion-utils";
import { cache } from "react";
import "server-only";

export type DatabaseItem = Record<string, any> & { id: string };

export interface PostDatabaseItem {
  id: string;
  date: string;
  slug: string;
  title: Decoration[] & string;
  URL: string;
  summary: Decoration[] & string;
  status?: boolean;
  authors?: string[];
}
export interface ScribbleDatabaseItem {
  id: string;
  pic: string;
  Image: string;
}

export type PostStatus = "Draft" | "Published";

export interface ProjectDatabaseItem {
  id: string;
  date: string;
  pageId: string;
  title: Decoration[] & string;
  URL: string;
  summary: Decoration[] & string;
  status: boolean;
}

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

export function processDatabaseItem<P>(
  page: PageBlock,
  collection: Collection,
): P {
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

  return item as P;
}

export const getPostDatabase = cache(async () => {
  const recordMap = await getPage(PostDB);
/*   if (previews) {
    const previewImageMap = await getPreviewImageMap(recordMap);
    (recordMap as any).preview_images = previewImageMap;
  } */
  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block): block is PageBlock => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<PostDatabaseItem>(pageBlock, collection),
    )

    .filter((item) => item.status);
});

export const getDatabasePage = cache(async <T>(id: string) => {
  const recordMap = await getPage(id);

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
  const recordMap = await getPage(GalleryDB);
/*   if (previews) {
    const previewImageMap = await getPreviewImageMap(recordMap);
    (recordMap as any).preview_images = previewImageMap;
  } */

  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block): block is PageBlock => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<ScribbleDatabaseItem>(pageBlock, collection),
    );
});

export const getProjectsDatabase = cache(async () => {
  const recordMap = await getPage(ProjectsDB);

  const collection = Object.values(recordMap.collection)[0].value;
  return Object.values(recordMap.block)
    .map((block) => block.value)
    .filter((block): block is PageBlock => block?.type === "page")
    .map((pageBlock: PageBlock) =>
      processDatabaseItem<ProjectDatabaseItem>(pageBlock, collection),
    )
    .filter((item) => item.status);
});
