import slugify from "@sindresorhus/slugify";
import { Heading } from "components/Heading";
import { ImageCarousel } from "components/MdxComponents/ImageCarousel";
import { YoutubeEmbed } from "components/MdxComponents/YoutubeEmbed";
import { Text } from "components/Text";
import Link from "next/link";
import { onlyText } from "react-children-utilities";

import Image from "./Pics";

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

export const Components = {
  a: CustomLink,
  Image,
  ImageCarousel,
  //p: (props: any) => <Text { ...props } />,
  h2: (props: any) => (
    <Heading {...props} fontSize="lg" id={slugify(onlyText(props.children))} />
  ),
  h3: (props: any) => (
    <Heading {...props} as="h3" id={slugify(onlyText(props.children))} />
  ),
  YoutubeEmbed,
};
