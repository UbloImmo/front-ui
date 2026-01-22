import { isString } from "@ubloimmo/front-util";
import { Fragment, useMemo } from "react";

import { defaultTypographyProps, useTypographyStyles } from "../../typography";

import { useHtmlAttribute, useTestId } from "@utils";

import type { TestIdProps, TextProps } from "@types";

const defaultTextProps: Required<TextProps> = {
  ...defaultTypographyProps,
  size: "m",
};

/**
 * Customizable, accessible global text.
 *
 * @version 0.1.0
 *
 * @param {WithTestId<TextProps>} props - Text component props
 * @returns {JSX.Element}
 */
const Text = (props: TextProps & TestIdProps): JSX.Element => {
  const testId = useTestId("text", props);
  const id = useHtmlAttribute(props.id);
  const title = useHtmlAttribute(props.title);
  const typographyStyles = useTypographyStyles(props, false);

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
    <span data-testid={testId} title={title} {...typographyStyles} id={id}>
      {content}
    </span>
  );
};
Text.defaultProps = defaultTextProps;

export { Text };
