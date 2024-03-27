import { css } from "styled-components";

import type { RuleSet } from "styled-components";

const fontFamily = {
  sans: `"Open Sans Variable", "Helvetica", "Inter", "Arial", "Calibri",
  "Segoe UI", sans-serif`,
  code: `"Menlo", "Inconsolata", "Fira Code", "Fira Code", "Source Mono",
  "Consolas", monospace`,
};

/**
 * Defines the font family for typography.
 *
 * @return {RuleSet} The defined font family for typography.
 */
export const typographyFontFace = (): RuleSet => {
  return css`
    font-family: ${fontFamily.sans};
  `;
};

/**
 * Defines the font family for code typography.
 *
 * @return {RuleSet} The defined font family for code typography.
 */
export const codeFontFace = (): RuleSet => {
  return css`
    font-family: ${fontFamily.code};
  `;
};

/**
 * Links the typography font face to top-level style declaration.
 *
 * @return {RuleSet} CSS with typography font face applied to all elements.
 */
export const linkFontFace = (): RuleSet => {
  return css`
    * {
      font-synthesis: style;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *:not(pre, code) {
      ${typographyFontFace()};
    }

    code,
    pre,
    pre *,
    pre div,
    pre span {
      ${codeFontFace()};
      font-size: inherit;
      letter-spacing: 0;
    }
  `;
};
