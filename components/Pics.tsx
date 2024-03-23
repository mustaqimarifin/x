"use client";
import Image from "next/image";

type Props = {
	src?: string;
	alt?: string;
	width?: string | number;
	height?: string | number;
	blurDataURL?: string;
	className?: string;
};

const Pix = (props: Props) => {
	const { src, alt, className } = props;
	return (
		<div className="filter drop-shadow-sm">
			<Image
				src={require(`../public/images${src}`)}
				//src={src}
				alt={alt!}
				//blurDataURL={blurDataURL}
				//width={width}
				//height={height}
				//placeholder={"blur" ?? "empty"}
				className={className}
			/>
		</div>
	);
};

export default Pix;
