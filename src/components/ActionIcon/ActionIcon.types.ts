import type { IconName } from "../Icon";
import type { ColorKey, StyleOverrideProps, StyleProps } from "@types";
import type { Enum, Extract, Nullable, VoidFn } from "@ubloimmo/front-util";

const actionIconSizes = ["l", "m", "s"] as const;
export type ActionIconSize = Enum<typeof actionIconSizes>;

export type ActionIconColor = Extract<ColorKey, "primary" | "error"> | "white";

export type ActionIconProps = StyleOverrideProps & {
  /**
   * The name of the nested icon to render
   * @type {IconName}
   * @required
   */
  icon: IconName;
  /**
   * Callback when the ActionIcon is clicked
   * @type {Nullable<VoidFn>}
   * @default null
   */
  onClick?: Nullable<VoidFn>;
  /**
   * The size of the ActionIcon
   * @type {ActionIconSize}
   * @default "l"
   */
  size?: ActionIconSize;
  /**
   * The color of the ActionIcon.
   *
   * Affects its appearance while hovering when size is `m` or `l`.
   *
   * @remarks Set it to `error` for destructive actions.
   *
   * @type {ActionIconColor}
   * @default "primary"
   */
  color?: ActionIconColor;
  /**
   * Whether the ActionIcon is disabled
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * The title to display when hovering the ActionIcon
   * @type {string}
   * @required since ActionIcon does not display a label
   */
  title: string;
};

export type DefaultActionIconProps = Required<ActionIconProps>;

export type ActionIconStyleProps = StyleProps<DefaultActionIconProps>;
