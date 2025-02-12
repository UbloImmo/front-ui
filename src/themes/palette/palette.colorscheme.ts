import { ValueMap } from "@ubloimmo/front-util";

import {
  AnyPaletteColorShadeKeys,
  DefaultPaletteColorShadeKey,
  GrayscalePaletteColorShadeKey,
} from "@types";

const shadeInversionMap: ValueMap<
  GrayscalePaletteColorShadeKey,
  GrayscalePaletteColorShadeKey
> &
  ValueMap<DefaultPaletteColorShadeKey, DefaultPaletteColorShadeKey> = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
  dark: "light",
  base: "medium",
  medium: "base",
  light: "dark",
};

export const invertShadeKey = <TShades extends AnyPaletteColorShadeKeys>(
  shadeKey: TShades[number]
): TShades[number] => {
  return shadeInversionMap[shadeKey];
};
