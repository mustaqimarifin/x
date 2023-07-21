import got from 'got';
import { mapImageUrl } from 'lib/mapImg';
import { db } from 'lib/redis/connect';

import { type ExtendedRecordMap } from 'notion-types';
import { getPageImageUrls, normalizeUrl } from 'notion-utils';
import pMap from 'p-map';
import pMemoize from 'p-memoize';
import { getPlaiceholder } from 'plaiceholder';

export type PreIMG = {
  w: number;
  h: number;
  b: string;
};
export interface PreMap {
  [url: string]: PreIMG | null;
}

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap
): Promise<PreMap> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl,
  })
    //.concat([defaultPageIcon, defaultPageCover])
    .filter(Boolean);

  const previewImagesMap = Object.fromEntries(
    await pMap(
      urls,
      async (url) => {
        const cacheKey = normalizeUrl(url);
        return [cacheKey, await getPreviewImage(url, { cacheKey })];
      },
      {
        concurrency: 8,
      }
    )
  );

  return previewImagesMap;
}

async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string }
): Promise<PreIMG | null> {
  try {
    try {
      const cachedPreviewImage: PreIMG = await db.get(cacheKey);
      if (cachedPreviewImage) {
        return cachedPreviewImage;
      }
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error get "${cacheKey}"`, err.message);
    }

    const { body } = await got(url, { responseType: 'buffer' });
    console.log(body);

    const result = await getPlaiceholder(body, { format: ['webp'] });
    //const result = await lqip(body);
    console.log('lqip', { result, cacheKey });

    const previewImage = {
      w: result.metadata.width,
      h: result.metadata.height,
      b: result.base64,
    };

    try {
      await db.set(cacheKey, { previewImage });
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error set "${cacheKey}"`, err.message);
    }

    return previewImage;
  } catch (err) {
    console.warn('failed to create preview image', url, err.message);
    return null;
  }
}

export const getPreviewImage = pMemoize(createPreviewImage);
