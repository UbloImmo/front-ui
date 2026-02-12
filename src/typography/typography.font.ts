import dedent from "ts-dedent";

import { DMMono, Gilroy } from "./fonts";

export const fontFamilySets = {
  sans: `"Gilroy", "Helvetica", "Inter", "Arial", "Calibri",
  "Segoe UI", sans-serif`,
  code: `"DMMono", "Fira Code", "Menlo", "Inconsolata", "Source Mono",
  "Consolas", ui-monospace, monospace`,
} as const;

/**
 * Defines the font family for typography.
 *
 * @param {boolean} [important] - Whether to add !important
 *
 * @return {string} The defined font family for typography.
 */
export const typographyFontFace = (important?: boolean): string => {
  const $important = important ? " !important" : "";
  return dedent`
    font-family: ${fontFamilySets.sans}${$important};
  `;
};

/**
 * Defines the font family for code typography.
 *
 * @param {boolean} [important] - Whether to add !important
 *
 * @return {string} The defined font family for code typography.
 */
export const codeFontFace = (important?: boolean): string => {
  const $important = important ? " !important" : "";
  return dedent`
    font-family: ${fontFamilySets.code}${$important};
  `;
};

/**
 * Links the typography font face to top-level style declaration.
 *
 * @return {string} CSS with typography font face applied to all elements.
 */
export const linkFontFace = (): string => {
  return dedent`
    ${Gilroy()}
    ${DMMono()}

    * {
      font-synthesis: style;
      text-rendering: optimizeLegibility;
      font-variant-ligatures: none;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    *:not(pre, code) {
      ${typographyFontFace()}
    }

    code,
    pre,
    pre *,
    pre div,
    pre span {
      ${codeFontFace(true)}
      font-size: inherit;
      letter-spacing: 0;
    }
  `;
};
