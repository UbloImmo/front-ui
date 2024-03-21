import { DocsContainer as SBDocsContainer } from "@storybook/blocks";
import { StorybookThemeProvider } from "./StoryDecorator";
import type { ClientColorPaletteKey } from "../../src/types";
import type { Optional } from "@ubloimmo/front-util";

type DocsContainerProps = Parameters<typeof SBDocsContainer>[0];

/**
 * Wraps each MDX documentation with a dynamic theme provider
 */
export const DocsContainer = ({
  children,
  context,
  theme,
}: DocsContainerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storyContext = context as any;
  const themeClient: Optional<ClientColorPaletteKey> =
    storyContext?.store?.globals?.globals?.theme;
  const client: ClientColorPaletteKey = themeClient ?? "ublo";
  return (
    <StorybookThemeProvider theme={{ client }}>
      <SBDocsContainer context={context} theme={theme}>
        {children}
      </SBDocsContainer>
    </StorybookThemeProvider>
  );
};
