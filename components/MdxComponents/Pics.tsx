import NextImage, { ImageProps } from "next/image";

const rx = Math.floor(Math.random() * (255 - 1)) + 1;
console.log(rx);
const rx2 = Math.floor(Math.random() * (190 - 1)) + 1;
console.log(rx2);

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
  
type Props = ImageProps & { base64?: string };


const Image = (props: Props) => {
  const { src, alt, width, height, base64 } = props;
  return (
    <div className="filter drop-shadow-md">
      <NextImage
        src={src}
        width={width || 768}
        height={height || 432}
        alt={alt}
        sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw, 33vw"
        blurDataURL={rgbDataURL(rx, rx2, 153)}
        placeholder="blur"
        //blurDataURL={base64}
        className="rounded-lg object-cover"
        style={{
          //filter: 'saturate(108%) brightness(103%) hue-rotate(3.142rad)',
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </div>
  );
};

export default Image;
