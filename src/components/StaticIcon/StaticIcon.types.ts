import { IconName } from "../Icon/Icon.types";

import { ColorKey, Enum, SpacingLabel } from "@types";

const staticIconSizes = ["xs", "s", "m", "l"] as const;
export type StaticIconSize = Enum<typeof staticIconSizes>;

export type StaticIconColor = ColorKey | "white";

export type StaticIconProps = {
  /**
   * The color of the staticIcon
   *
   * @type {StaticIconColor}
   * @default "primary"
   */
  color?: StaticIconColor;
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
};

export type DefaultStaticIconProps = Required<StaticIconProps>;

export type StaticIconContainerStyle = {
  borderRadius: SpacingLabel;
  size: SpacingLabel;
};
