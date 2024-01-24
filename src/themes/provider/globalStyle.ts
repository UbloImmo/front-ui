import type {
  Theme,
  PaletteColorShaded,
  AnyPaletteColorShadeKeys,
  CssVar,
  CssRem,
  RgbaColorStr,
  Spacings,
} from "@/types";
import { createGlobalStyle, css } from "styled-components";
import { objectEntries } from "@ubloimmo/front-util";
import { buildSpacingMap } from "@/sizes";
import { cssVar } from "@/utils";

/**
 * Generates CSS variables for the given palette color and its shades.
 *
 * @template {AnyPaletteColorShadeKeys} TShadeKeys - Shade keys contained in the shaded palette color
 * @param {string} colorName - the name of the palette color
 * @param {PaletteColorShaded<TShadeKeys>} shadedColors - the shaded palette color
 * @return {CssVar<RgbaColorStr>[]} an array of CSS variables for the palette color shades
 */
const paletteColorToCssVars = <TShadeKeys extends AnyPaletteColorShadeKeys>(
  colorName: string,
  shadedColors: PaletteColorShaded<TShadeKeys>
): CssVar<RgbaColorStr>[] => {
  return objectEntries(shadedColors).map(
    ([shadeName, { rgba }]): CssVar<RgbaColorStr> => {
      const varName = `${colorName.toLowerCase()}-${shadeName.toLowerCase()}`;
      return cssVar(varName, rgba);
    }
  );
};

/**
 * Converts spacings object to CSS variables.
 *
 * @param {Spacings} spacings - the spacings object
 * @return {CssVar<CssRem>[]} an array of CSS variables in rem units
 */
const spacingsToCssVars = (spacings: Spacings): CssVar<CssRem>[] => {
  return objectEntries(spacings).map(([spacingName, value]) => {
    const varName = `s-${spacingName.slice(1)}`;
    return cssVar(varName, value);
  });
};

/**
 * Builds the global css style for the theme.
 * Declares css variables for theme colors and spacings
 *
 * @param {Theme} theme - The theme object
 * @return {string} The CSS for the global style
 */
const buildGlobalStyle = (theme: Theme) => {
  // filter legacy palette out
  const { palette: _, ...palette } = theme;
  // generate css vars from non-legacy palette
  const paletteCssVars = objectEntries(palette)
    .flatMap(([colorName, shadedColor]) =>
      paletteColorToCssVars(
        colorName,
        shadedColor as PaletteColorShaded<AnyPaletteColorShadeKeys>
      )
    )
    .join("\n");
  // generate css vars from spacings
  const spacingsCssVars = spacingsToCssVars(buildSpacingMap()).join("\n");
  // declare them in as global css variables
  return css`
    :root {
      ${paletteCssVars}
      ${spacingsCssVars}
    }
  `;
};

export const GlobalStyle = createGlobalStyle`
  ${({ theme }: { theme: Theme }) => buildGlobalStyle(theme)}
`;
