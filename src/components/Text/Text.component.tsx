import { styled } from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";

import { useStyleProps } from "@utils";

import type { StyleProps, TextProps } from "@types";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
};

/**
 * Renders its children in accordance with global typography styles.
 *
 * @version 0.0.1
 * @param {TextProps} props - Text component props
 * @returns {JSX.Element}
 */
const Text = (props: TextProps): JSX.Element => {
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
