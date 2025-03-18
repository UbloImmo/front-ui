import { DocsContainer as SBDocsContainer } from "@storybook/blocks";
import { isArray, isString, type Optional } from "@ubloimmo/front-util";
import styled, { css, type RuleSet } from "styled-components";

import { StorybookThemeProvider } from "./StoryDecorator";

import { getDynamicThemeSlugs } from "@/themes";
import {
  buildTypographyStyle,
  codeFontFace,
  defaultTypographyProps,
  typographyFontFace,
} from "@/typography";
import { buildheadingOverrides } from "@docs/blocks/Typography";
import { toStyleProps } from "@utils";

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

const notInUnstyled = (
  selector: string | string[],
  rules: RuleSet
): RuleSet | RuleSet[] => {
  const template = `${selector}:not(.sb-unstyled ${selector}):not([data-testid="docs-header"] ${selector})`;
  if (isArray(selector)) return selector.map((s) => notInUnstyled(s, rules));
  return css`
    ${template} {
      ${rules}
    }
  `;
};

const StyleReset = styled.div`
  width: 100%;
  .sbdocs-wrapper {
    padding: 0;
    width: 100%;
    background: light-dark(white, black);

    blockquote {
      padding: var(--s-3) var(--s-4);
      // account for left border
      padding-left: var(--s-3);
      border-left: var(--s-1) solid var(--primary-base);
      border-radius: var(--s-1);
      background: var(--primary-light);
      margin: var(--s-2) 0;
      margin-bottom: var(--s-4);

      & span > em {
        font-style: normal !important;
      }

      span {
        margin-bottom: 0 !important;
        ${buildTypographyStyle({
          ...defaultTypographyProps,
          size: "m",
        })(
          toStyleProps({
            ...defaultTypographyProps,
            size: "m",
            color: "primary-dark",
            weight: "medium",
            italic: false,
            important: true,
          })
        )}
      }
    }

    table:not([data-testid="table"], [data-testid="table virtual"]) {
      margin: var(--s-4) 0;
    }
  }

  .sbdocs-wrapper {
    ${notInUnstyled(
      ["span", "p", "a", "h1", "h2", "h3", "h4", "h5", "h6"],
      css`
        padding: 0;
        margin: 0;
        border: none;
        ${typographyFontFace(true)}
      `
    )}
    ${notInUnstyled("h1", buildheadingOverrides("h1", "bold", "gray-900"))}
    ${notInUnstyled("h2", buildheadingOverrides("h2", "bold", "gray-900"))}
    ${notInUnstyled("h3", buildheadingOverrides("h3", "medium", "gray-900"))}
    ${notInUnstyled("h4", buildheadingOverrides("h3", "regular", "gray-800"))}
    ${notInUnstyled("h5", buildheadingOverrides("h4", "medium", "gray-700"))}
    ${notInUnstyled("h6", buildheadingOverrides("h4", "regular", "gray-700"))}

    [data-layout="docs-content"] > span {
      display: block !important;
    }

    ${notInUnstyled(
      "ul",
      css`
        ${typographyFontFace()};
        margin: 0;
        padding: 0;
        padding-left: var(--s-4);
      `
    )}

    ${notInUnstyled(
      ["div > ul", "div > ul > li > ul"],
      css`
        margin-bottom: var(--s-4);
      `
    )}

    ${notInUnstyled(
      "li",
      css`
        margin: 0;
        padding: 0;
        color: var(--gray-700);
        margin-left: var(--s-2);
        ${typographyFontFace()};
      `
    )}

    ${notInUnstyled(
      "hr",
      css`
        border-color: var(--primary-light);
      `
    )}
  }

  pre.prismjs span {
    .sb-unstyled:not(:has(&)) & {
      ${codeFontFace(true)};
    }
  }

  a:not([data-testid="hypertext"]):not(
      [data-testid="copy-clipboard-info-card-link"]
    ).sbdocs-a {
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
    .sb-unstyled:not(:has(&)) & {
      font-size: inherit;
      font-style: inherit !important;
      font-weight: inherit !important;
      color: inherit !important;
      background: var(--gray-50-80);
      border: 1px solid var(--gray-100-50);
      padding: var(--s-05) var(--s-1);
      border-radius: var(--s-1);
    }
  }

  span[data-testid="text"] > code {
    .sb-unstyled:not(:has(&)) & {
      font-size: var(--text-s) !important;
    }
  }

  .sbdocs-content {
    max-width: unset;
  }

  .docblock-source.sb-unstyled {
    color: var(--gray-600);
  }

  pre:has(> .docblock-source) {
    width: 100%;

    .docblock-source {
      margin: 0 !important;
    }
  }

  .sbdocs-content main p {
    color: var(--gray-800);
  }

  span[data-testid="text"] code,
  li code,
  h4 code,
  h3 code,
  p code {
    background: var(--gray-200-50);
    color: var(--gray-800);
    border-color: var(--gray-100-50);
  }

  pre.prismjs {
    padding: var(--s-4) !important;
    ${codeFontFace(true)};

    span:not(.token) {
      color: var(--primary-dark);
    }

    .token.tag {
      color: color-mix(
        in oklab,
        var(--primary-base) 75%,
        var(--primary-medium)
      );
    }

    .token.attr-name {
      color: color-mix(in oklab, var(--pending-dark) 45%, var(--pending-base));
    }

    .token.punctuation {
      color: var(--gray-600);
    }

    .token.function {
      color: var(--primary-base);
    }

    .token.comment {
      color: var(--gray-300);
      font-style: italic;
    }

    .token.attr-value,
    .token.string {
      color: color-mix(in oklab, var(--success-base) 75%, var(--success-dark));
    }

    .token.number,
    .token.boolean {
      color: var(--warning-base);
    }

    .token.class-name,
    .token.maybe-class-name {
      color: var(--warning-base);
    }

    .token.keyword,
    .token.builtin {
      color: var(--primary-base);
    }

    .token.maybe-class-name,
    .token.class-name {
      font-style: italic;
    }

    .token.keyword,
    .token.builtin,
    .token.operator {
      font-style: normal;
    }

    .token.property {
      color: var(--primary-base);
    }

    .token.selector {
      color: var(--pending-base);
    }

    .token.operator,
    .token.attr-equals {
      color: color-mix(
        in oklab,
        var(--primary-base) 65%,
        var(--primary-medium)
      );
      font-style: normal;
    }

    .token.arrow {
      color: color-mix(
        in oklab,
        var(--primary-base) 75%,
        var(--primary-medium)
      );
    }
  }

  :not(.sb-unstyled) .sbdocs-content .docblock-source {
    background: var(--gray-50) !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: var(--s-2) !important;
    margin: var(--s-4) 0 !important;

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
        transition:
          color 200ms ease-out 0s,
          border-color 200ms ease-out 0s;

        &:hover {
          border-color: var(--primary-medium);
        }
      }
    }
  }

  header main[data-layout="docs-content"] .docblock-source {
    background: light-dark(white, black) !important;
  }
  :not(.sb-unstyled) .sbdocs-content td .docblock-source {
    padding: 0 !important;
    margin: 0 !important;
    background: none !important;

    pre.prismjs {
      padding: 0 !important;
    }

    div:has(button),
    button {
      display: none;
    }
  }
`;
