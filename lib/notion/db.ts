import Keyv from "keyv";
import KeyvRedis from "@keyv/redis";

export const previewImagesEnabled = true;

const keyvRedis = new KeyvRedis(process.env.UPSTASH_URL as string);
const keyDB = new Keyv({ store: keyvRedis, namespace: "tinyimg" || undefined });

export default keyDB;
