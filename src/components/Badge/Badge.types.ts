import { Nullable } from "@ubloimmo/front-util";
import {
  ColorKey,
  DefaultPaletteColorShadeKey,
  Enum,
  GrayscalePaletteColorShadeKey,
} from "../../types";
import { IconName } from "../Icon/Icon.types";

const badgeShades = ["light", "dark"] as const;
export type BadgeShade = Enum<typeof badgeShades>;

export type BadgeProps = {
  label: string;
  icon?: Nullable<IconName>;
  color?: ColorKey;
  shade?: BadgeShade;
};

export type DefaultBadgeProps = Required<BadgeProps>;

export type BadgeShadeStyle = {
  textColor: DefaultPaletteColorShadeKey | GrayscalePaletteColorShadeKey;
  backgroundColor: DefaultPaletteColorShadeKey | GrayscalePaletteColorShadeKey;
  iconColor: DefaultPaletteColorShadeKey | GrayscalePaletteColorShadeKey;
};
