import { getScribblesDatabase } from "../data";
import { Metadata } from "next/types";
import "app/style/notion2.css";
import Image from "components/Pics";
import CoverImage from "components/CoverImage";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Scribbles",
  description: "Gallery of wolves",
};

export default async function ScribblesPage() {
  const scribbles = await getScribblesDatabase();
  console.log(scribbles);

  return (
    <section>
      <h1 className="mb-5 font-serif text-3xl font-bold">Scribbles</h1>
      <div className="container w-full">
        <div className="prose mx-auto mb-8 mt-4 gap-2  ">
          {scribbles.map((scribble) => (
            <CoverImage
              src={`https://www.notion.so/image/${encodeURIComponent(
                scribble.Image
              )}?table=block&id=${scribble.id}`}
              //alt={""}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
