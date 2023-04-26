"use client";
import NextImage, { ImageProps } from "next/image";

const rx = Math.floor(Math.random() * (255 - 1)) + 1;
//console.log(rx)
const rx2 = Math.floor(Math.random() * (190 - 1)) + 1;
//console.log(rx2)

const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63);

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;

const Image = (props: ImageProps) => {
  const { src, alt, width, height } = props;
  return (
    <div className="drop-shadow-sm filter">
      <NextImage
        src={src}
        width={width || 900}
        height={height || 900}
        alt={alt}
        sizes="(max-width: 900px) 100vw,(max-width: 1200px) 50vw, 33vw"
        blurDataURL={rgbDataURL(rx, rx2, rx2)}
        placeholder={"blur" ?? "empty"}
        className="rounded-lg object-cover"
      />
    </div>
  );
};

export default Image;
