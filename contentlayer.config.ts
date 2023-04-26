import { defineDatabase, makeSource } from "contentlayer-source-notion";
import * as notion from "@notionhq/client";


const client = new notion.Client({
  auth: "secret_md9N3i45t36vB9dFWi6NukYEdagUNHKeqOKgjJ9hg0q",
});

/* const client = new notion.Client({
  auth: "secret_oQAiaqQrCITgS9LNI4uX76fbVpmipczfcfh77Ma8X80",
});
 */
export const Notes: import("contentlayer-source-notion").DatabaseType =
  defineDatabase(() => ({
    name: "Notes",
    databaseId: "c0c12b8f03ad44e4aab3062024b04dcd",
    //https://mstqmarfn.notion.site/c0c12b8f03ad44e4aab3062024b04dcd?v=1927b11182ca44cd8f138ac842979f6d
    query: {
      filter: {
        property: "status",
        status: {
          equals: "Published",
        },
      },
    },
    properties: {
      date: {
        name: "Created time",
      },
    },
    computedFields: {
      url: {
        type: "string",
        resolve: (post) => `/notes/${post.slug}`,
      },
    },
  }));

export default makeSource({
  client,
  databaseTypes: [Notes],
});
