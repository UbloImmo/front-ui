import styles from "./FormTableField.module.scss";

import { useCssClasses } from "@utils";

import type { TableCellPosition } from "@layouts";
import type { Optional } from "@ubloimmo/front-util";

/**
 * Computes a form table field cell's CSS className based on its position
 * @param {TableCellPosition} position - The cell's position
 * @returns {Optional<string>} The cell's CSS className
 */
export function useFormTableFieldCellClassName(
  position: TableCellPosition
): Optional<string> {
  return useCssClasses(
    styles.cell,
    [styles.first, position === "start" || position === "both"],
    [styles.last, position === "end" || position === "both"]
  );
}
