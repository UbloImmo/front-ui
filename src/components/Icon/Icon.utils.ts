import type { Optional, VoidFn } from "@ubloimmo/front-util";
import type { CssPx, CssRem, FixedCssLength } from "../../types";
import { cssRem, isCssLengthUsage } from "../../utils";
import { useMemo } from "react";
import { parseFixedLength } from "@/sizes/size.utils";

/**
 * Parses an icon's size prop into either a pixel or rem.
 *
 * @param {IconProps["size"]} size - the icon's size prop
 * @param {VoidFn<[unknown]>} warn - logger warn method
 * @returns {CssRem} - The parsed icon's size;
 */
const parseIconSize = (
  size: Optional<FixedCssLength>,
  warn: VoidFn<[unknown]>
): CssRem => {
  if (!isCssLengthUsage(size)) {
    warn(`unsupported size (${size}) provided`);
    return cssRem(1);
  }

  return parseFixedLength(size, warn);
};

/**
 * Sanitizes an icon's size prop into either a pixel or rem using {@link parseIconSize}
 *
 * @param {IconProps["size"]} size - the icon's size prop
 * @param {VoidFn<[unknown]>} warn - logger warn method
 * @returns {CssPx | CssRem} - The parsed icon's size;
 */
export const useIconSize = (
  size: Optional<FixedCssLength>,
  warn: VoidFn<[unknown]>
): CssPx | CssRem => {
  return useMemo(() => {
    return parseIconSize(size, warn);
  }, [size, warn]);
};
