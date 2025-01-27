import { VoidFn, isFloat, isNumber } from "@ubloimmo/front-util";

import { UNIT_PX } from "@types";
import {
  cssPxToCssRem,
  cssRem,
  cssVarName,
  extractRem,
  isCssPx,
  isCssRem,
  isSpacingLabel,
  remToPx,
} from "@utils";

import type { CssRem, FixedCssLength, SpacingLabel } from "@types";

/**
 * Parses a fixed CSS length and returns a CssRem value.
 *
 * @remarks all number values are interpreted as rems.
 *
 * @param {FixedCssLength} length - The length to be parsed.
 * @param {VoidFn<[unknown]>} [warn] - An optional warning function.
 * @return {CssRem} The parsed CssRem value.
 */
export const parseFixedLength = (
  length: FixedCssLength,
  warn?: VoidFn<[unknown]>,
): CssRem => {
  if (isSpacingLabel(length)) {
    const propValue = getComputedStyle(
      document.documentElement,
    ).getPropertyValue(cssVarName(length));
    // use rem is available
    if (isCssRem(propValue)) return propValue;
    if (length === ("s-05" as SpacingLabel))
      // compute rem when variables have not yet loaded
      return cssRem(0.125);
    let sizeMultiplier = Number(length.split("s-")[1]);
    if (isNaN(sizeMultiplier)) {
      if (warn)
        warn(`unsupported length (${length}) provided, defaulting to 1rem`);
      return cssRem(1);
    }

    if (isFloat(sizeMultiplier)) {
      if (warn)
        warn(
          `unsupported length (${length}) provided, removing decimal from float spacing label`,
        );
      sizeMultiplier = Math.floor(sizeMultiplier);
    }
    return cssRem(sizeMultiplier / UNIT_PX);
  }
  if (isCssPx(length)) {
    return cssPxToCssRem(length);
  }
  if (isNumber(length)) return cssRem(length);
  return length;
};

/**
 * Parses a fixed CSS length to pixels using {@link parseFixedLength}.
 *
 * @remarks all number values are interpreted as rems.
 *
 * @param {FixedCssLength} length - The CSS length to convert.
 * @param {VoidFn<[unknown]>} [warn] - An optional warning function.
 * @return {number} The converted length in pixels.
 */
export const parseFixedLengthToPx = (
  length: FixedCssLength,
  warn?: VoidFn<[unknown]>,
): number => {
  return remToPx(extractRem(parseFixedLength(length, warn)));
};
