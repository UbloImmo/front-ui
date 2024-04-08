import { Markdown as SBMarkdown } from "@storybook/blocks";
import { useMemo } from "react";
import styled, { css } from "styled-components";

import { Em, Strong, specificHeading, textOfSize } from "./Typography";

import type { StyleProps } from "@types";

type MarkdownProps = {
  children?: string;
  inline?: boolean;
};

export const markdownOverrides = {
  h1: specificHeading("h1", "bold", "gray-900"),
  h2: specificHeading("h2", "bold", "gray-900"),
  h3: specificHeading("h3", "semiBold", "gray-900"),
  h4: specificHeading("h4", "semiBold", "gray-800"),
  h5: specificHeading("h4", "semiBold", "gray-700"),
  h6: specificHeading("h4", "regular", "gray-700"),
  span: textOfSize("m", "regular", "gray-700"),
  p: textOfSize("m", "regular", "gray-700"),
  em: Em,
  strong: Strong,
};

/**
 * Renders a Markdown component with global overrides.
 * Useful when parsing Markdown deep inside a documnentation block.
 *
 * @param {MarkdownProps} props - The props for the Markdown component.
 * @param {ReactNode} props.children - The content to be rendered as Markdown.
 * @param {boolean} props.inline - Whether to force contents to display inline.
 * @return {JSX.Element} The rendered Markdown component.
 */
export const Markdown = ({ children, inline }: MarkdownProps) => {
  const options = useMemo(
    () => ({
      overrides: markdownOverrides,
    }),
    []
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

  span {
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
