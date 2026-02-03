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
import { cssVar, cssVarUsage, useLogger, useStatic } from "../../utils";
import { effectsToCssVars } from "../palette";
import { invertShadeKey } from "../palette/palette.colorscheme";

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
  CssLightDark,
  CssRgbFrom,
  GlobalStyleProps,
} from "@types";

type GlobaStyleInnerProps = {
  defaultCssVarsStr: string;
  mediaQueries?: RuleSet[];
} & Pick<GlobalStyleProps, "lightDarkSupport">;

const GLOBAL_STYLE_RENDER_WARN_THRESHOLD = 3;

/**
 * Converts each shade of a palette color to CSS variables
 *
 * @remarks
 * Use {@link paletteColorToCssVars} to convert a palette color to CSS variables
 * with light-dark support and opacity variables for each shade
 *
 * @template {AnyPaletteColorShadeKeys} TShadeKeys - The shade keys of the palette color
 * @param {string} colorName - The name of the palette color
 * @param {PaletteColorShaded<TShadeKeys>} shadedColors - The shaded palette color
 * @return {CssVar<RgbaColorStr>[]} An array of CSS variables for the palette color shades
 */
export const paletteColorToCssVarsSimple = <
  TShadeKeys extends AnyPaletteColorShadeKeys,
>(
  colorName: string,
  shadedColors: PaletteColorShaded<TShadeKeys>
): CssVar<RgbaColorStr>[] => {
  return objectEntries(shadedColors).map(
    ([shadeName, { rgba }]): CssVar<RgbaColorStr> =>
      cssVar(`${colorName.toLowerCase()}-${shadeName.toLowerCase()}`, rgba)
  );
};

/**
 * Generates CSS variables for the given palette color and its shades.
 *
 * @template {AnyPaletteColorShadeKeys} TShadeKeys - Shade keys contained in the shaded palette color
 * @param {string} colorName - the name of the palette color
 * @param {PaletteColorShaded<TShadeKeys>} shadedColors - the shaded palette color
 * @param {boolean} generateAlpha - whether to generate alpha variables
 * @return {CssVar<RgbaColorStr | CssRgbFrom<CssVarUsage> | CssLightDark<RgbaColorStr, RgbaColorStr>>[]} an array of CSS variables for the palette color shades, ni various formats
 */
export const paletteColorToCssVars = <
  TShadeKeys extends AnyPaletteColorShadeKeys,
>(
  colorName: string,
  shadedColors: PaletteColorShaded<TShadeKeys>,
  generateAlpha?: boolean,
  enableLightDark?: boolean
): CssVar<
  | RgbaColorStr
  | CssRgbFrom<CssVarUsage>
  | CssLightDark<RgbaColorStr, RgbaColorStr>
>[] => {
  if (!generateAlpha)
    return paletteColorToCssVarsSimple(colorName, shadedColors);

  return objectEntries(shadedColors).flatMap(
    ([shadeName, { rgba }]): CssVar<
      | RgbaColorStr
      | CssRgbFrom<CssVarUsage>
      | CssLightDark<RgbaColorStr, RgbaColorStr>
    >[] => {
      const varName = `${colorName.toLowerCase()}-${shadeName.toLowerCase()}`;
      let varValue: RgbaColorStr | CssLightDark<RgbaColorStr, RgbaColorStr> =
        rgba;
      if (enableLightDark) {
        const invertedShade = invertShadeKey(shadeName);
        const invertedColor = shadedColors[invertedShade].rgba ?? rgba;
        varValue = `light-dark(${rgba}, ${invertedColor})`;
      }
      const baseVar = cssVar(varName, varValue);
      if (!generateAlpha) return [baseVar];

      // create variables for major opacities (0 - 0.95)
      const opacityVars = Array(20)
        .fill(0)
        .map((_, index) => {
          const opacityCoeff = (index * 5) / 100;
          const opacityName = `${varName}-${String(
            opacityCoeff.toFixed(2)
          ).replaceAll("0.", "")}`;
          const referencedColor: CssRgbFrom<CssVarUsage> = `rgb(from ${cssVarUsage(varName)} r g b / ${opacityCoeff})`;
          return cssVar(opacityName, referencedColor);
        });
      return [baseVar, ...opacityVars];
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
 * Generates a CSS rule to make icons overflow their containers.
 * This is useful for icons that have visual elements extending beyond their bounding box.
 *
 * @return {RuleSet} A CSS rule set that sets overflow to visible for SVG icons.
 */
export const iconOverflow = (): RuleSet => css`
  svg[data-testid="icon"] {
    overflow: visible;
  }
`;

const componentCssVars = () => {
  const inputHeight = cssVar("input-height", cssVarUsage("s-8"));
  const inputHeightMobile = cssVar("input-height", cssVarUsage("s-10"));

  return { desktop: [inputHeight], mobile: [inputHeightMobile] };
};

/**
 * Generates CSS variables and media queries for unthemed global style aspects (spacings & text sizes).
 *
 * @return {{vars: CssVar<CssRem | `${number}`>[][], mediaQueries: RuleSet[]}} An object containing CSS variables and media queries.
 */
const useUnthemedGlobaStyle = (): {
  vars: CssVar<CssRem | `${number}` | CssVarUsage>[][];
  mediaQueries: RuleSet[];
} => {
  // generate css vars from spacings
  const spacingsCssVars = useStatic(spacingsToCssVars(buildSpacingMap()));
  const {
    mobile: textMobileCssVars,
    desktop: textDesktopCssVars,
    weights: weightCssVars,
  } = useStatic(textSizesToCssVars());
  const { desktop: componentDesktopCssVars, mobile: componentMobileCssVars } =
    useStatic(componentCssVars());

  const mediaQueries = useStatic(
    formatMediaQueries([["XS", [textMobileCssVars, componentMobileCssVars]]])
  );
  return {
    vars: [
      spacingsCssVars,
      textDesktopCssVars,
      weightCssVars,
      componentDesktopCssVars,
    ],
    mediaQueries,
  };
};

/**
 * Generates CSS variables and effect CSS variables based on the given theme.
 *
 * @param {Theme} theme - The theme object containing the palette and organization.
 * @param {boolean} [lightDarkSupport] - Whether to declare color variables as light-dark
 * @return {(CssVar<string> | CssVar<`${string}${CssVarUsage}`>)[][]} An array containing the generated CSS variables and effect CSS variables.
 */
const useThemedGlobalStyle = (
  theme: Theme,
  lightDarkSupport?: boolean
): (CssVar<string> | CssVar<`${string}${CssVarUsage}`>)[][] => {
  const themePalette = useMemo(() => {
    // abort if no theme
    if (!theme) return null;
    // filter legacy palette and organization out
    const { palette: _, organization: __, ...palette } = theme;
    return palette;
  }, [theme]);

  // generate css vars from non-legacy palette
  const paletteCssVars = useMemo(() => {
    // abort if no theme palette
    if (!themePalette) return [];

    // transform palette to css vars
    return objectEntries(themePalette).flatMap(([colorName, shadedColor]) =>
      paletteColorToCssVars(
        colorName,
        shadedColor as PaletteColorShaded<AnyPaletteColorShadeKeys>,
        true,
        lightDarkSupport
      )
    );
  }, [themePalette, lightDarkSupport]);

  const effectCssVars = useMemo(() => {
    if (!themePalette) return [];

    const opaquePaletteVars = objectEntries(themePalette).flatMap(
      ([colorName, shadedColor]) =>
        paletteColorToCssVarsSimple(
          colorName,
          shadedColor as PaletteColorShaded<AnyPaletteColorShadeKeys>
        )
    );
    return effectsToCssVars(opaquePaletteVars);
  }, [themePalette]);

  return [paletteCssVars, effectCssVars];
};

/**
 * Returns the global style props for a given theme.
 *
 * @param {Theme} theme - The theme object.
 * @param {boolean} [lightDarkSupport] - Whether to declare color variables as light-dark
 * @return {GlobaStyleInnerProps} The global style props including the default CSS variables string and media queries.
 */
const useGlobalStyle = (
  theme: Theme,
  lightDarkSupport?: boolean
): GlobaStyleInnerProps => {
  const { warn } = useLogger("GlobalStyle");
  const renderCount = useRef(0);
  const themeCssVars = useThemedGlobalStyle(theme, lightDarkSupport);
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
    lightDarkSupport,
  };
};

export const BEZIER = "cubic-bezier(0.38, 0, 0.21, 0.98)";

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
  lightDarkSupport,
}: GlobaStyleInnerProps): RuleSet => {
  return css`
    ${linkFontFace}
    ${cssReset}
    ${iconOverflow}
    :root {
      ${lightDarkSupport &&
      css`
        color-scheme: light dark;
      `}
      --white: ${lightDarkSupport ? "light-dark(white, black)" : "white"};
      --white-00: rgb(from var(--white) r g b / 0);
      --white-05: rgb(from var(--white) r g b / 0.05);
      --white-10: rgb(from var(--white) r g b / 0.1);
      --white-15: rgb(from var(--white) r g b / 0.15);
      --white-20: rgb(from var(--white) r g b / 0.2);
      --white-25: rgb(from var(--white) r g b / 0.25);
      --white-30: rgb(from var(--white) r g b / 0.3);
      --white-35: rgb(from var(--white) r g b / 0.35);
      --white-40: rgb(from var(--white) r g b / 0.4);
      --white-45: rgb(from var(--white) r g b / 0.45);
      --white-50: rgb(from var(--white) r g b / 0.5);
      --white-55: rgb(from var(--white) r g b / 0.55);
      --white-60: rgb(from var(--white) r g b / 0.6);
      --white-65: rgb(from var(--white) r g b / 0.65);
      --white-70: rgb(from var(--white) r g b / 0.7);
      --white-75: rgb(from var(--white) r g b / 0.75);
      --white-80: rgb(from var(--white) r g b / 0.8);
      --white-85: rgb(from var(--white) r g b / 0.85);
      --white-90: rgb(from var(--white) r g b / 0.9);
      --white-95: rgb(from var(--white) r g b / 0.95);
      --bezier: ${BEZIER};
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
export const GlobalStyle = ({ theme, lightDarkSupport }: GlobalStyleProps) => {
  const innerProps = useGlobalStyle(theme, lightDarkSupport);
  return <GlobalStyleInner {...innerProps} />;
};

const GlobalStyleInner = createGlobalStyle<GlobaStyleInnerProps>`
  ${appendGlobalStyle}
`;
