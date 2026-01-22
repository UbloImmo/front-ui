import styles from "./Flex.module.css";

import { cssLengthUsage, useCssClasses, useCssVariables } from "@utils";

import type { FlexAlignment, FlexLayoutDefaultProps } from "./Flex.types";

/**
 * A function that returns the flex alignment class based on the given alignment.
 *
 * @param {FlexAlignment} alignment - the alignment to determine the flex class for
 * @return {string} the flex alignment class
 */
const flexAlignment = (alignment: FlexAlignment): string => {
  if (alignment === "end" || alignment === "start") {
    return `flex-${alignment}`;
  }
  return alignment;
};

/**
 * Builds the `FlexLayout` style declaration based on the provided default props and props.
 *
 * @param {FlexLayoutDefaultProps} props - the default props for the flex layout
 * @returns CSS classes & styles for the flex layout
 */
export function useFlexLayoutStyle(props: FlexLayoutDefaultProps) {
  const className = useCssClasses(
    styles.flex,
    [styles.inline, props.inline],
    styles[props.direction],
    [styles.reverse, props.reverse],
    [styles.fill, props.fill === true],
    [styles["fill-column"], props.fill === "column"],
    [styles["fill-row"], props.fill === "row"],
    !props.wrap
      ? undefined
      : props.wrap === "reverse"
        ? styles["wrap-reverse"]
        : styles.wrap,
    props.className
  );

  const style = useCssVariables(
    {
      "flex-gap": cssLengthUsage(props.gap),
      "flex-align": flexAlignment(props.align),
      "flex-justify": flexAlignment(props.justify),
    },
    props.styleOverride
  );

  return {
    className,
    style,
  };
}
