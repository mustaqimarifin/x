import { getMDXComponent } from "next-contentlayer/hooks";
//import NextImage from "next/image";
import * as React from "react";
import Image from "./Pics";
//import Image from './Pics';

/* function Image(props: any) {
	return <NextImage alt={props.alt} {...props} />;
}
 */
const components = {
	img: Image,
	Image,
	//Pix
	//DickPics
};

/* interface MdxProps {
	code: string;
}
 */
export function Mdx(props: any) {
	const Component = getMDXComponent(props.code);
	return <Component {...props} components={{ ...components, ...(props.components || {}) }} />;
}
