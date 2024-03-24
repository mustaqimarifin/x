import ViewCounter from "@/components/counter";
import { increment } from "@/lib/actions";
import { rdx } from "@/lib/redis/connect";

export async function Views({ slug }: { slug: string }) {
  const views = (await rdx.get(["pageviews", slug].join(":"))) ?? 0;

  increment(slug);
  return <ViewCounter views={views} />;
}
