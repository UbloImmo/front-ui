import {
  isArray,
  isNumber,
  isObject,
  transformObject,
} from "@ubloimmo/front-util";
import { StyleFunction, css } from "styled-components";

import {
  GridGap,
  GridLayoutDefaultProps,
  GridLayoutProps,
  GridTemplate,
} from "./Grid.types";
import { CssLengthUsage, type StyleProps } from "../../types";
import { cssLengthUsage, fromStyleProps, mergeDefaultProps } from "../../utils";

/**
 * Splits the common gap into row and columm with same values
 * and parses gaps into CSS compatible gap values.
 *
 * @param {GridGap} gridGap - the grid gap
 * @return {{row: CssLengthUsage, column: CssLengthUsage}} the transformed object with CSS compatible gap values
 */
const gridGap = (
  gridGap: GridGap
): { row: CssLengthUsage; column: CssLengthUsage } => {
  // split common gap into row and column object with same values
  const gap = isObject(gridGap) ? gridGap : { row: gridGap, column: gridGap };
  // parse gaps into css compatible gap values.
  return transformObject(gap, cssLengthUsage);
};

/**
 * Generates a grid template based on the input template.
 *
 * @param {GridTemplate} template - the input template for the grid
 * @return {string} the generated grid template
 */
const gridTemplate = (template: GridTemplate) => {
  if (isNumber(template)) {
    return `repeat(${template}, 1fr)`;
  }
  if (isArray(template)) {
    return template
      .map((item) => (item === "auto" ? item : cssLengthUsage(item)))
      .join(" ");
  }
  return template;
};

/**
 * Builds the `GridLayout` style based on the provided default props and props.
 *
 * @param {GridLayoutDefaultProps} defaultProps - the default props for the grid layout
 * @return {StyleFunction<GridLayoutProps>} a function that returns the grid layout style
 */
export const buildGridLayoutStyle =
  (
    defaultProps: GridLayoutDefaultProps
  ): StyleFunction<StyleProps<GridLayoutProps>> =>
  (props: StyleProps<GridLayoutProps>) => {
    const { flow, gap, justify, align, columns, rows, inline } =
      mergeDefaultProps(defaultProps, fromStyleProps(props));
    const { row, column } = gridGap(gap);
    const display = inline ? "inline-grid" : "grid";

    return css`
      display: ${display};
      grid-template-rows: ${gridTemplate(rows)};
      grid-template-columns: ${gridTemplate(columns)};
      grid-auto-flow: ${flow};
      grid-column-gap: ${column};
      grid-row-gap: ${row};
      align-items: ${align};
      justify-content: ${justify};
    `;
  };
