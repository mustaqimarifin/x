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

  return <>{data?.total ? `${data.total} views` : `–––`}</>;
};

export default PageViews;
