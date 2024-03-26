import type { CssRem, FixedCssLength, SpacingLabel } from "@types";
import { UNIT_PX } from "@types";
import { VoidFn, isFloat, isNumber } from "@ubloimmo/front-util";
import {
  cssVarName,
  isSpacingLabel,
  isCssRem,
  cssRem,
  isCssPx,
  cssPxToCssRem,
} from "@utils";

export const parseFixedLength = (
  length: FixedCssLength,
  warn?: VoidFn<[unknown]>
): CssRem => {
  if (isSpacingLabel(length)) {
    const propValue = getComputedStyle(
      document.documentElement
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
          `unsupported length (${length}) provided, removing decimal from float spacing label`
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
