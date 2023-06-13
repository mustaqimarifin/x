"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "lib/utils";

interface CounterProps {
  slug: string;
  total?: string;
  trackView: boolean;
}

const PageViews = ({ slug, trackView }: CounterProps) => {
  const { data } = useSWR<CounterProps>(`/api/page/${slug}`, fetcher);

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
    <p className="font-mono text-sm tracking-tighter text-neutral-500">
      {data?.total ? `${data.total} views` : `–––`}
    </p>
  );
};

export default PageViews;
