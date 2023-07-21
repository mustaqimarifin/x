import KeyvRedis from "@keyv/redis";
import Keyv from "keyv";
import { extRedis, intRedis, isDev } from "lib/env";
const enabled = true;
let db: Keyv;

if (enabled) {
  const keyvRedis = new KeyvRedis(isDev ? intRedis : extRedis);
  db = new Keyv({ store: keyvRedis, namespace: "sexy" || undefined });
} else {
  db = new Keyv();
}

export { db };
