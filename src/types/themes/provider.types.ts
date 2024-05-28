import type { GetThemeOverridesFn } from "./overrides.types";
import type { DynamicColorPaletteKey } from "./palette";
import type { ReactNode } from "react";

export type FaviconLinkSelectors = {
  x16?: string;
  x32?: string;
};

export type ThemeProviderProps = {
  children: ReactNode;
  getOverridesFn?: GetThemeOverridesFn;
  _forceTheme?: DynamicColorPaletteKey;
  noFavicon?: boolean;
  faviconLinkSelectors?: FaviconLinkSelectors;
};
