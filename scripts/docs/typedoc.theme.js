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
 * @param {string} str
 * @returns {string}
 */
function sanitizeComments(str) {
  const codeBlocks = [];
  const placeholder = "___CODEBLOCKPLACEHOLDER___";
  // Replace code blocks with placeholders
  str = str.replace(/(```[\s\S]*?```|`[^`]*?`)/g, (match) => {
    codeBlocks.push(match);
    return placeholder;
  });
  // If line starts with a > treat it as a blockquote
  // Otherwise escape all <, > and =
  str = str
    // escape =
    .replace(/=/g, "\\=")
    // restore = in links
    .replace(
      /(?<label>\[.+\])(?<urlStart>\(.+)(?<equal>\\=)(?<urlEnd>.+\))/g,
      "$<label>$<urlStart>=$<urlEnd>"
    )
    // escape < that has not been escaped already
    .replace(/(?<!\\)</g, "\\<")
    // escape > that has not been escaped and is not the first character (blockquote)
    .replace(/(?<!^)(?<!\\)>/g, "\\>");

  // Replace placeholders with original code blocks
  str = str.replace(
    new RegExp(placeholder, "g"),
    () => codeBlocks.shift() || ""
  );
  return str;
}

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
      // sanitize the comment
      const sanitizedComment = sanitizeComments(baseComment);
      // remove source if needed
      // @ts-expect-error still works so...
      const source = this.partials.sources(this.page.model);
      if (!source) return sanitizedComment;
      return sanitizedComment.replace(source, "");
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
