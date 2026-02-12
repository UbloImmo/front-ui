import { Markdown as SBMarkdown } from "@storybook/addon-docs/blocks";
import { useMemo } from "react";

import { Input } from "../Input";
import {
  Em,
  Strong,
  specificHeading,
  textOfSize,
  Code,
  BlockQuote,
  A,
  Ul,
  Li,
  Hr,
} from "../Typography";
import styles from "./Markdown.module.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "../Table";

import { useCssClasses } from "@utils";

import type { PaletteColor } from "@types";

type SBMarkdownProps = Parameters<typeof SBMarkdown>[0];

type MarkdownProps = {
  inline?: boolean;
  color?: PaletteColor;
} & SBMarkdownProps;

export const markdownOverrides = (color?: PaletteColor) => ({
  h1: specificHeading("h1", "bold", color ?? "gray-900"),
  h2: specificHeading("h2", "bold", color ?? "gray-900"),
  h3: specificHeading("h2", "medium", color ?? "gray-900"),
  h4: specificHeading("h3", "bold", color ?? "gray-800"),
  h5: specificHeading("h4", "bold", color ?? "gray-700"),
  h6: specificHeading("h4", "medium", color ?? "gray-700"),
  span: textOfSize("m", "regular", color ?? "gray-700"),
  p: textOfSize("m", "regular", color ?? "gray-700"),
  em: Em,
  strong: Strong,
  code: Code,
  blockquote: BlockQuote,
  a: A,
  ul: Ul,
  li: Li,
  hr: Hr,
  table: Table,
  tbody: TableBody,
  td: TableCell,
  thead: TableHeader,
  th: TableHeaderCell,
  tr: TableRow,
  input: Input,
});

/**
 * Renders a Markdown component with global overrides.
 * Useful when parsing Markdown deep inside a documnentation block.
 *
 * @param {MarkdownProps} props - The props for the Markdown component.
 * @param {ReactNode} props.children - The content to be rendered as Markdown.
 * @param {boolean} props.inline - Whether to force contents to display inline.
 * @param {color} props.color - The color of the text. If none is provided, will use default colors for each parsed element.
 * @return {JSX.Element} The rendered Markdown component.
 */
export const Markdown = ({
  children,
  inline,
  color,
  className,
  ...props
}: MarkdownProps) => {
  const options = useMemo(
    () => ({
      overrides: markdownOverrides(color),
    }),
    [color]
  );
  const klass = useCssClasses(
    styles.markdown,
    [styles.inline, inline],
    className
  );
  return (
    <SBMarkdown className={klass} options={options} {...props}>
      {children ?? ""}
    </SBMarkdown>
  );
};
