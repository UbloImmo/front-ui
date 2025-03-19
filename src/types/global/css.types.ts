import type { AnyColorStr, RgbaColorStr } from "../themes/color.types";
import type { SpacingLabel } from "../themes/sizes/spacing.types";

/**
 * A CSS `px` length
 *
 * @example
 * const pixels: CssPx = "100px";
 */
export type CssPx = `${number}px`;

/**
 * A CSS `rem` length
 *
 * @example
 * const rems: CssRem = "100rem";
 */
export type CssRem = `${number}rem`;

/**
 * A CSS `fr` length
 *
 * @example
 * const fraction: CssFr = "2fr";
 */
export type CssFr = `${number}fr`;

/**
 * A CSS `%` length
 *
 * @example
 * const percent: CssPercent = "50%";
 */
export type CssPercent = `${number}%`;

/**
 * A CSS `ch` length
 *
 * @example
 * const ch: CssCh = "100ch";
 */
export type CssCh = `${number}ch`;

export type CssLengthKeyword =
  | "auto"
  | "min-content"
  | "max-content"
  | "fit-content";

/**
 * Any supported CSS length declaration
 *
 * Can be any of the following:
 * - {@link CssPx}: `100px`, `200px`, `300px`, etc...
 * - {@link CssRem}: `100rem`, `200rem`, `300rem`, etc...
 * - {@link CssFr}: `1fr`, `2fr`, `3fr`, etc...
 * - {@link CssPercent}: `50%`, `100%`, `200%`, etc...
 * - {@link SpacingLabel}: `s05`, `s1`, `s2`, `s3`, etc...
 * - {@link CssLengthKeyword}: `auto`, `min-content`, `max-content`, `fit-content`
 * - {@link CssCh}: `100ch`, `200ch`, `300ch`, etc...
 * - {@link number}: `100`, `200`, `300`, etc...
 */
export type CssLength =
  | SpacingLabel
  | CssRem
  | CssPx
  | CssFr
  | CssPercent
  | CssLengthKeyword
  | CssCh
  | number;

/**
  Absolute CSS lenghts declarations
*/
export type FixedCssLength = SpacingLabel | CssRem | CssPx | number;

/**
 * Any supported CSS length usage
 *
 * Can be any of the following:
 * - {@link CssPx}: `100px`, `200px`, `300px`, etc...
 * - {@link CssRem}: `100rem`, `200rem`, `300rem`, etc...
 * - {@link CssFr}: `1fr`, `2fr`, `3fr`, etc...
 * - {@link CssPercent}: `50%`, `100%`, `200%`, etc...
 * - {@link CssVarUsage}: `var(--s05)`, `var(--s1)`, `var(--s2)`, `var(--s3)`, etc...
 * - {@link CssCh}: `100ch`, `200ch`, `300ch`, etc...
 * - {@link CssLengthKeyword}: `auto`, `min-content`, `max-content`, `fit-content`
 */
export type CssLengthUsage =
  | CssPx
  | CssRem
  | CssCh
  | CssVarUsage
  | CssFr
  | CssPercent
  | CssLengthKeyword;

/**
 * A CSS `deg` angle
 *
 * @example
 * const angle: CssDeg = "45deg";
 */
export type CssDeg = `${number}deg`;

/**
 * A CSS variable name
 *
 * @example
 * const primayBase: CssVarName = "--primary-base";
 */
export type CssVarName = `--${string}`;

/**
 * A CSS Variable rule declaration
 *
 * @example
 * const primaryBaseName: CssVarName = "--primary-base";
 * const primaryBaseColor: HexColor = "#467861"
 * const primaryBaseRule: CssVar = "--primary-base: #467861;"
 */
export type CssVar<TValue extends string> = `${CssVarName}: ${TValue};`;

/**
 * A CSS Variable usage
 *
 * @example
 * const primaryBaseName: CssVarName = "--primary-base";
 * const primaryBaseUsage: CssVarUsage = "var(--primary-base)"
 */
export type CssVarUsage = `var(${CssVarName})`;

/**
 * A CSS relative RGBA color
 *
 * @example
 * const primaryBaseName: CssVarName = "--primary-base";
 * const alpha = 0.73;
 * const primaryBaseRelativeAlpha = `rgb(from var(--${primaryBaseName}) r g b / ${alpha})`
 */
export type CssRelativeRgbaColor = `rgb(from ${CssVarUsage} r g b / ${number})`;

/**
 * A CSS light-dark() function type that takes light and dark color values
 *
 * @template TLightColor - The color value to use in light mode
 * @template TDarkColor - The color value to use in dark mode
 *
 * @example
 * const color: CssLightDark<"#fff", "#000"> = "light-dark(#fff, #000)";
 */
export type CssLightDark<
  TLightColor extends AnyColorStr,
  TDarkColor extends AnyColorStr,
> = `light-dark(${TLightColor}, ${TDarkColor})`;

/**
 * A CSS rgb() function that takes a color value and extracts its RGB components with an alpha value
 *
 * @template TFromColor - The color value to extract RGB components from, can be a color string or CSS variable
 *
 * @example
 * const color: CssRgbFrom<"#467861"> = "rgb(from #467861 r g b / 0.5)";
 * const varColor: CssRgbFrom<"var(--primary-base)"> = "rgb(from var(--primary-base) r g b / 0.8)";
 */
export type CssRgbFrom<TFromColor extends AnyColorStr | CssVarUsage> =
  `rgb(from ${TFromColor} r g b / ${number})`;

/**
 * A CSS rectangular color space
 *
 * @example
 * const color: CssRectangularColorSpace = "srgb";
 */
export type CssRectangularColorSpace =
  | "srgb"
  | "srgb-linear"
  | "display-p3"
  | "a98-rgb"
  | "prophoto-rgb"
  | "rec2020"
  | "lab"
  | "oklab"
  | "xyz"
  | "xyz-d50"
  | "xyz-d65";

/**
 * A CSS polar color space
 *
 * @example
 * const color: CssPolarColorSpace = "hsl";
 */
export type CssPolarColorSpace = "hsl" | "hwb" | "lch" | "oklch";

/**
 * A CSS color space
 *
 * @example
 * const color: CssColorSpace = "srgb";
 */
export type CssColorSpace = CssRectangularColorSpace | CssPolarColorSpace;

/**
 * A CSS color-mix() function
 *
 * @remarks
 * This type should support any CSS color string representantation,
 * but currently only supports RGBA color strings and CSS variables, since adding more whould result in excessive type complexity.
 *
 * @example
 * const color: CssColorMix = "color-mix(in srgb, #467861, #467861 50%)";
 */
export type CssColorMix =
  | `color-mix(in ${CssColorSpace}, ${RgbaColorStr | CssVarUsage | string}, ${RgbaColorStr | CssVarUsage | string})`
  | `color-mix(in ${CssColorSpace}, ${RgbaColorStr | CssVarUsage | string} ${CssPercent}, ${RgbaColorStr | CssVarUsage | string})`
  | `color-mix(in ${CssColorSpace}, ${RgbaColorStr | CssVarUsage | string}, ${RgbaColorStr | CssVarUsage | string} ${CssPercent})`
  | `color-mix(in ${CssColorSpace}, ${RgbaColorStr | CssVarUsage | string} ${CssPercent}, ${RgbaColorStr | CssVarUsage | string} ${CssPercent})`;
