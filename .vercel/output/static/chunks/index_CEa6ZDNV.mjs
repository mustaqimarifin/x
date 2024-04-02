import {
  f as createAstro,
  c as createComponent,
  d as renderTemplate,
  m as maybeRenderHead,
  h as renderSlot,
  _ as __astro_tag_component__,
  p as Fragment,
  l as createVNode,
} from "./astro_B2yuyJSD.mjs";
import { $ as $$Image } from "./_astro_assets_Byn3v23e.mjs";
import {
  ssr,
  ssrHydrationKey,
  escape,
  createComponent as createComponent$1,
} from "solid-js/web";
import {
  createSignal,
  createResource,
  createEffect,
  Show,
  Switch,
  Match,
} from "solid-js";

const $$Astro = createAstro("https://mstqmarfn.vercel.app");
const $$MyComponent = createComponent(
  async ($$result, $$props, $$slots) => {
    const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
    Astro2.self = $$MyComponent;
    const { name } = Astro2.props;
    return renderTemplate`${maybeRenderHead()}<div class="border p-4 bg-yellow-100 text-black"> <div>
Hello,
<span class="font-semibold"> ${name}!!!
</span> </div> ${renderSlot($$result, $$slots["default"])} </div>`;
  },
  "/home/vmp/Projects/x50/src/content/blog/05-astro-sphere-writing-mdx/MyComponent.astro",
  void 0,
);

var _tmpl$ = ["<div", ">Count limit reached</div>"],
  _tmpl$2 = ["<p", ">Loading...</p>"],
  _tmpl$3 = ["<div", ">", "</div>"],
  _tmpl$4 = [
    "<div",
    "><!--$-->",
    "<!--/--><!--$-->",
    "<!--/--><!--$-->",
    "<!--/--></div>",
  ];
const fetchViews = async (slug) => {
  const response = await fetch(`/api/views/${slug}`);
  return response.json();
};
function Counter() {
  const [count, setCount] = createSignal(0);
  const [slug] = createResource(count, fetchViews);
  createEffect(() => {
    setCount(1);
  });
  return ssr(
    _tmpl$4,
    ssrHydrationKey(),
    escape(
      createComponent$1(Show, {
        get when() {
          return count() > 1;
        },
        fallback: null,
        get children() {
          return ssr(_tmpl$, ssrHydrationKey());
        },
      }),
    ),
    escape(
      createComponent$1(Show, {
        get when() {
          return slug.loading;
        },
        get children() {
          return ssr(_tmpl$2, ssrHydrationKey());
        },
      }),
    ),
    escape(
      createComponent$1(Switch, {
        get children() {
          return createComponent$1(Match, {
            get when() {
              return slug();
            },
            get children() {
              return ssr(_tmpl$3, ssrHydrationKey(), escape(count()) + 1);
            },
          });
        },
      }),
    ),
  );
}

const frontmatter = {
  title: "Astro Sphere: Writing MDX",
  summary: "Lorem ipsum dolor sit amet",
  date: "Mar 12 2024",
  draft: false,
  tags: ["Tutorial", "Astro", "Astro Sphere", "Markdown", "MDX"],
};
function getHeadings() {
  return [
    {
      depth: 2,
      slug: "an-astro-component-with-props",
      text: "An astro component with props",
    },
    {
      depth: 2,
      slug: "an-interactive-solid-js-component",
      text: "An interactive Solid Js component",
    },
  ];
}
const __usesAstroImage = true;
function _createMdxContent(props) {
  const _components = {
    a: "a",
    code: "code",
    h2: "h2",
    p: "p",
    pre: "pre",
    span: "span",
    ...props.components,
  };
  return createVNode(Fragment, {
    children: [
      createVNode(_components.p, {
        children: [
          "MDX is a special flavor of Markdown that supports embedded JavaScript & JSX syntax. This unlocks the ability to ",
          createVNode(_components.a, {
            href: "https://docs.astro.build/en/guides/markdown-content/#mdx-features",
            children:
              "mix JavaScript and UI Components into your Markdown content",
          }),
          " for things like interactive charts or alerts.",
        ],
      }),
      "\n",
      createVNode(_components.p, {
        children:
          "If you have existing content authored in MDX, this integration will hopefully make migrating to Astro a breeze.",
      }),
      "\n",
      createVNode(_components.h2, {
        id: "an-astro-component-with-props",
        children: "An astro component with props",
      }),
      "\n",
      createVNode(_components.pre, {
        class: "astro-code one-dark-pro",
        style: {
          backgroundColor: "#282c34",
          color: "#abb2bf",
          overflowX: "auto",
        },
        tabindex: "0",
        children: createVNode(_components.code, {
          children: [
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children:
                  "// Imported from relative path (same dir as markdown file)",
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children: 'import MyComponent from "./MyComponent.astro"',
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {}),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children: '<MyComponent name="You">',
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children: "  Welcome to MDX",
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children: "</MyComponent>",
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {}),
            }),
          ],
        }),
      }),
      "\n",
      "\n",
      createVNode($$MyComponent, {
        name: "You",
        children: "Welcome to MDX",
      }),
      "\n",
      createVNode(_components.h2, {
        id: "an-interactive-solid-js-component",
        children: "An interactive Solid Js component",
      }),
      "\n",
      createVNode(_components.pre, {
        class: "astro-code one-dark-pro",
        style: {
          backgroundColor: "#282c34",
          color: "#abb2bf",
          overflowX: "auto",
        },
        tabindex: "0",
        children: createVNode(_components.code, {
          children: [
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children:
                  "// Imported from components directory (src/components)",
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children: 'import MyComponent from "@components/Counter"',
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {}),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children: "// Don't forget the astro client:load directive",
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {
                children: "<Counter client:load />",
              }),
            }),
            "\n",
            createVNode(_components.span, {
              class: "line",
              children: createVNode(_components.span, {}),
            }),
          ],
        }),
      }),
      "\n",
      "\n",
      createVNode(Counter, {
        "client:load": true,
        "client:component-path": "@components/Counter",
        "client:component-export": "default",
        "client:component-hydration": true,
      }),
      "\n",
      createVNode("br", {}),
      "\n",
      createVNode("br", {}),
      "\n",
      createVNode("br", {}),
    ],
  });
}
function MDXContent(props = {}) {
  const { wrapper: MDXLayout } = props.components || {};
  return MDXLayout
    ? createVNode(MDXLayout, {
        ...props,
        children: createVNode(_createMdxContent, {
          ...props,
        }),
      })
    : _createMdxContent(props);
}
__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/blog/05-astro-sphere-writing-mdx/index.mdx";
const file =
  "/home/vmp/Projects/x50/src/content/blog/05-astro-sphere-writing-mdx/index.mdx";
const Content = (props = {}) =>
  MDXContent({
    ...props,
    components: {
      Fragment,
      ...props.components,
      "astro-image": props.components?.img ?? $$Image,
    },
  });
Content[Symbol.for("mdx-component")] = true;
Content[Symbol.for("astro.needsHeadRendering")] = !Boolean(frontmatter.layout);
Content.moduleId =
  "/home/vmp/Projects/x50/src/content/blog/05-astro-sphere-writing-mdx/index.mdx";

export {
  Content,
  __usesAstroImage,
  Content as default,
  file,
  frontmatter,
  getHeadings,
  url,
};
