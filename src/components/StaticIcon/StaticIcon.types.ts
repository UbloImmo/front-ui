import { ColorKey, SpacingLabel, Enum } from "../../types";
import { IconProps } from "../Icon/Icon.types";

const staticIconSizes = ["xs", "s", "m", "l"] as const;
export type StaticIconSize = Enum<typeof staticIconSizes>;

export type StaticIconProps = {
  /**
   * The color of the staticIcon
   *
   * @default "primary"
   */
  color?: ColorKey;
  /**
   * The size of the Icon.
   * Influences the padding and border radius of the wrapper as well
   *
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
   * @default undefined
   */
  name: IconProps["name"];
};

export type DefaultStaticIconProps = Required<StaticIconProps>;

export type StaticIconContainerStyle = {
  padding: SpacingLabel;
  borderRadius: SpacingLabel;
};
