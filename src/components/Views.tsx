import {dbx} from '@lib/db'
import {TViewCounter, ViewCounter} from './view-counter'
import type {Views} from '@types'
import {sql} from 'drizzle-orm'
import {views} from '@lib/db/schema'

export async function getViews(): Promise<{slug: string; count: number}[]> {
  if (!dbx) {
    return []
  }
  const res = await dbx.select().from(views)
  //console.log(res)
  return res as Views[]
}

export async function ink(slug: string) {
  const res = await dbx
    .insert(views)
    .values({count: 1, slug: slug})
    .onConflictDoUpdate({
      target: views.slug,
      set: {count: sql`${views.count} + 1`},
    })
    .returning({count: views.count})

  return res[0].count
}

export async function TViews({slug}: {slug: string}) {
  const views = await getViews()
  return <TViewCounter allViews={views} slug={slug} />
}

export async function TADDViews({slug}: {slug: string}) {
  const views = await ink(slug)
  //const views = await getViewsCount();
  return <ViewCounter views={views} />
}
