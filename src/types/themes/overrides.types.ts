import type { HexColorOpaque } from "./color.types";
import type { Nullish, Nullable, DeepNullish } from "@ubloimmo/front-util";

export type OrganizationAssets = {
  logo: string;
  login: {
    logo?: Nullish<string>;
    background: string;
  };
  favicon: {
    x16: string;
    x32: string;
  };
};

type PaletteOverrides = {
  dark: HexColorOpaque;
  medium?: Nullish<HexColorOpaque>;
  base: HexColorOpaque;
  light: HexColorOpaque;
};

export type LegacyOverrides = {
  organization: OrganizationAssets;
  palette: {
    primary: PaletteOverrides;
  };
};

export type OrganizationData = {
  /**
   * Name of the organization.
   */
  name: Nullable<string>;
  /**
   * Organization-specific assets (logo, images, favicons)
   */
  assets: OrganizationAssets;
};

export type OrganizationOverrides = OrganizationData & {
  palette: PaletteOverrides;
};

export type ThemeOverride = {
  organization: OrganizationOverrides;
};

export type ThemeOverridePalette = ThemeOverride["organization"]["palette"];

export type EmptyThemeOverride = {
  organization: DeepNullish<ThemeOverride["organization"]>;
};

export type ThemeOverrideReponse = ThemeOverride | EmptyThemeOverride;

export type GetThemeOverridesFn = (
  fakeFetchFn?: typeof fetch
) => Promise<Nullable<ThemeOverride>>;
