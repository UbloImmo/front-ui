import { texts } from "@ubloimmo/front-tokens/lib/tokens.values";
import {
  isNumber,
  isString,
  objectKeys,
  transformObject,
  type GenericFn,
} from "@ubloimmo/front-util";
import { css, type RuleSet } from "styled-components";

import { typographyWeightMap } from "./typogaphy.weight";
import { fontFamilySets } from "./typography.font";
import { breakpointsPx } from "../sizes";
import { cssRem, cssVarUsage, extractRem, fromStyleProps } from "../utils";

import type {
  TypographyProps,
  TypographyWeight,
  AnyTypographyProps,
  CssRem,
  StyleProps,
  TypographySize,
  TypographyBreakpoint,
  TypographyStyle,
  HeadingSize,
} from "@types";

/**
 * Returns the CSS text decoration string based on the provided options.
 *
 * @param {Pick<TypographyProps, "underline" | "overline" | "lineThrough">} options - The text decoration options
 * @return {string} The computed text decoration
 */
export const typographyTextDecoration = ({
  underline,
  overline,
  lineThrough,
}: Pick<TypographyProps, "underline" | "overline" | "lineThrough">): string => {
  if (!underline && !overline && !lineThrough) {
    return "none";
  }
  const decorations: string[] = [];
  if (underline) {
    decorations.push("underline");
  }
  if (overline) {
    decorations.push("overline");
  }
  if (lineThrough) {
    decorations.push("line-through");
  }
  if (decorations.length === 0) return "none";
  return decorations.join(" ");
};

const FONT_SIZE_MOBILE_INCREMENT = 0.125;

/**
 * Scales the font size for mobile devices based on the desktop size.
 *
 * @param {CssRem} desktopSize - the font size in rem for desktop devices
 * @return {CssRem} the font size in rem for mobile devices
 */
export const mobileFontSize = (desktopSize: CssRem): CssRem => {
  return cssRem(extractRem(desktopSize) + FONT_SIZE_MOBILE_INCREMENT);
};

export const allTypographySizes: TypographySize[] = objectKeys(texts.desktop);

export const allTypographyWeights: TypographyWeight[] =
  objectKeys(typographyWeightMap);

/**
 * Sanitizes the typography properties based on the defaults and the provided props.
 *
 * @remarks `size` & `weight` are sensitive since they are used to index objects.
 *
 * @param {Required<AnyTypographyProps>} defaults - the default typography properties
 * @param {AnyTypographyProps} props - the provided typography properties
 * @return {Required<AnyTypographyProps>} the sanitized typography properties
 */
export const sanitizeTypographyProps = (
  defaults: Required<AnyTypographyProps>,
  props: AnyTypographyProps
): Required<AnyTypographyProps> => {
  const rawSize = props.size ?? defaults.size;
  const size = allTypographySizes.includes(rawSize) ? rawSize : defaults.size;
  const rawWeight = props.weight ?? defaults.weight;
  const weight = allTypographyWeights.includes(rawWeight)
    ? rawWeight
    : defaults.weight;
  const as = ["h1", "h2", "h3", "h4"].includes(size)
    ? (size as HeadingSize)
    : (props.as ?? defaults.as);
  return {
    as,
    size,
    weight,
    // set styleOverride to null here since it gets applied at the component level
    styleOverride: null,
    color: props.color ?? defaults.color,
    italic: props.italic ?? defaults.italic,
    underline: props.underline ?? defaults.underline,
    overline: props.overline ?? defaults.overline,
    lineThrough: props.lineThrough ?? defaults.lineThrough,
    capitalized: props.capitalized ?? defaults.capitalized,
    uppercase: props.uppercase ?? defaults.uppercase,
    children: props.children ?? null,
    important: props.important ?? defaults.important,
    ellipsis: props.ellipsis ?? defaults.ellipsis,
    align: props.align ?? defaults.align,
    className: props.className ?? defaults.className,
    noWrap: props.noWrap ?? defaults.noWrap,
    fill: props.fill ?? defaults.fill,
    id: props.id ?? null,
    lineClamp: props.lineClamp ?? defaults.lineClamp,
    font: props.font ?? defaults.font,
    title: props.title ?? null,
  };
};

/**
 * Extracts the typography style object from the texts object given a breakpoint, size and weight.
 *
 * @param {TypographyBreakpoint} breakpoint - the breakpoint
 * @param {TypographySize} size - the size
 * @param {TypographyWeight} weight - the weight
 * @return {TypographyStyle} the extracted typography style
 */
const extractTypographyStyle = (
  breakpoint: TypographyBreakpoint,
  size: TypographySize,
  weight: TypographyWeight
): TypographyStyle => {
  return texts[breakpoint][size][weight].css.style;
};

/**
 * Creates a function that takes a CSS value and returns a CSS declaration.
 * If important is true, adds !important to the declaration.
 *
 * @param {boolean} [important=false] - whether to add !important to the declaration
 * @returns {(value: string) => string} - a function that takes a CSS value
 * and returns a CSS declaration
 */
const applyRule = (important?: boolean) => (value: string) => {
  return important ? `${value} !important` : value;
};

/**
 * Takes a typography style object and returns a styled component CSS declaration
 * that only includes the letter spacing, text indent, line height and font feature settings.
 *
 * @param {TypographyStyle} style - the typography style object
 * @param {boolean} [important=false] - whether to add !important to the CSS declaration
 * @returns {RuleSet} - a styled component CSS declaration
 */
const baseTypographyStyle = (
  style: TypographyStyle,
  important?: boolean
): RuleSet => {
  const { letterSpacing, textIndent, lineHeight, fontFeatureSettings } =
    transformObject(style, applyRule(important));

  return css`
    letter-spacing: ${letterSpacing};
    text-indent: ${textIndent};
    line-height: ${lineHeight};
    font-feature-settings: ${fontFeatureSettings};
  `;
};

/**
 * Builds a typography style based on the provided defaults.
 *
 * @param {Required<AnyTypographyProps>} defaults - the default typography props
 * @return {StyleFunction<TextProps | HeadingProps>} the style function for text or heading props
 */
export const buildTypographyStyle = (
  defaults: Required<AnyTypographyProps>
): GenericFn<[StyleProps<AnyTypographyProps>], RuleSet> => {
  return (props) => {
    const {
      size,
      weight,
      color,
      italic,
      underline,
      overline,
      lineThrough,
      important,
      ellipsis,
      uppercase,
      capitalized,
      align,
      fill,
      noWrap,
      lineClamp,
      font,
    } = sanitizeTypographyProps(defaults, fromStyleProps(props));
    const dekstopStyle = extractTypographyStyle("desktop", size, weight);
    const mobileStyle = extractTypographyStyle("mobile", size, weight);

    const fontSize = cssVarUsage(`text-${size}`);
    const fontWeight = cssVarUsage(`text-weight-${weight.toLowerCase()}`);
    const fontStyle = (italic ?? defaults.italic) ? "italic" : "normal";
    const fontItalic = `"ital" ${(italic ?? defaults.italic) ? 1 : 0}`;
    const textTransform = uppercase
      ? "uppercase"
      : capitalized
        ? "capitalize"
        : "none";
    const textDecoration = typographyTextDecoration({
      lineThrough,
      underline,
      overline,
    });
    const webkitLineClamp = isNumber(lineClamp) ? String(lineClamp) : null;
    const textOverflow = ellipsis ? "ellipsis" : dekstopStyle.textOverflow;
    // runtime check to ensure the font is a valid font family
    const fontFamily = fontFamilySets[font in fontFamilySets ? font : "sans"];

    const apply = applyRule(important);

    return css`
      font-family: ${apply(fontFamily)};
      ${baseTypographyStyle(dekstopStyle, important)}
      font-size: ${apply(fontSize)};
      font-style: ${apply(fontStyle)};
      font-variation-settings: ${apply(fontItalic)};
      font-weight: ${apply(fontWeight)};
      color: ${apply(cssVarUsage(color))};
      text-align: ${apply(align)};
      text-overflow: ${apply(textOverflow)};
      text-decoration: ${apply(textDecoration)};
      text-transform: ${apply(textTransform)};
      text-underline-offset: 0.25em;
      text-decoration-thickness: 1px;

      @media only screen and (max-width: ${breakpointsPx.XS}) {
        ${baseTypographyStyle(mobileStyle, important)}
      }

      ${(noWrap || ellipsis) &&
      css`
        white-space: ${apply("nowrap")};
      `}

      ${ellipsis &&
      css`
        overflow: ${apply("hidden")};
        max-width: ${apply("100%")};
        flex: 1;
      `}
      ${fill &&
      css`
        width: ${apply("100%")};
      `}

      ${isString(webkitLineClamp) &&
      css`
        display: ${apply("-webkit-box")};
        line-clamp: ${apply(webkitLineClamp)};
        -webkit-line-clamp: ${apply(webkitLineClamp)};
        -webkit-box-orient: ${apply("vertical")};
        white-space: ${apply("normal")};
      `}
    `;
  };
};

export const defaultTypographyProps: Required<TypographyProps> = {
  weight: "regular",
  color: "gray-900",
  italic: false,
  underline: false,
  overline: false,
  lineThrough: false,
  capitalized: false,
  important: false,
  ellipsis: false,
  uppercase: false,
  align: "left",
  children: null,
  className: null,
  fill: false,
  noWrap: false,
  id: null,
  as: "span",
  styleOverride: null,
  lineClamp: null,
  font: "sans",
  title: null,
} as const;
