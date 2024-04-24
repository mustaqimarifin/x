import {views} from '@lib/db/schema'
import type {APIRoute} from 'astro'
import {sql} from 'drizzle-orm'
import {dbx} from 'src/lib/db/index.js'
export const prerender = false

export const GET: APIRoute = async ({params}) => {
  const slug = params.slug
  const res = await dbx
    .insert(views)
    .values({count: 1, slug})
    .onConflictDoUpdate({
      target: views.slug,
      set: {count: sql`${views.count} + 1`},
    })
    .returning({count: views.count})

  let data = res[0].count

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
