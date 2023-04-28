"use client";
import useSWR from "swr";
import { FC, useEffect } from "react";

interface PageViewsProps {
  trackView: boolean;
  slug: string;
}

const fetcher = async (input: RequestInfo) => {
  const res: Response = await fetch(input);
  return await res.json();
};

const PageViews: FC<PageViewsProps> = ({ slug, trackView }) => {
  const { data } = useSWR(`/api/page/${slug}`, fetcher);

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
