import { mobileFontSize } from "./../../typography/typography.styles";
import type {
  Theme,
  PaletteColorShaded,
  AnyPaletteColorShadeKeys,
  CssVar,
  CssRem,
  RgbaColorStr,
  Spacings,
} from "../../types";
import { createGlobalStyle, css } from "styled-components";
import "@fontsource-variable/open-sans";
import { objectEntries, Logger } from "@ubloimmo/front-util";
import { breakpointsPx, buildSpacingMap } from "../../sizes";
import { cssVar } from "../../utils";
import { linkFontFace } from "../../typography/typography.font";
import "@fontsource-variable/open-sans/index.css";
import { texts } from "@ubloimmo/front-tokens";
import { BreakpointLabel } from "src/types/themes/sizes/breakpoints.types";

const { warn } = Logger();

/**
 * Generates CSS variables for the given palette color and its shades.
 *
 * @template {AnyPaletteColorShadeKeys} TShadeKeys - Shade keys contained in the shaded palette color
 * @param {string} colorName - the name of the palette color
 * @param {PaletteColorShaded<TShadeKeys>} shadedColors - the shaded palette color
 * @return {CssVar<RgbaColorStr>[]} an array of CSS variables for the palette color shades
 */
export const paletteColorToCssVars = <
  TShadeKeys extends AnyPaletteColorShadeKeys
>(
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
export const spacingsToCssVars = (spacings: Spacings): CssVar<CssRem>[] => {
  return objectEntries(spacings).map(([spacingName, value]) => {
    return cssVar(spacingName, value);
  });
};

/**
 * Generates CSS variables for mobile & desktop text sizes based on the generate text tokens.
 *
 * @return {{ desktop: CssVar<CssRem>[], mobile: CssVar<CssRem>[] }} Array of CSS variables for text sizes for desktop and mobile views
 */
export const textSizesToCssVars = (): {
  desktop: CssVar<CssRem>[];
  mobile: CssVar<CssRem>[];
} => {
  const allTextSizes = { ...texts.text, ...texts.heading };
  const vars = objectEntries(allTextSizes).map(([size, weights]) => {
    const { fontSize } = weights.regular.css.style;

    return {
      desktop: cssVar(`text-${size}`, fontSize),
      mobile: cssVar(`text-${size}`, mobileFontSize(fontSize)),
    };
  });
  return {
    desktop: vars.map(({ desktop }) => desktop),
    mobile: vars.map(({ mobile }) => mobile),
  };
};

/**
 * Joins a collection of CSS variables into a single string.
 *
 * @param {CssVar<string>[][]} cssVarCollection - The collection of CSS variables to join.
 * @return {string} The joined string of CSS variables.
 */
const joinCssVarCollection = (cssVarCollection: CssVar<string>[][]): string => {
  return cssVarCollection.map((cssVars) => cssVars.join("\n")).join("\n");
};

/**
 * Declares global styles using root CSS variables and optional media query overrides.
 *
 * @param {CssVar<string>[][]} defaults - array of arrays of default CSS variables
 * @param {[BreakpointLabel, CssVar<string>[][]][]} mediaQueries - optional array of breakpoint labels and CSS variables for media queries
 * @return {string} the combined CSS for global styles
 */
const declareGlobalStyle = (
  defaults: CssVar<string>[][],
  mediaQueries?: [BreakpointLabel, CssVar<string>[][]][]
) => {
  const defaultCssVarStr = joinCssVarCollection(defaults);

  const mediaQueriesStr = (mediaQueries ?? []).map(
    ([breakpointLabel, vars]) => {
      const mediaQueryCssVarStr = joinCssVarCollection(vars);
      return css`
        @media only screen and (max-width: ${breakpointsPx[breakpointLabel]}) {
          :root {
            ${mediaQueryCssVarStr}
          }
        }
      `;
    }
  );
  return css`
    ${linkFontFace()}
    :root {
      ${defaultCssVarStr}
    }
    ${mediaQueriesStr}
  `;
};

/**
 * Builds the global css style for the theme.
 * Declares css variables for theme colors and spacings
 *
 * @param {Theme} theme - The theme object
 * @return {string} The CSS for the global style
 */
export const buildGlobalStyle = (theme: Theme) => {
  // generate css vars from spacings
  const spacingsCssVars = spacingsToCssVars(buildSpacingMap());
  const { mobile: textMobileCssVars, desktop: textDesktopCssVars } =
    textSizesToCssVars();
  // only return spacing css variables if theme is missing
  if (!theme) {
    warn(
      "Missing theme. Generating spacing css variables only.",
      "GlobalStyle"
    );
    return declareGlobalStyle(
      [spacingsCssVars, textDesktopCssVars],
      [["SM", [textMobileCssVars]]]
    );
  }
  // filter legacy palette and organization out
  const { palette: _, organization: __, ...palette } = theme;
  // generate css vars from non-legacy palette
  const paletteCssVars = objectEntries(palette).flatMap(
    ([colorName, shadedColor]) =>
      paletteColorToCssVars(
        colorName,
        shadedColor as PaletteColorShaded<AnyPaletteColorShadeKeys>
      )
  );

  // declare them in as global css variables
  return declareGlobalStyle(
    [spacingsCssVars, paletteCssVars, textDesktopCssVars],
    [["SM", [textMobileCssVars]]]
  );
};

/**
 * Global style component that parses the `styled-components` {@link Theme},
 * transforms it into global CSS variables using {@link buildGlobalStyle} and injects them into the document.
 *
 * @see buildGlobalStyle
 *
 * @param {Theme} theme - The theme object
 * @return {null}
 */
export const GlobalStyle = createGlobalStyle`
  ${({ theme }: { theme: Theme }) => buildGlobalStyle(theme)}
`;
