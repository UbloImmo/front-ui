import { texts } from "@ubloimmo/front-tokens";
import { objectEntries } from "@ubloimmo/front-util";
import { useLayoutEffect, useMemo, useRef } from "react";
import dedent from "ts-dedent";

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
  mediaQueries?: string[];
} & Pick<GlobalStyleProps, "lightDarkSupport">;

const GLOBAL_STYLE_RENDER_WARN_THRESHOLD = 3;
const GLOBAL_STYLE_TAG_ID = "__@ubloimmo/uikit__global_style__";
export const BEZIER = "cubic-bezier(0.38, 0, 0.21, 0.98)";

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
 * Creates 20 derived CSS variable declarations from a color, ranging from 0 to 95% opacity.
 * @param {string} varName - The variable name to base derivations off of
 * @returns {CssVar<CssRgbFrom<CssVarUsage>>[]} Array of 20 derived CSS variable declarations.
 */
function deriveOpacityCssVars(
  varName: string
): CssVar<CssRgbFrom<CssVarUsage>>[] {
  return Array(20)
    .fill(0)
    .map((_, index): CssVar<CssRgbFrom<CssVarUsage>> => {
      const opacityCoeff = (index * 5) / 100;
      const opacityName = `${varName}-${String(
        opacityCoeff.toFixed(2)
      ).replaceAll("0.", "")}`;
      const referencedColor: CssRgbFrom<CssVarUsage> = `rgb(from ${cssVarUsage(varName)} r g b / ${opacityCoeff})`;
      return cssVar(opacityName, referencedColor);
    });
}

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
      const opacityVars = deriveOpacityCssVars(varName);
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
 * @return {string[]} An array of CSS strings representing the formatted media queries.
 */
export const formatMediaQueries = (
  mediaQueries?: [BreakpointLabel, CssVar<string>[][]][]
): string[] => {
  return (mediaQueries ?? []).map(([breakpointLabel, vars]) => {
    const mediaQueryCssVarStr = joinCssVarCollection(vars);
    return dedent`
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
 * @return {string} The generated CSS reset style.
 */
export const cssReset = (): string => dedent`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

  }
  *::selection {
    background: var(--primary-light);
    color: var(--primary-dark);
  }
`;

/**
 * Generates a CSS rule to make icons overflow their containers.
 * This is useful for icons that have visual elements extending beyond their bounding box.
 *
 * @return {string} A CSS rule set that sets overflow to visible for SVG icons.
 */
export const iconOverflow = (): string => dedent`
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
 * @return {{vars: CssVar<CssRem | `${number}`>[][], mediaQueries: string[]}} An object containing CSS variables and media queries.
 */
const useUnthemedGlobaStyle = (): {
  vars: CssVar<CssRem | `${number}` | CssVarUsage>[][];
  mediaQueries: string[];
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
    return objectEntries(themePalette)
      .filter(([colorName]) => colorName !== "primary-default")
      .flatMap(([colorName, shadedColor]) =>
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

/**
 * Transforms the given theme into a valid CSS string to be injected as a global style.
 *
 * @param {GlobalStyleProps} props - The props for the GlobalStyle component.
 * @return {string} The generated CSS rule set string.
 */
function useFormattedGlobalStyle({
  theme,
  lightDarkSupport,
}: GlobalStyleProps): string {
  const { defaultCssVarsStr, mediaQueries } = useGlobalStyle(
    theme,
    lightDarkSupport
  );

  const whites = useMemo(() => {
    const white = cssVar(
      "white",
      lightDarkSupport ? "light-dark(white, black)" : "white"
    );
    return [white, ...deriveOpacityCssVars("white")].join("\n");
  }, [lightDarkSupport]);

  return useMemo(() => {
    const fontFace = linkFontFace();
    const reset = cssReset();
    const icons = iconOverflow();
    const lightDark = lightDarkSupport ? "color-sceme: light dark;" : "";
    const queries = mediaQueries?.length ? mediaQueries.join("\n") : "";
    return dedent`
    ${fontFace}
    ${reset}
    ${icons}

    :root {
      ${lightDark}
      --bezier: ${BEZIER};
      ${whites}
      ${defaultCssVarsStr}
    }
    ${queries}
    `.trim();
  }, [defaultCssVarsStr, lightDarkSupport, mediaQueries, whites]);
}

function injectGlobalStyle(styleStr: string) {
  // abort if dom not loaded yet
  if (!window || !window.document || !window.document.head) return;

  // if tag exists, replace its content;
  const existingTag = window.document.getElementById(GLOBAL_STYLE_TAG_ID);
  if (existingTag) {
    existingTag.textContent = styleStr;
    return;
  }
  // otherwise, create & append tag to head
  const newTag = window.document.createElement("style");
  newTag.setAttribute("type", "text/css");
  newTag.setAttribute("id", GLOBAL_STYLE_TAG_ID);
  newTag.textContent = styleStr;
  // add it as first style tag in head
  const firstStyleTag = window.document.head.querySelector("style");
  if (firstStyleTag) {
    window.document.head.insertBefore(newTag, firstStyleTag);
    return;
  }
  window.document.head.append(newTag);
}

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
  const formatted = useFormattedGlobalStyle({ theme, lightDarkSupport });

  useLayoutEffect(() => {
    injectGlobalStyle(formatted);
  }, [formatted]);
  return null;
};
