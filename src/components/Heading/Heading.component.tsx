import styled from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";

import { useStyleProps, useTestId } from "@utils";

import type { HeadingProps, StyleProps, WithTestId } from "@types";

const defaultHeadingProps: Required<HeadingProps> = {
  ...defaultTypographyProps,
  size: "h1",
} as const;

/**
 * Renders a heading component
 *
 * @version 0.0.2
 *
 * @param {WithTestId<HeadingProps>} props - Heading component props
 * @return {JSX.Element} - The styled heading component
 */
const Heading = (props: WithTestId<HeadingProps>) => {
  const innerProps = useStyleProps(props);
  const testId = useTestId("heading", props);

  return (
    <HeadingInner {...innerProps} data-testid={testId}>
      {props.children}
    </HeadingInner>
  );
};

Heading.defaultProps = defaultHeadingProps;

export { Heading };

const HeadingInner = styled.span<StyleProps<HeadingProps>>`
  display: block;
  ${buildTypographyStyle(defaultHeadingProps)}
`;
