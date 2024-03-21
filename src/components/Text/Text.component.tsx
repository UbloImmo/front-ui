import { styled } from "styled-components";
import { TextProps } from "../../types";
import {
  buildTypographyStyle,
  defaultTypographyProps,
} from "../../typography/typography.styles";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
} as const;
/**
 * Renders a text component
 *
 * @param {TextProps} props - Text component props
 */
export const Text = styled.span<TextProps>`
  display: inline-block;
  ${buildTypographyStyle(defaultTextProps)}
`;
