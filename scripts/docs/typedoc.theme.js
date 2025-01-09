// @ts-check
import { MarkdownTheme, MarkdownThemeContext } from "typedoc-plugin-markdown";

import {
  metaTag,
  lines,
  imports,
  storybookUrl,
  linesCompact,
} from "./typedoc.utils.js";

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page
 * @returns {string}
 */
const headerInfo = (page) => {
  const { pageParent, pageTitle } = storybookUrl(page.url);

  const description = "test description";

  return linesCompact(
    `<Header>`,
    `<HeaderInfo title="${pageTitle}" parent="${pageParent}">`,
    `<Text>${description}</Text>`,
    `</HeaderInfo>`,
    `</Header>`
  );
};

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page
 * @returns {string}
 */
const pageHeader = (page) => {
  const meta = metaTag(page);
  return lines(imports(), meta, headerInfo(page), `<Content>`);
};

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} _page
 * @returns {string}
 */
const pageFooter = (_page) => {
  return lines(`</Content>`);
};

/**
 * @extends {MarkdownThemeContext}
 */
class MDXThemeContext extends MarkdownThemeContext {
  /**
   * @type {MarkdownThemeContext["partials"]}
   */
  partials = {
    ...this.partials,
    header: () => {
      return lines(pageHeader(this.page));
    },
    footer: () => {
      return lines(pageFooter(this.page));
    },
  };
}

export class MDXTheme extends MarkdownTheme {
  /**
   * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page
   * @returns {MDXThemeContext}
   */
  getRenderContext(page) {
    return new MDXThemeContext(this, page, this.application.options);
  }
}
