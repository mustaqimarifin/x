import { getScribblesDatabase } from '../data';
import { Metadata } from 'next/types';
import 'app/style/notion2.css';

import Image from 'next/legacy/image';
import { PreIMG } from 'components/Notion/imgMeta';
import { getPreviewImage } from 'components/Notion/meta2';
import { normalizeUrl } from 'notion-utils';
import { Suspense } from 'react';
import { LoadingDots } from 'components/States';
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Scribbles',
  description: 'Gallery of wolves',
};

export default async function ScribblesPage({ params }) {
  const scribbles = await getScribblesDatabase();
  const postId = scribbles.find((p) => p.pic ?? p.Image === params.id)?.id;
  const imgSRC = `https://www.notion.so/image/${encodeURIComponent(
    scribbles[0].pic ?? scribbles[0].Image
  )}?table=block&id=${postId}`;
  const cacheKey = normalizeUrl(imgSRC);

  const p: PreIMG = await getPreviewImage(imgSRC, { cacheKey });
  return (
    <section>
      <h1 className="mb-5 font-serif text-3xl font-bold">Scribbles</h1>
      <Suspense fallback={<LoadingDots />}>
        <div className="container w-full max-w-3xl">
          <div className="mx-auto mb-8 mt-4 grid  md:grid-cols-2 ">
            {scribbles &&
              scribbles.map((scribble) => (
                <div className=" flex-none" key={scribble.id}>
                  <Image
                    src={imgSRC}
                    width={p.w}
                    height={p.h}
                    placeholder={`blur` ?? `empty`}
                    blurDataURL={p.b}
                  />
                </div>
              ))}
          </div>
        </div>
      </Suspense>
    </section>
  );
}
