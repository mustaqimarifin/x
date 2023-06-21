import { CurrentENV } from "lib/env";
import {
  PostDatabaseItem,
  ProjectDatabaseItem,
  getPostDatabase,
  getProjectsDatabase,
} from "./data";

export default async function sitemap() {
  const posts: PostDatabaseItem[] = await getPostDatabase();

  posts.map((post) => ({
    url: `${CurrentENV}/posts/${post.slug}`,
    lastModified: post.date,
  }));

  const projects: ProjectDatabaseItem[] = await getProjectsDatabase();

  projects.map((project) => ({
    url: `${CurrentENV}/projects/${project.pageId}`,
    lastModified: project.date,
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
    url: `${CurrentENV}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...posts, ...projects];
}
