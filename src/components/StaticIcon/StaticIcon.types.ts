import { ColorKey, SpacingLabel } from "../../types";
import { IconProps } from "../Icon/Icon.types";
import { Enum } from "../../types";

const staticIconSizes = ["xs", "s", "m", "l"] as const;
export type StaticIconSize = Enum<typeof staticIconSizes>;

export type StaticIconProps = {
  color?: ColorKey;
  size?: StaticIconSize;
  stroke?: boolean;
  name?: IconProps["name"];
};

export type DefaultStaticIconProps = Required<StaticIconProps>;

export type StaticIconContainerStyle = {
  padding: SpacingLabel;
  borderRadius: SpacingLabel;
};
