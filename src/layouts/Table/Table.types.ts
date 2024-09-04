import type { StyleOverrideProps } from "@types";
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
};

export type CellDefaultProps = Required<CellProps>;
