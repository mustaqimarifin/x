import {createClient} from '@libsql/client'
import {drizzle} from 'drizzle-orm/libsql'
import * as schema from './schema'
export const turso = createClient({
  url: import.meta.env.TURSO_URL,
  authToken: import.meta.env.TURSO_TOKEN,
})
export const dbx = drizzle(turso, {schema})
