import type {
  FlexAlignment,
  FlexDirection,
  FlexFill,
  FlexLayoutDefaultProps,
  FlexLayoutProps,
  FlexWrap,
} from "./Flex.types";
import type { StyleProps } from "../../types";
import { cssLengthUsage, fromStyleProps, mergeDefaultProps } from "../../utils";
import { StyleFunction, css, type RuleSet } from "styled-components";

/**
 * A function that returns the flex alignment class based on the given alignment.
 *
 * @param {FlexAlignment} alignment - the alignment to determine the flex class for
 * @return {string} the flex alignment class
 */
const flexAlignment = (alignment: FlexAlignment): string => {
  if (alignment === "end" || alignment === "stretch") {
    return `flex-${alignment}`;
  }
  return alignment;
};

/**
 * Returns the flex direction with optional reverse order.
 *
 * @param {FlexDirection} direction - the primary flex direction
 * @param {boolean} reverse - whether to apply reverse order
 * @return {string} the flex direction with optional reverse order
 */
const flexDirection = (direction: FlexDirection, reverse: boolean): string => {
  if (reverse) {
    return [direction, "reverse"].join("-");
  }
  return direction;
};

/**
 * A function that determines the flex wrap value based on the input.
 *
 * @param {FlexWrap} wrap - the type of flex wrap
 * @return {string} the corresponding flex wrap value
 */
const flexWrap = (wrap: FlexWrap): string => {
  if (!wrap) return "nowrap";
  if (wrap === "reverse") return "wrap-reverse";
  return "wrap";
};

/**
 * Generates a RuleSet based on the provided FlexFill value.
 *
 * @param {FlexFill} fill - The value determining how to fill the flex.
 * @return {RuleSet} The generated RuleSet based on the FlexFill value.
 */
const flexFill = (fill: FlexFill): RuleSet => {
  const xFill = css`
    width: 100%;
  `;
  const yFill = css`
    height: 100%;
  `;
  if (fill === true)
    return css`
      ${xFill}
      ${yFill}
    `;
  if (fill === "row") return xFill;
  if (fill === "column") return yFill;
  return css``;
};

/**
 * Builds the `FlexLayout` style declaration based on the provided default props and props.
 *
 * @param {FlexLayoutDefaultProps} defaultProps - the default props for the flex layout
 * @return {StyleFunction<FlexLayoutProps>} a style function for flex layout props
 */
export const buildFlexLayoutStyle =
  (
    defaultProps: FlexLayoutDefaultProps
  ): StyleFunction<StyleProps<FlexLayoutProps>> =>
  (props) => {
    const { direction, gap, justify, align, wrap, reverse, inline, fill } =
      mergeDefaultProps(
        defaultProps,
        fromStyleProps(props as StyleProps<FlexLayoutProps>)
      );

    const display = inline ? "inline-flex" : "flex";
    const xFill = css`
      width: 100%;
    `;
    const yFill = css`
      height: 100%;
    `;
    return css`
      display: ${display};
      flex-direction: ${flexDirection(direction, reverse)};
      gap: ${cssLengthUsage(gap)};
      align-items: ${flexAlignment(align)};
      justify-content: ${flexAlignment(justify)};
      flex-wrap: ${flexWrap(wrap)};
      ${flexFill(fill)}
    `;
  };
