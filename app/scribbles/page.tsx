import { getScribblesDatabase } from "../data";
import { Metadata } from "next/types";
import "app/style/notion2.css";
import Image from "next/image";
import getImage from "components/Notion/imgMeta";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Scribbles",
  description: "Gallery of wolves",
};

export default async function ScribblesPage() {
  const scribbles = await getScribblesDatabase();

  return (
    <section>
      <h1 className="mb-5 font-serif text-3xl font-bold">Scribbles</h1>
      <div className="container w-full max-w-3xl">
        <div className="mx-auto mb-8 mt-4 grid  md:grid-cols-2 ">
          {scribbles.map((scribble) => (
            <div className=" flex-none" key={scribble.id}>
              <Image
                alt={""}
                src={`https://www.notion.so/image/${encodeURIComponent(
                  scribble.pic ?? scribble.Image
                )}?table=block&id=${scribble.id}`}
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
