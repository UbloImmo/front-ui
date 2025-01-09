// @ts-check

import { MDXTheme } from "./typedoc.theme.js";

/**
 * @param {import('typedoc-plugin-markdown').MarkdownApplication} app
 */
export function load(app) {
  app.renderer.defineTheme("mdx-theme", MDXTheme);
  // app.renderer.markdownHooks.on("page.begin", (context) => {
  //   // app.logger.verbose("Formatting page head content");
  //   return header(context);
  // });
  // app.renderer.markdownHooks.on("page.end", () => {
  //   return lines(`</Content>`);
  // });

  // app.renderer. markdownHooks.on("content.begin", (context) => )
}
