import type { StyleOverrideProps, StyleProps } from "@types";
import type { ReactNode } from "react";

const _tableLayouts = ["auto", "fixed"] as const;

export type TableLayout = (typeof _tableLayouts)[number];

const _tableStyles = ["list", "form"] as const;

export type TableStyle = (typeof _tableStyles)[number];

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
} & Omit<StyleOverrideProps, "as">;

export type TableDefaultProps = Required<TableProps>;

export type TableStyleProps = StyleProps<TableDefaultProps>;
