import { cssRem, cssVarUsage, extractRem } from "./../utils/css.utils";
import { css, StyleFunction } from "styled-components";
import {
  HeadingProps,
  TextProps,
  TypographyProps,
  TypographyWeight,
  AnyTypographyProps,
  TextSize,
  HeadingSize,
  CssRem,
} from "src";
import { typographyFontFace } from "./typography.font";
import { objectKeys, transformObject } from "@ubloimmo/front-util";
import { texts } from "@ubloimmo/front-tokens/lib/tokens.values";

/**
 * Builds a typography weight map based on the generated text styles.
 *
 * @return {Record<TypographyWeight, string>} The typography weight map.
 */
export const buildTypographyWeightMap = (): Record<
  TypographyWeight,
  string
> => {
  return transformObject(texts.text.m, (token) => token.css.style.fontWeight);
};

const typographyWeightMap = buildTypographyWeightMap();

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
}: Pick<TypographyProps, "underline" | "overline" | "lineThrough">) => {
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

const validTypographySizes: (TextSize | HeadingSize)[] = objectKeys({
  ...texts.text,
  ...texts.heading,
});

const validTypographyWeights: TypographyWeight[] = objectKeys(texts.text.m);

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
  const size = validTypographySizes.includes(rawSize) ? rawSize : defaults.size;
  const rawWeight = props.weight ?? defaults.weight;
  const weight = validTypographyWeights.includes(rawWeight)
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
): StyleFunction<TextProps | HeadingProps> => {
  const allSizes = { ...texts.text, ...texts.heading };

  return (props) => {
    const { size, weight, color, italic, underline, overline, lineThrough } =
      sanitizeTypographyProps(defaults, props);
    const {
      letterSpacing,
      lineHeight,
      textAlign,
      textIndent,
      textOverflow,
      fontFeatureSettings,
    } = allSizes[size][weight].css.style;
    const fontSize = `text-${size}`;
    const fontWeight = typographyWeightMap[weight];
    const fontStyle = italic ?? defaults.italic ? "italic" : "normal";
    const fontItalic = `"ital" ${italic ?? defaults.italic ? 1 : 0}`;
    const textDecoration = typographyTextDecoration({
      lineThrough,
      underline,
      overline,
    });
    return css`
      ${typographyFontFace()}
      font-size: ${cssVarUsage(fontSize)};
      font-style: ${fontStyle};
      font-variation-settings: ${fontItalic};
      font-weight: ${fontWeight};
      color: ${cssVarUsage(color)};
      letter-spacing: ${letterSpacing};
      text-indent: ${textIndent};
      line-height: ${lineHeight};
      text-align: ${textAlign};
      text-overflow: ${textOverflow};
      font-feature-settings: ${fontFeatureSettings};
      text-decoration: ${textDecoration};
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
} as const;
