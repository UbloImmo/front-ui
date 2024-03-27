import { styled } from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";
import { useStyleProps } from "../../utils";

import type { StyleProps, TextProps } from "../../types";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
} as const;
/**
 * Renders a text component
 *
 * @param {TextProps} props - Text component props
 */
export const Text = (props: TextProps) => {
  const innerProps = useStyleProps(props);
  return <TextInner {...innerProps}>{props.children}</TextInner>;
};

const TextInner = styled.span<StyleProps<TextProps>>`
  display: inline-block;
  ${buildTypographyStyle(defaultTextProps)}
`;
