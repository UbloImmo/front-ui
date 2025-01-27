import type { BadgeProps } from "../Badge";
import type { StaticIconProps } from "../StaticIcon";
import type { NonOptional, Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type ContextLineStaticIconProps = Omit<
  StaticIconProps,
  "size" | "indicator"
>;

export type ContextLineProps = {
  /**
   * The label of the ContextLine
   *
   * @required
   * @type {string | null}
   * @default null
   */
  label: Nullable<string>;
  /**
   * A custom element to display in the ContextLine
   *
   * @default null
   */
  children?: ReactNode;
  /**
   * A badge to display in the ContextLine
   *
   * @default null
   */
  badge?: Nullable<BadgeProps>;
  /**
   * An optional icon to display in the ContextLine
   * Gets rendered as a small StaticIcon
   *
   * @default null
   */
  icon?: Nullable<ContextLineStaticIconProps>;
  /**
   * An optional description to display below the label
   *
   * @default null
   */
  description?: Nullable<string | NonOptional<ReactNode>>;
  /**
   * Whether to display a bottom border
   *
   * @default true
   */
  borderBottom?: boolean;
  /**
   * Whether to add horizontal padding (adds `--s-3` on each side)
   *
   * @default false
   */
  paddingHorizontal?: boolean;
  /**
   * Whether to display a compact version of the ContextLine
   *
   * When compact, the ContextLine's vertical padding is reduced to `--s-2`
   * as opposed to `--s-3` by default
   *
   * @default false
   */
  compact?: boolean;
};

export type ContextLineDefaultProps = Required<ContextLineProps>;
