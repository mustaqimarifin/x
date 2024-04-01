import { getViewsCount, increment } from "@lib/actions"
import ViewCounter from "./ViewCounter.astro"

export async function IncViews({ slug }: { slug: string }) {
  const views = await getViewsCount()
  increment(slug)
  return <ViewCounter allViews={views} slug={slug} />
}
export const Views = async ({ slug }: { slug: string }) => {
  const views = await getViewsCount()
  return <ViewCounter allViews={views} slug={slug} />
}
/* export const Views = cache(
  async ({ slug }: { slug: string }) => {
	let views = await getViewsCount();
	return <ViewCounter allViews={views} slug={slug} />;
},['views'])
 */
