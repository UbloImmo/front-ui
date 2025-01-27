import { isString, type Nullable, type DeepPick } from "@ubloimmo/front-util";

import {
  buildColorPalette,
  buildDynamicColorPalette,
  buildLegacyColorPalette,
} from "./palette";
import { themeOverridePaletteToColorPaletteShaded } from "./provider/theme.overrides";

import type {
  DynamicColorPaletteKey,
  FaviconLinkSelectors,
  OrganizationData,
  Theme,
  ThemeOverride,
} from "@types";

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
 * @param {DynamicColorPaletteKey} [forClient] - Client name to build primary default color
 * @return {Theme} The constructed theme object.
 */
export const buildTheme = (
  themeOverrides: Nullable<ThemeOverride> = null,
  forClient?: DynamicColorPaletteKey,
): Theme => {
  const colorPalette = buildColorPalette(forClient);
  const defaultColorPalette = buildDynamicColorPalette("primary");
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

/**
 * Applies the favicon to the document head based on the provided theme.
 *
 * @param {DeepPick<ThemeOverride, "organization.assets.favicon">} themeSlice - The theme object containing the favicon details.
 * @param {FaviconLinkSelectors} [linkSelectors] - Optional link selectors for the favicon.
 * @returns {boolean} - Returns true if the favicon is successfully applied, false otherwise.
 */
export const applyFavicon = (
  themeSlice: DeepPick<ThemeOverride, "organization.assets.favicon">,
  linkSelectors?: FaviconLinkSelectors,
): boolean => {
  if (!themeSlice?.organization?.assets?.favicon) return false;
  const x16Selector = linkSelectors?.x16 ?? "link#favicon-16[rel='icon']";
  const x32Selector = linkSelectors?.x32 ?? "link#favicon-32[rel='icon']";
  const { x16, x32 } = themeSlice.organization.assets.favicon;
  if (!isString(x16) || !isString(x32)) return false;
  if (!document || !document?.head) return false;
  const link16 = document.head.querySelector<HTMLLinkElement>(x16Selector);
  const link32 = document.head.querySelector<HTMLLinkElement>(x32Selector);
  // set
  if (link16) {
    link16.type = "image/png";
    link16.href = x16;
  }
  if (link32) {
    link32.type = "image/png";
    link32.href = x32;
  }
  // check
  const link16Check = document.head.querySelector<HTMLLinkElement>(x16Selector);
  const link32Check = document.head.querySelector<HTMLLinkElement>(x32Selector);
  return link16Check?.href === x16 || link32Check?.href === x32;
};
