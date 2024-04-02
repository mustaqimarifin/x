import { A as AstroError, U as UnknownContentCollectionError, b as createComponent, f as renderUniqueStylesheet, h as renderScriptElement, i as createHeadAndContent, r as renderTemplate, j as renderComponent, u as unescapeHTML, c as createAstro, e as addAttribute, m as maybeRenderHead, k as renderSlot, l as renderHead } from './astro_CFKn3T1_.mjs';
import { ssr, ssrHydrationKey, escape, createComponent as createComponent$1, ssrAttribute } from 'solid-js/web';
import { createSignal, createEffect, For } from 'solid-js';
import { d as db, V as Views } from './pages/views_Db3bs4tw.mjs';
import { sql } from '@astrojs/db/dist/runtime/config.js';
import rss from '@astrojs/rss';
import Fuse from 'fuse.js';
import { p as prependForwardSlash } from './astro/assets-service_CkDDNIHh.mjs';
/* empty css                          */

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign({"BASE_URL": "/", "MODE": "production", "DEV": false, "PROD": true, "SSR": true, "SITE": "https://mstqmarfn.vercel.app", "ASSETS_PREFIX": undefined}, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/01-astro-sphere-file-structure/index.md": () => import('./index_BFIHqS68.mjs'),"/src/content/blog/02-astro-sphere-getting-started/index.md": () => import('./index_BHugBb8V.mjs'),"/src/content/blog/03-astro-sphere-add-new-post-or-projects/index.md": () => import('./index_BhV1jXOS.mjs'),"/src/content/blog/04-astro-sphere-writing-markdown/index.md": () => import('./index_DLOrxP66.mjs'),"/src/content/blog/05-astro-sphere-writing-mdx/index.mdx": () => import('./index_DXw4mX8m.mjs'),"/src/content/blog/06-astro-sphere-social-links/index.md": () => import('./index_BVLoFNzC.mjs'),"/src/content/legal/privacy.md": () => import('./privacy_cG8FGS2L.mjs'),"/src/content/legal/terms.md": () => import('./terms_zUptzAIL.mjs'),"/src/content/projects/project-1/index.md": () => import('./index_CZj2pH73.mjs'),"/src/content/projects/project-2/index.md": () => import('./index_cG6I2KdY.mjs'),"/src/content/projects/project-3/index.md": () => import('./index_lxaQMI29.mjs'),"/src/content/projects/project-4/index.md": () => import('./index_CZD_E37g.mjs'),"/src/content/work/apple.md": () => import('./apple_DUUaxWku.mjs'),"/src/content/work/facebook.md": () => import('./facebook_DXfn1Wi9.mjs'),"/src/content/work/google.md": () => import('./google_YKxnQbAz.mjs'),"/src/content/work/mcdonalds.md": () => import('./mcdonalds_Bxl-l3W7.mjs')});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"legal":{"type":"content","entries":{"privacy":"/src/content/legal/privacy.md","terms":"/src/content/legal/terms.md"}},"work":{"type":"content","entries":{"apple":"/src/content/work/apple.md","facebook":"/src/content/work/facebook.md","google":"/src/content/work/google.md","mcdonalds":"/src/content/work/mcdonalds.md"}},"blog":{"type":"content","entries":{"01-astro-sphere-file-structure":"/src/content/blog/01-astro-sphere-file-structure/index.md","02-astro-sphere-getting-started":"/src/content/blog/02-astro-sphere-getting-started/index.md","03-astro-sphere-add-new-post-or-projects":"/src/content/blog/03-astro-sphere-add-new-post-or-projects/index.md","04-astro-sphere-writing-markdown":"/src/content/blog/04-astro-sphere-writing-markdown/index.md","05-astro-sphere-writing-mdx":"/src/content/blog/05-astro-sphere-writing-mdx/index.mdx","06-astro-sphere-social-links":"/src/content/blog/06-astro-sphere-social-links/index.md"}},"projects":{"type":"content","entries":{"project-1":"/src/content/projects/project-1/index.md","project-2":"/src/content/projects/project-2/index.md","project-3":"/src/content/projects/project-3/index.md","project-4":"/src/content/projects/project-4/index.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/blog/01-astro-sphere-file-structure/index.md": () => import('./index_ByWRPSg1.mjs'),"/src/content/blog/02-astro-sphere-getting-started/index.md": () => import('./index_Cn-EWhs9.mjs'),"/src/content/blog/03-astro-sphere-add-new-post-or-projects/index.md": () => import('./index_DkMJllGd.mjs'),"/src/content/blog/04-astro-sphere-writing-markdown/index.md": () => import('./index_B5dEqCPs.mjs'),"/src/content/blog/05-astro-sphere-writing-mdx/index.mdx": () => import('./index_CSvVOjN8.mjs'),"/src/content/blog/06-astro-sphere-social-links/index.md": () => import('./index_OCYKlAmA.mjs'),"/src/content/legal/privacy.md": () => import('./privacy_1nIRay2I.mjs'),"/src/content/legal/terms.md": () => import('./terms_-xi-raGy.mjs'),"/src/content/projects/project-1/index.md": () => import('./index_BOrdc8QC.mjs'),"/src/content/projects/project-2/index.md": () => import('./index_DwbE-hti.mjs'),"/src/content/projects/project-3/index.md": () => import('./index_CXVZKhDk.mjs'),"/src/content/projects/project-4/index.md": () => import('./index_MQzCvgWu.mjs'),"/src/content/work/apple.md": () => import('./apple_CNYo-uoI.mjs'),"/src/content/work/facebook.md": () => import('./facebook_k8rzd8cv.mjs'),"/src/content/work/google.md": () => import('./google_BFF3_kif.mjs'),"/src/content/work/mcdonalds.md": () => import('./mcdonalds_7zoqzrBa.mjs')});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$l = createAstro("https://mstqmarfn.vercel.app");
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$l, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/home/vmp/Projects/x50/node_modules/.pnpm/astro@4.5.12_typescript@5.4.3/node_modules/astro/components/ViewTransitions.astro", void 0);

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$Astro$k = createAstro("https://mstqmarfn.vercel.app");
const $$BaseHead = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$k, $$props, $$slots);
  Astro2.self = $$BaseHead;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const { title, description, image = "/open-graph.jpg" } = Astro2.props;
  return renderTemplate(_a$2 || (_a$2 = __template$2(['<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', '><!-- <link rel="preload" href="/fonts/atkinson-regular.woff" as="font" type="font/woff" crossorigin>\n<link rel="preload" href="/fonts/atkinson-bold.woff" as="font" type="font/woff" crossorigin> --><!-- Canonical URL --><link rel="canonical"', "><!-- Primary Meta Tags --><title>", '</title><meta name="title"', '><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- Sitemap --><link rel="sitemap" href="/sitemap-index.xml"><!-- RSS Feed --><link rel="alternate" type="application/rss+xml"', "", '><!-- Global Scripts --><script src="/js/theme.js"><\/script><script src="/js/scroll.js"><\/script><script src="/js/animate.js"><\/script><script src="/js/top.js"><\/script>', ""])), addAttribute(Astro2.generator, "content"), addAttribute(canonicalURL, "href"), title, addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(title, "title"), addAttribute(`${Astro2.site}rss.xml`, "href"), renderComponent($$result, "ViewTransitions", $$ViewTransitions, {}));
}, "/home/vmp/Projects/x50/src/components/BaseHead.astro", void 0);

const SITE = {
  TITLE: "Mustaqim Arifin",
  DESCRIPTION: "Welcome to My Ass, a portfolio and blog for designers and developers.",
  AUTHOR: "Mustaqim Arifin"
};
const WORK = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked."
};
const BLOG = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about."
};
const PROJECTS = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on."
};
const SEARCH = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword."
};
const LINKS = [
  {
    TEXT: "Home",
    HREF: "/"
  },
  {
    TEXT: "Work",
    HREF: "/work"
  },
  {
    TEXT: "Blog",
    HREF: "/blog"
  },
  {
    TEXT: "Projects",
    HREF: "/projects"
  }
];
const SOCIALS = [
  {
    NAME: "Email",
    ICON: "email",
    TEXT: "markhorn.dev@gmail.com",
    HREF: "mailto:markhorn.dev@gmail.com"
  },
  {
    NAME: "Github",
    ICON: "github",
    TEXT: "markhorn-dev",
    HREF: "https://github.com/markhorn-dev/astro-sphere"
  },
  {
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "markhorn-dev",
    HREF: "https://www.linkedin.com/in/markhorn-dev/"
  },
  {
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "markhorn_dev",
    HREF: "https://twitter.com/markhorn_dev"
  }
];

const $$Astro$j = createAstro("https://mstqmarfn.vercel.app");
const $$Container = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$j, $$props, $$slots);
  Astro2.self = $$Container;
  const { size } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute([
    "w-full h-full mx-auto px-5",
    size === "sm" && "max-w-screen-sm",
    size === "md" && "max-w-screen-md",
    size === "lg" && "max-w-screen-lg",
    size === "xl" && "max-w-screen-xl",
    size === "2xl" && "max-w-screen-2xl"
  ], "class:list")}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/vmp/Projects/x50/src/components/Container.astro", void 0);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Astro$i = createAstro("https://mstqmarfn.vercel.app");
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$i, $$props, $$slots);
  Astro2.self = $$Header;
  const { pathname } = Astro2.url;
  const subpath = pathname.match(/[^/]+/g);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<header id="header" class="fixed top-0 w-full h-16 z-50 " data-astro-cid-3ef6ksr2> ', ' </header>  <script>\n  function toggleDrawer() {\n    const drawer = document.getElementById("drawer")\n    const drawerButton = document.getElementById("header-drawer-button")\n    drawer?.classList.toggle("open")\n    drawerButton?.classList.toggle("open")\n  }\n\n  function initializeDrawerButton() {\n    const drawerButton = document.getElementById("header-drawer-button")\n    drawerButton?.addEventListener("click", toggleDrawer)\n  }\n\n  document.addEventListener("astro:after-swap", initializeDrawerButton)\n  initializeDrawerButton()\n<\/script>'])), maybeRenderHead(), renderComponent($$result, "Container", $$Container, { "size": "md", "data-astro-cid-3ef6ksr2": true }, { "default": ($$result2) => renderTemplate` <div class="relative h-full w-full" data-astro-cid-3ef6ksr2> <div class="absolute left-0 top-1/2 -translate-y-1/2 flex gap-1 font-semibold" data-astro-cid-3ef6ksr2> <a href="/" class="flex gap-1 text-current hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out" data-astro-cid-3ef6ksr2> <svg class="size-6 fill-current" data-astro-cid-3ef6ksr2> <use href="/kit.svg#kit" data-astro-cid-3ef6ksr2></use> </svg> <div data-astro-cid-3ef6ksr2> ${SITE.TITLE} </div> </a> </div> <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" data-astro-cid-3ef6ksr2> <nav class="hidden md:flex items-center justify-center text-sm gap-1" data-astro-cid-3ef6ksr2> ${LINKS.map((LINK) => renderTemplate`<a${addAttribute(LINK.HREF, "href")}${addAttribute(["h-8 rounded-full px-3 text-current", "flex items-center justify-center", "transition-colors duration-300 ease-in-out", pathname === LINK.HREF || "/" + subpath?.[0] === LINK.HREF ? "bg-black dark:bg-white text-white dark:text-black" : "hover:bg-black/5 dark:hover:bg-white/20 hover:text-black dark:hover:text-white"], "class:list")} data-astro-cid-3ef6ksr2> ${LINK.TEXT} </a>`)} </nav> </div> <div class="buttons absolute right-0 top-1/2 -translate-y-1/2 flex gap-1" data-astro-cid-3ef6ksr2> <a href="/search"${addAttribute(`Search blog posts and projects on ${SITE.TITLE}`, "aria-label")}${addAttribute(["hidden md:flex", "size-9 rounded-full p-2 items-center justify-center", "bg-transparent hover:bg-black/5 dark:hover:bg-white/20", "stroke-current hover:stroke-black hover:dark:stroke-white", "border border-black/10 dark:border-white/25", "transition-colors duration-300 ease-in-out", pathname === "/search" || "/" + subpath?.[0] === "/search" ? "pointer-events-none bg-black dark:bg-white text-white dark:text-black" : ""], "class:list")} data-astro-cid-3ef6ksr2> <svg class="size-full" data-astro-cid-3ef6ksr2> <use href="/ui.svg#search" data-astro-cid-3ef6ksr2></use> </svg> </a> <a href="/rss.xml" target="_blank"${addAttribute(`Rss feed for ${SITE.TITLE}`, "aria-label")}${addAttribute(["hidden md:flex", "size-9 rounded-full p-2 items-center justify-center", "bg-transparent hover:bg-black/5 dark:hover:bg-white/20", "stroke-current hover:stroke-black hover:dark:stroke-white", "border border-black/10 dark:border-white/25", "transition-colors duration-300 ease-in-out"], "class:list")} data-astro-cid-3ef6ksr2> <svg class="size-full" data-astro-cid-3ef6ksr2> <use href="/ui.svg#rss" data-astro-cid-3ef6ksr2></use> </svg> </a> <button id="header-theme-button"${addAttribute(`Toggle light and dark theme`, "aria-label")}${addAttribute(["hidden md:flex", "size-9 rounded-full p-2 items-center justify-center", "bg-transparent hover:bg-black/5 dark:hover:bg-white/20", "stroke-current hover:stroke-black hover:dark:stroke-white", "border border-black/10 dark:border-white/25", "transition-colors duration-300 ease-in-out"], "class:list")} data-astro-cid-3ef6ksr2> <svg class="size-full block dark:hidden" data-astro-cid-3ef6ksr2> <use href="/ui.svg#sun" data-astro-cid-3ef6ksr2></use> </svg> <svg class="size-full hidden dark:block" data-astro-cid-3ef6ksr2> <use href="/ui.svg#moon" data-astro-cid-3ef6ksr2></use> </svg> </button> <button id="header-drawer-button"${addAttribute(`Toggle drawer open and closed`, "aria-label")}${addAttribute(["flex md:hidden", "size-9 rounded-full p-2 items-center justify-center", "bg-transparent hover:bg-black/5 dark:hover:bg-white/20", "stroke-current hover:stroke-black hover:dark:stroke-white", "border border-black/10 dark:border-white/25", "transition-colors duration-300 ease-in-out"], "class:list")} data-astro-cid-3ef6ksr2> <svg id="drawer-open" class="size-full" data-astro-cid-3ef6ksr2> <use href="/ui.svg#menu" data-astro-cid-3ef6ksr2></use> </svg> <svg id="drawer-close" class="size-full" data-astro-cid-3ef6ksr2> <use href="/ui.svg#x" data-astro-cid-3ef6ksr2></use> </svg> </button> </div> </div> ` }));
}, "/home/vmp/Projects/x50/src/components/Header.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$h = createAstro("https://mstqmarfn.vercel.app");
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$h, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate`${maybeRenderHead()}<footer class="relative bg-white dark:bg-black"> <div class="animate"> <section class="py-5"> ${renderComponent($$result, "Container", $$Container, { "size": "md" }, { "default": ($$result2) => renderTemplate` <div class="flex items-center justify-center sm:justify-end"> <button id="back-to-top" aria-label="Back to top of page" class="group flex w-fit p-1.5 gap-1.5 text-sm items-center border rounded hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white rotate-90"> <line x1="19" y1="12" x2="5" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out"></line> <polyline points="12 19 5 12 12 5" class="translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"></polyline> </svg> <div class="w-full group-hover:text-black group-hover:dark:text-white transition-colors duration-300 ease-in-out">
Back to top
</div> </button> </div> ` })} </section> <section class=" py-5 overflow-hidden whitespace-nowrap border-t border-black/10 dark:border-white/25"> ${renderComponent($$result, "Container", $$Container, { "size": "md" }, { "default": ($$result2) => renderTemplate(_a || (_a = __template([' <div class="grid grid-cols-1 sm:grid-cols-2 gap-3"> <div class="flex flex-col items-center sm:items-start"> <a href="/" class="flex gap-1 w-fit font-semibold text-current hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"> <svg class="size-6 fill-current"> <use href="/brand.svg#brand"></use> </svg> ', ' </a> </div> <div id="clock" class=" font-bold font-mono tabular-nums text-gray-700 dark:text-gray-50 flex gap-2 justify-center sm:justify-end items-center"> <span class="relative flex h-3 w-3"> <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300"></span> <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span> </span> <script src="/js/clock.js"><\/script> </div> </div> '])), SITE.TITLE) })} </section> <section class=" py-5 overflow-hidden whitespace-nowrap border-t border-black/10 dark:border-white/25"> ${renderComponent($$result, "Container", $$Container, { "size": "md" }, { "default": ($$result2) => renderTemplate` <div class="h-full grid grid-cols-1 sm:grid-cols-2 gap-3"> <div class="order-2 sm:order-1 flex flex-col items-center justify-center sm:items-start"> <div class="legal"> <a href="/legal/terms" class="text-current hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out">
Terms
</a> |
<a href="/legal/privacy" class="text-current hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out">
Privacy
</a> </div> <div class="text-sm mt-2">
&copy; 2024 | All rights reserved
</div> </div> <div class="order-1 sm:order-2 flex justify-center sm:justify-end"> <div class="flex flex-wrap gap-1 items-center justify-center"> ${SOCIALS.map((SOCIAL) => renderTemplate`<a${addAttribute(SOCIAL.HREF, "href")} target="_blank"${addAttribute(`${SITE.TITLE} on ${SOCIAL.NAME}`, "aria-label")} class="group size-10 rounded-full p-2 items-center justify-center hover:bg-black/5 dark:hover:bg-white/20  blend"> <svg class="size-full fill-current group-hover:fill-black group-hover:dark:fill-white blend"> <use${addAttribute(`/social.svg#${SOCIAL.ICON}`, "href")}></use> </svg> </a>`)} </div> </div> </div> ` })} </section> </div> </footer>`;
}, "/home/vmp/Projects/x50/src/components/Footer.astro", void 0);

const $$Astro$g = createAstro("https://mstqmarfn.vercel.app");
const $$Drawer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$g, $$props, $$slots);
  Astro2.self = $$Drawer;
  const { pathname } = Astro2.url;
  const subpath = pathname.match(/[^/]+/g);
  return renderTemplate`${maybeRenderHead()}<div id="drawer" class="fixed inset-0 h-0 z-40 overflow-hidden flex flex-col items-center justify-center md:hidden bg-neutral-100 dark:bg-neutral-900 transition-[height] duration-300 ease-in-out" data-astro-cid-hxtyo74s> <nav class="flex flex-col items-center space-y-2" data-astro-cid-hxtyo74s> ${LINKS.map((LINK) => renderTemplate`<a${addAttribute(LINK.HREF, "href")}${addAttribute(["flex items-center justify-center px-3 py-1 rounded-full", "text-current hover:text-black dark:hover:text-white", "hover:bg-black/5 dark:hover:bg-white/20", "transition-colors duration-300 ease-in-out", pathname === LINK.HREF || "/" + subpath?.[0] === LINK.HREF ? "pointer-events-none bg-black dark:bg-white text-white dark:text-black" : ""], "class:list")} data-astro-cid-hxtyo74s> ${LINK.TEXT} </a>`)} </nav> <div class="flex gap-1 mt-5" data-astro-cid-hxtyo74s> <a href="/search"${addAttribute(`Search blog posts and projects on ${SITE.TITLE}`, "aria-label")}${addAttribute(["size-9 rounded-full p-2 items-center justify-center bg-transparent hover:bg-black/5 dark:hover:bg-white/20 stroke-current hover:stroke-black hover:dark:stroke-white border border-black/10 dark:border-white/25 transition-colors duration-300 ease-in-out", pathname === "/search" || "/" + subpath?.[0] === "search" ? "pointer-events-none bg-black dark:bg-white text-white dark:text-black" : ""], "class:list")} data-astro-cid-hxtyo74s> <svg class="size-full" data-astro-cid-hxtyo74s> <use href="/ui.svg#search" data-astro-cid-hxtyo74s></use> </svg> </a> <a href="/rss.xml" target="_blank"${addAttribute(`Rss feed for ${SITE.TITLE}`, "aria-label")} class="size-9 rounded-full p-2 items-center justify-center bg-transparent hover:bg-black/5 dark:hover:bg-white/20 stroke-current hover:stroke-black hover:dark:stroke-white border border-black/10 dark:border-white/25 transition-colors duration-300 ease-in-out" data-astro-cid-hxtyo74s> <svg class="size-full" data-astro-cid-hxtyo74s> <use href="/ui.svg#rss" data-astro-cid-hxtyo74s></use> </svg> </a> <button id="drawer-theme-button"${addAttribute(`Toggle light and dark theme`, "aria-label")} class="size-9 rounded-full p-2 items-center justify-center bg-transparent hover:bg-black/5 dark:hover:bg-white/20 stroke-current hover:stroke-black hover:dark:stroke-white border border-black/10 dark:border-white/25 transition-colors duration-300 ease-in-out" data-astro-cid-hxtyo74s> <svg class="block dark:hidden size-full" data-astro-cid-hxtyo74s> <use href="/ui.svg#sun" data-astro-cid-hxtyo74s></use> </svg> <svg class="hidden dark:block size-full" data-astro-cid-hxtyo74s> <use href="/ui.svg#moon" data-astro-cid-hxtyo74s></use> </svg> </button> </div> </div> `;
}, "/home/vmp/Projects/x50/src/components/Drawer.astro", void 0);

const $$Astro$f = createAstro("https://mstqmarfn.vercel.app");
const $$PageLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$f, $$props, $$slots);
  Astro2.self = $$PageLayout;
  const { title, description } = Astro2.props;
  return renderTemplate`<html lang="en"> <head>${renderComponent($$result, "BaseHead", $$BaseHead, { "title": `${title} | ${SITE.TITLE}`, "description": description })}${renderHead()}</head> <body> ${renderComponent($$result, "Header", $$Header, {})} ${renderComponent($$result, "Drawer", $$Drawer, {})} <main> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Footer", $$Footer, {})} </body></html>`;
}, "/home/vmp/Projects/x50/src/layouts/PageLayout.astro", void 0);

const $$Astro$e = createAstro("https://mstqmarfn.vercel.app");
const $$TopLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$e, $$props, $$slots);
  Astro2.self = $$TopLayout;
  return renderTemplate`${maybeRenderHead()}<div class="pt-36 pb-5"> ${renderComponent($$result, "Container", $$Container, { "size": "md" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </div>`;
}, "/home/vmp/Projects/x50/src/layouts/TopLayout.astro", void 0);

const $$Astro$d = createAstro("https://mstqmarfn.vercel.app");
const $$BottomLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$BottomLayout;
  return renderTemplate`${maybeRenderHead()}<div class="flex-1 py-5"> ${renderComponent($$result, "Container", $$Container, { "size": "md" }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })} </div>`;
}, "/home/vmp/Projects/x50/src/layouts/BottomLayout.astro", void 0);

const cn = (...classes) => classes.filter(Boolean).join(" ");
function formatDate(date) {
  return Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
}
function readingTime(html) {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
}

var _tmpl$$4 = ["<a", ' href="', '" class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"><div class="w-full group-hover:text-black group-hover:dark:text-white blend"><div class="flex flex-wrap items-center gap-2"><!--$-->', '<!--/--><div class="font-mono tabular-nums text-xs uppercase">', '</div></div><div class="font-semibold mt-3 text-black dark:text-white">', '</div><div class="text-sm line-clamp-2">', '</div><ul class="flex flex-wrap mt-2 gap-1 text-xs font-bold font-mono uppercase">', '</ul></div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white"><line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"></line><polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"></polyline></svg></a>'], _tmpl$2$4 = ["<div", ' class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">', "</div>"], _tmpl$3$3 = ["<li", ' class=" py-0.5 px-1 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">', "</li>"];
function ArrowCard({
  entry,
  pill
}) {
  const {
    collection,
    data,
    slug
  } = entry;
  const {
    title,
    summary,
    date,
    tags
  } = data;
  return ssr(_tmpl$$4, ssrHydrationKey(), `/${escape(collection, true)}/${escape(slug, true)}`, pill && ssr(_tmpl$2$4, ssrHydrationKey(), collection === "blog" ? "post" : "project"), escape(formatDate(date)), escape(title), escape(summary), escape(tags.map((tag) => ssr(_tmpl$3$3, ssrHydrationKey(), escape(tag)))));
}

var _tmpl$$3 = ["<div", ' class="w-full grid grid-cols-1 sm:grid-cols-2 gap-6"><div class="sm:col-span-2"><div class="flex flex-col"><div class="text-sm uppercase mb-2">SHOWING <!--$-->', "<!--/--> OF <!--$-->", '<!--/--> POSTS</div><ul class="flex flex-col gap-3">', "</ul></div></div></div>"], _tmpl$2$3 = ["<li", ">", "</li>"];
function Blog({
  data
}) {
  const [filter] = createSignal(/* @__PURE__ */ new Set());
  const [posts, setPosts] = createSignal([]);
  const sortedPosts = posts().sort((a, b) => {
    const aDate = a.data.date;
    const bDate = b.data.date;
    return Date.parse(bDate.toString()) - Date.parse(aDate.toString());
  });
  createEffect(() => {
    setPosts(data.filter((entry) => Array.from(filter()).every((value) => entry.data.tags.some((tag) => tag.toLowerCase() === String(value).toLowerCase()))));
  });
  return ssr(_tmpl$$3, ssrHydrationKey(), escape(sortedPosts.length), escape(data.length), escape(posts().map((post) => ssr(_tmpl$2$3, ssrHydrationKey(), escape(createComponent$1(ArrowCard, {
    entry: post
  }))))));
}

const $$Astro$c = createAstro("https://mstqmarfn.vercel.app");
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Index$4;
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const tags = [...new Set(posts.flatMap((post) => post.data.tags))].sort((a, b) => a.localeCompare(b));
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": BLOG.TITLE, "description": BLOG.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TopLayout", $$TopLayout, {}, { "default": ($$result3) => renderTemplate`  ` })} ${renderComponent($$result2, "BottomLayout", $$BottomLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate"> ${renderComponent($$result3, "Blog", Blog, { "client:load": true, "tags": tags, "data": posts, "client:component-hydration": "load", "client:component-path": "@components/Blog", "client:component-export": "default" })} </div> ` })} ` })}`;
}, "/home/vmp/Projects/x50/src/pages/blog/index.astro", void 0);

const $$file$8 = "/home/vmp/Projects/x50/src/pages/blog/index.astro";
const $$url$8 = "/blog";

const index$4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$4,
    file: $$file$8,
    url: $$url$8
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$b = createAstro("https://mstqmarfn.vercel.app");
const $$ViewCounter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ViewCounter;
  const { slug } = Astro2.props;
  let item;
  try {
    item = await db.insert(Views).values({
      slug,
      count: 1
    }).onConflictDoUpdate({
      target: Views.slug,
      set: {
        count: sql`count + 1`
      }
    }).returning({
      slug: Views.slug,
      count: Views.count
    });
  } catch (error) {
    console.error(error);
    item = { slug, count: 1 };
  }
  return renderTemplate`${maybeRenderHead()}<div> <p>Views: ${item[0].count}</p> </div>`;
}, "/home/vmp/Projects/x50/src/components/ViewCounter.astro", void 0);

const $$Astro$a = createAstro("https://mstqmarfn.vercel.app");
const $$ArticleTopLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$ArticleTopLayout;
  const slug = Astro2.params.slug;
  const { entry } = Astro2.props;
  const { collection, data, body } = entry;
  const { title, summary, date } = data;
  const demoUrl = collection === "projects" ? data.demoUrl : null;
  const repoUrl = collection === "projects" ? data.repoUrl : null;
  return renderTemplate`${maybeRenderHead()}<div> <a${addAttribute(`/${collection}`, "href")} class="group w-fit p-1.5 gap-1.5 text-sm flex items-center border rounded hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white"> <line x1="19" y1="12" x2="5" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-3 group-hover:translate-x-0 transition-all duration-300 ease-in-out"></line> <polyline points="12 19 5 12 12 5" class="translate-x-1 group-hover:translate-x-0 transition-all duration-300 ease-in-out"></polyline> </svg> <div class="w-full group-hover:text-black group-hover:dark:text-white transition-colors duration-300 ease-in-out">
Back to ${collection} </div> </a> <div class="flex flex-wrap text-sm uppercase mt-12 gap-3 opacity-75"> <div class="flex items-center gap-2"> <svg class="size-5 stroke-current"> <use href="/ui.svg#calendar"></use> </svg> ${formatDate(date)} </div> ${renderComponent($$result, "ViewCounter", $$ViewCounter, { "slug": slug })} <div class="flex items-center gap-2"> <svg class="size-5 stroke-current"> <use href="/ui.svg#book-open"></use> </svg> ${readingTime(body)} </div> </div> <h1 class="text-3xl font-semibold text-black dark:text-white mt-2"> ${title} </h1> <div class="mt-1"> ${summary} </div> ${(demoUrl || repoUrl) && renderTemplate`<div class="mt-4 flex flex-wrap gap-2"> ${demoUrl && renderTemplate`<a${addAttribute(demoUrl, "href")} target="_blank" class="group flex gap-2 items-center px-3 py-1.5 truncate rounded text-xs md:text-sm lg:text-base border border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 blend"> <svg class="size-4"> <use href="/ui.svg#globe" class="fill-current group-hover:fill-black group-hover:dark:fill-white blend"></use> </svg> <span class="text-current group-hover:text-black group-hover:dark:text-white blend">
See Demo
</span> </a>`} ${repoUrl && renderTemplate`<a${addAttribute(repoUrl, "href")} target="_blank" class="group flex gap-2 items-center px-3 py-1.5 truncate rounded text-xs md:text-sm lg:text-base border border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 blend"> <svg class="size-4"> <use href="/ui.svg#link" class="fill-current group-hover:fill-black group-hover:dark:fill-white blend"></use> </svg> <span class="text-current group-hover:text-black group-hover:dark:text-white blend">
See Repository
</span> </a>`} </div>`} </div>`;
}, "/home/vmp/Projects/x50/src/layouts/ArticleTopLayout.astro", void 0);

const $$Astro$9 = createAstro("https://mstqmarfn.vercel.app");
const $$ArticleBottomLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$ArticleBottomLayout;
  const { entry } = Astro2.props;
  const { collection } = entry;
  const { Content } = await entry.render();
  const items = await getCollection(collection);
  const index = items.findIndex((x) => x.slug === entry.slug);
  const prev = items[(index - 1 + items.length) % items.length];
  const next = items[(index + 1) % items.length];
  return renderTemplate`${maybeRenderHead()}<div> <article> ${renderComponent($$result, "Content", Content, {})} </article> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"> <a${addAttribute(`/${prev.collection}/${prev.slug}`, "href")} class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 blend"> <div class="order-2 w-full h-full group-hover:text-black group-hover:dark:text-white blend"> <div class="flex flex-wrap gap-2"> <div class="text-sm uppercase">
Prev
</div> </div> <div class="font-semibold mt-3 text-black dark:text-white"> ${prev.data.title} </div> </div> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="order-1 stroke-current group-hover:stroke-black group-hover:dark:stroke-white rotate-180"> <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"></line> <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"></polyline> </svg> </a> <a${addAttribute(`/${next.collection}/${next.slug}`, "href")} class="group p-4 gap-3 flex items-center border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"> <div class="w-full h-full text-right group-hover:text-black group-hover:dark:text-white blend"> <div class="text-sm uppercase">
Next
</div> <div class="font-semibold mt-3 text-black dark:text-white"> ${next.data.title} </div> </div> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white"> <line x1="5" y1="12" x2="19" y2="12" class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out"></line> <polyline points="12 5 19 12 12 19" class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out"></polyline> </svg> </a> </div> </div>`;
}, "/home/vmp/Projects/x50/src/layouts/ArticleBottomLayout.astro", void 0);

const $$Astro$8 = createAstro("https://mstqmarfn.vercel.app");
async function getStaticPaths$2() {
  const posts = await getCollection("blog");
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post
  }));
}
const $$$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$$2;
  const post = Astro2.props;
  const { title, summary } = post.data;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": title, "description": summary }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TopLayout", $$TopLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate"> ${renderComponent($$result3, "ArticleTopLayout", $$ArticleTopLayout, { "entry": post })} </div> ` })} ${renderComponent($$result2, "BottomLayout", $$BottomLayout, {}, { "default": ($$result3) => renderTemplate` <div class="animate"> ${renderComponent($$result3, "ArticleBottomLayout", $$ArticleBottomLayout, { "entry": post })} </div> ` })} ` })}`;
}, "/home/vmp/Projects/x50/src/pages/blog/[...slug].astro", void 0);

const $$file$7 = "/home/vmp/Projects/x50/src/pages/blog/[...slug].astro";
const $$url$7 = "/blog/[...slug]";

const ____slug_$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$$2,
    file: $$file$7,
    getStaticPaths: getStaticPaths$2,
    url: $$url$7
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$7 = createAstro("https://mstqmarfn.vercel.app");
const $$StackCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$StackCard;
  const { text, icon, href } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} target="_blank" class="w-fit px-3 py-2 group rounded border flex gap-2 items-center border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 hover:dark:bg-neutral-800 blend"> <svg${addAttribute(20, "height")}${addAttribute(20, "width")}> <use${addAttribute(`/stack.svg#${icon}`, "href")}></use> </svg> <span class="text-sm capitalize text-neutral-500 dark:text-neutral-400 group-hover:text-black group-hover:dark:text-white blend"> ${text} </span> </a>`;
}, "/home/vmp/Projects/x50/src/components/StackCard.astro", void 0);

var _tmpl$$2 = ["<div", ' class="text-xs uppercase">', "</div>"], _tmpl$2$2 = ["<a", ' href="', '" class="group gap-3 flex items-center rounded-lg hover:bg-black/5 hover:dark:bg-white/10 transition-colors duration-300 ease-in-out"><div class="w-full group-hover:text-black group-hover:dark:text-white blend"><div class="flex items-center align-middle gap-2"><!--$-->', '<!--/--><span class="font-semibold text-black dark:text-white">', "</span><span>", "</span></div></div></a>"], _tmpl$3$2 = ["<div", ' class="text-sm capitalize px-2 py-0.5 ">', "</div>"];
function PostList({
  entry,
  pill
}) {
  const fDate = () => ssr(_tmpl$$2, ssrHydrationKey(), escape(formatDate(entry.data.date)));
  return ssr(_tmpl$2$2, ssrHydrationKey(), `/${escape(entry.collection, true)}/${escape(entry.slug, true)}`, pill && ssr(_tmpl$3$2, ssrHydrationKey(), entry.collection === "blog" ? "post" : "project"), escape(entry.data.title), escape(fDate()));
}

const $$Astro$6 = createAstro("https://mstqmarfn.vercel.app");
const $$Index2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Index2;
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 3);
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime()).slice(0, 3);
  const stack = [
    {
      text: "Astro",
      icon: "astro",
      href: "https://astro.build"
    },
    {
      text: "Javascript",
      icon: "javascript",
      href: "https://www.javascript.com"
    },
    {
      text: "Typescript",
      icon: "typescript",
      href: "https://www.typescriptlang.org"
    },
    {
      text: "Tailwind",
      icon: "tailwind",
      href: "https://tailwindcss.com"
    }
  ];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Home", "description": SITE.DESCRIPTION }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="absolute inset-0 block dark:hidden"> <div id="particles1" class="fixed inset-0"></div> <div id="particles2" class="fixed inset-0"></div> <div id="particles3" class="fixed inset-0"></div> </div>  <div class="absolute inset-0 bg-black hidden dark:block"> <div id="stars1" class="fixed inset-0"></div> <div id="stars2" class="fixed inset-0"></div> <div id="stars3" class="fixed inset-0"></div> </div>   <section class="relative h-screen w-full"> <!--     <div id="planetcont" class='animate absolute inset-0 top-1/4 overflow-hidden'>
      <div id="crescent" class='absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] min-h-[100vh] aspect-square rounded-full p-[1px] bg-gradient-to-b from-black/25 dark:from-white/75 from-0% to-transparent to-5%'>
        <div id="planet" class='w-full h-full bg-white dark:bg-black rounded-full p-[1px] overflow-hidden flex justify-center'>
          <div id="blur" class='w-full h-20 rounded-full bg-neutral-900/25 dark:bg-white/25 blur-3xl'/>
        </div>
      </div>
    </div> --> <div class="animate absolute h-full w-full flex items-center justify-center"> <div class="relative w-full h-full flex items-center justify-center"> <div class="p-5 text-center"> <p class="animated text-lg md:text-xl lg:text-2xl font-semibold opacity-75">
Hello, I am Mark
</p> <p class="animated text-2xl md:text-3xl lg:text-4xl font-bold uppercase text-black dark:text-white">
Software Engineer
</p> <p class="animated text-sm md:text-base lg:text-lg opacity-75">
Currently designing products for humans.
</p> <div id="ctaButtons" class="animated flex flex-wrap gap-4 justify-center mt-5"> <a href="/blog" class="py-2 px-4 rounded truncate text-xs md:text-sm lg:text-base bg-black dark:bg-white text-white dark:text-black hover:opacity-75 blend">
Read my blog
</a> <a href="/work" class="py-2 px-4 truncate rounded text-xs md:text-sm lg:text-base border border-black/25 dark:border-white/25 hover:bg-black/5 hover:dark:bg-white/15 blend">
View my work
</a> </div> </div> </div> </div> </section> <div class="relative bg-white dark:bg-black"> <div class="mx-auto max-w-screen-sm p-5 space-y-24 pb-16"> <!-- About Section --> <section class="animate"> <article>
About
Hi, I’m Andy Bell—a designer, front-end developer and design agency founder—based in the UK. I have worked in the design and web industries for over 15 years, and in that time, I have worked with some of the largest organisations in the world, like Google, Harley-Davidson, BSkyB, Unilever, The Natural History Museum, Oracle, Capita, Vice Media and the NHS.

Over these years, I have worked on both extremely large projects for huge organisations and tiny projects for small startups. This has given me a lot of experience over a large variety of project types. It also means I’ve worked with a lot of teams in various sizes—each with their own constraints and goals. These projects vary between design systems, creative campaign work and good ol’ websites.

I mostly specialise in CSS—whether that is writing a course for Google, co-authoring a book on CSS layout, or creating a methodology to help people write better CSS. A big chunk of our client work involves us applying this experience to help teams write better CSS—often by helping them create a design system.

You can catch up with me on Mastodon, Threads, Bluesky (@bell.bz), Twitter, CodePen or Github. There’s some other links here, too.

Enquiries
I run Set Studio, a creative agency that specialises in building excellent websites for everyone. We currently have availability for projects starting in Q2 2023, onwards.

I’m also an international keynote speaker and have availability for talks in 2023 onwards. You can see a previous talk, here.

For all enquiries, please send me an email at andy@set.studio or drop a message on the Set Studio contact form.

Profile Picture
Just in case you need to steal a picture:
<p>I am a <b><i>software engineer</i></b>, <b><i>ui/ux designer</i></b>, <b><i>product planner</i></b>, <b><i>mentor</i></b>, <b><i>student</i></b>, <b><i>minimalist</i></b>, <b><i>eternal optimist</i></b>, <b><i>crypto enthusiast</i></b> and <b><i>sarcasm connoisseur</i></b>.</p> <p>I love to both build and break things. I am motivated by challenging projects with self-guided research and dynamic problem solving. My true passion is crafting creative front end designs with unique takes on color, typography and motion.</p> <p>During my career</p> <p>I have built products ranging from marketing and ecommerce websites to complex enterprise apps with focus on delivering fast, elegant code along with delightful user interfaces.</p> <p>Now</p> <p>I currently work as a software engineer at StreamlineFS, where I do product planning, design and development.</p> </article> </section> <!-- Blog Preview Section --> <section class="animate"> <div class="space-y-4"> <div class="flex justify-between"> <p class="font-semibold text-black dark:text-white">
Recent posts
</p> <a href="/blog" class="w-fit col-span-3 group flex gap-1 items-center underline decoration-[.5px] decoration-black/25 dark:decoration-white/50 hover:decoration-black dark:hover:decoration-white text-black dark:text-white underline-offset-2 blend"> <span class="text-black/75 dark:text-white/75 group-hover:text-black group-hover:dark:text-white blend">
All posts
</span> </a> </div> <ul class="space-y-4"> ${posts.map((post) => renderTemplate`<li> ${renderComponent($$result2, "PostList", PostList, { "entry": post })} </li>`)} </ul> </div> </section> <!-- Tech Stack Section --> <section class="animate"> <div class="space-y-4"> <p class="font-semibold text-black dark:text-white">
Website build with
</p> <div class="flex flex-wrap items-center gap-2 mt-5"> ${stack.map((item) => renderTemplate`${renderComponent($$result2, "StackCard", $$StackCard, { "text": item.text, "icon": item.icon, "href": item.href })}`)} </div> <div>
Performing reactivity and statefulness, special guest
<a href="https://www.solidjs.com/" target="_blank" class="w-fit group underline decoration-[.5px] decoration-black/25 dark:decoration-white/50 hover:decoration-black dark:hover:decoration-white text-black dark:text-white underline-offset-2 blend"> <span class="text-black/75 dark:text-white/75 group-hover:text-black group-hover:dark:text-white blend">
SolidJS
</span> </a> </div> </div> </section> <!-- Project Preview Section --> <section class="animate"> <div class="space-y-4"> <div class="flex justify-between"> <p class="font-semibold text-black dark:text-white">
Recent projects
</p> <a href="/projects" class="w-fit col-span-3 group flex gap-1 items-center underline decoration-[.5px] decoration-black/25 dark:decoration-white/50 hover:decoration-black dark:hover:decoration-white text-black dark:text-white underline-offset-2 blend"> <span class="text-black/75 dark:text-white/75 group-hover:text-black group-hover:dark:text-white blend">
All projects
</span> </a> </div> <ul class="space-y-4"> ${projects.map((project) => renderTemplate`<li> ${renderComponent($$result2, "ArrowCard", ArrowCard, { "entry": project })} </li>`)} </ul> </div> </section> <!-- Contact Section --> <section class="animate"> <div> <p class="font-semibold text-black dark:text-white">
Let's Connect
</p> <p>
Reach out to me via email or on social media.
</p> <div class="grid grid-cols-4 gap-y-2 mt-4 auto-cols-min"> ${SOCIALS.map((social) => renderTemplate`<div class="col-span-1 flex items-center gap-1"> <span class="whitespace-nowrap truncate"> ${social.NAME} </span> </div>
              <div class="col-span-3 truncate"> <a${addAttribute(social.HREF, "href")} target="_blank" class="w-fit col-span-3 group flex gap-1 items-center underline decoration-[.5px] decoration-black/25 dark:decoration-white/50 hover:decoration-black dark:hover:decoration-white text-black dark:text-white underline-offset-2 blend"> <span class="text-black/75 dark:text-white/75 group-hover:text-black group-hover:dark:text-white blend"> ${social.TEXT} </span> </a> </div>`)} </div> </div></section> </div> </div> ` })}`;
}, "/home/vmp/Projects/x50/src/pages/index2.astro", void 0);

const $$file$6 = "/home/vmp/Projects/x50/src/pages/index2.astro";
const $$url$6 = "/index2";

const index2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index2,
    file: $$file$6,
    url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$5 = createAstro("https://mstqmarfn.vercel.app");
async function getStaticPaths$1() {
  const docs = await getCollection("legal");
  return docs.map((doc) => ({
    params: { slug: doc.slug },
    props: doc
  }));
}
const $$$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$$1;
  const doc = Astro2.props;
  const { title, date } = doc.data;
  const { Content } = await doc.render();
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": title, "description": `${title} for ${SITE.TITLE}` }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TopLayout", $$TopLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate"> <div class="page-heading"> ${title} </div> <p class="font-normal opacity-75">
Last updated: ${formatDate(date)} </p> </div> ` })} ${renderComponent($$result2, "BottomLayout", $$BottomLayout, {}, { "default": ($$result3) => renderTemplate` <article class="animate"> ${renderComponent($$result3, "Content", Content, {})} </article> ` })} ` })}`;
}, "/home/vmp/Projects/x50/src/pages/legal/[...slug].astro", void 0);

const $$file$5 = "/home/vmp/Projects/x50/src/pages/legal/[...slug].astro";
const $$url$5 = "/legal/[...slug]";

const ____slug_$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$$1,
    file: $$file$5,
    getStaticPaths: getStaticPaths$1,
    url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

var _tmpl$$1 = ["<div", ' class="grid grid-cols-1 sm:grid-cols-3 gap-6"><div class="col-span-3 sm:col-span-1"><div class="sticky top-24"><div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Filter</div><ul class="flex flex-wrap sm:flex-col gap-1.5">', '</ul></div></div><div class="col-span-3 sm:col-span-2"><div class="flex flex-col"><div class="text-sm uppercase mb-2">SHOWING <!--$-->', "<!--/--> OF <!--$-->", '<!--/--> PROJECTS</div><ul class="flex flex-col gap-3">', "</ul></div></div></div>"], _tmpl$2$1 = ["<li", "><button", "><svg", '><use href="', '"', '></use><use href="', '"', "></use></svg><!--$-->", "<!--/--></button></li>"], _tmpl$3$1 = ["<li", ">", "</li>"];
function Projects({
  data,
  tags
}) {
  const [filter, setFilter] = createSignal(/* @__PURE__ */ new Set());
  const [projects, setProjects] = createSignal([]);
  createEffect(() => {
    setProjects(data.filter((entry) => Array.from(filter()).every((value) => entry.data.tags.some((tag) => tag.toLowerCase() === String(value).toLowerCase()))));
  });
  return ssr(_tmpl$$1, ssrHydrationKey(), escape(createComponent$1(For, {
    each: tags,
    children: (tag) => ssr(_tmpl$2$1, ssrHydrationKey(), ssrAttribute("class", escape(cn("w-full px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-black/5 dark:bg-white/10", "hover:bg-black/10 hover:dark:bg-white/15", "transition-colors duration-300 ease-in-out", filter().has(tag) && "text-black dark:text-white"), true), false), ssrAttribute("class", escape(cn("size-5 fill-black/50 dark:fill-white/50", "transition-colors duration-300 ease-in-out", filter().has(tag) && "fill-black dark:fill-white"), true), false), `/ui.svg#square`, ssrAttribute("class", escape(cn(!filter().has(tag) ? "block" : "hidden"), true), false), `/ui.svg#square-check`, ssrAttribute("class", escape(cn(filter().has(tag) ? "block" : "hidden"), true), false), escape(tag))
  })), escape(projects().length), escape(data.length), escape(projects().map((project) => ssr(_tmpl$3$1, ssrHydrationKey(), escape(createComponent$1(ArrowCard, {
    entry: project
  }))))));
}

const $$Astro$4 = createAstro("https://mstqmarfn.vercel.app");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$3;
  const projects = (await getCollection("projects")).filter((project) => !project.data.draft).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  const tags = [...new Set(projects.flatMap((project) => project.data.tags))].sort((a, b) => a.localeCompare(b));
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": PROJECTS.TITLE, "description": PROJECTS.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TopLayout", $$TopLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate page-heading"> ${PROJECTS.TITLE} </div> ` })} ${renderComponent($$result2, "BottomLayout", $$BottomLayout, {}, { "default": ($$result3) => renderTemplate` <div class="animate"> ${renderComponent($$result3, "Projects", Projects, { "client:load": true, "tags": tags, "data": projects, "client:component-hydration": "load", "client:component-path": "@components/Projects", "client:component-export": "default" })} </div> ` })} ` })}`;
}, "/home/vmp/Projects/x50/src/pages/projects/index.astro", void 0);

const $$file$4 = "/home/vmp/Projects/x50/src/pages/projects/index.astro";
const $$url$4 = "/projects";

const index$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$3,
    file: $$file$4,
    url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$3 = createAstro("https://mstqmarfn.vercel.app");
async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects.map((project) => ({
    params: { slug: project.slug },
    props: project
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$;
  const project = Astro2.props;
  const { title, summary } = project.data;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": title, "description": summary }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TopLayout", $$TopLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate"> ${renderComponent($$result3, "ArticleTopLayout", $$ArticleTopLayout, { "entry": project })} </div> ` })} ${renderComponent($$result2, "BottomLayout", $$BottomLayout, {}, { "default": ($$result3) => renderTemplate` <div class="animate"> ${renderComponent($$result3, "ArticleBottomLayout", $$ArticleBottomLayout, { "entry": project })} </div> ` })} ` })}`;
}, "/home/vmp/Projects/x50/src/pages/projects/[...slug].astro", void 0);

const $$file$3 = "/home/vmp/Projects/x50/src/pages/projects/[...slug].astro";
const $$url$3 = "/projects/[...slug]";

const ____slug_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$,
    file: $$file$3,
    getStaticPaths,
    url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", "https://mstqmarfn.vercel.app").href}
`.trim();
const GET$1 = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

const robots_txt = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET: GET$1
}, Symbol.toStringTag, { value: 'Module' }));

async function GET(context) {
  const posts = await getCollection("blog");
  const projects = await getCollection("projects");
  const items = [...posts, ...projects];
  items.sort(
    (a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
  );
  return rss({
    title: SITE.TITLE,
    description: SITE.DESCRIPTION,
    site: context.site,
    items: items.map((item) => ({
      title: item.data.title,
      description: item.data.summary,
      pubDate: item.data.date,
      link: item.slug.startsWith("blog") ? `/blog/${item.slug}/` : `/projects/${item.slug}/`
    }))
  });
}

const rss_xml = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET
}, Symbol.toStringTag, { value: 'Module' }));

var _tmpl$ = ["<div", ' class="flex flex-col"><div class="relative"><input name="search" type="text"', ' autocomplete="off" spellcheck="false" placeholder="What are you looking for?" class="w-full px-2.5 py-1.5 pl-10 rounded outline-none text-black dark:text-white bg-black/5 dark:bg-white/15 border border-black/10 dark:border-white/20 focus:border-black focus:dark:border-white"><svg class="absolute size-6 left-1.5 top-1/2 -translate-y-1/2 stroke-current"><use href="', '"></use></svg></div><!--$-->', "<!--/--></div>"], _tmpl$2 = ["<div", ' class="mt-12"><div class="text-sm uppercase mb-2">Found <!--$-->', "<!--/--> results for <!--$-->", '<!--/--></div><ul class="flex flex-col gap-3">', "</ul></div>"], _tmpl$3 = ["<li", ">", "</li>"];
function Search({
  data
}) {
  const [query, setQuery] = createSignal("");
  const [results, setResults] = createSignal([]);
  const fuse = new Fuse(data, {
    keys: ["slug", "data.title", "data.summary", "data.tags"],
    includeMatches: true,
    minMatchCharLength: 2,
    threshold: 0.4
  });
  createEffect(() => {
    if (query().length < 2) {
      setResults([]);
    } else {
      setResults(fuse.search(query()).map((result) => result.item));
    }
  });
  return ssr(_tmpl$, ssrHydrationKey(), ssrAttribute("value", escape(query(), true), false), `/ui.svg#search`, query().length >= 2 && results().length >= 1 && ssr(_tmpl$2, ssrHydrationKey(), escape(results().length), `'${escape(query())}'`, escape(results().map((result) => ssr(_tmpl$3, ssrHydrationKey(), escape(createComponent$1(ArrowCard, {
    entry: result,
    pill: true
  })))))));
}

const $$Astro$2 = createAstro("https://mstqmarfn.vercel.app");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  const posts = (await getCollection("blog")).filter((post) => !post.data.draft);
  const projects = (await getCollection("projects")).filter((post) => !post.data.draft);
  const data = [...posts, ...projects];
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": SEARCH.TITLE, "description": SEARCH.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TopLayout", $$TopLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate page-heading"> ${SEARCH.TITLE} </div> ` })} ${renderComponent($$result2, "BottomLayout", $$BottomLayout, {}, { "default": ($$result3) => renderTemplate` <div class="animate"> ${renderComponent($$result3, "Search", Search, { "client:load": true, "data": data, "client:component-hydration": "load", "client:component-path": "@components/Search", "client:component-export": "default" })} </div> ` })} ` })}`;
}, "/home/vmp/Projects/x50/src/pages/search/index.astro", void 0);

const $$file$2 = "/home/vmp/Projects/x50/src/pages/search/index.astro";
const $$url$2 = "/search";

const index$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro$1 = createAstro("https://mstqmarfn.vercel.app");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  const collection = await getCollection("work");
  collection.sort((a, b) => new Date(b.data.dateStart).getTime() - new Date(a.data.dateStart).getTime());
  const work = await Promise.all(
    collection.map(async (item) => {
      const { Content } = await item.render();
      return { ...item, Content };
    })
  );
  function formatWorkDate(input) {
    if (typeof input === "string")
      return input;
    const month = input.toLocaleDateString("en-US", {
      month: "short"
    });
    const year = new Date(input).getFullYear();
    return `${month} ${year}`;
  }
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": WORK.TITLE, "description": WORK.DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "TopLayout", $$TopLayout, {}, { "default": ($$result3) => renderTemplate` ${maybeRenderHead()}<div class="animate page-heading"> ${WORK.TITLE} </div> ` })} ${renderComponent($$result2, "BottomLayout", $$BottomLayout, {}, { "default": ($$result3) => renderTemplate` <ul> ${work.map((entry) => renderTemplate`<li class="animate border-b border-black/10 dark:border-white/25 mt-4 py-8 first-of-type:mt-0 first-of-type:pt-0 last-of-type:border-none"> <div class="text-sm uppercase mb-4"> ${formatWorkDate(entry.data.dateStart)} - ${formatWorkDate(entry.data.dateEnd)} </div> <div class="text-black dark:text-white font-semibold"> ${entry.data.company} </div> <div class="text-sm font-semibold"> ${entry.data.role} </div> <article class="prose dark:prose-invert"> ${renderComponent($$result3, "entry.Content", entry.Content, {})} </article> </li>`)} </ul> ` })} ` })}`;
}, "/home/vmp/Projects/x50/src/pages/work/index.astro", void 0);

const $$file$1 = "/home/vmp/Projects/x50/src/pages/work/index.astro";
const $$url$1 = "/work";

const index$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const $$Astro = createAstro("https://mstqmarfn.vercel.app");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "PageLayout", $$PageLayout, { "title": "Home", "description": SITE.DESCRIPTION }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="absolute inset-0 block dark:hidden"> <div id="particles1" class="fixed inset-0"></div> <div id="particles2" class="fixed inset-0"></div> <div id="particles3" class="fixed inset-0"></div> </div>  <div class="absolute inset-0 bg-black hidden dark:block"> <div id="stars1" class="fixed inset-0"></div> <div id="stars2" class="fixed inset-0"></div> <div id="stars3" class="fixed inset-0"></div> </div>    <section class="animate"></section> <section class="relative h-screen w-full"> <!--     <div id="planetcont" class='animate absolute inset-0 top-1/4 overflow-hidden'>
      <div id="crescent" class='absolute top-0 left-1/2 -translate-x-1/2 w-[250vw] min-h-[100vh] aspect-square rounded-full p-[1px] bg-gradient-to-b from-black/25 dark:from-white/75 from-0% to-transparent to-5%'>
        <div id="planet" class='w-full h-full bg-white dark:bg-black rounded-full p-[1px] overflow-hidden flex justify-center'>
          <div id="blur" class='w-full h-20 rounded-full bg-neutral-900/25 dark:bg-white/25 blur-3xl'/>
        </div>
      </div>
    </div> --> <div class="animate absolute h-full w-full flex items-center justify-center"> <div class="relative w-full h-full flex items-center justify-center"> <div class="p-5 text-center"> <a href="/" class="flex gap-1 text-current hover:text-black dark:hover:text-white transition-colors duration-300 ease-in-out"> <svg class="size-6 fill-current"> <use href="/kit.svg#kit"></use> </svg> <div> ${SITE.TITLE} </div> </a> </div> </div> </div> </section>       ` })}`;
}, "/home/vmp/Projects/x50/src/pages/index.astro", void 0);

const $$file = "/home/vmp/Projects/x50/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { ____slug_$2 as _, index2 as a, ____slug_$1 as b, index$3 as c, ____slug_ as d, rss_xml as e, index$2 as f, index$1 as g, index as h, index$4 as i, robots_txt as r };
