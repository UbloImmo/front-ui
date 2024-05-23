import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ReactRenderer, type Preview } from "@storybook/react";
import { objectFromEntries } from "@ubloimmo/front-util";

import { getDynamicThemeSlugs, ThemeProvider } from "@/themes";

import type { DynamicColorPaletteKey } from "@types";
import type { ReactNode } from "react";

/**
 * Bridges the gap between the client slug coming from `@storybook/addon-themes`
 * and the app's {@link ThemeProvider} used in the docs & stories.
 */
export const StorybookThemeProvider = ({
  theme,
  children,
}: {
  theme: { client: DynamicColorPaletteKey };
  children: ReactNode;
}) => <ThemeProvider _forceTheme={theme.client}>{children}</ThemeProvider>;

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
    defaultTheme: "wisteria",
    Provider: StorybookThemeProvider,
  }),
];
