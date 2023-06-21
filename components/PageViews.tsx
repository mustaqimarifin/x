"use client";
import useSWR from "swr";
import { useEffect } from "react";
import { fetcher } from "lib/utils";
import { CounterProps } from "types";
import { LoadingSpinner } from "./UI/spinner";

export const PageViews = ({ slug, trackView }: CounterProps) => {
  const { data } = useSWR<CounterProps>(`/api/pageviews/${slug}`, fetcher);

  useEffect(() => {
    const registerView = () =>
      fetch(`/api/pageviews/${slug}`, {
        method: "POST",
      });
    if (trackView) {
      registerView();
    }
  }, [slug, trackView]);

  return (
    <p className=" flex-none text-sm font-semibold tracking-tighter text-red-400 ">
      {data?.total ? `${data.total} views` : <LoadingSpinner />}
    </p>
  );
};
