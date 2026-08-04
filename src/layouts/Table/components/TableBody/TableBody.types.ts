import type { TableProps, TableStyle } from "../../Table.types";

export type TableBodyProps = Omit<TableProps, "layout"> & {
  /**
   * the table body's style
   * @type {TableStyle}
   * @default "form"
   */
  style?: TableStyle;
};
