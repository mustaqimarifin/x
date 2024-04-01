import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal } from "solid-js"

import ArrowCard from "./ArrowCard"
//mport { cn } from "@lib/utils"

type Props = {
  tags?: string[];
  data: CollectionEntry<"blog">[];
};

export default function Blog({ data }: Props) {
  const [filter] = createSignal(new Set<string>())
  const [posts, setPosts] = createSignal<CollectionEntry<"blog">[]>([])
  const sortedPosts = posts().sort((a, b) => {
  const aDate = a.data.date
  const bDate = b.data.date
  return Date.parse(bDate.toString()) - Date.parse(aDate.toString())
})

  

  createEffect(() => {
    setPosts(
      data.filter((entry) =>
        Array.from(filter()).every((value) =>
          entry.data.tags.some(
            (tag: string) => tag.toLowerCase() === String(value).toLowerCase(),
          ),
        ),
      ),
    )
  })

  /*   function toggleTag(tag: string) {
    setFilter((prev) => 
      new Set(prev.has(tag) 
        ? [...prev].filter((t) => t !== tag) 
        : [...prev, tag]
      )
    )
  }
 */
  return (
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/*  <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Filter</div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li>
                  <button onClick={() => toggleTag(tag)} class={cn("w-full px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-black/5 dark:bg-white/10", "hover:bg-black/10 hover:dark:bg-white/15", "transition-colors duration-300 ease-in-out", filter().has(tag) && "text-black dark:text-white")}>
                    <svg class={cn("size-5 fill-black/50 dark:fill-white/50", "transition-colors duration-300 ease-in-out", filter().has(tag) && "fill-black dark:fill-white")}>
                      <use href={`/ui.svg#square`} class={cn(!filter().has(tag) ? "block" : "hidden")} />
                      <use href={`/ui.svg#square-check`} class={cn(filter().has(tag) ? "block" : "hidden")} />
                    </svg>
                    {tag}
                  </button>
                </li>
              )}
            </For>
          </ul>
        </div> */}
      <div class="sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2">
            SHOWING {sortedPosts.length} OF {data.length} POSTS
          </div>
          <ul class="flex flex-col gap-3">
            {posts().map((post) => (
              <li>
                <ArrowCard entry={post} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
