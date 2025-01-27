import type { IconName } from "../Icon/Icon.types";
import type {
  ColorKey,
  DefaultPaletteColorShadeKey,
  GrayscalePaletteColorShadeKey,
} from "@types";
import type { Enum, Nullable, RequireAtLeastOne } from "@ubloimmo/front-util";

const _badgeShades = ["light", "dark"] as const;
export type BadgeShade = Enum<typeof _badgeShades>;

export type BadgeProps = RequireAtLeastOne<{
  /**
   * The label of the Badge
   *
   * @required
   * @type {Nullable<string>}
   * @default null
   */
  label: Nullable<string>;
  /**
   * Optional icon to display inside the Badge
   *
   * @type {IconName}
   */
  icon: Nullable<IconName>;
}> & {
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
