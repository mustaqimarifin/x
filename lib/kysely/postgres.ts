import { Kysely } from "kysely"
import { DB } from "types/kysely"
import { PlanetScaleDialect } from "kysely-planetscale"


export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: process.env.MYSQL as string,
  }),
})
