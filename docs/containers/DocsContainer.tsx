import { DocsContainer as SBDocsContainer } from "@storybook/blocks";
import { isString, type Optional } from "@ubloimmo/front-util";
import styled from "styled-components";

import { StorybookThemeProvider } from "./StoryDecorator";

import { getClientSlugs } from "@/themes";
import { typographyFontFace } from "@/typography";

import type { ClientColorPaletteKey } from "@types";

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
  .sbdocs-wrapper {
    padding: 0;
    blockquote {
      padding: var(--s-1) var(--s-2);
      border-left: var(--s-1) solid var(--primary-medium);
      border-radius: var(--s-1);
      background: var(--primary-light-30);
      margin-top: var(--s-2);
      margin-bottom: var(--s-1);
      span {
        margin-bottom: 0 !important;
        font-size: var(--text-m);
        color: var(--primary-dark) !important;
      }
    }

    span {
      ${typographyFontFace()}
    }

    a {
      font-size: var(--text-m);
      color: var(--primary-base);
      font-weight: var(--text-weight-bold);
      text-decoration: underline;
      cursor: pointer;

      &:visited {
        color: var(--primary-dark);
      }
    }

    code {
      font-size: inherit !important;
      font-style: inherit !important;
      font-weight: inherit !important;
      color: inherit !important;
      background: var(--gray-50-80);
      border: 1px solid var(--gray-100-50);
      padding: var(--s-05) var(--s-1);
      border-radius: var(--s-1);
    }
  }

  .sbdocs-content {
    max-width: unset;
  }
`;
