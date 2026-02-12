import { texts } from "@ubloimmo/front-tokens/lib/tokens.values";
import { objectKeys, Optional } from "@ubloimmo/front-util";
import { type CSSProperties, useMemo } from "react";

import { typographyWeightMap } from "./typogaphy.weight";
import { cssClasses, cssRem, extractRem, useCssVariables } from "../utils";
import generatedStyles from "./__generated__/typography-tokens.module.scss";
import styles from "./typography.module.scss";

import type {
  TypographyProps,
  TypographyWeight,
  AnyTypographyProps,
  CssRem,
  TypographySize,
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

/**
 * Builds a typography component's element's style properties based based on its properties object
 *
 * @param {AnyTypographyProps} props - the typography props
 * @param {boolean} [isHeading=false] - the default typography props
 * @return {{ style: CSSProperties; className: Optional<string> } & Record<`data-${string}`, Optional<string>>} the style function for text or heading props
 */
export const useTypographyStyles = (
  props: AnyTypographyProps,
  isHeading: boolean = false
): { style: CSSProperties; className: Optional<string> } => {
  const {
    size,
    weight,
    color, // handled via data-color
    italic,
    underline,
    overline,
    lineThrough,
    important,
    ellipsis,
    uppercase,
    capitalized,
    align, // handled via data-align
    fill,
    noWrap,
    lineClamp, // set via css variable injection
    font,
  } = useMemo(
    () =>
      sanitizeTypographyProps({ ...defaultTypographyProps, size: "m" }, props),
    [props]
  );

  const style = useCssVariables(
    {
      "text-line-clamp": lineClamp ? lineClamp : null,
    },
    props.styleOverride
  );

  const className = useMemo(() => {
    const generated =
      `text-${size}-${weight}` satisfies keyof typeof generatedStyles;
    const generatedClass = generatedStyles[generated];
    const fontClass = styles[font];

    return cssClasses(
      styles.text,
      styles.font,
      fontClass,
      generatedClass,
      generatedStyles[`text-color-${color}`],
      styles[`align-${align}`],
      [styles.heading, isHeading],
      [styles.italic, italic],
      [styles["line-trough"], lineThrough],
      [styles.underline, underline],
      [styles.overline, overline],
      [styles.ellipsis, ellipsis],
      [styles.uppercase, uppercase],
      [styles.capitalized, capitalized],
      [styles.fill, fill],
      [styles["no-wrap"], noWrap],
      [styles["line-clamp"], !!lineClamp],
      [styles.important, important],
      [generatedStyles.important, important],
      props.className
    );
  }, [
    align,
    capitalized,
    color,
    ellipsis,
    fill,
    font,
    important,
    isHeading,
    italic,
    lineClamp,
    lineThrough,
    noWrap,
    overline,
    props.className,
    size,
    underline,
    uppercase,
    weight,
  ]);

  return {
    className,
    style,
  };
};
