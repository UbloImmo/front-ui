import { isString } from "@ubloimmo/front-util";
import { Fragment, useMemo } from "react";
import { styled } from "styled-components";

import { buildTypographyStyle, defaultTypographyProps } from "../../typography";

import {
  useClassName,
  useHtmlAttribute,
  useStyleProps,
  useTestId,
} from "@utils";

import type { StyleProps, TestIdProps, TextProps } from "@types";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
};

/**
 * Customizable, accessible global text.
 *
 * @version 0.0.11
 *
 * @param {WithTestId<TextProps>} props - Text component props
 * @returns {JSX.Element}
 */
const Text = (props: TextProps & TestIdProps): JSX.Element => {
  const innerProps = useStyleProps(props);
  const testId = useTestId("text", props);
  const className = useClassName(props);
  const id = useHtmlAttribute(props.id);
  const style = useHtmlAttribute(props.styleOverride);
  const title = useHtmlAttribute(props.title);

  const content = useMemo<typeof props.children>(() => {
    if (!isString(props.children)) return props.children;
    if (!props.children.length) return props.children;

    const newLine = "\n";
    if (!props.children.includes(newLine)) return props.children;

    const lines = props.children.split(newLine);
    if (lines.length <= 1) return props.children;
    return lines.map((line, index) => (
      <Fragment key={`text-line-${index}`}>
        {line}
        {index < lines.length - 1 && <br />}
      </Fragment>
    ));
  }, [props.children]);

  return (
    <TextInner
      data-testid={testId}
      className={className}
      style={style}
      title={title}
      {...innerProps}
      id={id}
    >
      {content}
    </TextInner>
  );
};
Text.defaultProps = defaultTextProps;

export { Text };

const TextInner = styled.span<StyleProps<TextProps>>`
  display: inline-block;
  ${buildTypographyStyle(defaultTextProps)}
`;
