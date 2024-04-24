import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const views = sqliteTable("view", {
  slug: text("slug").primaryKey().unique(),
  count: integer("count").notNull()
});

const schema = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  views
}, Symbol.toStringTag, { value: 'Module' }));

const turso = createClient({
  url: "libsql://seekwool-mustaqimarifin.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE5MzYwMTAsImlkIjoiOWZiYzZiZmMtMmZiMi0xMWVlLWJjNWItZGE5MGQyNmIyNDM3In0.7vgmW3IN-hCMw-NXtySZT_qh0Zwh3fzoVLTEsz070PoBbwfVdY2bfF2uMlMowGr1Fcnz_FoRIfGwek25nW-8Bw"
});
const dbx = drizzle(turso, { schema });

const prerender = false;
const GET = async ({ params }) => {
  const slug = params.slug;
  const res = await dbx.insert(views).values({ count: 1, slug }).onConflictDoUpdate({
    target: views.slug,
    set: { count: sql`${views.count} + 1` }
  }).returning({ count: views.count });
  return new Response(JSON.stringify(res[0].count), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

export { GET, prerender };
