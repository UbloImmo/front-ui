import type { CssPx, CssRem } from "@/types";

const REM_FACTOR = 16 as const;

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
export const remToPx = (rem: number) => rem * REM_FACTOR;

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
