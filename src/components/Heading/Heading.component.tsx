import { HeadingProps } from "../../types/typography";
import {
  buildTypographyStyle,
  defaultTypographyProps,
} from "../../typography/typography.styles";
import styled from "styled-components";

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
export const Heading = styled.span<HeadingProps>`
  display: block;
  ${buildTypographyStyle(defaultHeadingProps)}
`;
