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

export const DEFAULT_UBLO_API_URL = "https://ublo.ublo.org/api";

/**
 * Generates a path template for theme overrides based on the given base path.
 *
 * @param {string} basePath - The base path for the theme overrides.
 * @return {`${string}/themes/json`} The generated path template for theme overrides.
 */
const themeOverridesPathTemplate = (
  basePath: string
): `${string}/themes/json` => `${basePath}/themes/json` as const;

/**
 * Fetches theme overrides from the specified base path.
 *
 * @param {string} basePath - The base path for fetching theme overrides.
 * @param {typeof fetch} [fakeFetchFn = undefined] - Fake fetch fn used for testing purposes where global fetch is not define
 * @return {Promise<Nullable<ThemeOverride>>} A Promise that resolves to the fetched theme overrides, or null if an error occurs.
 */
const fetchThemeOverrides = async (
  basePath: string,
  fakeFetchFn?: typeof fetch
): Promise<Nullable<ThemeOverride>> => {
  try {
    const path = themeOverridesPathTemplate(basePath);
    const res = await (fakeFetchFn ?? fetch)(path, {
      mode: "no-cors",
    });
    const theme = (await res.json()) as ThemeOverrideReponse;
    if (!theme || !theme.organization?.name) {
      return null;
    }
    return theme as ThemeOverride;
  } catch (e) {
    // silently error out
    return null;
  }
};

/**
 * Retrieves theme overrides asynchronously while adding support for local and staging environments.
 *
 * @param {typeof fetch} [fakeFetchFn = undefined] - Fake fetch fn used for testing purposes where global fetch is not define
 * @return {Promise<Nullable<ThemeOverride>>} The theme overrides
 */
export const getThemeOverrides: GetThemeOverridesFn = async (
  fakeFetchFn?: typeof fetch
): Promise<Nullable<ThemeOverride>> => {
  const origin: Nullable<string> = window.location.origin;
  const basePath =
    !origin || origin === "null" || origin.includes("localhost")
      ? DEFAULT_UBLO_API_URL
      : origin;

  const overrides: Nullable<ThemeOverride> = await fetchThemeOverrides(
    basePath,
    fakeFetchFn
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
): PaletteColorShaded<DefaultPaletteColorShadeKey[]> => {
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
