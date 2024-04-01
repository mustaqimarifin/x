import { Views, db, sql } from "astro:db"

export async function increment(slug: string) {
  /* db.raw(sql`INSERT INTO ${views} (${slug}, count)  VALUES (${slug}, 1)  ON CONFLICT (slug)  DO UPDATE SET count = ${views.count} + 1`) */
  await db
    .insert(Views)
    .values({ slug, count: 1 })
    .onConflictDoUpdate({
      target: Views.slug,
      set: { count: sql`Views.count + 1` },
      //where: sql`${views.slug} AND 1=1`,
    })
}

//export const inc = cache(increment)

export async function getViewsCount(): Promise<
  { slug: string; count: number }[]
> {
  const view = await db.select().from(Views)
  return [...view]
}
