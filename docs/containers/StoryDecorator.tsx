import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { ReactRenderer, type Preview } from "@storybook/react";
import { objectFromEntries } from "@ubloimmo/front-util";

import { getClientSlugs, ThemeProvider } from "../../src/themes";

import type { ClientColorPaletteKey } from "../../src/types";
import type { ReactNode } from "react";

/**
 * Bridges the gap between the client slug coming from `@storybook/addon-themes`
 * and the app's {@link ThemeProvider} used in the docs & stories.
 */
export const StorybookThemeProvider = ({
  theme,
  children,
}: {
  theme: { client: ClientColorPaletteKey };
  children: ReactNode;
}) => <ThemeProvider _forClient={theme.client}>{children}</ThemeProvider>;

const getStoryThemes = () => {
  const storyThemes = objectFromEntries(
    getClientSlugs()
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
    defaultTheme: "ublo",
    Provider: StorybookThemeProvider,
  }),
];
