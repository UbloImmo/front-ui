import { Markdown as SBMarkdown } from "@storybook/blocks";
import { useMemo } from "react";
import styled, { css } from "styled-components";

import { Em, Strong, specificHeading, textOfSize } from "./Typography";

import type { PaletteColor, StyleProps } from "@types";

type MarkdownProps = {
  children?: string;
  inline?: boolean;
  color?: PaletteColor;
};

export const markdownOverrides = (color?: PaletteColor) => ({
  h1: specificHeading("h1", "bold", color ?? "gray-900"),
  h2: specificHeading("h2", "bold", color ?? "gray-900"),
  h3: specificHeading("h3", "medium", color ?? "gray-900"),
  h4: specificHeading("h4", "medium", color ?? "gray-900"),
  h5: specificHeading("h4", "medium", color ?? "gray-700"),
  h6: specificHeading("h4", "regular", color ?? "gray-700"),
  span: textOfSize("m", "regular", color ?? "gray-700"),
  p: textOfSize("m", "regular", color ?? "gray-700"),
  em: Em,
  strong: Strong,
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
export const Markdown = ({ children, inline, color }: MarkdownProps) => {
  const options = useMemo(
    () => ({
      overrides: markdownOverrides(color),
    }),
    [color]
  );
  return (
    <MarkdownStyle $inline={inline}>
      <SBMarkdown options={options}>{children ?? ""}</SBMarkdown>
    </MarkdownStyle>
  );
};

const MarkdownStyle = styled.div<StyleProps<Pick<MarkdownProps, "inline">>>`
  & * {
    color: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
  }

  & span,
  & p {
    color: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
  }

  ${({ $inline }) =>
    $inline &&
    css`
      display: inline !important;

      span {
        display: inline !important;
      }
    `}
`;
