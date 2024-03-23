import { getMDXComponent } from "next-contentlayer/hooks";
import * as React from "react";
import Image from "./Pics";

const components = {
	img: Image,
	Image,
};

export async function Mdx(props: any) {
	const Component = getMDXComponent(props.code);
	return <Component {...props} components={{ ...components, ...(props.components || {}) }} />;
}
