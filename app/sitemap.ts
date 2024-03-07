import { CurrentENV } from "lib/env";
//let home = 'http://localhost:3000'
import { allBits, allPosts } from "lib/sanity/client";

export default async function sitemap() {
  allPosts.map((post) => ({
    url: `${CurrentENV}/posts/${post.slug}`,
    lastModified: post.date,
  }));

  allBits.map((project) => ({
    url: `${CurrentENV}/lilbits/${project.slug}`,
    lastModified: project.date,
  }));

  const routes = [
    "",
    "/about",
    "/posts",
    "/lilbits",
    "/scribbles",
    "/uses",
  ].map((route) => ({
    url: `${CurrentENV}/${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...allPosts, ...allBits];
}
