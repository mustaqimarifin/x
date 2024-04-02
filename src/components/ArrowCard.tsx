import { formatDate } from "@lib/utils"
import type { CollectionEntry } from "astro:content"
//import ViewTotal from "./ViewTotal.astro"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects">;
  pill?: boolean;
};

export default function ArrowCard({ entry, pill }: Props) {
  const { collection, data, slug } = entry
  const { title, summary, date, tags } = data
  return (
    <a
      href={`/${collection}/${slug}`}
      class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
    >
      <div class="w-full group-hover:text-black group-hover:dark:text-white blend">
        <div class="flex flex-wrap items-center gap-2">
          {pill && (
            <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
              {collection === "blog" ? "post" : "project"}
            </div>
          )}
          <div class="font-mono tabular-nums text-xs uppercase">
            {formatDate(date)}
            {/*   <div class="flex-1 mr-4">{<ViewTotal slug={entry.slug} />}</div> */}
          </div>
        </div>
        <div class="font-semibold mt-3 text-black dark:text-white">{title}</div>

        <div class="text-sm line-clamp-2">{summary}</div>
        <ul class="flex flex-wrap mt-2 gap-1 text-xs font-bold font-mono  uppercase">
          {tags.map(
            (
              tag: string, // this line has an error; Parameter 'tag' implicitly has an 'any' type.ts(7006)
            ) => (
              <li class=" py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
                {tag}
              </li>
            ),
          )}
        </ul>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white"
      >
        <line
          x1="5"
          y1="12"
          x2="19"
          y2="12"
          class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
        />
        <polyline
          points="12 5 19 12 12 19"
          class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"
        />
      </svg>
    </a>
  )
}