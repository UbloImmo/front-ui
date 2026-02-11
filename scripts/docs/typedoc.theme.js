import { i18n, UnionType } from "typedoc";
import { MarkdownTheme, MarkdownThemeContext } from "typedoc-plugin-markdown";

import { partials } from "./partials/index.js";
import { heading, lines, storybookUrl } from "./typedoc.utils.js";

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
  /**
   * @type {string[]}
   */
  const codeBlocks = [];
  const placeholder = "___CODEBLOCKPLACEHOLDER___";
  // Replace code blocks with placeholders
  str = str.replace(/(```[\s\S]*?```|`[^`]*?`)/g, (match) => {
    codeBlocks.push(match);
    return placeholder;
  });
  // If line starts with a > treat it as a blockquote
  // Otherwise escape all <, > and
  str = str
    // escape =
    .replace(/=/g, "\\=")
    // restore = in links
    .replace(
      /(?<label>\[.+\])(?<urlStart>\(.+)(?<equal>\\=)(?<urlEnd>.+\))/g,
      "$<label>$<urlStart>=$<urlEnd>"
    )
    // escape < that has not been escaped already
    .replaceAll(/(?<!\\)</g, "\\<")
    // escape > that has not been escaped and is not the first character (blockquote)
    .replaceAll(/(?<!^)(?<!\\)>/g, "\\>")
    // escape <= that has not been escaped already
    .replaceAll(/(?<!\\)</g, "\\<");

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
  __signatureReturnsBackup = this.partials.signatureReturns;

  /**
   * @type {MarkdownThemeContext["partials"]}
   */
  partials = {
    ...this.partials,
    signatureReturns: (model, options) => {
      const md = [];

      const typeDeclaration = model.type?.declaration;

      md.push(heading(options.headingLevel, i18n.theme_returns()));

      if (!typeDeclaration?.signatures) {
        if (model.type && this.helpers.hasUsefulTypeDetails(model.type)) {
          if (model.type instanceof UnionType) {
            md.push(
              this.partials.typeDeclarationUnionContainer(model, options)
            );
          }
        } else {
          md.push(this.helpers.getReturnType(model.type));
        }
      }

      const returnsTag = model.comment?.getTag("@returns");

      if (returnsTag) {
        // PATCH: escape special characters for MDX compat
        const returnsContent = this.helpers.getCommentParts(returnsTag.content);
        md.push(sanitizeComments(returnsContent));
      }

      if (typeDeclaration?.signatures) {
        typeDeclaration.signatures.forEach((signature) => {
          md.push(
            this.partials.signature(signature, {
              headingLevel: options.headingLevel + 1,
              nested: true,
            })
          );
        });
      }

      if (typeDeclaration?.children) {
        md.push(
          this.partials.typeDeclaration(typeDeclaration, {
            headingLevel: options.headingLevel,
          })
        );
      }

      return md.join("\n\n");
    },
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

  // /**
  //  * Returns the relative URL (from the current page context url).
  //  *
  //  * If public path is set, it will be used as the base URL.
  //  *
  //  * @param {string} url - The URL to make relative.
  //  * @returns {string}
  //  */
  // relativeURL(url) {
  // const URL_PREFIX = /^(http|ftp)s?:\/\//;
  //   const matched = URL_PREFIX.test(url);
  //   const relativeUrl = matched ? super.relativeURL(url) : storybookUrl(url);
  //   console.log({ url, relativeUrl, matched });
  //   return relativeUrl;
  // }

  /**
   *
   * @param {import("typedoc").Reflection} reflection
   * @returns {string}
   */
  urlTo(reflection) {
    const URL_PREFIX = /^(http|ftp)s?:\/\//;
    const fullURL = this.router.getFullUrl(reflection);

    const matched = URL_PREFIX.test(fullURL);
    const base = super.urlTo(reflection);
    const sbURL = storybookUrl(fullURL);

    if (matched) return base;

    return sbURL;
  }

  /**
   *
   * @param {MarkdownTheme} theme
   */
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

  /**
   *
   * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page
   * @returns {string}
   */
  render(page) {
    const rendered = super.render(page);
    return rendered;
  }
}
