import { GenericFn } from "@ubloimmo/front-util";
import { HexColorAlpha, RgbaColorStr } from "@/types/themes/color.types";
import { Enum } from "@/types/global/global.types";
import { colors } from "@ubloimmo/front-tokens";

export const defaultPaletteColorShadeKeys = [
  "dark",
  "medium",
  "base",
  "light",
] as const;

export type DefaultPaletteShadeKey = Enum<typeof defaultPaletteColorShadeKeys>;

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

export type PaletteColorShade = {
  rgba: RgbaColorStr;
  hex: HexColorAlpha;
  opacity: GenericFn<[number], RgbaColorStr>;
};

export type AnyPaletteColorShadeKeys =
  | DefaultPaletteShadeKey[]
  | GrayscalePaletteColorShadeKey[];

export type PaletteColorShaded<TShadeKey extends AnyPaletteColorShadeKeys> = {
  [TKey in TShadeKey[number]]: PaletteColorShade;
};

export type StaticColorPalette = {
  success: PaletteColorShaded<DefaultPaletteShadeKey[]>;
  error: PaletteColorShaded<DefaultPaletteShadeKey[]>;
  warning: PaletteColorShaded<DefaultPaletteShadeKey[]>;
  pending: PaletteColorShaded<DefaultPaletteShadeKey[]>;
  gray: PaletteColorShaded<GrayscalePaletteColorShadeKey[]>;
};

export type ClientColorPaletteKey = Exclude<
  keyof typeof colors,
  keyof StaticColorPalette
>;

export type ClientColorPalette = {
  [TKey in ClientColorPaletteKey]: PaletteColorShaded<DefaultPaletteShadeKey[]>;
};

export type DynamicColorPalette = {
  primary: PaletteColorShaded<DefaultPaletteShadeKey[]>;
};

export interface ColorPalette extends StaticColorPalette, DynamicColorPalette {}
