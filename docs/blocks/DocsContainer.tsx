import type { ClientColorPaletteKey } from "../../src/types";
import { DocsContainer as SBDocsContainer } from "@storybook/blocks";
import { isString, type Optional } from "@ubloimmo/front-util";
import { StorybookThemeProvider } from "./StoryDecorator";
import { getClientSlugs } from "../../src/themes";

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
  const clientSlugs = getClientSlugs();
  const client: ClientColorPaletteKey =
    isString(themeClient) && clientSlugs.includes(themeClient)
      ? themeClient
      : "ublo";
  console.log(storyContext, themeClient, client);
  return (
    <StorybookThemeProvider theme={{ client }}>
      <SBDocsContainer context={context} theme={theme}>
        {children}
      </SBDocsContainer>
    </StorybookThemeProvider>
  );
};
