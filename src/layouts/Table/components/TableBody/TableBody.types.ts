import type { TableProps, TableStyle } from "../../Table.types";
import type { StyleProps } from "@types";

export type TableBodyProps = TableProps & {
  /**
   * the table body's style
   * @type {TableStyle}
   * @default "form"
   */
  style?: TableStyle;
};

export type TableBodyStyleProps = StyleProps<
  Required<Pick<TableBodyProps, "style">>
>;
