import {
  storybookMeta,
  lines,
  linesCompact,
  imports,
  metaTag,
} from "../typedoc.utils.js";

const LIB_NAME = "@ubloimmo/uikit";

/**
 * @param {string} title - The title to display
 * @param {string} content - The content to display
 * @param {boolean} [customContent = false] - Whether the content is a custom content
 * @returns {string[]} The lines to display
 */
const headerInfoItem = (title, content, customContent = false) => {
  return [
    `<Text size="s" weight="medium" color="gray-500">`,
    title,
    `</Text>`,
    ...(customContent
      ? [content]
      : [`<Text size="s" color="gray-800">`, content, `</Text>`]),
  ];
};

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page - The page to generate the header for
 * @param {string | null} description - The description to use in the header
 * @param {string | null} source - The source to use in the header
 * @param {string | null} declaration - The declaration to use in the header
 * @param {string | null} declarationTitle - The declaration title to use in the header
 * @returns {string}
 */
const headerInfo = (
  page,
  description,
  source,
  declaration,
  declarationTitle
) => {
  const { pageParent, pageTitle } = storybookMeta(page.url);

  let title = declarationTitle?.replaceAll("\\", "") ?? pageTitle;
  const isLib = title === LIB_NAME;

  const sourceLink = source?.split("Defined in: ").at(-1) ?? null;

  const sourcePath = sourceLink?.slice(1, sourceLink?.indexOf("]")) ?? null;
  const sourceUrl =
    sourceLink?.slice(
      sourceLink?.indexOf("(") + 1,
      (sourceLink?.length ?? 2) - 2
    ) ?? null;

  const sourceContent =
    sourcePath && sourceUrl && !isLib
      ? headerInfoItem(
          "Definition",
          linesCompact(
            `<Hypertext href="${sourceUrl}"><code>${sourcePath}</code></Hypertext>`
          )
        )
      : [];

  const declarationStr = declaration?.replace("```ts", "```tsx");

  let desc = description;
  if (isLib) {
    desc =
      "Find type, function and variable definitions for every component, layout, size, type, typography and function.";
  }

  return linesCompact(
    `<Header>`,
    `<FlexLayout direction="column" gap="s-2" fill>`,
    `<HeaderInfo title="${title}" parent="${pageParent}">`,
    desc ? `<Text>${desc}</Text>` : "{null}",
    `</HeaderInfo>`,

    `<GridLayout gap={{ column: "s-4", row: "s-2" }} flow="row" columns={["auto", "1fr"]} rows="unset" align="start">`,
    ...sourceContent,
    `</GridLayout>`,
    declarationStr && !isLib ? declarationStr : "",
    `</FlexLayout>`,
    `</Header>`
  );
};

/**
 * @param {import('typedoc-plugin-markdown').MarkdownPageEvent} page - The page to generate the header for
 * @param {string | null} description - The description originating from the page model's comment
 * @param {string | null} source - The source originating from the page model's sources
 * @param {string | null} declaration - The declaration originating from the page model's declaration
 * @param {string | null} declarationTitle - The declaration title originating from the page model's declaration title
 * @returns {string}
 */
const pageHeader = (
  page,
  description,
  source,
  declaration,
  declarationTitle
) => {
  const meta = metaTag(page);
  return lines(
    imports(),
    meta,
    headerInfo(page, description, source, declaration, declarationTitle),
    `<Content>`
  );
};

export function header() {
  const desc = this.page.model.comment
    ? this.helpers.getDescriptionForComment(this.page.model.comment) ?? null
    : null;

  /** @type {string | null} */
  let source = null;
  try {
    // @ts-expect-error still works so...
    source = this.partials.sources(this.page.model);
  } catch (e) {
    console.warn(e);
  }

  /** @type {string | null} */
  let declaration = null;
  try {
    // set useCodeBlocks to true temporarily to get the declaration in a code block
    this.options.setValue("useCodeBlocks", true);
    // @ts-expect-error still works so...
    declaration = this.partials.declarationTitle(this.page.model);
    // reset useCodeBlocks to false
    this.options.setValue("useCodeBlocks", false);
  } catch (e) {
    console.warn(e);
  }

  /** @type {string | null} */
  let declarationTitle = null;
  try {
    // @ts-expect-error still works so...
    declarationTitle = this.partials.memberTitle(this.page.model);
  } catch (e) {
    console.warn(e);
  }

  return lines(
    pageHeader(this.page, desc, source, declaration, declarationTitle)
  );
}
