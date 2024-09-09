import type { StyleProps } from "@types";
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
};

export type TableCellDefaultProps = Required<TableCellProps>;

export type TableCellStyleProps = Pick<StyleProps<TableCellProps>, "$padded">;
