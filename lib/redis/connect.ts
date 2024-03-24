import Redis from "ioredis";
import { extRedis, intRedis, isDev } from "lib/env";

let rdx = new Redis(isDev ? intRedis : extRedis);

export { rdx };
