import { texts } from "@ubloimmo/front-tokens";
import { objectEntries } from "@ubloimmo/front-util";
import { useMemo, useRef } from "react";
import { createGlobalStyle, css, type RuleSet } from "styled-components";

import { breakpointsPx, buildSpacingMap } from "../../sizes";
import {
  mobileFontSize,
  typographyWeightMap,
  linkFontFace,
} from "../../typography";
import { cssVar, useLogger, useStatic } from "../../utils";
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
  CssVarUsage,
} from "@types";

type GlobaStyleInnerProps = {
  defaultCssVarsStr: string;
  mediaQueries?: RuleSet[];
};

type GlobalStyleProps = {
  theme: Theme;
};

const GLOBAL_STYLE_RENDER_WARN_THRESHOLD = 3;

/**
 * Generates CSS variables for the given palette color and its shades.
 *
 * @template {AnyPaletteColorShadeKeys} TShadeKeys - Shade keys contained in the shaded palette color
 * @param {string} colorName - the name of the palette color
 * @param {PaletteColorShaded<TShadeKeys>} shadedColors - the shaded palette color
 * @param {boolean} generateAlpha - whether to generate alpha variables
 * @return {CssVar<RgbaColorStr>[]} an array of CSS variables for the palette color shades
 */
export const paletteColorToCssVars = <
  TShadeKeys extends AnyPaletteColorShadeKeys
>(
  colorName: string,
  shadedColors: PaletteColorShaded<TShadeKeys>,
  generateAlpha?: boolean
): CssVar<RgbaColorStr>[] => {
  if (!generateAlpha)
    return objectEntries(shadedColors).map(
      ([shadeName, { rgba }]): CssVar<RgbaColorStr> =>
        cssVar(`${colorName.toLowerCase()}-${shadeName.toLowerCase()}`, rgba)
    );
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
 * Formats media queries based on the provided breakpoints and CSS variables.
 *
 * @param {Array<[BreakpointLabel, CssVar<string>[][]]>} mediaQueries - An optional array of breakpoint labels and CSS variables for media queries.
 * @return {RuleSet[]} An array of CSS rulesets representing the formatted media queries.
 */
export const formatMediaQueries = (
  mediaQueries?: [BreakpointLabel, CssVar<string>[][]][]
): RuleSet[] => {
  return (mediaQueries ?? []).map(([breakpointLabel, vars]) => {
    const mediaQueryCssVarStr = joinCssVarCollection(vars);
    return css`
      @media only screen and (max-width: ${breakpointsPx[breakpointLabel]}) {
        :root {
          ${mediaQueryCssVarStr}
        }
      }
    `;
  });
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

    &::selection {
      background: var(--primary-light);
      color: var(--primary-dark);
    }
  }
`;

/**
 * Generates CSS variables and media queries for unthemed global style aspects (spacings & text sizes).
 *
 * @return {{vars: CssVar<CssRem | `${number}`>[][], mediaQueries: RuleSet[]}} An object containing CSS variables and media queries.
 */
const useUnthemedGlobaStyle = (): {
  vars: CssVar<CssRem | `${number}`>[][];
  mediaQueries: RuleSet[];
} => {
  // generate css vars from spacings
  const spacingsCssVars = useStatic(spacingsToCssVars(buildSpacingMap()));
  const {
    mobile: textMobileCssVars,
    desktop: textDesktopCssVars,
    weights: weightCssVars,
  } = useStatic(textSizesToCssVars());

  const mediaQueries = useStatic(
    formatMediaQueries([["XS", [textMobileCssVars]]])
  );
  return {
    vars: [spacingsCssVars, textDesktopCssVars, weightCssVars],
    mediaQueries,
  };
};

/**
 * Generates CSS variables and effect CSS variables based on the given theme.
 *
 * @param {Theme} theme - The theme object containing the palette and organization.
 * @return {(CssVar<string> | CssVar<`${string}${CssVarUsage}`>)[][]} An array containing the generated CSS variables and effect CSS variables.
 */
const useThemedGlobalStyle = (
  theme: Theme
): (CssVar<string> | CssVar<`${string}${CssVarUsage}`>)[][] => {
  // generate css vars from non-legacy palette
  const paletteCssVars = useMemo(() => {
    // abort if no theme
    if (!theme) return [];
    // filter legacy palette and organization out
    const { palette: _, organization: __, ...palette } = theme;
    // transform palette to css vars
    return objectEntries(palette).flatMap(([colorName, shadedColor]) =>
      paletteColorToCssVars(
        colorName,
        shadedColor as PaletteColorShaded<AnyPaletteColorShadeKeys>,
        true
      )
    );
  }, [theme]);

  const effectCssVars = useMemo(
    () => effectsToCssVars(paletteCssVars),
    [paletteCssVars]
  );

  return [paletteCssVars, effectCssVars];
};

/**
 * Returns the global style props for a given theme.
 *
 * @param {Theme} theme - The theme object.
 * @return {GlobaStyleInnerProps} The global style props including the default CSS variables string and media queries.
 */
const useGlobalStyle = (theme: Theme): GlobaStyleInnerProps => {
  const { warn } = useLogger("GlobalStyle");
  const renderCount = useRef(0);
  const themeCssVars = useThemedGlobalStyle(theme);
  const { vars: unthemedCssVars, mediaQueries } = useUnthemedGlobaStyle();
  const defaultCssVarsStr = useMemo(
    () => joinCssVarCollection([...themeCssVars, ...unthemedCssVars]),
    [themeCssVars, unthemedCssVars]
  );

  renderCount.current++;
  if (renderCount.current > GLOBAL_STYLE_RENDER_WARN_THRESHOLD) {
    warn(`Excessive renders detected! (Rendered ${renderCount.current} times)`);
  }

  return {
    defaultCssVarsStr,
    mediaQueries,
  };
};

/**
 * Generates a CSS rule set by appending global styles to the root element.
 *
 * @param {GlobaStyleInnerProps} props - An object containing the default CSS variables string and media queries.
 * @param {string} props.defaultCssVarsStr - The default CSS variables string.
 * @param {RuleSet[]} props.mediaQueries - An array of CSS rulesets representing media queries.
 * @return {RuleSet} The generated CSS rule set.
 */
const appendGlobalStyle = ({
  defaultCssVarsStr,
  mediaQueries,
}: GlobaStyleInnerProps): RuleSet => {
  return css`
    ${linkFontFace()}
    ${cssReset()}
    :root {
      ${defaultCssVarsStr}
    }
    ${mediaQueries}
  `;
};

/**
 * Global style component that parses the `styled-components` {@link Theme},
 * transforms it into global CSS variables using {@link useGlobalStyle} and injects them into the document.
 *
 * @see useGlobalStyle
 *
 * @param {GlobalStyleProps} props - The props for the GlobalStyle component.
 * @param {Theme} props.theme - The theme object
 */
export const GlobalStyle = ({ theme }: GlobalStyleProps) => {
  const innerProps = useGlobalStyle(theme);
  return <GlobalStyleInner {...innerProps} />;
};

const GlobalStyleInner = createGlobalStyle<GlobaStyleInnerProps>`
  ${appendGlobalStyle}
`;
