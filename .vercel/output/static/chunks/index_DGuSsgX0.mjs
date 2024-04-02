import {
  c as createComponent,
  d as renderTemplate,
  m as maybeRenderHead,
  u as unescapeHTML,
  s as spreadAttributes,
} from "./astro_B2yuyJSD.mjs";
import { g as getImage } from "./_astro_assets_Byn3v23e.mjs";

const Astro__1w7bmA = new Proxy(
  {
    src: "/_astro/spongebob.dGmXfKPV.png",
    width: 200,
    height: 252,
    format: "png",
  },
  {
    get(target, name, receiver) {
      if (name === "clone") {
        return structuredClone(target);
      }
      if (name === "fsPath") {
        return "/home/vmp/Projects/x50/src/content/blog/04-astro-sphere-writing-markdown/spongebob.png";
      }
      if (target[name] !== undefined)
        globalThis.astroAsset.referencedImages.add(
          "/home/vmp/Projects/x50/src/content/blog/04-astro-sphere-writing-markdown/spongebob.png",
        );
      return target[name];
    },
  },
);

const images = async function (html) {
  const imageSources = {};
  {
    const regex = new RegExp(
      '__ASTRO_IMAGE_="([^"]*' + "\\./spongebob\\.png" + '[^"]*)"',
      "g",
    );
    let match;
    let occurrenceCounter = 0;
    while ((match = regex.exec(html)) !== null) {
      const matchKey = "./spongebob.png" + "_" + occurrenceCounter;
      const imageProps = JSON.parse(match[1].replace(/&#x22;/g, '"'));
      const { src, ...props } = imageProps;

      imageSources[matchKey] = await getImage({ src: Astro__1w7bmA, ...props });
      occurrenceCounter++;
    }
  }
  return imageSources;
};

async function updateImageReferences(html) {
  return images(html).then((imageSources) => {
    return html.replaceAll(/__ASTRO_IMAGE_="([^"]+)"/gm, (full, imagePath) => {
      const decodedImagePath = JSON.parse(imagePath.replace(/&#x22;/g, '"'));

      // Use the 'index' property for each image occurrence
      const srcKey = decodedImagePath.src + "_" + decodedImagePath.index;

      if (
        imageSources[srcKey].srcSet &&
        imageSources[srcKey].srcSet.values.length > 0
      ) {
        imageSources[srcKey].attributes.srcset =
          imageSources[srcKey].srcSet.attribute;
      }

      const { index, ...attributesWithoutIndex } =
        imageSources[srcKey].attributes;

      return spreadAttributes({
        src: imageSources[srcKey].src,
        ...attributesWithoutIndex,
      });
    });
  });
}

// NOTE: This causes a top-level await to appear in the user's code, which can break very easily due to a Rollup
// bug and certain adapters not supporting it correctly. See: https://github.com/rollup/rollup/issues/4708
// Tread carefully!
const html = await updateImageReferences(
  '<h2 id="inline-code-highlighting">Inline Code Highlighting</h2>\n<p>The result of <code>[1, 2, 3].join(\'-\'){:js}</code> is <code>\'1-2-3\'{:js}</code>.</p>\n<h3 id="headings">Headings</h3>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#E06C75"># H1</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E06C75">## H2</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E06C75">### H3</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E06C75">#### H4</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E06C75">##### H5</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#E06C75">###### H6</span></span>\n<span class="line"></span></code></pre>\n<h1 id="h1">H1</h1>\n<h2 id="h2">H2</h2>\n<h3 id="h3">H3</h3>\n<h4 id="h4">H4</h4>\n<h5 id="h5">H5</h5>\n<h6 id="h6">H6</h6>\n<h3 id="paragraph">Paragraph</h3>\n<p>Xerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.</p>\n<p>Itatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.</p>\n<h3 id="images">Images</h3>\n<p>Relative image in the /public folder</p>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF">![</span><span style="color:#61AFEF">blog placeholder</span><span style="color:#ABB2BF">]</span><span style="color:#E06C75">(</span><span style="color:#C678DD;text-decoration:underline">/open-graph.jpg</span><span style="color:#E06C75">)</span></span>\n<span class="line"></span></code></pre>\n<p><img src="/open-graph.jpg" alt="blog placeholder"></p>\n<p>Relative Image in the same folder as the markdown</p>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF">![</span><span style="color:#61AFEF">Test Relative Image</span><span style="color:#ABB2BF">]</span><span style="color:#E06C75">(</span><span style="color:#C678DD;text-decoration:underline">./spongebob.png</span><span style="color:#E06C75">)</span></span>\n<span class="line"></span></code></pre>\n<p><img __ASTRO_IMAGE_="{&#x22;src&#x22;:&#x22;./spongebob.png&#x22;,&#x22;alt&#x22;:&#x22;Test Relative Image&#x22;,&#x22;index&#x22;:0}"></p>\n<h2 id="blockquotes">Blockquotes</h2>\n<p>The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a <code>footer</code> or <code>cite</code> element, and optionally with in-line changes such as annotations and abbreviations.</p>\n<h3 id="blockquote-without-attribution">Blockquote without attribution</h3>\n<h4 id="syntax">Syntax</h4>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#5C6370">> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  </span></span>\n<span class="line"><span style="color:#5C6370">> </span><span style="color:#D19A66">**Note**</span><span style="color:#5C6370"> that you can use </span><span style="color:#C678DD;font-style:italic">_Markdown syntax_</span><span style="color:#5C6370"> within a blockquote.</span></span>\n<span class="line"></span></code></pre>\n<h4 id="output">Output</h4>\n<blockquote>\n<p>Tiam, ad mint andaepu dandae nostion secatur sequo quae.<br>\n<strong>Note</strong> that you can use <em>Markdown syntax</em> within a blockquote.</p>\n</blockquote>\n<h3 id="blockquote-with-attribution">Blockquote with attribution</h3>\n<h4 id="syntax-1">Syntax</h4>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#5C6370">> Don\'t communicate by sharing memory, share memory by communicating.</span><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">br</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#5C6370">> — </span><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">cite</span><span style="color:#ABB2BF">></span><span style="color:#5C6370">Rob Pike[</span><span style="color:#61AFEF">^1</span><span style="color:#5C6370">]</span><span style="color:#ABB2BF">&#x3C;/</span><span style="color:#E06C75">cite</span><span style="color:#ABB2BF">></span></span>\n<span class="line"></span></code></pre>\n<h4 id="output-1">Output</h4>\n<blockquote>\n<p>Don’t communicate by sharing memory, share memory by communicating.<br>\n— <cite>Rob Pike<sup><a href="#user-content-fn-1" id="user-content-fnref-1" data-footnote-ref="" aria-describedby="footnote-label">1</a></sup></cite></p>\n</blockquote>\n<h2 id="tables">Tables</h2>\n<h4 id="syntax-2">Syntax</h4>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF">| Italics   | Bold     | Code   |</span></span>\n<span class="line"><span style="color:#ABB2BF">| --------- | -------- | ------ |</span></span>\n<span class="line"><span style="color:#ABB2BF">| </span><span style="color:#C678DD;font-style:italic">_italics_</span><span style="color:#ABB2BF"> | </span><span style="color:#D19A66">**bold**</span><span style="color:#ABB2BF"> | </span><span style="color:#E5C07B">`</span><span style="color:#98C379">code</span><span style="color:#E5C07B">`</span><span style="color:#ABB2BF"> |</span></span>\n<span class="line"></span></code></pre>\n<h4 id="output-2">Output</h4>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<table><thead><tr><th>Italics</th><th>Bold</th><th>Code</th></tr></thead><tbody><tr><td><em>italics</em></td><td><strong>bold</strong></td><td><code>code</code></td></tr></tbody></table>\n<h2 id="code-blocks">Code Blocks</h2>\n<h4 id="syntax-3">Syntax</h4>\n<p>we can use 3 backticks ``` in new line and write snippet and close with 3 backticks on new line and to highlight language specific syntac, write one word of language name after first 3 backticks, for eg. html, javascript, css, markdown, typescript, txt, bash</p>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF">```html</span></span>\n<span class="line"><span style="color:#ABB2BF">&#x3C;!</span><span style="color:#E06C75">doctype</span><span style="color:#D19A66"> html</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">html</span><span style="color:#D19A66"> lang</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"en"</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;</span><span style="color:#E06C75">head</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">meta</span><span style="color:#D19A66"> charset</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"utf-8"</span><span style="color:#ABB2BF"> /></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">title</span><span style="color:#ABB2BF">>Example HTML5 Document&#x3C;/</span><span style="color:#E06C75">title</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;/</span><span style="color:#E06C75">head</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;</span><span style="color:#E06C75">body</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">p</span><span style="color:#ABB2BF">>Test&#x3C;/</span><span style="color:#E06C75">p</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;/</span><span style="color:#E06C75">body</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">&#x3C;/</span><span style="color:#E06C75">html</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">```</span></span>\n<span class="line"></span></code></pre>\n<p>Output</p>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF">&#x3C;!</span><span style="color:#E06C75">doctype</span><span style="color:#D19A66"> html</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">html</span><span style="color:#D19A66"> lang</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"en"</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;</span><span style="color:#E06C75">head</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">meta</span><span style="color:#D19A66"> charset</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"utf-8"</span><span style="color:#ABB2BF"> /></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">title</span><span style="color:#ABB2BF">>Example HTML5 Document&#x3C;/</span><span style="color:#E06C75">title</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;/</span><span style="color:#E06C75">head</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;</span><span style="color:#E06C75">body</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">    &#x3C;</span><span style="color:#E06C75">p</span><span style="color:#ABB2BF">>Test&#x3C;/</span><span style="color:#E06C75">p</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">  &#x3C;/</span><span style="color:#E06C75">body</span><span style="color:#ABB2BF">></span></span>\n<span class="line"><span style="color:#ABB2BF">&#x3C;/</span><span style="color:#E06C75">html</span><span style="color:#ABB2BF">></span></span>\n<span class="line"></span></code></pre>\n<h2 id="list-types">List Types</h2>\n<h3 id="ordered-list">Ordered List</h3>\n<h4 id="syntax-4">Syntax</h4>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#E5C07B">1.</span><span style="color:#ABB2BF"> First item</span></span>\n<span class="line"><span style="color:#E5C07B">2.</span><span style="color:#ABB2BF"> Second item</span></span>\n<span class="line"><span style="color:#E5C07B">3.</span><span style="color:#ABB2BF"> Third item</span></span>\n<span class="line"></span></code></pre>\n<h4 id="output-3">Output</h4>\n<ol>\n<li>First item</li>\n<li>Second item</li>\n<li>Third item</li>\n</ol>\n<h3 id="unordered-list">Unordered List</h3>\n<h4 id="syntax-5">Syntax</h4>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#E5C07B">-</span><span style="color:#ABB2BF"> List item</span></span>\n<span class="line"><span style="color:#E5C07B">-</span><span style="color:#ABB2BF"> Another item</span></span>\n<span class="line"><span style="color:#E5C07B">-</span><span style="color:#ABB2BF"> And another item</span></span>\n<span class="line"></span></code></pre>\n<h4 id="output-4">Output</h4>\n<ul>\n<li>List item</li>\n<li>Another item</li>\n<li>And another item</li>\n</ul>\n<h3 id="nested-list">Nested list</h3>\n<h4 id="syntax-6">Syntax</h4>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#E5C07B">-</span><span style="color:#ABB2BF"> Fruit</span></span>\n<span class="line"><span style="color:#E5C07B">  -</span><span style="color:#ABB2BF"> Apple</span></span>\n<span class="line"><span style="color:#E5C07B">  -</span><span style="color:#ABB2BF"> Orange</span></span>\n<span class="line"><span style="color:#E5C07B">  -</span><span style="color:#ABB2BF"> Banana</span></span>\n<span class="line"><span style="color:#E5C07B">-</span><span style="color:#ABB2BF"> Dairy</span></span>\n<span class="line"><span style="color:#E5C07B">  -</span><span style="color:#ABB2BF"> Milk</span></span>\n<span class="line"><span style="color:#E5C07B">  -</span><span style="color:#ABB2BF"> Cheese</span></span>\n<span class="line"></span></code></pre>\n<h4 id="output-5">Output</h4>\n<ul>\n<li>Fruit\n<ul>\n<li>Apple</li>\n<li>Orange</li>\n<li>Banana</li>\n</ul>\n</li>\n<li>Dairy\n<ul>\n<li>Milk</li>\n<li>Cheese</li>\n</ul>\n</li>\n</ul>\n<h2 id="other-elements--abbr-sub-sup-kbd-mark">Other Elements — abbr, sub, sup, kbd, mark</h2>\n<h4 id="syntax-7">Syntax</h4>\n<pre class="astro-code one-dark-pro" style="background-color:#282c34;color:#abb2bf; overflow-x: auto;" tabindex="0"><code><span class="line"><span style="color:#ABB2BF">&#x3C;</span><span style="color:#E06C75">abbr</span><span style="color:#D19A66"> title</span><span style="color:#ABB2BF">=</span><span style="color:#98C379">"Graphics Interchange Format"</span><span style="color:#ABB2BF">>GIF&#x3C;/</span><span style="color:#E06C75">abbr</span><span style="color:#ABB2BF">> is a bitmap image format.</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#ABB2BF">H&#x3C;</span><span style="color:#E06C75">sub</span><span style="color:#ABB2BF">>2&#x3C;/</span><span style="color:#E06C75">sub</span><span style="color:#ABB2BF">>O</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#ABB2BF">X&#x3C;</span><span style="color:#E06C75">sup</span><span style="color:#ABB2BF">>n&#x3C;/</span><span style="color:#E06C75">sup</span><span style="color:#ABB2BF">> + Y&#x3C;</span><span style="color:#E06C75">sup</span><span style="color:#ABB2BF">>n&#x3C;/</span><span style="color:#E06C75">sup</span><span style="color:#ABB2BF">> = Z&#x3C;</span><span style="color:#E06C75">sup</span><span style="color:#ABB2BF">>n&#x3C;/</span><span style="color:#E06C75">sup</span><span style="color:#ABB2BF">></span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#ABB2BF">Press &#x3C;</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">>&#x3C;</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">>CTRL&#x3C;/</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">>+&#x3C;</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">>ALT&#x3C;/</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">>+&#x3C;</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">>Delete&#x3C;/</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">>&#x3C;/</span><span style="color:#E06C75">kbd</span><span style="color:#ABB2BF">> to end the session.</span></span>\n<span class="line"></span>\n<span class="line"><span style="color:#ABB2BF">Most &#x3C;</span><span style="color:#E06C75">mark</span><span style="color:#ABB2BF">>salamanders&#x3C;/</span><span style="color:#E06C75">mark</span><span style="color:#ABB2BF">> are nocturnal, and hunt for insects, worms, and other small creatures.</span></span>\n<span class="line"></span></code></pre>\n<h4 id="output-6">Output</h4>\n<p><abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.</p>\n<p>H<sub>2</sub>O</p>\n<p>X<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup></p>\n<p>Press <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.</p>\n<p>Most <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.</p>\n<section data-footnotes="" class="footnotes"><h2 class="sr-only" id="footnote-label">Footnotes</h2>\n<ol>\n<li id="user-content-fn-1">\n<p>The above quote is excerpted from Rob Pike’s <a href="https://www.youtube.com/watch?v=PAAkCSZUG1c">talk</a> during Gopherfest, November 18, 2015. <a href="#user-content-fnref-1" data-footnote-backref="" aria-label="Back to reference 1" class="data-footnote-backref">↩</a></p>\n</li>\n</ol>\n</section>',
);

const frontmatter = {
  title: "Astro Sphere: Writing Markdown",
  summary:
    "Basic Markdown syntax that can be used when writing Markdown content in Astro Sphere.",
  date: "Mar 13 2024",
  draft: false,
  tags: ["Tutorial", "Astro", "Astro Sphere", "Markdown"],
};
const file =
  "/home/vmp/Projects/x50/src/content/blog/04-astro-sphere-writing-markdown/index.md";
const url = undefined;
function rawContent() {
  return '\n## Inline Code Highlighting\n\nThe result of `[1, 2, 3].join(\'-\'){:js}` is `\'1-2-3\'{:js}`.\n\n### Headings\n\n```markdown\n# H1\n\n## H2\n\n### H3\n\n#### H4\n\n##### H5\n\n###### H6\n```\n\n# H1\n\n## H2\n\n### H3\n\n#### H4\n\n##### H5\n\n###### H6\n\n### Paragraph\n\nXerum, quo qui aut unt expliquam qui dolut labo. Aque venitatiusda cum, voluptionse latur sitiae dolessi aut parist aut dollo enim qui voluptate ma dolestendit peritin re plis aut quas inctum laceat est volestemque commosa as cus endigna tectur, offic to cor sequas etum rerum idem sintibus eiur? Quianimin porecus evelectur, cum que nis nust voloribus ratem aut omnimi, sitatur? Quiatem. Nam, omnis sum am facea corem alique molestrunt et eos evelece arcillit ut aut eos eos nus, sin conecerem erum fuga. Ri oditatquam, ad quibus unda veliamenimin cusam et facea ipsamus es exerum sitate dolores editium rerore eost, temped molorro ratiae volorro te reribus dolorer sperchicium faceata tiustia prat.\n\nItatur? Quiatae cullecum rem ent aut odis in re eossequodi nonsequ idebis ne sapicia is sinveli squiatum, core et que aut hariosam ex eat.\n\n### Images\n\nRelative image in the /public folder\n\n```markdown\n![blog placeholder](/open-graph.jpg)\n```\n\n![blog placeholder](/open-graph.jpg)\n\nRelative Image in the same folder as the markdown\n\n```markdown\n![Test Relative Image](./spongebob.png)\n```\n\n![Test Relative Image](./spongebob.png)\n\n## Blockquotes\n\nThe blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations.\n\n### Blockquote without attribution\n\n#### Syntax\n\n```markdown\n> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  \n> **Note** that you can use _Markdown syntax_ within a blockquote.\n```\n\n#### Output\n\n> Tiam, ad mint andaepu dandae nostion secatur sequo quae.  \n> **Note** that you can use _Markdown syntax_ within a blockquote.\n\n### Blockquote with attribution\n\n#### Syntax\n\n```markdown\n> Don\'t communicate by sharing memory, share memory by communicating.<br>\n> — <cite>Rob Pike[^1]</cite>\n```\n\n#### Output\n\n> Don\'t communicate by sharing memory, share memory by communicating.<br>\n> — <cite>Rob Pike[^1]</cite>\n\n[^1]: The above quote is excerpted from Rob Pike\'s [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.\n\n## Tables\n\n#### Syntax\n\n```markdown\n| Italics   | Bold     | Code   |\n| --------- | -------- | ------ |\n| _italics_ | **bold** | `code` |\n```\n\n#### Output\n\n| Italics   | Bold     | Code   |\n| --------- | -------- | ------ |\n| _italics_ | **bold** | `code` |\n\n## Code Blocks\n\n#### Syntax\n\nwe can use 3 backticks ``` in new line and write snippet and close with 3 backticks on new line and to highlight language specific syntac, write one word of language name after first 3 backticks, for eg. html, javascript, css, markdown, typescript, txt, bash\n\n````markdown\n```html\n<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>Example HTML5 Document</title>\n  </head>\n  <body>\n    <p>Test</p>\n  </body>\n</html>\n```\n````\n\nOutput\n\n```html\n<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="utf-8" />\n    <title>Example HTML5 Document</title>\n  </head>\n  <body>\n    <p>Test</p>\n  </body>\n</html>\n```\n\n## List Types\n\n### Ordered List\n\n#### Syntax\n\n```markdown\n1. First item\n2. Second item\n3. Third item\n```\n\n#### Output\n\n1. First item\n2. Second item\n3. Third item\n\n### Unordered List\n\n#### Syntax\n\n```markdown\n- List item\n- Another item\n- And another item\n```\n\n#### Output\n\n- List item\n- Another item\n- And another item\n\n### Nested list\n\n#### Syntax\n\n```markdown\n- Fruit\n  - Apple\n  - Orange\n  - Banana\n- Dairy\n  - Milk\n  - Cheese\n```\n\n#### Output\n\n- Fruit\n  - Apple\n  - Orange\n  - Banana\n- Dairy\n  - Milk\n  - Cheese\n\n## Other Elements — abbr, sub, sup, kbd, mark\n\n#### Syntax\n\n```markdown\n<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.\n\nH<sub>2</sub>O\n\nX<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>\n\nPress <kbd><kbd>CTRL</kbd>+<kbd>ALT</kbd>+<kbd>Delete</kbd></kbd> to end the session.\n\nMost <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.\n```\n\n#### Output\n\n<abbr title="Graphics Interchange Format">GIF</abbr> is a bitmap image format.\n\nH<sub>2</sub>O\n\nX<sup>n</sup> + Y<sup>n</sup> = Z<sup>n</sup>\n\nPress <kbd>CTRL</kbd> + <kbd>ALT</kbd> + <kbd>Delete</kbd> to end the session.\n\nMost <mark>salamanders</mark> are nocturnal, and hunt for insects, worms, and other small creatures.\n';
}
function compiledContent() {
  return html;
}
function getHeadings() {
  return [
    {
      depth: 2,
      slug: "inline-code-highlighting",
      text: "Inline Code Highlighting",
    },
    { depth: 3, slug: "headings", text: "Headings" },
    { depth: 1, slug: "h1", text: "H1" },
    { depth: 2, slug: "h2", text: "H2" },
    { depth: 3, slug: "h3", text: "H3" },
    { depth: 4, slug: "h4", text: "H4" },
    { depth: 5, slug: "h5", text: "H5" },
    { depth: 6, slug: "h6", text: "H6" },
    { depth: 3, slug: "paragraph", text: "Paragraph" },
    { depth: 3, slug: "images", text: "Images" },
    { depth: 2, slug: "blockquotes", text: "Blockquotes" },
    {
      depth: 3,
      slug: "blockquote-without-attribution",
      text: "Blockquote without attribution",
    },
    { depth: 4, slug: "syntax", text: "Syntax" },
    { depth: 4, slug: "output", text: "Output" },
    {
      depth: 3,
      slug: "blockquote-with-attribution",
      text: "Blockquote with attribution",
    },
    { depth: 4, slug: "syntax-1", text: "Syntax" },
    { depth: 4, slug: "output-1", text: "Output" },
    { depth: 2, slug: "tables", text: "Tables" },
    { depth: 4, slug: "syntax-2", text: "Syntax" },
    { depth: 4, slug: "output-2", text: "Output" },
    { depth: 2, slug: "code-blocks", text: "Code Blocks" },
    { depth: 4, slug: "syntax-3", text: "Syntax" },
    { depth: 2, slug: "list-types", text: "List Types" },
    { depth: 3, slug: "ordered-list", text: "Ordered List" },
    { depth: 4, slug: "syntax-4", text: "Syntax" },
    { depth: 4, slug: "output-3", text: "Output" },
    { depth: 3, slug: "unordered-list", text: "Unordered List" },
    { depth: 4, slug: "syntax-5", text: "Syntax" },
    { depth: 4, slug: "output-4", text: "Output" },
    { depth: 3, slug: "nested-list", text: "Nested list" },
    { depth: 4, slug: "syntax-6", text: "Syntax" },
    { depth: 4, slug: "output-5", text: "Output" },
    {
      depth: 2,
      slug: "other-elements--abbr-sub-sup-kbd-mark",
      text: "Other Elements — abbr, sub, sup, kbd, mark",
    },
    { depth: 4, slug: "syntax-7", text: "Syntax" },
    { depth: 4, slug: "output-6", text: "Output" },
    { depth: 2, slug: "footnote-label", text: "Footnotes" },
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
