import { Kysely, PostgresDialect } from "kysely";
import { DB } from "types/kysely";
import { Pool } from "pg";

export const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: "postgresql://postgres@localhost:5432/ass",
    }),
  }),
});
