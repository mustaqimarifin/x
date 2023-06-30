import { getPlaiceholder } from "plaiceholder";

const getImage = async (src: string) => {
  /*    const cachedPreviewImage = await get(src);
   if (cachedPreviewImage) {
     return cachedPreviewImage;
   } */
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );
  console.log(buffer);

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    hash: plaiceholder.base64,
    width,
    height,
  };
};

export default getImage;
