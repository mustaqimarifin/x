import Image from "next/image";
import { getScribblesDatabase } from "../data";
import { Parallax } from "components/Parallax";

export const revalidate = 300;

export default async function ScribblesPage() {
  const scribbles = await getScribblesDatabase();

  return (
    <Parallax>
      <div className="grid grid-cols-3 gap-2 px-8 py-8 max-lg:grid-cols-2 max-md:px-4">
        {scribbles.map((scribble) => (
          <div
            className="relative aspect-square overflow-hidden"
            key={scribble.id}
          >
            <Image
              src={`https://www.notion.so/image/${encodeURIComponent(
                scribble.Image
              )}?table=block&id=${scribble.id}`}
              alt="drawing"
              className="object-cover"
              fill
            ></Image>
          </div>
        ))}
      </div>
    </Parallax>
  );
}
