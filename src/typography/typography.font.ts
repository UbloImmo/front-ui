import { css } from "styled-components";

/**
 * Defines the font family for typography.
 *
 * @return {css} The defined font family for typography.
 */
export const typographyFontFace = () => {
  return css`
    font-family: "Open Sans Variable", "Helvetica", "Inter", "Arial", "Calibri",
      "Segoe UI", sans-serif;
  `;
};

/**
 * Links the typography font face to top-level style declaration.
 *
 * @return {css} CSS with typography font face applied to all elements.
 */
export const linkFontFace = () => {
  return css`
    * {
      ${typographyFontFace()};
      font-synthesis: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
  `;
};
