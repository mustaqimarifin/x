import { ProjectDatabaseItem, getProjectsDatabase } from "./data";

export default async function sitemap() {
  const posts: ProjectDatabaseItem[] = await getProjectsDatabase();

  posts.map((post) => ({
    url: `https://eff1gy.xyz/projects/${post.pageId}`,
    lastModified: post.date,
  }));

  const routes = ["", "/about", "/projects", "/guestbook", "/uses"].map(
    (route) => ({
      url: `https://eff1gy.xyz${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  );

  return [...routes, ...posts];
}
