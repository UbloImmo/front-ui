import { colors } from "@ubloimmo/front-tokens";

import type { HexColorAlpha, RgbaColorStr } from "@/types/themes/color.types";
import type { GenericFn, Enum, EnumExtension } from "@ubloimmo/front-util";

export const defaultPaletteColorShadeKeys = [
  "dark",
  "medium",
  "base",
  "light",
] as const;

export type DefaultPaletteColorShadeKey = Enum<
  typeof defaultPaletteColorShadeKeys
>;

export const grayscalePaletteColorShadeKeys = [
  "900",
  "800",
  "700",
  "600",
  "500",
  "400",
  "300",
  "200",
  "100",
  "50",
] as const;

export type GrayscalePaletteColorShadeKey = Enum<
  typeof grayscalePaletteColorShadeKeys
>;

export type ShadeOpacityFn = GenericFn<[number], RgbaColorStr>;

export type PaletteColorShade = {
  rgba: RgbaColorStr;
  hex: HexColorAlpha;
  opacity: ShadeOpacityFn;
};

export type AnyPaletteColorShadeKeys =
  | DefaultPaletteColorShadeKey[]
  | GrayscalePaletteColorShadeKey[];

export type PaletteColorShaded<TShadeKey extends AnyPaletteColorShadeKeys> = {
  [TKey in TShadeKey[number]]: PaletteColorShade;
};

export type StaticColorPalette = {
  success: PaletteColorShaded<DefaultPaletteColorShadeKey[]>;
  error: PaletteColorShaded<DefaultPaletteColorShadeKey[]>;
  warning: PaletteColorShaded<DefaultPaletteColorShadeKey[]>;
  pending: PaletteColorShaded<DefaultPaletteColorShadeKey[]>;
  gray: PaletteColorShaded<GrayscalePaletteColorShadeKey[]>;
};

export type DynamicColorPaletteKey = Exclude<
  keyof typeof colors,
  keyof StaticColorPalette
>;

export type DynamicColorPalette = {
  [TKey in DynamicColorPaletteKey]: PaletteColorShaded<
    DefaultPaletteColorShadeKey[]
  >;
};

export type DynamicColorPaletteSubset = {
  primary: PaletteColorShaded<DefaultPaletteColorShadeKey[]>;
};

export interface ColorPalette
  extends StaticColorPalette,
    DynamicColorPaletteSubset {}

export type Color = keyof StaticColorPalette | keyof DynamicColorPaletteSubset;

export type ColorKey = keyof ColorPalette & string;

export type ColorKeyOrWhite = EnumExtension<ColorKey, "white">;

export type ShadeKey<TColorKey extends ColorKey> =
  keyof ColorPalette[TColorKey] & string;

export type PaletteColor = {
  [TColorKey in ColorKey]: {
    [TShadeKey in ShadeKey<TColorKey>]: `${TColorKey}-${TShadeKey}`;
  }[ShadeKey<TColorKey>];
}[ColorKey];

export type PaletteColorOrWhite = EnumExtension<PaletteColor, "white">;
