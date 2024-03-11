import * as types from "notion-types";

import { getBlockIcon } from "./get-block-icon";
import { isUrl } from "./is-url";

/**
 * Gets URLs of all images contained on the given page.
 */
export const getPageImageUrls = ({
  mapImageUrl,
}: {
  mapImageUrl: (url: string) => string | null;
}): string[] => {
  const imageUrls: string[] = blockIds
    .flatMap((blockId) => {
      const images: Array<{ url: string }> = [];

      if (block) {
        if (block.type === "image") {
          const signedUrl = recordMap.signed_urls?.[block.id];
          let source = signedUrl || block.properties?.source?.[0]?.[0];
          if (source.includes("file.notion.so")) {
            source = block.properties?.source?.[0]?.[0];
          }
          if (source) {
            images.push({
              block,
              url: source,
            });
          }
        }

        if ((block.format as any)?.page_cover) {
          const source = (block.format as any).page_cover;

          images.push({
            block,
            url: source,
          });
        }

        if ((block.format as any)?.bookmark_cover) {
          const source = (block.format as any).bookmark_cover;

          images.push({
            block,
            url: source,
          });
        }

        if ((block.format as any)?.bookmark_icon) {
          const source = (block.format as any).bookmark_icon;

          images.push({
            block,
            url: source,
          });
        }

        const pageIcon = getBlockIcon(block, recordMap);
        if (pageIcon && isUrl(pageIcon)) {
          images.push({
            block,
            url: pageIcon,
          });
        }
      }

      return images;
    })
    .filter(Boolean)
    .map(({ block, url }) => mapImageUrl(url, block))
    .filter(Boolean);

  return Array.from(new Set(imageUrls));
};
