import type { IconProps } from "./Icon.types";
import type { VoidFn } from "@ubloimmo/front-util";
import type { SpacingLabel, CssPx, CssRem } from "../../types";
import { UNIT_PX } from "../../types";
import {
  cssVarName,
  isSpacingLabel,
  isCssRem,
  cssRem,
  isCssLenthUsage,
  isCssPx,
  cssPxToCssRem,
} from "../../utils";
import { isInt } from "@ubloimmo/front-util";
import { useMemo } from "react";

/**
 * Parses an icon's size prop into either a pixel or rem.
 *
 * @param {IconProps["size"]} size - the icon's size prop
 * @param {VoidFn<[unknown]>} warn - logger warn method
 * @returns {CssRem} - The parsed icon's size;
 */
const parseIconSize = (
  size: IconProps["size"],
  warn: VoidFn<[unknown]>
): CssRem => {
  if (!isCssLenthUsage(size)) {
    warn(`unsupported size (${size}) provided`);
    return cssRem(1);
  }
  if (isSpacingLabel(size)) {
    const propValue = getComputedStyle(
      document.documentElement
    ).getPropertyValue(cssVarName(size));
    // use rem is available
    if (isCssRem(propValue)) return propValue;
    if (size === ("s-05" as SpacingLabel))
      // compute rem when variables have not yet loaded
      return cssRem(0.125);
    const sizeMultiplier = Number(size.split("s-")[1]);
    // default to 1 if not computable
    if (!isInt(sizeMultiplier)) {
      warn(`unsupported size (${size}) provided`);
      return cssRem(1);
    }
    return cssRem(sizeMultiplier / UNIT_PX);
  }
  if (isCssPx(size)) {
    return cssPxToCssRem(size);
  }
  return size;
};

/**
 * Sanitizes an icon's size prop into either a pixel or rem using {@link parseIconSize}
 *
 * @param {IconProps["size"]} size - the icon's size prop
 * @param {VoidFn<[unknown]>} warn - logger warn method
 * @returns {CssPx | CssRem} - The parsed icon's size;
 */
export const useIconSize = (
  size: IconProps["size"],
  warn: VoidFn<[unknown]>
): CssPx | CssRem => {
  return useMemo(() => {
    return parseIconSize(size, warn);
  }, [size, warn]);
};
