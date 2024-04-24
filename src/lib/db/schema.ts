import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core'

export const views = sqliteTable('view', {
  slug: text('slug').primaryKey().unique(),
  count: integer('count').notNull(),
})
