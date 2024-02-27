import type {
  Nullish,
  AsyncFn,
  Nullable,
  DeepNullish,
} from "@ubloimmo/front-util";
import type { HexColorOpaque } from ".";

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

export type LegacyOverrides = {
  organization: OrganizationAssets;
  palette: {
    primary: {
      dark: HexColorOpaque;
      medium?: Nullish<HexColorOpaque>;
      base: HexColorOpaque;
      light: HexColorOpaque;
    };
  };
};

export type OrganizationData = {
  name: Nullable<string>;
  assets: OrganizationAssets;
};

export type OrganizationOverrides = OrganizationData & {
  palette: {
    dark: HexColorOpaque;
    medium?: Nullish<HexColorOpaque>;
    base: HexColorOpaque;
    light: HexColorOpaque;
  };
};

export type ThemeOverride = {
  organization: OrganizationOverrides;
};

export type ThemeOverridePalette = ThemeOverride["organization"]["palette"];

export type EmptyThemeOverride = {
  organization: DeepNullish<ThemeOverride["organization"]>;
};

export type ThemeOverrideReponse = ThemeOverride | EmptyThemeOverride;

export type GetThemeOverridesFn = AsyncFn<[], Nullable<ThemeOverride>>;
