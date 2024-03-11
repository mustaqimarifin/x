import Redis from "ioredis";
import { extRedis, intRedis, isDev, previews } from "lib/env";

//import Keyv from "@keyvhq/core";
//import KeyvRedis from "@keyvhq/redis";

let rdx = new Redis(isDev ? intRedis : extRedis);

/* if (previews!) {
  rdx = new Keyv({
    store: keyvRedis,
    namespace: "previews" || undefined,
  });
} else {
 rdx = new Keyv({
    store: keyvRedis,
    namespace: "cache" || undefined,
  });
} */

export { rdx };
