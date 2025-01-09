// @ts-check

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

const SB_META_PREFIX = "SourceTypings";

/**
 * @param {string} baseUrl
 * @returns {{metaTitle: string, metaName: string, pageTitle: string, pageParent: string}}
 */
export const storybookUrl = (baseUrl) => {
  const [outputEntry, ...pathEntries] = baseUrl.split("/");
  const fileName = pathEntries.pop() ?? "";
  const metaName = pascalCase(outputEntry);

  const pageTitle = pascalCase(fileName.replace(".mdx", "")).replace(
    "README",
    `${metaName} Overview`
  );

  const metaPathEntries = pathEntries.map(pascalCase).map((entry) => {
    if (entry === "TypeAliases") return "Types";
    return entry;
  });

  const metaTitle = [SB_META_PREFIX, metaName, ...metaPathEntries, pageTitle]
    .filter(nonEmpty)
    .join("/");

  const pageParent = [SB_META_PREFIX, metaName, ...metaPathEntries]
    .filter(nonEmpty)
    .join("/");

  return { metaTitle, metaName, pageTitle, pageParent };
};

/**
 * @returns {string}
 */
export const imports = () => {
  return lines(
    `import { Meta } from "@storybook/blocks";`,
    `import { Content, Header } from "@docs/containers";`,
    `import { HeaderInfo, Text } from "@docs/blocks";`
  );
};

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page
 * @returns {string}
 */
export const metaTag = (page) => {
  const { metaTitle } = storybookUrl(page.url);
  return `<Meta title="${metaTitle}" />`;
};
