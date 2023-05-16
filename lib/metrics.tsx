import "server-only";

//import { Octokit } from "@octokit/rest";
import { cache } from "react";
import supabase from "lib/supabase/client";
//import supabase from "./supabase-browser";

export const getBlogViews = cache(async () => {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const { data } = await supabase.from("pageviews").select("*");

  return data?.reduce((acc, row) => acc + row.view_count, 0);
});

export async function getTweetCount() {
  if (!process.env.TWITTER_API_TOKEN) {
    return 0;
  }

  const response = await fetch(
    `https://api.twitter.com/2/users/by/username/vmprmyth?user.fields=public_metrics`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_API_TOKEN}`,
      },
    }
  );

  const { data } = await response.json();
  return Number(data.public_metrics.tweet_count);
}
