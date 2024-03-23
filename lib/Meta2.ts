//@ts-nocheck
import path from "node:path";
import { visit } from "unist-util-visit";
import lqip from "./lqip";

interface LqipResult {
	content: Buffer;
	metadata: {
		originalWidth: number;
		originalHeight: number;
		width: number;
		height: number;
		type: any;
		dataURIBase64: string;
	};
}

export interface PreviewImage {
	width: number;
	height: number;
	base64: string;
}

type ImageNode = {
	type: "element";
	tagName: "img";
	properties: {
		src: string;
		height?: number;
		width?: number;
		blurDataURL?: string;
		placeholder?: "blur";
	};
};

function isImageNode(node: ImageNode) {
	const img = node;
	return img.type === "element" && img.tagName === "img" && img.properties && typeof img.properties.src === "string";
}

async function createPreviewImage(node: ImageNode) {
	/*   try {
    const cachedPreviewImage = await redis.hgetall(cacheKey)
    if (cachedPreviewImage) {
      return cachedPreviewImage
    }
  } catch (err) {
    // ignore redis errors
    console.warn(`redis error get "${cacheKey}"`, err)
  } */
	let result;
	const url = node.properties.src;
	console.log(url);
	//const id = sha256(url)
	const ext_img = url.startsWith("http");
	const local_img = path.join(process.cwd(), "./public", url);
	console.log(local_img);
	try {
		if (!ext_img) {
			result = await lqip(local_img);
		} else {
			// const { body } = await got(result, { responseType: 'buffer' });
			const body = await fetch(url).then(async (res) => Buffer.from(await res.arrayBuffer()));
			result = await lqip(body);
		}
		console.log(result);
		const previewImage = {
			width: result.metadata.originalWidth,
			height: result.metadata.originalHeight,
			base64: result.metadata.dataURIBase64,
		};

		//const pi = JSON.stringify(previewImage)
		if (!result) throw Error(`Invalid image with src "${url}"`);
		node.properties.width = previewImage.width ?? 768;
		node.properties.height = previewImage.height ?? 432;
		node.properties.blurDataURL = previewImage.base64;
		node.properties.placeholder = "blur";
	} catch (err) {
		// ignore redis errors
		console.warn(`redis error set "${url}"`, err);
	}
}

//const cachedPreview = cache(createPreviewImage)

const imageMetadataLQIP = () => {
	return async function transformer(tree: any) {
		const images: ImageNode[] = [];

		visit(tree, "element", (node) => {
			if (isImageNode(node)) {
				images.push(node);
			}
		});

		for (const image of images) {
			await createPreviewImage(image);
		}

		return tree;
	};
};

export default imageMetadataLQIP;
