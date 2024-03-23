"use client";
import Image, { type ImageProps } from "next/image";

const imageKitLoader = ({
	src,
	width,
	quality,
}: {
	src: string;
	width: number;
	quality?: number;
}) => {
	if (src[0] === "/") src = src.slice(1);
	const params = [`w-${width}`];
	if (quality) {
		params.push(`q-${quality}`);
	}
	const paramsString = params.join(",");
	let urlEndpoint = "https://ik.imagekit.io/mstqmarfn";
	if (urlEndpoint[urlEndpoint.length - 1] === "/") urlEndpoint = urlEndpoint.substring(0, urlEndpoint.length - 1);
	return `${urlEndpoint}/${src}?tr=${paramsString}`;
};

type Props = {
	src?: string;
	alt?: string;
	width?: number;
	height?: number;
	blurDataURL?: string;
	className?: string;
} & ImageProps;

const IKImage = (props: Props) => {
	return (
		<Image
			{...props}
			loader={imageKitLoader}
			//sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

			//src='default-image.jpg'
			//alt="Default image"
			// width={980}
			//height={980}
			//className="rounded-md"
		/>
	);
};

export default IKImage;
