import {
  buildColorPalette,
  buildDynamicColorPalette,
  buildLegacyColorPalette,
} from "./palette";
import { themeOverridePaletteToColorPaletteShaded } from "./provider/theme.overrides";

import type {
  ClientColorPaletteKey,
  OrganizationData,
  Theme,
  ThemeOverride,
} from "@types";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * Organization data for ublo's staging & local environments
 */
export const defaultOrganizationData: OrganizationData = {
  assets: {
    favicon: {
      x16: "https://firebasestorage.googleapis.com/v0/b/ideta-prod.appspot.com/o/bots%2F-MzKMeZK8HFmIKcLO_tO%2Fmedia%2Fimages%2F-bulle-ideta.png-1680183752345?alt=media&token=4e48ab92-6b01-4288-b39b-f539f1c52ccc",
      x32: "https://firebasestorage.googleapis.com/v0/b/ideta-prod.appspot.com/o/bots%2F-MzKMeZK8HFmIKcLO_tO%2Fmedia%2Fimages%2F-bulle-ideta.png-1680183752345?alt=media&token=4e48ab92-6b01-4288-b39b-f539f1c52ccc",
    },
    login: {
      background:
        "https://pariseine.fr/wp-content/uploads/2021/01/Paris-Puces_3.jpg",
      logo: "https://assets-global.website-files.com/62c6a19c9ef879f6872a3030/642558253710d0c65e5921fc_logo-ublo.svg",
    },
    logo: "https://assets-global.website-files.com/62c6a19c9ef879f6872a3030/642558253710d0c65e5921fc_logo-ublo.svg",
  },
  name: null,
};

/**
 * Builds and returns a theme object
 * to be used in {@link import("../themes/provider/theme.provider").ThemeProvider}
 *
 * @param {Nullable<ThemeOverride>} [themeOverrides = null] - Values to override the default theme
 * @param {ClientColorPaletteKey} [forClient] - Client name to build primary default color
 * @return {Theme} The constructed theme object.
 */
export const buildTheme = (
  themeOverrides: Nullable<ThemeOverride> = null,
  forClient?: ClientColorPaletteKey
): Theme => {
  const colorPalette = buildColorPalette(forClient);
  const defaultColorPalette = buildDynamicColorPalette("ublo");
  const theme: Theme = {
    organization: defaultOrganizationData,
    palette: buildLegacyColorPalette(),
    ...colorPalette,
    "primary-default": defaultColorPalette.primary,
  };
  // return default theme if no overrides
  if (!themeOverrides || !themeOverrides.organization.palette) return theme;
  // overwrite organization, primary and legacy primary with fetched values
  const { palette, ...organization } = themeOverrides.organization;
  return {
    ...theme,
    organization,
    palette: {
      ...theme.palette,
      primary: palette,
    },
    primary: themeOverridePaletteToColorPaletteShaded(palette),
  };
};
