export const previewImagesEnabled = true;

export const isDev =
  process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export const port = process.env.PORT || 3000;
export const rootDomain = isDev ? `localhost:${port}` : null;
