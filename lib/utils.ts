export const cx = (...classes: any[]) => classes.filter(Boolean).join(" ");

export function formatDate(input: number | string): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export const formatTags = (arr: string[]): string =>
  new Intl.ListFormat("en", { type: "conjunction" }).format(arr);

import { Decoration } from "notion-types";

export function textDecorationsToString(decorations: Decoration[]): string {
  return decorations.map((decoration) => decoration[0]).join("");
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
