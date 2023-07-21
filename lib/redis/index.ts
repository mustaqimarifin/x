import { extRedis, intRedis, isDev } from "lib/env";

import { Redis } from "ioredis";
import { PreIMG } from "components/Notion/meta2";
import JSONB from "json-buffer";
export const redis = new Redis(isDev ? intRedis : extRedis);

type Etch = {
  key: string;
  fetcher: () => {};
  expires?: number;
};

export const etch = async <T>(
  key: string,
  fetcher: () => T,
  expires: number,
): Promise<T> => {
  let existing = await redis.get(key);
  if (existing !== null) return existing as any;
  return set(key, fetcher, expires);
};

export const get = async <T>(key: string): Promise<T> => {
  const value: string = await redis.get(key);
  if (value === null) return null;
  return JSONB.parse(value);
};

export const set = async (key, fetcher, expires) => {
  const value = fetcher();
  await redis.set(key, JSONB.stringify(value), "EX", expires);
  return value;
};

export const del = async (key: string) => {
  await redis.del(key);
};
