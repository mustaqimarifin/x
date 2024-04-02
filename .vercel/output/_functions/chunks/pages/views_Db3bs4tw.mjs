import { createRemoteDatabaseClient, asDrizzleTable } from '@astrojs/db/runtime';
import { eq, sql } from '@astrojs/db/dist/runtime/config.js';

const db = await createRemoteDatabaseClient(process.env.ASTRO_STUDIO_APP_TOKEN, {"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://mstqmarfn.vercel.app", "ASSETS_PREFIX": undefined}.ASTRO_STUDIO_REMOTE_DB_URL ?? "https://db.services.astro.build");
const Views = asDrizzleTable("Views", { "columns": { "slug": { "type": "text", "schema": { "unique": false, "deprecated": false, "name": "slug", "collection": "Views", "primaryKey": true } }, "count": { "type": "number", "schema": { "unique": false, "deprecated": false, "name": "count", "collection": "Views", "primaryKey": false, "optional": false, "default": 1 } } }, "deprecated": false, "indexes": {} }, false);

const prerender = false;
const GET = async ({ request }) => {
  const url = new URL(request.url);
  const params = new URLSearchParams(url.search);
  const slug = params.get("slug");
  if (!slug) {
    return new Response("Not found", { status: 404 });
  }
  let item;
  try {
    await db.select({
      count: Views.count
    }).from(Views).where(eq(Views.slug, slug));
    item = await db.insert(Views).values({
      slug,
      count: 1
    }).onConflictDoUpdate({
      target: Views.slug,
      set: {
        count: sql`count + 1`
      }
    }).returning({
      slug: Views.slug,
      count: Views.count
    }).then((res) => res[0]);
  } catch (error) {
    item = { slug, count: 1 };
  }
  return new Response(JSON.stringify(item), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=25"
    }
  });
};

const views = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

export { Views as V, db as d, views as v };
