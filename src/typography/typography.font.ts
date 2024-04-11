import { css } from "styled-components";

import { Gilroy } from "./fonts";

import type { RuleSet } from "styled-components";

export const fontFamilySets = {
  sans: `"Gilroy", "Helvetica", "Inter", "Arial", "Calibri",
  "Segoe UI", sans-serif`,
  code: `"Menlo", "Inconsolata", "Fira Code", "Fira Code", "Source Mono",
  "Consolas", monospace`,
} as const;

/**
 * Defines the font family for typography.
 *
 * @param {boolean} [important] - Whether to add !important
 *
 * @return {RuleSet} The defined font family for typography.
 */
export const typographyFontFace = (important?: boolean): RuleSet => {
  const $important = important ? " !important" : "";
  return css`
    font-family: ${fontFamilySets.sans}${$important};
  `;
};

/**
 * Defines the font family for code typography.
 *
 * @param {boolean} [important] - Whether to add !important
 *
 * @return {RuleSet} The defined font family for code typography.
 */
export const codeFontFace = (important?: boolean): RuleSet => {
  const $important = important ? " !important" : "";
  return css`
    font-family: ${fontFamilySets.code}${$important};
  `;
};

/**
 * Links the typography font face to top-level style declaration.
 *
 * @return {RuleSet} CSS with typography font face applied to all elements.
 */
export const linkFontFace = (): RuleSet => {
  return css`
    ${Gilroy}

    * {
      font-synthesis: style;
      text-rendering: optimizeLegibility;
      font-variant-ligatures: none;
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
