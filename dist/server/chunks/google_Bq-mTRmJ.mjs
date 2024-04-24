import { f as createComponent, r as renderTemplate, m as maybeRenderHead, u as unescapeHTML } from './astro_cEnyJYbd.mjs';
import 'clsx';

const html = "<p>Sit amet consectetur adipisicing elit. Iure illo neque tempora, voluptatem est quaerat voluptas praesentium ipsa dolorem dignissimos nulla ratione distinctio quae maiores eligendi nostrum? Quibusdam, debitis voluptatum, lorem ipsum dolor.</p>\n<ul>\n<li>Aadipisicing elit. Iure illo neque tempora, voluptatem est.</li>\n<li>dolorem dignissimos nulla ratione.</li>\n<li>Quibusdam, debitis voluptatum, lorem ipsum dolor.</li>\n</ul>";

				const frontmatter = {"company":"Google","role":"Staff Software Engineer","dateStart":"11/27/2022","dateEnd":"Now"};
				const file = "/home/oddjobs/projects/x/src/content/work/google.md";
				const url = undefined;
				function rawContent() {
					return "\nSit amet consectetur adipisicing elit. Iure illo neque tempora, voluptatem est quaerat voluptas praesentium ipsa dolorem dignissimos nulla ratione distinctio quae maiores eligendi nostrum? Quibusdam, debitis voluptatum, lorem ipsum dolor.\n\n- Aadipisicing elit. Iure illo neque tempora, voluptatem est.\n- dolorem dignissimos nulla ratione.\n- Quibusdam, debitis voluptatum, lorem ipsum dolor.\n";
				}
				function compiledContent() {
					return html;
				}
				function getHeadings() {
					return [];
				}

				const Content = createComponent((result, _props, slots) => {
					const { layout, ...content } = frontmatter;
					content.file = file;
					content.url = url;

					return renderTemplate`${maybeRenderHead()}${unescapeHTML(html)}`;
				});

export { Content, compiledContent, Content as default, file, frontmatter, getHeadings, rawContent, url };
