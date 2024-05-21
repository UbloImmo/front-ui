import { styled } from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";

import { useStyleProps, useTestId } from "@utils";

import type { StyleProps, TestIdProps, TextProps } from "@types";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
};

/**
 * Customizable, accessible global text.
 *
 * @version 0.0.2
 * @param {WithTestId<TextProps>} props - Text component props
 * @returns {JSX.Element}
 */
const Text = (props: TextProps & TestIdProps): JSX.Element => {
  const innerProps = useStyleProps(props);
  const testId = useTestId("text", props);
  return (
    <TextInner data-testid={testId} {...innerProps}>
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
