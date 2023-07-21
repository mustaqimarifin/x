import { kK } from "app/style/fonts";
import { db } from "lib/redis/connect";
import lqip, { LqipResult } from "lqip-modern";

export type PreIMG = {
  w: number;
  h: number;
  b: string;
};

export const getImage = async (
  url: string,
  { cacheKey }: { cacheKey: string }
): Promise<PreIMG | null> => {
  const result = await fetch(url).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  const x = await lqip(result);

  /*   const {
    metadata: { originalHeight, originalWidth, dataURIBase64 },
  } = x; */

  const previewImage = {
    h: x.metadata.originalHeight,
    w: x.metadata.originalWidth,
    b: x.metadata.dataURIBase64,
  } satisfies PreIMG;

  try {
    await db.set(cacheKey, previewImage);
  } catch (err) {
    console.warn("failed to create preview image", url, err.message);
    return null;
  }
  return previewImage;
};

export const getBlurDataURL = async (url: string | null) => {
  if (!url) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
  try {
    const response = await fetch(
      `https://wsrv.nl/?url=${url}&w=50&h=50&blur=5`
    );
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");

    return `data:image/png;base64,${base64}`;
  } catch (error) {
    return "data:image/webp;base64,AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
  }
};
