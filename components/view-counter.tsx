"use client";

import { fetcher } from "lib/utils";
import { useEffect } from "react";
import useSWR from "swr";

type PostView = {
  slug: string;
  count: string;
  total: string;
};

export default function ViewCounter({
  slug,
  trackView,
}: {
  slug: string;
  trackView: boolean;
}) {
  const { data } = useSWR<PostView[]>("/api/page", fetcher);
  const viewsForSlug = data && data.find((view) => view.slug === slug);
  const views = new Number(viewsForSlug?.total || 0);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/page/${slug}`, {
        method: "POST",
      });

    if (trackView) {
      registerView();
    }
  }, [slug]);

  return (
    <>
      <p className="font-mono text-sm tracking-tighter text-neutral-500">
        {data ? `${views.toString()} views` : "​"}
      </p>
    </>
  );
}
