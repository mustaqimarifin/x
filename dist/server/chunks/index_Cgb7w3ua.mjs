import { e as createAstro, f as createComponent, r as renderTemplate, m as maybeRenderHead, o as renderSlot, aa as __astro_tag_component__, ab as Fragment, a4 as createVNode } from './astro_cEnyJYbd.mjs';
import { $ as $$Image } from './pages/node_Bqkcwr5s.mjs';
import 'clsx';
import { ssr, ssrHydrationKey, escape } from 'solid-js/web';
import { createSignal } from 'solid-js';

const $$Astro = createAstro("http://localhost:4321");
const $$MyComponent = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyComponent;
  const { name } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="border p-4 bg-yellow-100 text-black"> <div>
Hello,
<span class="font-semibold"> ${name}!!!
</span> </div> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/oddjobs/projects/x/src/content/blog/05-astro-sphere-writing-mdx/MyComponent.astro", void 0);

var _tmpl$ = ["<div", ' class="flex gap-4 items-center"><button class="px-3 py-1 border border-black/25 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/15 blend">Increment</button><div>Clicked <!--$-->', "<!--/--> <!--$-->", "<!--/--></div></div>"];
function CounterButton() {
  const [count, setCount] = createSignal(0);
  return ssr(_tmpl$, ssrHydrationKey(), escape(count()), count() === 1 ? "time" : "times");
}

const frontmatter = {
  "title": "Astro Sphere: Writing MDX",
  "summary": "Lorem ipsum dolor sit amet",
  "date": "Mar 12 2024",
  "draft": false,
  "tags": ["Tutorial", "Astro", "Astro Sphere", "Markdown", "MDX"]
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "an-astro-component-with-props",
    "text": "An astro component with props"
  }, {
    "depth": 2,
    "slug": "an-interactive-solid-js-component",
    "text": "An interactive Solid Js component"
  }];
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
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["MDX is a special flavor of Markdown that supports embedded JavaScript & JSX syntax. This unlocks the ability to ", createVNode(_components.a, {
        href: "https://docs.astro.build/en/guides/markdown-content/#mdx-features",
        children: "mix JavaScript and UI Components into your Markdown content"
      }), " for things like interactive charts or alerts."]
    }), "\n", createVNode(_components.p, {
      children: "If you have existing content authored in MDX, this integration will hopefully make migrating to Astro a breeze."
    }), "\n", createVNode(_components.h2, {
      id: "an-astro-component-with-props",
      children: "An astro component with props"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "// Imported from relative path (same dir as markdown file)"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: 'import MyComponent from "./MyComponent.astro"'
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {})
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: '<MyComponent name="You">'
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "  Welcome to MDX"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "</MyComponent>"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {})
        })]
      })
    }), "\n", "\n", createVNode($$MyComponent, {
      name: "You",
      children: createVNode(_components.p, {
        children: "Welcome to MDX"
      })
    }), "\n", createVNode(_components.h2, {
      id: "an-interactive-solid-js-component",
      children: "An interactive Solid Js component"
    }), "\n", createVNode(_components.pre, {
      class: "astro-code github-dark",
      style: {
        backgroundColor: "#24292e",
        color: "#e1e4e8",
        overflowX: "auto"
      },
      tabindex: "0",
      "data-language": "plaintext",
      children: createVNode(_components.code, {
        children: [createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "// Imported from components directory (src/components)"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: 'import MyComponent from "@components/Counter"'
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {})
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "// Don't forget the astro client:load directive"
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {
            children: "<Counter client:load /> "
          })
        }), "\n", createVNode(_components.span, {
          class: "line",
          children: createVNode(_components.span, {})
        })]
      })
    }), "\n", "\n", createVNode(CounterButton, {
      "client:load": true,
      "client:component-path": "@components/Counter",
      "client:component-export": "default",
      "client:component-hydration": true
    }), "\n", createVNode("br", {}), "\n", createVNode("br", {}), "\n", createVNode("br", {})]
  });
}
function MDXContent(props = {}) {
  const {
    wrapper: MDXLayout
  } = props.components || {};
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}
__astro_tag_component__(getHeadings, "astro:jsx");
__astro_tag_component__(MDXContent, "astro:jsx");
const url = "src/content/blog/05-astro-sphere-writing-mdx/index.mdx";
const file = "/home/oddjobs/projects/x/src/content/blog/05-astro-sphere-writing-mdx/index.mdx";
const Content = (props = {}) => MDXContent({
											...props,
											components: { Fragment, ...props.components, "astro-image":  props.components?.img ?? $$Image },
										});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/home/oddjobs/projects/x/src/content/blog/05-astro-sphere-writing-mdx/index.mdx";

export { Content, __usesAstroImage, Content as default, file, frontmatter, getHeadings, url };
