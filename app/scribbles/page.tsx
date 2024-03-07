import { Metadata } from "next/types";
import "app/style/notion2.css";
import Image from "next/image";
import { getScribblesDatabase } from "app/data";
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Scribbles",
  description: "Gallery of wolves",
};

export default async function ScribblesPage({
  params,
}: {
  params: { id: string };
}) {
  const scribbles = await getScribblesDatabase();
  const postId = scribbles[0].id;
  console.log(postId);

  const imgSRC = `https://www.notion.so/image/${encodeURIComponent(
    scribbles[0].pic ?? scribbles[0].Image,
  )}?table=block&id=${postId}`;

  return (
 <div className="grid grid-cols-3 gap-2 px-8 py-8 max-md:px-4 max-lg:grid-cols-2">
      {scribbles.map((scribble) => (
        <div className="relative aspect-square" key={scribble.id}>
          <Image
            src={imgSRC}
            alt="drawing"
            fill={true}
          ></Image>
        </div>
      ))}
    </div>
  );
}
