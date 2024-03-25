import { Markdown as SBMarkdown } from "@storybook/blocks";
import type { StyleProps } from "@types";
import styled from "styled-components";
import { headingOfSize, textOfSize } from "./Typography";
import { useMemo } from "react";

type MarkdownProps = {
  children?: string;
  inherit?: boolean;
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
};

/**
 * Renders a Markdown component with global overrides.
 * Useful when parsing Markdown deep inside a documnentation block.
 *
 * @param {MarkdownProps} props - The props for the Markdown component.
 * @param {ReactNode} props.children - The content to be rendered as Markdown.
 * @param {boolean} props.inherit - Whether to inherit styles from the parent component.
 * @return {JSX.Element} The rendered Markdown component.
 */
export const Markdown = ({ children, inherit }: MarkdownProps) => {
  const options = useMemo(
    () => ({
      overrides: markdownOverrides,
    }),
    []
  );
  return (
    <MarkdownStyle $inherit={inherit}>
      <SBMarkdown options={options}>{children ?? ""}</SBMarkdown>
    </MarkdownStyle>
  );
};

const MarkdownStyle = styled.div<StyleProps<Pick<MarkdownProps, "inherit">>>`
  & * {
    color: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
  }
`;
