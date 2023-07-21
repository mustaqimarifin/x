import { extRedis, intRedis, isDev, previews } from "lib/env";

import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";
import KeyvBrotli from "@keyv/compress-brotli";

let $$: Keyv;

if (previews!) {
  const keyvRedis = new KeyvRedis(isDev ? intRedis : extRedis);
  $$ = new Keyv({
    store: keyvRedis,
    compression: new KeyvBrotli(),
    namespace: "sexy" || undefined,
  });
} else {
  $$ = new Keyv();
}

export { $$ };
