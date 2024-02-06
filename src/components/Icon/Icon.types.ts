import { PaletteColor, CssLength, CssFr, SpacingLabel } from "../../types";
import { GenericFn } from "@ubloimmo/front-util";
import * as GeneratedIcons from "./__generated__";
import { CommonIconProps } from "./__generated__/common.types";

export type IconName = keyof typeof GeneratedIcons;

export type GeneratedIcon = GenericFn<[CommonIconProps], JSX.Element>;

export type IconProps = {
  size?: Exclude<CssLength, CssFr | SpacingLabel>;
  color?: PaletteColor;
  name: IconName;
};

export type DefaultIconProps = Required<IconProps>;
