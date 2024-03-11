import path from "path";

import { readFile } from "fs/promises";
import { imageDimensionsFromData } from "image-dimensions";
import { cache } from "react";
import { visit } from "unist-util-visit";
import pMap from "p-map";
import normalizeUrl from "normalize-url";
import { getPreviewImage } from "./imagemeta";
export type Size = {
  width: number | undefined;
  height: number | undefined;
  orientation?: number;
  type?: string;
};
export type SizeCalculationResult = {
  images?: Size[];
} & Size;
export type IImage = {
  validate: (input: Uint8Array) => boolean;
  calculate: (input: Uint8Array, filepath?: string) => SizeCalculationResult;
};
type ImageNode = {
  type: "element";
  tagName: "img";
  properties: {
    src: string;
    height?: number;
    width?: number;
    blurDataURL?: string;
    placeholder?: "blur" | "empty";
  };
};

function isImageNode(node: ImageNode) {
  const img = node as ImageNode;
  return (
    img.type === "element" &&
    img.tagName === "img" &&
    img.properties &&
    typeof img.properties.src === "string"
  );
}
async function addProps(node: ImageNode): Promise<void> {
  const local_img = path.join(process.cwd(), "public", node.properties.src);

  let res: SizeCalculationResult | undefined;
  const isExternal = node.properties.src.startsWith("http");

  if (!isExternal) {
    const file = await readFile(local_img);

    res = imageDimensionsFromData(file);
  } else {
    const buffer = await fetch(node.properties.src).then(async (res) =>
      Buffer.from(await res.arrayBuffer()),
    );

    res = imageDimensionsFromData(buffer);
  }
  //	console.log(res);
  if (!res) throw Error(`Invalid image with src "${node.properties.src}"`);

  node.properties.width = res.width;
  node.properties.height = res.height;
}

const imageMetadata = cache(() => {
  return async function transformer(tree): Promise<Node> {
    const images: ImageNode[] = [];

    visit(tree, "element", (node) => {
      if (isImageNode(node)) {
        images.push(node);
      }
    });

    Object.fromEntries(
      await pMap(
        images,
        async (image) => {
          const cacheKey = normalizeUrl(image.properties.src);
          return [
            cacheKey,
            await getPreviewImage(image.properties.src, { cacheKey }),
          ];
        },
        {
          concurrency: 8,
        },
      ),
    );

    return tree;
  };
});

export default imageMetadata;
