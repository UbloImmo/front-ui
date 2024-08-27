import { texts } from "@ubloimmo/front-tokens/lib/tokens.values";
import { objectKeys } from "@ubloimmo/front-util";
import { css, StyleFunction } from "styled-components";

import { typographyWeightMap } from "./typogaphy.weight";
import { typographyFontFace } from "./typography.font";
import { cssRem, cssVarUsage, extractRem, fromStyleProps } from "../utils";

import type {
  HeadingProps,
  TextProps,
  TypographyProps,
  TypographyWeight,
  AnyTypographyProps,
  CssRem,
  StyleProps,
  TypographySize,
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
  return {
    size,
    weight,
    color: props.color ?? defaults.color,
    italic: props.italic ?? defaults.italic,
    underline: props.underline ?? defaults.underline,
    overline: props.overline ?? defaults.overline,
    lineThrough: props.lineThrough ?? defaults.lineThrough,
    uppercase: props.uppercase ?? defaults.uppercase,
    children: props.children ?? null,
    important: props.important ?? false,
    ellipsis: props.ellipsis ?? false,
    align: props.align ?? "left",
    className: null,
  };
};

/**
 * Builds a typography style based on the provided defaults.
 *
 * @param {Required<AnyTypographyProps>} defaults - the default typography props
 * @return {StyleFunction<TextProps | HeadingProps>} the style function for text or heading props
 */
export const buildTypographyStyle = (
  defaults: Required<AnyTypographyProps>
): StyleFunction<StyleProps<TextProps | HeadingProps>> => {
  return (props) => {
    const {
      size,
      weight,
      color,
      italic,
      underline,
      overline,
      lineThrough,
      important: $important,
      ellipsis,
      uppercase,
      align,
    } = sanitizeTypographyProps(defaults, fromStyleProps(props));
    const {
      letterSpacing,
      lineHeight,
      textIndent,
      textOverflow: $textOverflow,
      fontFeatureSettings,
    } = texts.desktop[size][weight].css.style;
    const fontSize = `text-${size}`;
    const fontWeight = cssVarUsage(`text-weight-${weight.toLowerCase()}`);
    const fontStyle = italic ?? defaults.italic ? "italic" : "normal";
    const fontItalic = `"ital" ${italic ?? defaults.italic ? 1 : 0}`;
    const textTransform = uppercase ? "uppercase" : "none";
    const textDecoration = typographyTextDecoration({
      lineThrough,
      underline,
      overline,
    });
    const important = $important ? "!important" : "";
    const textOverflow = ellipsis ? "ellipsis" : $textOverflow;
    return css`
      ${typographyFontFace()}
      font-size: ${cssVarUsage(fontSize)} ${important};
      font-style: ${fontStyle} ${important};
      font-variation-settings: ${fontItalic} ${important};
      font-weight: ${fontWeight} ${important};
      color: ${cssVarUsage(color)} ${important};
      letter-spacing: ${letterSpacing} ${important};
      text-indent: ${textIndent} ${important};
      line-height: ${lineHeight} ${important};
      text-align: ${align} ${important};
      text-overflow: ${textOverflow} ${important};
      font-feature-settings: ${fontFeatureSettings} ${important};
      text-decoration: ${textDecoration} ${important};
      text-transform: ${textTransform} ${important};

      text-underline-offset: 0.25em;
      text-decoration-thickness: 1px;
      ${ellipsis &&
      css`
        overflow: hidden ${important};
        white-space: nowrap ${important};
        max-width: 100% ${important};
        flex: 1;
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
  important: false,
  ellipsis: false,
  uppercase: false,
  align: "left",
  children: null,
  className: null,
} as const;
