import {
  c as createComponent,
  d as renderTemplate,
  m as maybeRenderHead,
  u as unescapeHTML,
} from "./astro_B2yuyJSD.mjs";

const html =
  '<p>Astro Sphere comes preconfigured with social media links for Email, Github, Linked In and Twitter (X), but it’s very easy to add more.</p>\n<h3 id="edit-conststs">Edit <code>consts.ts</code></h3>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#7F848E;font-style:italic">// consts.ts</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#C678DD">export</span><span style="color:#C678DD"> const</span><span style="color:#E5C07B"> SOCIALS</span><span style="color:#ABB2BF">: </span><span style="color:#E5C07B">Socials</span><span style="color:#56B6C2"> =</span><span style="color:#ABB2BF"> [</span></span>\n<span class="line"><span style="color:#ABB2BF">  {</span></span>\n<span class="line"><span style="color:#E06C75">    NAME</span><span style="color:#ABB2BF">: </span><span style="color:#98C379">"Github"</span><span style="color:#ABB2BF">,</span></span>\n<span class="line"><span style="color:#E06C75">    ICON</span><span style="color:#ABB2BF">: </span><span style="color:#98C379">"github"</span><span style="color:#ABB2BF">,</span></span>\n<span class="line"><span style="color:#E06C75">    TEXT</span><span style="color:#ABB2BF">: </span><span style="color:#98C379">"markhorn-dev"</span><span style="color:#ABB2BF">,</span></span>\n<span class="line"><span style="color:#E06C75">    HREF</span><span style="color:#ABB2BF">: </span><span style="color:#98C379">"https://github.com/markhorn-dev/astro-sphere"</span></span>\n<span class="line"><span style="color:#ABB2BF">  },</span></span>\n<span class="line"><span style="color:#ABB2BF">]</span></span>\n<span class="line"></span></code></pre>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th align="left">Field</th><th align="left">Type</th><th align="left">Required</th><th align="left">Description</th></tr></thead><tbody><tr><td align="left">NAME</td><td align="left">string</td><td align="left">yes</td><td align="left">Accessible name</td></tr><tr><td align="left">ICON</td><td align="left">string</td><td align="left">yes</td><td align="left">Refers to the symbol id in <code>public/social.svg</code></td></tr><tr><td align="left">TEXT</td><td align="left">string</td><td align="left">yes</td><td align="left">Shorthand profile name</td></tr><tr><td align="left">HREF</td><td align="left">string</td><td align="left">yes</td><td align="left">The link to the social media profile</td></tr></tbody></table>\n<h3 id="edit-publicsocialsvg">Edit /public/social.svg</h3>\n<p>Simply add your own symbols to the svg sprite.</p>\n<p>It is recommended that all styles be removed from new symbols added, or they may not show up correctly or conflict with Tailwind’s classes.</p>\n<p>The id should match the icon field as specified in your <code>consts.ts</code> file.</p>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#7F848E;font-style:italic">&#x3C;!-- public/social.svg --></span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">svg</span><span style="color:#D19A66"> xmlns</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"http://www.w3.org/2000/svg"</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;</span><span style="color:#E06C75">defs</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">symbol</span><span style="color:#D19A66"> id</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"github"</span><span style="color:#D19A66"> viewBox</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"0 0 496 512"</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">      &#x3C;</span><span style="color:#E06C75">path</span></span>\n<span class="line"><span style="color:#D19A66">        d</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"</span></span>\n<span class="line"><span style="color:#ABB2BF">      /></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;/</span><span style="color:#E06C75">symbol</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;/</span><span style="color:#E06C75">defs</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">&#x3C;/</span><span style="color:#E06C75">svg</span><span style="color:#ABB2BF">></span></span>\n<span class="line"></span></code></pre>';

const frontmatter = {
  title: "Astro Sphere: Social media links",
  summary:
    "A quick tutorial on how to change, add or remove social media links",
  date: "Mar 11 2024",
  draft: false,
  tags: ["Tutorial", "Astro", "Astro Sphere"],
};
const file =
  "/home/vmp/Projects/x50/src/content/blog/06-astro-sphere-social-links/index.md";
const url = undefined;
function rawContent() {
  return '\nAstro Sphere comes preconfigured with social media links for Email, Github, Linked In and Twitter (X), but it\'s very easy to add more.\n\n### Edit `consts.ts`\n\n```js\n// consts.ts\n\nexport const SOCIALS: Socials = [\n  {\n    NAME: "Github",\n    ICON: "github",\n    TEXT: "markhorn-dev",\n    HREF: "https://github.com/markhorn-dev/astro-sphere"\n  },\n]\n```\n\n| Field | Type   | Required | Description                                    |\n| :---- | :----- | :------- | :--------------------------------------------- |\n| NAME  | string | yes      | Accessible name                                |\n| ICON  | string | yes      | Refers to the symbol id in `public/social.svg` |\n| TEXT  | string | yes      | Shorthand profile name                         |\n| HREF  | string | yes      | The link to the social media profile           |\n\n### Edit /public/social.svg\n\nSimply add your own symbols to the svg sprite.\n\nIt is recommended that all styles be removed from new symbols added, or they may not show up correctly or conflict with Tailwind\'s classes.\n\nThe id should match the icon field as specified in your `consts.ts` file.\n\n```html\n<!-- public/social.svg -->\n\n<svg xmlns="http://www.w3.org/2000/svg">\n  <defs>\n    <symbol id="github" viewBox="0 0 496 512">\n      <path\n        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"\n      />\n    </symbol>\n  </defs>\n</svg>\n```\n';
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [
    { depth: 3, slug: "edit-conststs", text: "Edit consts.ts" },
    { depth: 3, slug: "edit-publicsocialsvg", text: "Edit /public/social.svg" },
  ];
}

const Content = createComponent((result, _props, slots) => {
  const { layout, ...content } = frontmatter;
  content.file = file;
  content.url = url;

  return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
});

export {
  Content,
  compiledContent,
  Content as default,
  file,
  frontmatter,
  getHeadings,
  rawContent,
  url,
};
