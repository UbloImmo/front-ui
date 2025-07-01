import type { TableStyle } from "../../Table.types";
import type { CssLength, StyleOverrideProps, StyleProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

const _overflowDirections = ["x", "y", "both"] as const;

export type TableScrollViewOverflowDirection = Enum<typeof _overflowDirections>;

export type TableScrollViewProps = {
  /**
   * the child elements to be rendered in the table
   * @type {ReactNode}
   * @default null
   */
  children?: ReactNode;
  /**
   * The direction of the overflow.
   *
   * @type {TableScrollViewOverflowDirection}
   * @default "x"
   */
  overflowDirection?: TableScrollViewOverflowDirection;
  /**
   * The maximum height of the scroll view.
   *
   * @type {Nullable<CssLength>}
   * @default null
   */
  maxHeight?: Nullable<CssLength>;
  /**
   * The style of the underlying table.
   * Setting it to `form` will add negative margins and padding to prevent horizontal overflow while keeping the controls visible on hover.
   * @type {TableStyle}
   * @default "list"
   */
  style?: TableStyle;
} & Omit<StyleOverrideProps, "as">;

export type TableScrollViewDefaultProps = Required<TableScrollViewProps>;

export type TableScrollViewStyleProps = StyleProps<
  Pick<TableScrollViewProps, "overflowDirection" | "maxHeight" | "style">
>;
