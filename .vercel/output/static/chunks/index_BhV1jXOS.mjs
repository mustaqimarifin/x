const id = "03-astro-sphere-add-new-post-or-projects/index.md";
const collection = "blog";
const slug = "03-astro-sphere-add-new-post-or-projects";
const body =
  '\n### Basics\n\nCreate a folder in the respective collection you wish to create content. The name of the folder will be the slug in which your content will be found.\n\n```text\ncreating the following\n\n/content/blog/my-new-post/index.md\n\nwill be published to\n\nhttps://yourdomain.com/blog/my-new-post\n\n```\n\n### Frontmatter\n\nFront matter is in yaml if you are familiar with the format. All posts and projects require frontmatter at the top of the document to be imported. All frontmatter must be inside triple dashes, similar to Astro format. See example below.\n\n### Blog Collection\n\n| Field   | Type    | Req? | Description                                                  |\n| :------ | :------ | :--- | :----------------------------------------------------------- |\n| title   | string  | yes  | Title of the post. Used in SEO.                              |\n| summary | string  | yes  | Short description of the post. Used in SEO.                  |\n| date    | string  | yes  | Any string date that javascript can convert. Used in sorting |\n| tags    | array   | yes  | Post topic. Array of strings. Used in filtering.             |\n| draft   | boolean | no   | Hides the post from collections. Unpublished entry.          |\n\nExample blog post frontmatter\n\n```yaml\n---\ntitle: "Astro Sphere: Adding a new post or project."\nsummary: "Adding a new article (blog post or project) is pretty easy."\ndate: "Mar 18 2024"\ndraft: false\ntags:\n  - Tutorial\n  - Astro\n  - Astro Sphere\n---\n```\n\n### Projects Collection (extends Blog Collection)\n\n| Field   | Type    | Req? | Description                                                  |\n| :------ | :------ | :--- | :----------------------------------------------------------- |\n| title   | string  | yes  | Title of the post. Used in SEO.                              |\n| summary | string  | yes  | Short description of the post. Used in SEO.                  |\n| date    | string  | yes  | Any string date that javascript can convert. Used in sorting |\n| tags    | array   | yes  | Post topic. Array of strings. Used in filtering.             |\n| draft   | boolean | no   | Hides the post from collections. Unpublished entry.          |\n| demoUrl | string  | no   | A link to the deployed project, if applicable.               |\n| repoUrl | string  | no   | A link to the repository, if applicable.                     |\n\nExample project frontmatter\n\n```yaml\n---\ntitle: "Mustaqim Arifin"\nsummary: "Astro Sphere, a portfolio and blog for designers and developers."\ndate: "Mar 18 2024"\ndraft: false\ntags:\n  - Astro\n  - Typescript\n  - Javascript\n  - Tailwind\n  - SolidJS\ndemoUrl: https://mstqmarfn.vercel.app\nrepoUrl: https://github.com/markhorn-dev/astro-sphere\n---\n```\n\n### Write your content\n\nYou\'ve made it this far, all that is left to do is write your content beneath the frontmatter. Writing markdown will be covered in the next article.\n';
const data = {
  title: "Astro Sphere: Adding a new post or project.",
  summary: "Adding a new article (blog post or project) is pretty easy.",
  date: new Date(1710345600000),
  tags: ["Tutorial", "Astro", "Astro Sphere"],
  draft: false,
};
const _internal = {
  type: "content",
  filePath:
    "/home/vmp/Projects/x50/src/content/blog/03-astro-sphere-add-new-post-or-projects/index.md",
  rawData: undefined,
};

export { _internal, body, collection, data, id, slug };
