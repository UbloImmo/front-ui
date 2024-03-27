import { styled } from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";
import { useStyleProps } from "../../utils";

import type { StyleProps, TextProps } from "../../types";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
};

/**
 * Renders a text component
 *
 * @version 0.0.1
 * @param {TextProps} props - Text component props
 */
const Text = (props: TextProps) => {
  const innerProps = useStyleProps(props);
  return (
    <TextInner data-testid="text" {...innerProps}>
      {props.children}
    </TextInner>
  );
};
Text.defaultProps = defaultTextProps;

export { Text };

const TextInner = styled.span<StyleProps<TextProps>>`
  display: inline-block;
  ${buildTypographyStyle(defaultTextProps)}
`;
