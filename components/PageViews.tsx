"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "lib/utils";
import { CounterProps } from "types";

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
    <p className="font-mono text-sm tracking-tighter text-rose-300 ">
      {data?.total ? `${data.total} views` : `–––`}
    </p>
  );
};

export default PageViews;
