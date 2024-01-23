import type { CssPx, CssRem } from "@/types";

const REM_FACTOR = 16 as const;

export const cssPx = (px: number): CssPx => `${px}px`;

export const cssRem = (rem: number): CssRem => `${rem}rem`;

export const pxToRem = (px: number): number => px / REM_FACTOR;

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
