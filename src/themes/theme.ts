import type { ClientColorPaletteKey, Theme } from "../types";
import { buildColorPalette, buildLegacyColorPalette } from "./palette";

/**
 * Builds and returns a theme object
 * to be used in {@link import("../themes/provider/theme.provider").ThemeProvider}
 *
 * @return {Theme} The constructed theme object.
 */
export const buildTheme = (
  forClient: ClientColorPaletteKey = "ublo"
): Theme => {
  return {
    palette: buildLegacyColorPalette(),
    ...buildColorPalette(forClient),
  };
};
