import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cx(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
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
import { SupportedStorage } from "@supabase/supabase-js";

export function textDecorationsToString(decorations: Decoration[]): string {
  return decorations.map((decoration) => decoration[0]).join("");
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

export const customStorageAdapter: SupportedStorage = {
  getItem: (key) => {
    if (typeof localStorage !== "undefined") {
      // Configure alternate storage
      return globalThis.localStorage.getItem(key);
    }
    return null;
  },
  setItem: (key, value) => {
    if (typeof localStorage !== "undefined") {
      // Configure alternate storage here
      return globalThis.localStorage.setItem(key, value);
    }
    return null;
  },
  removeItem: (key) => {
    if (typeof localStorage !== "undefined") {
      // Configure alternate storage here
      return globalThis.localStorage.removeItem(key);
    }
    return null;
  },
};
