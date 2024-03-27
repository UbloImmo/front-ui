import { Markdown as SBMarkdown } from "@storybook/blocks";
import type { StyleProps } from "@types";
import { useMemo } from "react";
import styled, { css } from "styled-components";
import { Em, Strong, headingOfSize, textOfSize } from "./Typography";

type MarkdownProps = {
  children?: string;
  inline?: boolean;
};

export const markdownOverrides = {
  h1: headingOfSize("h1", "bold"),
  h2: headingOfSize("h2", "bold"),
  h3: headingOfSize("h3", "semiBold"),
  h4: headingOfSize("h4", "bold"),
  h5: headingOfSize("h4", "semiBold"),
  h6: headingOfSize("h4", "regular"),
  span: textOfSize("m", "regular"),
  p: textOfSize("m", "regular"),
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
