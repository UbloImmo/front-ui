import type { GetThemeOverridesFn } from "./overrides.types";
import type { DynamicColorPaletteKey } from "./palette";
import type { Theme } from "./theme.types";
import type { ReactNode } from "react";

export type FaviconLinkSelectors = {
  x16?: string;
  x32?: string;
};

/**
 * Props for the `GlobalStyle` component
 */
export type GlobalStyleProps = {
  /**
   * The complete theme object
   */
  theme: Theme;
  /**
   * **EXPERIMENTAL**
   *
   * Whether to support the css `light dark` color-sheme property
   *
   * Will result in all color css variables being declared
   * using `light-dark()` function with their inverse color
   */
  lightDarkSupport?: boolean;
};

/**
 * Props for the `ThemeProvider` component
 */
export type ThemeProviderProps = {
  /**
   * The children of the provider.
   * In most cases this includes other providers and / or your app
   */
  children: ReactNode;
  /**
   * A function that returns a promise containing theme overrides to apply globally
   *
   * @type {GetThemeOverridesFn}
   *
   * @remarks
   * If missing, a built-in theme will be applied, as selected by the `_forceTheme` property
   */
  getOverridesFn?: GetThemeOverridesFn;
  /**
   * Select what built-in theme to use by default, if no overrides are fetched
   *
   * @type {DynamicColorPaletteKey}
   *
   * @default "primary"
   *
   */
  _forceTheme?: DynamicColorPaletteKey;
  /**
   * Whether to skip applying favicons
   * Setting this to `true` will **NOT** apply favicons
   *
   * @default false
   */
  noFavicon?: boolean;
  /**
   * Paths to your document's favicon links (in html head).
   *
   * Used to override the favicon at runtime based on theme
   *
   * @default {x16: "link#favicon-16[rel='icon']", x32: "link#favicon-16[rel='icon']"}
   */
  faviconLinkSelectors?: FaviconLinkSelectors;
} & Pick<GlobalStyleProps, "lightDarkSupport">;
