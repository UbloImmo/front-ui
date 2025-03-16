import type { Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type ListSideHeaderProps = {
  /**
   * The title of the list
   *
   * @type {string}
   * @default "List"
   */
  title: string;
  /**
   * Whether to display the count of items in the list
   *
   * @type {boolean}
   * @default false
   */
  displayCount?: boolean;
  /**
   * The count of items in the list displayed in a badge
   *
   * @type {Nullable<number | string>}
   * @default null
   */
  overrideCount?: Nullable<number | string>;
  /**
   * The component's children.
   * Could be a Search bar or anything else
   *
   * @type {ReactNode}
   */
  children?: ReactNode;
};

export type ListSideHeaderDefaultProps = Required<ListSideHeaderProps>;
