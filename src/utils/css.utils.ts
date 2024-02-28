import {
  type CssPx,
  type CssRem,
  type CssVarName,
  type CssVar,
  type CssVarUsage,
  type CssLength,
  type CssLengthUsage,
  type CssFr,
  type SpacingLabel,
  SPACING_PREFIX,
} from "../types";
import { isNumber, isString, isUndefined } from "@ubloimmo/front-util";

export const REM_FACTOR = 16 as const;

/**
 * Converts a number value to a value in pixels.
 *
 * @param {number} px - the value in numbers to be converted to css pixels
 * @return {CssPx} the converted value in css pixels
 */
export const cssPx = (px: number): CssPx => `${px}px`;

/**
 * Converts a number value to a value in rems.
 *
 * @param {number} rem - the value in numbers to be converted to css rems
 * @return {CssRem} the converted value in css rems
 */
export const cssRem = (rem: number): CssRem => `${rem}rem`;

/**
 * Converts a value in number pixels to a value in number rems.
 *
 * @param {number} px - the value in number pixels to be converted to number rems
 * @return {number} the converted value in numbers rems
 */
export const pxToRem = (px: number): number => px / REM_FACTOR;

/**
 * Converts a value in number rems to a value in number pixels.
 *
 * @param {number} rem - the value in number rems to be converted to number pixels
 * @return {number} the converted value in numbers pixels
 */
export const remToPx = (rem: number): number => rem * REM_FACTOR;

/**
 * Extracts the numerical value from a CSS length value in pixels.
 *
 * @param {CssPx} cssPx - the CSS length value in pixels
 * @return {number} the numerical value extracted from the CSS length value
 */
export const extractPx = (cssPx: CssPx): number =>
  parseFloat(cssPx.split("px")[0]);

/**
 * Extracts the numerical value from a CSS rem unit and returns it as a number.
 *
 * @param {CssRem} cssRem - a string representing a CSS rem unit
 * @return {number} the numerical value extracted from the CSS rem unit
 */
export const extractRem = (cssRem: CssRem): number =>
  parseFloat(cssRem.split("rem")[0]);

/**
 * Converts a value in pixels to a value in rems using the provided utility functions.
 *
 * @param {CssPx} cssPx - the value in pixels to be converted to rems
 * @return {CssRem} the converted value in rems
 */
export const cssPxToCssRem = (cssPx: CssPx): CssRem =>
  cssRem(pxToRem(extractPx(cssPx)));

/**
 * Convert a value from CSS rem units to CSS px units.
 *
 * @param {CssRem} cssRem - the value in CSS rem units
 * @return {CssPx} the value in CSS px units
 */
export const cssRemToCssPx = (cssRem: CssRem): CssPx =>
  cssPx(remToPx(extractRem(cssRem)));

/**
 * Predicate that checks if the given value is a CSS pixel value.
 *
 * @param {unknown} value - The value to be checked.
 * @return {boolean} Whether the value is a CSS pixel value.
 */
export const isCssPx = (value: unknown): value is CssPx => {
  if (!isString(value) || !value.includes("px") || isNaN(parseFloat(value))) {
    return false;
  }
  return true;
};

/**
 * Predicate that checks if the input value is a CSS rem value.
 *
 * @param {unknown} value - the value to be checked
 * @return {boolean} true if the input value is a CSS rem value, false otherwise
 */
export const isCssRem = (value: unknown): value is CssRem => {
  if (!isString(value) || !value.includes("rem") || isNaN(parseFloat(value))) {
    return false;
  }
  return true;
};

/**
 * Generates a CSS variable name by prefixing the input name with '--'.
 *
 * @param {string} name - The input name for the CSS variable
 * @return {CssVarName} The generated CSS variable name
 */
export const cssVarName = (name: string): CssVarName => `--${name}`;

/**
 * Returns a CSS variable declaration with the provided name and value.
 *
 * @template {string} TValue - the type of the Css variable's value
 * @param {string} name - the name of the CSS variable
 * @param {TValue} value - the value of the CSS variable
 * @return {CssVar<TValue>} the CSS variable declaration
 */
export const cssVar = <TValue extends string = string>(
  name: string,
  value: TValue
): CssVar<TValue> => `${cssVarName(name)}: ${value};`;

/**
 * Returns a CSS variable usage with the provided name.
 *
 * @param {string} name - the name of the CSS variable
 * @return {CssVarUsage} the usage of the CSS variable
 */
export const cssVarUsage = (name: string): CssVarUsage =>
  `var(${cssVarName(name)})`;

/**
 * Returns a {@link CssFr} string with the given number.
 *
 * @param {number} fr - The number to be concatenated with 'fr'.
 * @return {CssFr} The string with the concatenated number and 'fr' unit.
 */
export const cssFr = (fr: number): CssFr => {
  return `${fr}fr`;
};

/**
 * Type guard to check if the input value is of type {@link CssFr}.
 *
 * @param {unknown} value - The value to be checked
 * @return {boolean} Whether the input value is of type CssFr
 */
export const isCssFr = (value: unknown): value is CssFr => {
  if (!isString(value) || !value.includes("fr")) {
    return false;
  }
  const frValue = parseFloat(value.split("fr")[0]);
  if (isNaN(frValue)) return false;

  return true;
};

/**
 * Checks if the given value is a {@link SpacingLabel} by validating its format and scale.
 *
 * @param {unknown} value - the value to be checked
 * @return {boolean} true if the value is a {@link SpacingLabel}, false otherwise
 */
export const isSpacingLabel = (value: unknown): value is SpacingLabel => {
  if (!isString(value) || !value.startsWith(SPACING_PREFIX)) return false;

  const scaleStr = value.split(SPACING_PREFIX)[1];
  if (isUndefined(scaleStr)) return false;
  const scale = parseInt(scaleStr);

  if (isNaN(scale)) return false;

  return true;
};

/**
 * Parses an input {@link CssLength} into its corresponding {@link CssLengthUsage}.
 *
 * @remarks number values are converted to rem values, spacings labels are converted to their corresponding {@link CssVarUsage}
 *
 * @param {CssLength} gap - the flex gap value to be processed
 * @return {CssLengthUsage} the processed CSS value
 */
export const cssLengthUsage = (gap: CssLength): CssLengthUsage => {
  if (isNumber(gap)) {
    return cssRem(gap);
  }
  if (isCssPx(gap) || isCssRem(gap)) {
    return gap;
  }
  if (isSpacingLabel(gap)) {
    return cssVarUsage(gap);
  }
  return gap;
};
