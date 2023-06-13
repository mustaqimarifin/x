"use client";
import NextImage, { ImageProps } from "next/image";

const orange =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCA3NjggNDMyJz48ZmlsdGVyIGlkPSdiJyBjb2xvci1pbnRlcnBvbGF0aW9uLWZpbHRlcnM9J3NSR0InPjxmZUdhdXNzaWFuQmx1ciBzdGREZXZpYXRpb249JzIwJy8+PC9maWx0ZXI+PGltYWdlIHByZXNlcnZlQXNwZWN0UmF0aW89J25vbmUnIGZpbHRlcj0ndXJsKCNiKScgeD0nMCcgeT0nMCcgaGVpZ2h0PScxMDAlJyB3aWR0aD0nMTAwJScgaHJlZj0nZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFQQUFBUC9NbWYvLy95SDVCQUFBQUFBQUxBQUFBQUFCQUFFQUFBSUNSQUVBT3c9PScvPjwvc3ZnPg==";

/* const rx = Math.floor(Math.random() * (255 - 1)) + 1
//console.log(rx)
const rx2 = Math.floor(Math.random() * (190 - 1)) + 1
//console.log(rx2)
const keyStr =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="

const triplet = (e1: number, e2: number, e3: number) =>
  keyStr.charAt(e1 >> 2) +
  keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
  keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
  keyStr.charAt(e3 & 63)

const rgbDataURL = (r: number, g: number, b: number) =>
  `data:image/gif;base64,R0lGODlhAQABAPAA${triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`
 */
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
        //blurDataURL={rgbDataURL(rx, rx2, rx2)}
        blurDataURL={orange}
        placeholder={"blur" ?? "empty"}
        className="rounded-lg object-cover"
      />
    </div>
  );
};

export default Image;
