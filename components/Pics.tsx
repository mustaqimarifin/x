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
				//sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

				//sizes="(max-width: 1920px) 213px, 33vw"
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
