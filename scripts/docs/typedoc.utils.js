// @ts-check

const SB_META_PREFIX = "Api";
const SB_URL_PREFIX = "?path=/docs/";
const SB_URL_SUFFIX = "--docs";

/**
 * @param {string} str
 * @returns {string}
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @param {string} str
 * @returns {string}
 */
export const pascalCase = (str) => str.split("-").map(capitalize).join("");

/**
 * @param {string} str
 * @returns {string}
 */
export const camelCase = (str) =>
  str
    .split("-")
    .map((s, i) => (i ? capitalize(s) : s))
    .join("");

/**
 * @param {string} str
 * @returns {boolean}
 */
export const empty = (str) => str.length === 0;

/**
 * @param {string} str
 * @returns {boolean}
 */
export const nonEmpty = (str) => !empty(str);

/**
 * @param {string[]} strs
 * @returns {string}
 */
export const lines = (...strs) => strs.join("\n\n");

/**
 * @param {string[]} strs
 * @returns {string}
 */
export const linesCompact = (...strs) => strs.join("\n");

/**
 * @param {string} baseUrl
 * @returns {{metaTitle: string, metaName: string, pageTitle: string, pageParent: string}}
 */
export const storybookMeta = (baseUrl) => {
  const [outputEntry, ...pathEntries] = baseUrl.split("/");
  const fileName = pathEntries.pop() ?? "";
  const metaName = pascalCase(outputEntry);

  const metaPathEntries = pathEntries.map(pascalCase).map((entry) => {
    if (entry === "TypeAliases") return "Types";
    return entry;
  });

  const isFunction = metaPathEntries.at(-1) === "Functions";

  let pageTitle = camelCase(fileName.replace(".mdx", "")).replace(
    "README",
    `${metaName} Overview`
  );

  if (isFunction) {
    pageTitle = `${pageTitle}()`;
  }

  const metaTitle = [SB_META_PREFIX, metaName, ...metaPathEntries, pageTitle]
    .filter(nonEmpty)
    .join("/");

  const pageParent = [SB_META_PREFIX, metaName, ...metaPathEntries]
    .filter(nonEmpty)
    .join("/");

  return { metaTitle, metaName, pageTitle, pageParent };
};

/**
 * Converts a storybook meta title to a storybook url (for use inside documented links)
 * @param {string} baseUrl
 * @returns {string}
 */
export const storybookUrl = (baseUrl) => {
  const { metaTitle } = storybookMeta(baseUrl);
  const urlMiddle = metaTitle
    .split("/")
    .map((pathEntry) => pathEntry.toLowerCase())
    .join("-");

  return [SB_URL_PREFIX, urlMiddle, SB_URL_SUFFIX]
    .join("")
    .replaceAll("()", "")
    .replaceAll(" ", "-");
};

/**
 * @returns {string}
 */
export const imports = () => {
  return lines(
    `import { Meta } from "@storybook/addon-docs/blocks";`,
    `import { Content, Header } from "@docs/containers";`,
    `import { HeaderInfo, Text } from "@docs/blocks";`,
    `import { FlexLayout, GridLayout } from "@/layouts";`,
    `import { Hypertext } from "@/components";`
  );
};

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page
 * @returns {string}
 */
export const metaTag = (page) => {
  const { metaTitle } = storybookMeta(page.url);
  return `<Meta title="${metaTitle}" />`;
};

/**
 * Returns a heading in markdown format
 * @param {number} level The level of the heading
 * @param {string} text The text of the heading
 * @returns {string}
 */
export const heading = (level, text) => {
  level = level > 6 ? 6 : level;
  return `${[...Array(level)].map(() => "#").join("")} ${text}`;
};

/**
 * Returns an unordered list in markdown format
 * @param {string[]} items
 * @returns {string}
 */
export const unorderedList = (items) => {
  return items.map((item) => `- ${item}`).join("\n");
};

/**
 * @param {string} str
 * @returns {string}
 */
export function unEscapeChars(str) {
  return str
    .replace(
      /(`[^`]*?)\\*([^`]*?`)/g,
      (_match, p1, p2) => `${p1}${p2.replace(/\*/g, "\\*")}`
    )
    .replace(/\\\\/g, "\\")
    .replace(/(?<!\\)\*/g, "")
    .replace(/\\</g, "<")
    .replace(/\\>/g, ">")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\\_/g, "_")
    .replace(/\\{/g, "{")
    .replace(/\\}/g, "}")
    .replace(/``.*?``|(?<!\\)`/g, (match) =>
      match.startsWith("``") ? match : ""
    )
    .replace(/`` /g, "")
    .replace(/ ``/g, "")
    .replace(/\\`/g, "`")
    .replace(/\\\*/g, "*")
    .replace(/\\\|/g, "|")
    .replace(/\\\]/g, "]")
    .replace(/\\\[/g, "[")
    .replace(/\[([^[\]]*)\]\((.*?)\)/gm, "$1");
}

/**
 * @param {string} content
 * @returns {string}
 */
export function codeBlock(content) {
  const trimLastLine = (content) => {
    const lines = content.split("\n");
    return lines
      .map((line, index) => (index === lines.length - 1 ? line.trim() : line))
      .join("\n");
  };
  const trimmedContent =
    content.endsWith("}") ||
    content.endsWith("};") ||
    content.endsWith(">") ||
    content.endsWith(">;")
      ? trimLastLine(content)
      : content;
  return "```ts\n" + unEscapeChars(trimmedContent) + "\n```";
}
