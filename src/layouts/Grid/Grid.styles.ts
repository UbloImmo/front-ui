import {
  isArray,
  isNumber,
  isObject,
  transformObject,
} from "@ubloimmo/front-util";

import styles from "./Grid.module.css";

import { cssLengthUsage, useCssClasses, useCssVariables } from "@utils";

import type {
  GridGap,
  GridLayoutDefaultProps,
  GridTemplate,
} from "./Grid.types";
import type { CssLengthUsage } from "@types";

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
const gridTemplate = (template: GridTemplate): string => {
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
 * @param {GridLayoutDefaultProps} props - the default props for the grid layout
 * @returns The grid layout's CSS style & className
 */
export function useGridLayoutStyle(props: GridLayoutDefaultProps) {
  const className = useCssClasses(
    styles.grid,
    [styles.inline, props.inline],
    [styles.fill, props.fill],
    [styles.row, props.flow.includes("row")],
    [styles.column, props.flow.includes("column")],
    [styles.dense, props.flow.includes("dense")],
    props.className
  );
  const gaps = gridGap(props.gap);
  const style = useCssVariables(
    {
      "row-gap": gaps.row,
      "column-gap": gaps.column,
      "template-columns": gridTemplate(props.columns),
      "template-rows": gridTemplate(props.rows),
      "grid-align": props.align,
      "grid-justify": props.justify,
    },
    props.styleOverride
  );

  return { className, style };
}
