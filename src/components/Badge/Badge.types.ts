import { Nullable } from "@ubloimmo/front-util";

import { IconName } from "../Icon/Icon.types";

import {
  ColorKey,
  DefaultPaletteColorShadeKey,
  Enum,
  GrayscalePaletteColorShadeKey,
} from "@types";

const badgeShades = ["light", "dark"] as const;
export type BadgeShade = Enum<typeof badgeShades>;

export type BadgeProps = {
  /**
   * The label of the Badge
   *
   * @required
   * @type {string}
   * @default undefined
   */
  label: string;
  /**
   * Optional icon to display inside the Badge
   *
   * @type {IconName}
   */
  icon?: Nullable<IconName>;
  /**
   * The dominant color of the Badge
   *
   * @type {ColorKey}
   * @default "primary"
   */
  color?: ColorKey;
  /**
   * The badge's shade
   * Determines its background, text and icon colors according to the `color` prop
   *
   * @type {BadgeShade}
   * @default "light"
   */
  shade?: BadgeShade;
};

export type DefaultBadgeProps = Required<BadgeProps>;

export type BadgeShadeStyle = {
  textColor: DefaultPaletteColorShadeKey | GrayscalePaletteColorShadeKey;
  backgroundColor: DefaultPaletteColorShadeKey | GrayscalePaletteColorShadeKey;
  iconColor: DefaultPaletteColorShadeKey | GrayscalePaletteColorShadeKey;
};
