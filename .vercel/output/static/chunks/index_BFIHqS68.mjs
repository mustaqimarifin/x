const id = "01-astro-sphere-file-structure/index.md";
const collection = "blog";
const slug = "01-astro-sphere-file-structure";
const body =
  "\nA one line summary of what each file and directory is for:\n\n```js\n/\n├── public/ // Files publicly available to the browser\n│   ├── fonts/ // The default fonts for Astro Sphere\n│   │   └── atkinson-bold.woff  // default font weight 700\n│   │   └── atkinson-regular.woff // default font weight 400\n│   ├── js/ // Javascript that will be imported into <head>\n│   │   └── animate.js // function for animating page elements\n│   │   └── bg.js // function for generating the background\n│   │   └── scroll.js // scroll handler for the header styles\n│   │   └── theme.js // controls the light and dark theme\n│   └── brand.svg //the icon that displays in header and footer\n│   └── favicon.svg //the icon that displays in the browser\n│   └── ui.svg // an svg sprite for all ui icons on the website\n│   └── social.svg // an svg sprite for all social media icons\n│   └── open-graph.jpg // the default image for open-graph\n│   └── robots.txt // for web crawlers and bots to index the website\n├── src/ // Everything that will be built for the website\n│   ├── components/ // All astro and SolidJs components\n│   ├── content/ // Contains all static markdown to be compiled\n│   │   |  blog/ // Contains all blog post markdown\n│   │   |  projects/ // Contains all projects markdown\n│   │   |  work/ // Contains all work page markdown\n│   │   |  legal/ // Contains all legal docs markdown\n│   │   └── config.ts // Contains the collection config for Astro\n│   ├── layouts/ // Reused layouts across the website\n│   └── pages/ // All of the pages on the website\n│   └── styles/ // CSS and global tailwind styles\n│   └── lib/ // Global helper functions\n│   └── consts.ts // Page metadata, general configuration\n│   └── types.ts // Types for consts.ts\n└── .gitignore // Files and directories to be ignored by Git\n└── .eslintignore // Files and directories to be ignored by ESLint\n└── eslintrc.cjs // ESLint configuration\n└── astro.config.mjs // Astro configuration\n└── tailwind.config.mjs // Tailwind configuration\n└── tsconfig.json // Typescript configuration\n└── package.json // All the installed packages\n```\n";
const data = {
  title: "⊛ Astro Sphere: File Structure",
  summary:
    "You'll find these directories and files in the project. What do they do?",
  date: new Date(1710604800000),
  tags: ["Tutorial", "Astro", "Astro Sphere"],
  draft: false,
};
const _internal = {
  type: "content",
  filePath:
    "/home/vmp/Projects/x50/src/content/blog/01-astro-sphere-file-structure/index.md",
  rawData: undefined,
};

export { _internal, body, collection, data, id, slug };
