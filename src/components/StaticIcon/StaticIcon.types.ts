import type { IconName, IconProps } from "../Icon/Icon.types";
import type { TooltipProps } from "../Tooltip";
import type { SpacingLabel, ColorKeyOrWhite, StyleOverrideProps } from "@types";
import type { Enum, Nullable } from "@ubloimmo/front-util";

const staticIconSizes = ["xs", "s", "m", "l"] as const;
export type StaticIconSize = Enum<typeof staticIconSizes>;

export type StaticIconIndicator = Pick<IconProps, "color" | "name"> & {
  /**
   * An optional tooltip to render when hovering the indicator
   *
   * @type {Nullable<Omit<TooltipProps, "children">>}
   * @default null
   */
  tooltip?: Nullable<Omit<TooltipProps, "children">>;
};

export type StaticIconProps = Omit<StyleOverrideProps, "as"> & {
  /**
   * The color of the staticIcon
   *
   * @type {ColorKeyOrWhite}
   * @default "primary"
   */
  color?: ColorKeyOrWhite;
  /**
   * The size of the Icon.
   * Influences the padding and border radius of the wrapper as well
   *
   * @type {StaticIconSize}
   * @default "s"
   */
  size?: StaticIconSize;
  /**
   * Whether to render a thin stroke around the wrapper.
   *
   * @default false
   */
  stroke?: boolean;
  /**
   * The name of the icon to render
   *
   * Gets passed down to the `Icon` component
   *
   * @required
   * @type {IconName}
   * @default undefined
   */
  name: IconName;
  /**
   * An additional to render on the top right corner of the static icon
   *
   * @type {Nullable<StaticIconIndicator>}
   * @default null
   */
  indicator?: Nullable<StaticIconIndicator>;
};

export type DefaultStaticIconProps = Required<StaticIconProps>;

export type StaticIconContainerStyle = {
  borderRadius: SpacingLabel;
  size: SpacingLabel;
};
