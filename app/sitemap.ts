import {
  PostDatabaseItem,
  ProjectDatabaseItem,
  getPostDatabase,
  getProjectsDatabase,
} from "./data";

export default async function sitemap() {
  const posts: PostDatabaseItem[] = await getPostDatabase();

  posts.map((post) => ({
    url: `https://eff1gy.xyz/posts/${post.slug}`,
    lastModified: post.date,
  }));

  const projects: ProjectDatabaseItem[] = await getProjectsDatabase();

  projects.map((post) => ({
    url: `https://eff1gy.xyz/projects/${post.pageId}`,
    lastModified: post.date,
  }));

  const routes = [
    "",
    "/about",
    "/posts",
    "/projects",
    "/hotline",
    "/scribbles",
    "/uses",
  ].map((route) => ({
    url: `https://eff1gy.xyz${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts, ...projects];
}
