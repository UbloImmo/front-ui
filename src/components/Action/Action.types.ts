import {
  StyleOverrideProps,
  type ColorKey,
  type StyleProps,
  type TestIdProps,
} from "@types";

import type { BadgeProps } from "../Badge";
import type { IconName } from "../Icon";
import type { StaticIconIndicator } from "../StaticIcon";
import type { TooltipProps } from "../Tooltip";
import type { Enum, Nullable, Replace, VoidFn } from "@ubloimmo/front-util";
import type { FC, MouseEventHandler } from "react";

const _actionSizes = ["centered", "default", "large", "card"] as const;

/**
 * The size of an action.
 *
 * @default "default"
 */
export type ActionSize = Enum<typeof _actionSizes>;

/**
 * The color of an action. Set it to `error` for destructive actions.
 *
 * @default "primary"
 */
export type ActionColor = Extract<ColorKey, "primary" | "error">;

/**
 * Action component props
 */
export type ActionProps = Omit<StyleOverrideProps, "as"> & {
  /**
   * The action button's label.
   *
   * @type {string}
   * @required
   * @default "[Action]"
   */
  label: string;
  /**
   * The icon name to be used by Action to display its icon.
   *
   * @type {IconName}
   * @required
   * @default "Cursor"
   */
  icon: IconName;
  /**
   * The action button's onClick callback.
   *
   * @type {Nullable<VoidFn>}
   */
  onClick?: Nullable<VoidFn>;
  /**
   * Whether the Action button is disabled.
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * The Action button's variant.
   * @type {ActionVariant}
   * @default "default"
   */
  size?: ActionSize;
  /**
   * Optional badge label.
   *
   * @remarks No `Badge` will render if this is missing.
   *
   * @type {Nullable<string>}
   * @default null
   */
  badgeLabel?: Nullable<string>;
  /**
   * The accessible title to assign to the Action button.
   *
   * @remarks if missing, the label will be used.
   *
   * @type {Nullable<string>}
   * @default string;
   */
  title?: Nullable<string>;
  /**
   * The tooltip to display when hovering over the Action button.
   *
   * @type {Nullable<TooltipProps>}
   * @default null
   */
  iconTooltip?: Nullable<Omit<TooltipProps, "children">>;
  /**
   * The description to display below the Action's label.
   *
   * @type {Nullable<string>}
   * @default null
   */
  description?: Nullable<string>;
  /**
   * An additional indicator to render on the top right corner of the static icon
   *
   * @type {Nullable<StaticIconIndicator>}
   * @default null
   */
  indicator?: Nullable<StaticIconIndicator>;
  /**
   * The color of the Action
   *
   * @type {ActionColor}
   * @default "primary"
   */
  color?: ActionColor;
};

export type DefaultActionProps = Required<ActionProps>;

export type ActionStyledProps = StyleProps<
  Omit<DefaultActionProps, "onClick"> & Required<Pick<TestIdProps, "testId">>
>;

export type SizedActionProps = Replace<
  DefaultActionProps,
  "onClick",
  {
    onClick: MouseEventHandler;
  }
> & {
  isHovering: boolean;
} & Required<Pick<TestIdProps, "testId">> & {
    badgeProps: Nullable<BadgeProps>;
    iconTooltipProps: Nullable<TooltipProps>;
  };

export type SizedActionMap = {
  [size in ActionSize]: FC<SizedActionProps>;
};
