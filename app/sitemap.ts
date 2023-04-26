import { ProjectDatabaseItem, getProjectsDatabase } from "./data";

export default async function sitemap() {
  const posts: ProjectDatabaseItem[] = await getProjectsDatabase();

  posts.map((post) => ({
    url: `http://localhost:3000/blog/${post.pageId}`,
    lastModified: post.date,
  }));

  const routes = ["", "/about", "/projects", "/guestbook", "/uses"].map(
    (route) => ({
      url: `http://localhost:3000${route}`,
      lastModified: new Date().toISOString().split("T")[0],
    })
  );

  return [...routes, ...posts];
}
