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
