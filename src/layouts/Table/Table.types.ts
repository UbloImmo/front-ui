import type { StyleOverrideProps, StyleProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

const _tableLayouts = ["auto", "fixed"] as const;

export type TableLayout = Enum<typeof _tableLayouts>;

const _tableStyles = ["list", "form"] as const;

export type TableStyle = Enum<typeof _tableStyles>;

export type TableProps = {
  /**
   * the child elements to be rendered in the table
   * @type {ReactNode}
   * @default null
   */
  children?: ReactNode;
  /**
   * the table's layout
   * @type {TableLayout}
   * @default "auto"
   */
  layout?: TableLayout;
  /**
   * The table's id.
   *
   * @type {string}
   * @default null
   */
  id?: Nullable<string>;
} & Omit<StyleOverrideProps, "as">;

export type TableDefaultProps = Required<TableProps>;

/** @deprecated styled-components */
export type TableStyleProps = StyleProps<TableDefaultProps>;
