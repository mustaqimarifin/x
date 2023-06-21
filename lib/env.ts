export const PostDB = process.env.POST_DB!;
export const GalleryDB = process.env.GALLERY_DB!;
export const ProjectsDB = process.env.PROJECT_DB!;

export const environment = process.env.NODE_ENV || "development";
export const isDev = environment === "development";
export const isPreview =
  process.env.VERCEL_ENV === "preview" ||
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview";
export const previewURL =
  process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL;
export const domain = process.env.NODE_ENV === "production" ? "eff1gy.xyz" : "";

export const CurrentENV = isDev
  ? `http://localhost:3000`
  : isPreview
  ? `https://${previewURL}`
  : `https://${domain}`;
