import { isString } from "@ubloimmo/front-util";
import { Fragment, useMemo } from "react";

import { defaultTypographyProps, useTypographyStyles } from "../../typography";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

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
  const mergedProps = useMergedProps(defaultTextProps, props);
  const testId = useTestId("text", props);
  const id = useHtmlAttribute(mergedProps.id);
  const title = useHtmlAttribute(mergedProps.title);
  const typographyStyles = useTypographyStyles(mergedProps, false);

  const content = useMemo<typeof props.children>(() => {
    if (!isString(mergedProps.children)) return mergedProps.children;
    if (!mergedProps.children.length) return mergedProps.children;

    const newLine = "\n";
    if (!mergedProps.children.includes(newLine)) return mergedProps.children;

    const lines = mergedProps.children.split(newLine);
    if (lines.length <= 1) return mergedProps.children;
    return lines.map((line, index) => (
      <Fragment key={`text-line-${index}`}>
        {line}
        {index < lines.length - 1 && <br />}
      </Fragment>
    ));
  }, [mergedProps.children]);

  return (
    <span data-testid={testId} title={title} {...typographyStyles} id={id}>
      {content}
    </span>
  );
};
Text.__DEFAULT_PROPS = defaultTextProps;

export { Text };
