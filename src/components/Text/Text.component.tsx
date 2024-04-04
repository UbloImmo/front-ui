import { styled } from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";

import { useStyleProps, useTestId } from "@utils";

import type { StyleProps, TextProps, WithTestId } from "@types";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
};

/**
 * Renders its children in accordance with global typography styles.
 *
 * @version 0.0.2
 * @param {WithTestId<TextProps>} props - Text component props
 * @returns {JSX.Element}
 */
const Text = (props: WithTestId<TextProps>): JSX.Element => {
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
