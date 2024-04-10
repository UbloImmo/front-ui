import "@fontsource-variable/open-sans/index.css";
import { texts } from "@ubloimmo/front-tokens";
import { objectEntries, Logger } from "@ubloimmo/front-util";
import { createGlobalStyle, css, type RuleSet } from "styled-components";

import {
  mobileFontSize,
  typographyWeightMap,
} from "./../../typography/typography.styles";
import { breakpointsPx, buildSpacingMap } from "../../sizes";
import { linkFontFace } from "../../typography/typography.font";
import { cssVar } from "../../utils";
import { effectsToCssVars } from "../palette";

import type {
  Theme,
  PaletteColorShaded,
  AnyPaletteColorShadeKeys,
  CssVar,
  CssRem,
  RgbaColorStr,
  BreakpointLabel,
  Spacings,
} from "@types";

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
  return objectEntries(shadedColors).flatMap(
    ([shadeName, { rgba, opacity }]): CssVar<RgbaColorStr>[] => {
      const varName = `${colorName.toLowerCase()}-${shadeName.toLowerCase()}`;
      // create variables for major opacities (0 - 0.95)
      const opacityVars = Array(20)
        .fill(0)
        .map((_, index) => {
          const opacityCoeff = (index * 5) / 100;
          const opacityName = `${varName}-${String(
            opacityCoeff.toFixed(2)
          ).replaceAll("0.", "")}`;
          return cssVar(opacityName, opacity(opacityCoeff));
        });
      return [cssVar(varName, rgba), ...opacityVars];
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
  weights: CssVar<`${number}`>[];
} => {
  const vars = objectEntries(texts.desktop).map(([size, weights]) => {
    const { fontSize } = weights.regular.css.style;

    return {
      desktop: cssVar(`text-${size}`, fontSize),
      mobile: cssVar(`text-${size}`, mobileFontSize(fontSize)),
    };
  });
  const weights = objectEntries(typographyWeightMap).map(([name, value]) =>
    cssVar<`${number}`>(
      `text-weight-${name.toLowerCase()}`,
      String(value) as `${number}`
    )
  );
  return {
    desktop: vars.map(({ desktop }) => desktop),
    mobile: vars.map(({ mobile }) => mobile),
    weights,
  };
};

/**
 * Joins a collection of CSS variables into a single string.
 *
 * @param {CssVar<string>[][]} cssVarCollection - The collection of CSS variables to join.
 * @return {string} The joined string of CSS variables.
 */
export const joinCssVarCollection = (
  cssVarCollection: CssVar<string>[][]
): string => {
  return cssVarCollection.map((cssVars) => cssVars.join("\n")).join("\n");
};

/**
 * Generates a CSS reset style.
 *
 * @return {RuleSet} The generated CSS reset style.
 */
export const cssReset = (): RuleSet => css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

/***
 * Declares global styles using root CSS variables and optional media query overrides.
 *
 * @param {CssVar<string>[][]} defaults - array of arrays of default CSS variables
 * @param {[BreakpointLabel, CssVar<string>[][]][]} mediaQueries - optional array of breakpoint labels and CSS variables for media queries
 * @return {RuleSet} the combined CSS for global styles
 */
export const declareGlobalStyle = (
  defaults: CssVar<string>[][],
  mediaQueries?: [BreakpointLabel, CssVar<string>[][]][]
): RuleSet => {
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
    ${cssReset()}
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
 * @return {RuleSet} The CSS for the global style
 */
export const buildGlobalStyle = (theme: Theme): RuleSet => {
  // generate css vars from spacings
  const spacingsCssVars = spacingsToCssVars(buildSpacingMap());
  const {
    mobile: textMobileCssVars,
    desktop: textDesktopCssVars,
    weights: weightCssVars,
  } = textSizesToCssVars();
  // only return spacing css variables if theme is missing
  if (!theme) {
    Logger().warn(
      "Missing theme. Generating spacing css variables only.",
      "GlobalStyle"
    );
    return declareGlobalStyle(
      [spacingsCssVars, textDesktopCssVars, weightCssVars],
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

  const effectCssVars = effectsToCssVars(paletteCssVars);

  // declare them in as global css variables
  return declareGlobalStyle(
    [
      spacingsCssVars,
      paletteCssVars,
      textDesktopCssVars,
      effectCssVars,
      weightCssVars,
    ],
    [["XS", [textMobileCssVars]]]
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
