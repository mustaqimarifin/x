import { ExtendedRecordMap, PreviewImage, PreviewImageMap } from "notion-types";
import { getPageImageUrls } from "notion-utils";
import pMap from "p-map";
import pMemoize from "p-memoize";
import { rdx } from "./redis/connect";
import ky from "ky";
import lqip from "lqip-modern";
import { normalizeUrl } from "./normalize";
import { mapImageUrl } from "./mapImg";

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap,
): Promise<PreviewImageMap> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl,
  });

  const previewImagesMap = Object.fromEntries(
    await pMap(
      urls,
      async (url) => {
        const cacheKey = normalizeUrl(url) as string;
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
): Promise<PreviewImage | null> {
  try {
    try {
      const cachedPreviewImage = await rdx.get(cacheKey);
      if (cachedPreviewImage) {
        return cachedPreviewImage;
      }
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error get "${cacheKey}"`, err.message);
    }

    const res = await ky(url).arrayBuffer();
    const body = Buffer.from(res);
    const result = await lqip(body);
    console.log("lqip", { ...result.metadata, url, cacheKey });

    const previewImage = {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64,
    };

    try {
      await rdx.set(cacheKey, previewImage);
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error set "${cacheKey}"`, err.message);
    }

    return previewImage;
  } catch (err) {
    console.warn("failed to create preview image", url, err.message);
    return null;
  }
}

export const getPreviewImage = pMemoize(createPreviewImage);
