import { DocsContainer as SBDocsContainer } from "@storybook/blocks";
import { isString, type Optional } from "@ubloimmo/front-util";
import styled from "styled-components";

import { StorybookThemeProvider } from "./StoryDecorator";
import { getClientSlugs } from "../../src/themes";

import type { ClientColorPaletteKey } from "../../src/types";

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
  return (
    <StorybookThemeProvider theme={{ client }}>
      <StyleReset>
        <SBDocsContainer context={context} theme={theme}>
          {children}
        </SBDocsContainer>
      </StyleReset>
    </StorybookThemeProvider>
  );
};

const StyleReset = styled.div`
  background: red !important;
  .sbdocs-wrapper {
    padding: 0;
    /* background: red !important; */
  }

  .sbdocs-content {
    max-width: unset;
  }
`;
