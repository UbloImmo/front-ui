// @ts-check

import { MarkdownPageEvent } from "typedoc-plugin-markdown";

import { MDXTheme } from "./typedoc.theme.js";

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  // define the theme
  app.renderer.defineTheme("mdx-theme", MDXTheme);

  // replace all ts code blocks with tsx
  app.renderer.on(MarkdownPageEvent.END, (page) => {
    page.contents = page.contents?.replaceAll(/```ts$/gm, "```tsx");
  });
}
