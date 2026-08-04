import { Nullable } from "@ubloimmo/front-util";

import type { CssLength, CssLengthUsage, StyleOverrideProps } from "@types";
import type { ReactNode } from "react";

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
} & Omit<StyleOverrideProps, "as">;

export type TableCellDefaultProps = Required<TableCellProps>;
