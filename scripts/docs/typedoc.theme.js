// @ts-check
import { MarkdownTheme, MarkdownThemeContext } from "typedoc-plugin-markdown";

import { partials } from "./partials/index.js";
import { lines, storybookUrl } from "./typedoc.utils.js";

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} _page
 * @returns {string}
 */
const pageFooter = (_page) => {
  return lines(
    `<hr style={{marginTop: "var(--s-12) !important", marginBottom: "var(--s-4) !important"}} />`,
    `<Text size="s" color="gray-400" italic>This documentation page was generated with typedoc.</Text>`,
    `</Content>`
  );
};

/**
 * @extends {MarkdownThemeContext}
 */
class MDXThemeContext extends MarkdownThemeContext {
  __commentBackup__ = this.partials.comment;

  /**
   * @type {MarkdownThemeContext["partials"]}
   */
  partials = {
    ...this.partials,
    header: partials.header.bind(this),
    pageTitle: () => "",
    footer: () => {
      return lines(pageFooter(this.page));
    },
    comment: (model, options) => {
      // generate comment as normal
      const baseComment = this.__commentBackup__(model, options);
      // remove source if needed
      // @ts-expect-error still works so...
      const source = this.partials.sources(this.page.model);
      if (!source) return baseComment;
      return baseComment.replace(source, "");
    },
  };

  /**
   * Returns the relative URL (from the current page context url).
   *
   * If public path is set, it will be used as the base URL.
   *
   * @param {string} url - The URL to make relative.
   * @returns {string}
   */
  getRelativeUrl(url) {
    const URL_PREFIX = /^(http|ftp)s?:\/\//;
    return URL_PREFIX.test(url) ? url : storybookUrl(url);
  }

  constructor(theme, page, options) {
    super(theme, page, options);
    this.options.setValue("disableSources", true);
  }
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
