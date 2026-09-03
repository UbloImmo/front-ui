import type { CssLength, CssLengthUsage, StyleOverrideProps } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";
import type { AriaRole, ReactNode } from "react";

export type TableCellPosition = "start" | "end" | "middle" | "both";

export type TableCellProps = {
  /**
   * the child elements to be rendered in the cell
   * @default null
   * @type {ReactNode}
   */
  children?: ReactNode;

  /**
   * the number of columns the cell should span
   * @default 1
   */
  colSpan?: number;

  /**
   * whether the cell should have a padding
   * @type {boolean}
   * @default false
   */
  padded?: boolean;
  /**
   * Optional minimum width the cell should occupy
   * @type {CssLength}
   * @default null
   */
  minWidth?: Nullable<CssLength>;
  /**
   * Optional minimum, maximum & overall width the cell should occupy
   * @type {CssLength}
   * @default null
   */
  fixedWidth?: Nullable<CssLength | CssLengthUsage>;
  /**
   * ARIA role of the cell
   *
   * @default "cell"
   */
  role?: AriaRole;
  /**
   * An optional click handler for the cell.
   *
   * @type {Nullable<Void>}
   */
  onClick?: Nullable<VoidFn>;
  /**
   * Position the cell should be assumed to be in its row:
   * - start: assumed to be the first visible cell in the row
   * - end: assumed to be the last visible cell in the row
   * - both: assumed to be the first & last visible cell in the row
   * - middle: assumed not to be the first nor the last visible cell in the row
   *
   * Affects styling
   *
   * @default null
   */
  position?: Nullable<TableCellPosition>;
  /**
   * ARIA title of the cell
   *
   * @default null
   */
  title?: Nullable<string>;
} & Omit<StyleOverrideProps, "as">;

export type TableCellDefaultProps = Required<TableCellProps>;
