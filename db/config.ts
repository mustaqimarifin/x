import { defineDb, defineTable, column } from "astro:db"

const Views = defineTable({
  columns: {
    slug: column.text({ primaryKey: true, unique:true }),
    count: column.number({
      default: 1,
    }),
  },
})

export default defineDb({
  tables: { Views },
})
