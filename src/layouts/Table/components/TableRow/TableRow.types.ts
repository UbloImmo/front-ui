import type { TableStyle } from "../../Table.types";
import type { StyleOverrideProps, StyleProps } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type TableRowProps = {
  /**
   * The table cells to be rendered inside the row.
   *
   * @type {ReactNode};
   */
  children?: ReactNode;
  /**
   * An optional click handler for the row.
   *
   * @type {VoidFn}
   */
  onClick?: VoidFn;
  /**
   * The style of the row.
   *
   * @type {TableRowStyle}
   * @default "form"
   */
  style?: TableStyle;
} & StyleOverrideProps;

export type TableRowStyleProps = StyleProps<
  Required<Pick<TableRowProps, "style">> & {
    clickable?: boolean;
  }
>;
