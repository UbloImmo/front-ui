import styles from "./GridItem.module.css";

import { useCssClasses, useCssVariables } from "@utils";

import type { GridItemInnerProps } from "./GridItem.types";

/**
 * Returns css style for a grid item with the specified style properties.
 *
 * @param {GridItemInnerProps} props - The style properties for the grid item.
 * @return The CSS classes & styles for the grid item.
 */
export function useGridItemStyle(props: GridItemInnerProps) {
  const className = useCssClasses(
    styles["grid-item"],
    [styles.fill, !!props.fill],
    [styles["fill-force"], props.fill === "force"],
    props.className
  );

  const style = useCssVariables(
    {
      "row-start": props.rowStart,
      "row-end": props.rowEnd,
      "column-start": props.columnStart,
      "column-end": props.columnEnd,
      align: props.align,
      justify: props.justify,
    },
    props.styleOverride
  );

  return { className, style };
}
