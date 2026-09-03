import type { TableStyle } from "../../Table.types";
import type { StyleOverrideProps } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";
import type { AriaRole, ReactNode } from "react";

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
  onClick?: Nullable<VoidFn>;
  /**
   * The style of the row.
   *
   * @type {TableStyle}
   * @default "form"
   */
  style?: TableStyle;
  /**
   * The id of the row
   *
   * @default null
   */
  id?: Nullable<string>;
  /**
   * ARIA role of the row
   *
   * @default "row"
   */
  role?: AriaRole;
} & Omit<StyleOverrideProps, "as">;
