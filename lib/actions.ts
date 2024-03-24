import { rdx } from "lib/redis/connect";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

export async function increment(slug: string) {
  noStore();
  await rdx.incr(["pageviews", slug].join(":"));
}
