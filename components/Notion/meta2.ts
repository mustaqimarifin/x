//@ts-nocheck
import got from "got";
import { mapImageUrl } from "lib/mapImg";
import { $$ } from "lib/redis/connect";

import { type ExtendedRecordMap } from "notion-types";
import { getPageImageUrls, normalizeUrl } from "notion-utils";
import pMap from "p-map";
import pMemoize from "p-memoize";
import { getPlaiceholder } from "plaiceholder";

export interface PreIMG {
  w: number;
  h: number;
  b: string;
}
export type PreMap = Record<string, PreIMG | null>;

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap,
): Promise<PreMap> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl,
  });

  const previewImagesMap = Object.fromEntries(
    await pMap(
      urls,
      async (url) => {
        const cacheKey = normalizeUrl(url);
        return [cacheKey, await getPreviewImage(url, { cacheKey })];
      },
      {
        concurrency: 8,
      },
    ),
  );

  return previewImagesMap;
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string },
): Promise<PreIMG | null> {
  try {
    try {
      const cachedPreviewImage = await $$.get(cacheKey);
      if (cachedPreviewImage) {
        return cachedPreviewImage;
      }
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error get "${cacheKey}"`, err);
    }

    const { body } = await got(url, { responseType: "buffer" });
    //console.log(body);

    const result = await getPlaiceholder(body, { format: ["webp"] });
    //const result = await lqip(body);
    // console.log("lqip", { result, cacheKey });

    const previewImage = {
      w: result.metadata.width,
      h: result.metadata.height,
      b: result.base64,
    };

    try {
      await $$.set(cacheKey, previewImage, 0);
      console.log(previewImage);
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error set "${cacheKey}"`, err);
    }

    return previewImage;
  } catch (err) {
    console.warn("failed to create preview image", url, err);
    return null;
  }
}

export const getPreviewImage = pMemoize(createPreviewImage);
