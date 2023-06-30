/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import db from './connect';
import JSONB from 'json-buffer';

export const fetch = async <T>(key: string, data: () => T, expires: number) => {
  const existing: T = await db.get(key);
  if (existing !== null) return existing;
  return set(key, data, expires);
};

export const get = async <T>(key: string): Promise<T> => {
  const data: string = await db.get(key);
  return JSONB.parse(data);
};

export const set = async <T>(
  key: string,
  data: () => T,
  expires?: number
): Promise<T> => {
  const value = data();
  await db.set(key, JSONB.stringify(data), 'EX', expires);
  return value;
};

export const del = async (key: string) => {
  await db.del(key);
};
