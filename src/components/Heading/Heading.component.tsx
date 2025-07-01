import styled from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";

import {
  useClassName,
  useHtmlAttribute,
  useStyleProps,
  useTestId,
} from "@utils";

import type { HeadingProps, StyleProps, TestIdProps } from "@types";

const defaultHeadingProps: Required<HeadingProps> = {
  ...defaultTypographyProps,
  size: "h1",
} as const;

/**
 * Customizable, accessible heading.
 *
 * @version 0.0.9
 *
 * @param {WithTestId<HeadingProps>} props - Heading component props
 * @return {JSX.Element} - The styled heading component
 */
const Heading = (props: HeadingProps & TestIdProps) => {
  const innerProps = useStyleProps(props);
  const testId = useTestId("heading", props);
  const className = useClassName(props);
  const id = useHtmlAttribute(props.id);
  const style = useHtmlAttribute(props.styleOverride);
  const title = useHtmlAttribute(props.title);

  return (
    <HeadingInner
      id={id}
      {...innerProps}
      as={props.size ?? defaultHeadingProps.size}
      data-testid={testId}
      className={className}
      style={style}
      title={title}
    >
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
