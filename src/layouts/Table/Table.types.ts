import type { StyleOverrideProps, StyleProps } from "@types";
import type { ReactNode } from "react";

export type TableProps = {
  /**
   * the child elements to be rendered in the table
   * @default null
   * @type {ReactNode}
   */
  children?: ReactNode;
} & StyleOverrideProps;

export type TableDefaultProps = Required<TableProps>;

export type CellProps = {
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

export type CellDefaultProps = Required<CellProps>;

export type TableCellStyleProps = Pick<StyleProps<CellProps>, "$padded">;
