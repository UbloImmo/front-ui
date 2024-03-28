import styled from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";

import { useStyleProps } from "@utils";

import type { HeadingProps, StyleProps } from "@types";

const defaultHeadingProps: Required<HeadingProps> = {
  ...defaultTypographyProps,
  size: "h1",
} as const;

/**
 * Renders a heading component
 *
 * @param {HeadingProps} props - Heading component props
 * @return {JSX.Element} - The styled heading component
 */
export const Heading = (props: HeadingProps) => {
  const innerProps = useStyleProps(props);
  return (
    <HeadingInner {...innerProps} data-testid="heading">
      {props.children}
    </HeadingInner>
  );
};

const HeadingInner = styled.span<StyleProps<HeadingProps>>`
  display: block;
  ${buildTypographyStyle(defaultHeadingProps)}
`;
