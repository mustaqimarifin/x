import pMap from "p-map";
import sharp from "sharp";

export default async function lqip(
	input: AsyncIterable<any> | Iterable<any>,
	opts: {
		concurrency?: number;
		outputFormat?: string;
		outputOptions?: object;
		resize?: number | any[];
	} = {},
) {
	const { concurrency = 4, ...rest } = opts;

	if (Array.isArray(input)) {
		return pMap(input, async (image) => await computeLqipImage(image, rest), {
			concurrency,
		});
	}
	return await computeLqipImage(input, opts);
}
//@ts-ignore
async function computeLqipImage(input, opts) {
	const { resize = 16, outputFormat = "webp", outputOptions } = opts;

	const image = sharp(input).rotate();
	const metadata = await image.metadata();

	const resized = image.resize(
		...(Array.isArray(resize)
			? resize
			: [Math.min(metadata.width!, resize), Math.min(metadata.height!, resize), { fit: "inside" }]),
	);
	let output: sharp.Sharp;

	if (outputFormat === "webp") {
		output = resized.webp({
			quality: 20,
			alphaQuality: 20,
			smartSubsample: true,
			...outputOptions,
		});
	} else if (outputFormat === "jpg" || outputFormat === "jpeg") {
		output = resized.jpeg({
			quality: 20,
			...outputOptions,
		});
	} else {
		throw new Error(`Invalid outputformat "${outputFormat}"`);
	}

	const { data, info } = await output.toBuffer({ resolveWithObject: true });

	return {
		content: data,
		metadata: {
			originalWidth: metadata.width,
			originalHeight: metadata.height,
			width: info.width,
			height: info.height,
			type: outputFormat,
			dataURIBase64: `data:image/webp;base64,${data.toString("base64")}`,
		},
	};
}
