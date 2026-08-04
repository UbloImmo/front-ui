import { isNull } from "@ubloimmo/front-util";

import { TableCellDefaultProps } from "./TableCell.types";
import styles from "../../Table.module.scss";

import {
  cssLengthUsage,
  isCssLengthUsage,
  useCssClasses,
  useCssVariables,
} from "@utils";

export function useTableCellStyles(mergedProps: TableCellDefaultProps) {
  const className = useCssClasses(
    styles["table-cell"],
    [styles.padded, mergedProps.padded],
    [styles["min-width"], !!mergedProps.minWidth],
    [styles["fixed-width"], !!mergedProps.fixedWidth],
    mergedProps.className
  );
  const style = useCssVariables(
    {
      "table-cell-min-width": isNull(mergedProps.minWidth)
        ? undefined
        : cssLengthUsage(mergedProps.minWidth),
      "table-cell-fixed-width": isNull(mergedProps.fixedWidth)
        ? undefined
        : isCssLengthUsage(mergedProps.fixedWidth)
          ? mergedProps.fixedWidth
          : cssLengthUsage(mergedProps.fixedWidth),
    },
    mergedProps.styleOverride
  );

  return {
    className,
    style,
  };
}
