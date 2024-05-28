import { DocsContainer as SBDocsContainer } from "@storybook/blocks";
import { isString, type Optional } from "@ubloimmo/front-util";
import styled from "styled-components";

import { StorybookThemeProvider } from "./StoryDecorator";

import { getDynamicThemeSlugs } from "@/themes";
import { codeFontFace, typographyFontFace } from "@/typography";

import type { DynamicColorPaletteKey } from "@types";

type DocsContainerProps = Parameters<typeof SBDocsContainer>[0];

/**
 * Wraps each MDX documentation with a dynamic theme provider.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @param {Object} props.context - The context object.
 * @param {Object} props.theme - The theme object.
 * @return {JSX.Element} The rendered component.
 */
export const DocsContainer = ({
  children,
  context,
  theme,
}: DocsContainerProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storyContext = context as any;
  const themeClient: Optional<DynamicColorPaletteKey> =
    storyContext?.store?.globals?.globals?.theme;
  const clientSlugs = getDynamicThemeSlugs();
  const client: DynamicColorPaletteKey =
    isString(themeClient) && clientSlugs.includes(themeClient)
      ? themeClient
      : "primary";
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

    span,
    p,
    a,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      ${typographyFontFace()}
      padding: 0;
      border: none;
    }

    pre.prismjs span {
      ${codeFontFace(true)};
    }

    a:not([data-testid="hypertext"]) {
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

  .sbdocs-content .docblock-source {
    background: var(--gray-50) !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: var(--s-2) !important;

    pre.prismjs {
      padding: var(--s-8) !important;
      ${codeFontFace(true)};
    }

    div:has(button) {
      right: var(--s-1);
      bottom: var(--s-1);
      background: none;

      button {
        ${typographyFontFace()}
        font-weight: var(--text-weight-medium) !important;
        padding: var(--s-05) var(--s-3);
        color: var(--primary-dark);
        background: var(--color);
        background: var(--primary-light);
        border-radius: var(--s-6);
        font-size: var(--text-xs);
        font-weight: bold;
        box-shadow: var(--shadow-button) !important;
        width: auto;
        border: 1px solid transparent;
        transition: color 200ms ease-out 0s, border-color 200ms ease-out 0s;

        &:hover {
          border-color: var(--primary-medium);
        }
      }
    }
  }
`;
