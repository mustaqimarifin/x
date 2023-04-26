import { ProjectDatabaseItem, getProjectsDatabase } from "./data";

export default async function sitemap() {
  const posts: ProjectDatabaseItem[] = await getProjectsDatabase();

  posts.map((post) => ({
    url: `https://x-three-steel.vercel.app/projects/${post.pageId}`,
    lastModified: post.date,
  }));

  const routes = ["", "/about", "/projects", "/guestbook", "/uses"].map(
    (route) => ({
      url: `https://x-three-steel.vercel.app${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  );

  return [...routes, ...posts];
}
