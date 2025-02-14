import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ReactRenderer, type Preview } from "@storybook/react";
import { objectFromEntries } from "@ubloimmo/front-util";

import { getDynamicThemeSlugs, ThemeProvider } from "@/themes";
import { UikitTranslationProvider } from "@/utils";

import { DialogProvider } from "@components";

import type { DynamicColorPaletteKey } from "@types";
import type { ReactNode } from "react";

type StorybookThemeProviderProps = {
  theme: { client: DynamicColorPaletteKey };
  children: ReactNode;
};

/**
 * Bridges the gap between the client slug coming from `@storybook/addon-themes`
 * and the app's {@link ThemeProvider} used in the docs & stories.
 *
 * @param {StorybookThemeProviderProps} props - The props for the StorybookThemeProvider component.
 * @param {{client: DynamicColorPaletteKey}} props.theme - The partial theme object conaining the client slug.
 * @param {DynamicColorPaletteKey} props.theme.client - The client slug.
 * @param {ReactNode} props.children - The child components to apply the theme to.
 * @return {JSX.Element} The styled theme provider component with the provided theme.
 */
export const StorybookThemeProvider = ({
  theme,
  children,
}: StorybookThemeProviderProps) => (
  <ThemeProvider
    _forceTheme={theme.client}
    faviconLinkSelectors={{ x16: 'link[rel="icon"]' }}
    lightDarkSupport
  >
    <UikitTranslationProvider>
      <DialogProvider portalRoot="#dialog-root">{children}</DialogProvider>
    </UikitTranslationProvider>
  </ThemeProvider>
);

const getStoryThemes = () => {
  const storyThemes = objectFromEntries(
    getDynamicThemeSlugs()
      .sort()
      .map((slug) => [slug, { client: slug }])
  );
  return storyThemes;
};

/**
 * Wraps each story with a dynamic Theme provider
 */
export const StoryDecorator: Preview["decorators"] = [
  withThemeFromJSXProvider<ReactRenderer>({
    themes: getStoryThemes(),
    defaultTheme: "primary",
    Provider: StorybookThemeProvider,
  }),
];
