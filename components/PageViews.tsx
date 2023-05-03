"use client";
import useSWR from "swr";
import { FC, useEffect } from "react";

interface PageViewsProps {
  slug: string;
  total: string;
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

const PageViews = ({ slug, trackView }) => {
  const { data } = useSWR<PageViewsProps>(`/api/page/${slug}`, fetcher);

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
