import type { TableProps } from "../../Table.types";
import type { FixedCssLength } from "@types";

export type TableHeaderProps = Omit<TableProps, "layout"> & {
  /**
   * Whether the header should be sticky
   *
   * @type {boolean}
   * @default false
   */
  sticky?: boolean;
  /**
   * Top alignment offset, only used if `sticky` is `true`
   *
   * @type {FixedCssLength}
   * @default 0
   */
  top?: FixedCssLength;
};
