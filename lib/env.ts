

export const intRedis = "redis://localhost:6379"

export const extRedis = process.env.UPSTASH!;
export const previews = true;

export const environment = process.env.NODE_ENV || "development";
export const isDev = environment === "development";
export const isProd = environment === "production";

export const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";

export const liveURL = "mstqmarfn.vercel.app";

export const CurrentENV = isProd
  ? `https://${liveURL}`
  : `http://localhost:3000`;
