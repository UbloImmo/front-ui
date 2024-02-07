import { GenericFn } from "@ubloimmo/front-util";
import { HexColorAlpha, RgbaColorStr, Enum } from "../../";
import { colors } from "@ubloimmo/front-tokens";

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

export type PaletteColorShade = {
  rgba: RgbaColorStr;
  hex: HexColorAlpha;
  opacity: GenericFn<[number], RgbaColorStr>;
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

export type ClientColorPaletteKey = Exclude<
  keyof typeof colors,
  keyof StaticColorPalette
>;

export type ClientColorPalette = {
  [TKey in ClientColorPaletteKey]: PaletteColorShaded<
    DefaultPaletteColorShadeKey[]
  >;
};

export type DynamicColorPalette = {
  primary: PaletteColorShaded<DefaultPaletteColorShadeKey[]>;
};

export interface ColorPalette extends StaticColorPalette, DynamicColorPalette {}

export type PaletteColor = {
  [ColorKey in keyof ColorPalette & string]: {
    [ShadeKey in keyof ColorPalette[ColorKey] &
      string]: `${ColorKey}-${ShadeKey}`;
  }[keyof ColorPalette[ColorKey] & string];
}[keyof ColorPalette & string];
