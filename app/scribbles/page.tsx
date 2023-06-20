import Image from "next/image";
import { getScribblesDatabase } from "../data";
import { Suspense } from "react";
import { LoadingSpinner } from "components/UI/spinner";

export const dynamic = "force-static";

export default async function ScribblesPage() {
  const scribbles = await getScribblesDatabase();

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <div className="grid gap-2 px-8 py-8 max-md:px-4  md:grid-cols-2">
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
              width={500}
              height={500}
            ></Image>
          </div>
        ))}
      </div>
    </Suspense>
  );
}
