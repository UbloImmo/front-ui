import type { AnyColorStr } from "../themes/color.types";
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
 * - {@link number}: `100`, `200`, `300`, etc...
 */
export type CssLength =
  | SpacingLabel
  | CssRem
  | CssPx
  | CssFr
  | CssPercent
  | CssLengthKeyword
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
 * - {@link CssLengthKeyword}: `auto`, `min-content`, `max-content`, `fit-content`
 */
export type CssLengthUsage =
  | CssPx
  | CssRem
  | CssVarUsage
  | CssFr
  | CssPercent
  | CssLengthKeyword;

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

export type CssLightDark<
  TLightColor extends AnyColorStr,
  TDarkColor extends AnyColorStr,
> = `light-dark(${TLightColor}, ${TDarkColor})`;

export type CssRgbFrom<TFromColor extends AnyColorStr | CssVarUsage> =
  `rgb(from ${TFromColor} r g b / ${number})`;
