export const previewImagesEnabled = true;

// Whether to use the official public Notion API or the unofficial private API.
// Note that the official API doesn't expose formatting options for many blocks
// and is currently not as well-supported.
// If you want to use the official API, you must provide a NOTION_TOKEN env var.

export const isDev =
  process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

export const port = process.env.PORT || 3000;
export const rootDomain = isDev ? `localhost:${port}` : null;
