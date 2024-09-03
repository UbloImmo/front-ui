import type { StyleProps } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type CollapsibleProps = {
  /**
   * The open/close state of the collapsible
   * @default false
   * @type {boolean}
   */
  open?: boolean;

  /**
   * Whether to call a function when the state changes
   * @default false
   * @type {VoidFn<[boolean]>}
   */
  onOpenChange?: Nullable<VoidFn<[boolean]>>;
  /**
   * Whether to display the collapsible in compact mode
   * @default false
   * @type {boolean}
   */
  compact?: boolean;

  /**
   * Whether opening/closing the collapsible is disabled
   * @default false
   * @type {boolean}
   */
  disabled?: boolean;

  /**
   * The content to display after the arrow
   * @type {ReactNode}
   * @default null
   */
  children?: ReactNode;

  /**
   * The nested collapsible to display
   *
   * @type {Nullable<CollapsibleProps[]>}
   * @default null
   */
  subCollapsibles?: Nullable<CollapsibleProps[]>;
};

export type CollapsibleDefaultProps = Required<CollapsibleProps>;

export type CollapsibleContainerStyleProps = Pick<
  StyleProps<CollapsibleDefaultProps>,
  "$compact" | "$disabled"
>;
