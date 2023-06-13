import Link from "next/link";
import Image from "next/image";
import { getBlogViews, getTweetCount } from "lib/metrics";
import { ArrowIcon, TwitterIcon, ViewsIcon } from "components/UI/icons";
import { name, about, bio, avatar } from "lib/info";
import Balancer from "react-wrap-balancer";
import NowPlaying from "components/UI/NowPlaying";

export const revalidate = 60;

export default async function HomePage() {
  let views: number; //tweetCount: number

  try {
    [views] = await Promise.all([getBlogViews()]);
  } catch (error) {
    console.error(error);
  }

  return (
    <section>
      <h1 className="max-w-[650px] font-serif text-3xl font-bold">
        <Balancer>{name}</Balancer>
      </h1>

      <p className="my-5 max-w-[460px] text-neutral-800 dark:text-neutral-200">
        {about()}
      </p>
      <div className="my-8 flex  flex-col items-start md:flex-row md:items-center">
        <Image
          alt={name}
          className="rounded-full grayscale transition hover:grayscale-0"
          src={avatar}
          placeholder="blur"
          width={100}
          priority
        />
        <div className="ml-0 mt-8 space-y-2 text-neutral-500 dark:text-neutral-400 md:ml-6 md:mt-0">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/vmprmyth"
            className="flex items-center gap-2"
          >
            <TwitterIcon />
            {/*  { `${tweetCount?.toString()} tweets all time` } */}
          </a>

          <Link href="/projects" className="flex items-center">
            <ViewsIcon />
            {`${views.toString()} blog views all time`}
          </Link>
          <div>
            <NowPlaying />
          </div>
        </div>
      </div>
      <p className="my-5 max-w-[600px] text-neutral-800 dark:text-neutral-200">
        {bio()}
      </p>
      <ul className="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-500 dark:text-neutral-400 md:flex-row md:space-x-4 md:space-y-0">
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/vmprmyth"
          >
            <ArrowIcon />
            <p className="h-7">follow me on twitter</p>
          </a>
        </li>
        <li>
          <a
            className="flex items-center transition-all hover:text-neutral-700 dark:hover:text-neutral-200"
            rel="noopener noreferrer"
            target="_blank"
            href="https://leerob.substack.com"
          >
            <ArrowIcon />
            <p className="h-7">get email updates</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
