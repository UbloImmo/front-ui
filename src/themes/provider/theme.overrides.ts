import { Nullable, transformObject } from "@ubloimmo/front-util";
import {
  blendColors,
  hexColorConverter,
  rgbaColorConverter,
} from "../../utils";
import { shadeOpacityFactory } from "../palette";
import type {
  DefaultPaletteColorShadeKey,
  PaletteColorShade,
  PaletteColorShaded,
  GetThemeOverridesFn,
  ThemeOverrideReponse,
  ThemeOverride,
  ThemeOverridePalette,
} from "../../types";

const DEFAULT_UBLO_API_URL = "https://ublo.ublo.org/api";

/**
 * Generates a path template for theme overrides based on the given base path.
 *
 * @param {string} basePath - The base path for the theme overrides.
 * @return {string} The generated path template for theme overrides.
 */
const themeOverridesPathTemplate = (basePath: string) =>
  `${basePath}/themes/json`;

/**
 * Fetches theme overrides from the specified base path.
 *
 * @param {string} basePath - The base path for fetching theme overrides.
 * @return {Promise<Nullable<ThemeOverride>>} A Promise that resolves to the fetched theme overrides, or null if an error occurs.
 */
const fetchThemeOverrides = async (
  basePath: string
): Promise<Nullable<ThemeOverride>> => {
  try {
    const res = await fetch(themeOverridesPathTemplate(basePath), {
      mode: "no-cors",
    });
    const theme = (await res.json()) as ThemeOverrideReponse;
    if (!theme.organization.name) {
      return null;
    }
    return theme as ThemeOverride;
  } catch (e) {
    console.error(e);
    // silently error out
    return null;
  }
};

/**
 * Retrieves theme overrides asynchronously while adding support for local and staging environments.
 *
 * @return {Promise<Nullable<ThemeOverride>>} The theme overrides
 */
export const getThemeOverrides: GetThemeOverridesFn = async () => {
  const basePath = window.location.origin;

  const overrides: Nullable<ThemeOverride> = await fetchThemeOverrides(
    basePath.includes("localhost") ? DEFAULT_UBLO_API_URL : basePath
  );

  return overrides;
};

/**
 * Generates a {@link PaleteColorShaded} from a {@link ThemeOverridePalette}
 * while filling in `medium` shade if missing
 *
 * @param {ThemeOverridePalette} palette - the input palette
 * @return {PaletteColorShaded<DefaultPaletteColorShadeKey[]>} the generated shaded color palette
 */
export const themeOverridePaletteToColorPaletteShaded = (
  palette: ThemeOverridePalette
) => {
  // generate medium color if missing, keep values as hex
  const basePaletteHex = {
    ...palette,
    medium:
      palette.medium ??
      rgbaColorConverter.strToHex(
        blendColors(palette.base, palette.light, 0.5)
      ),
  };
  // actually convert to PaletteColorShaded
  const paletteColorShaded: PaletteColorShaded<DefaultPaletteColorShadeKey[]> =
    transformObject(
      basePaletteHex,
      (hex): PaletteColorShade => ({
        hex,
        rgba: hexColorConverter.hexToRgbaStr(hex),
        opacity: shadeOpacityFactory(hexColorConverter.hexToRgbaArr(hex)),
      })
    );
  return paletteColorShaded;
};
