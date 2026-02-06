import {
  type Nullable,
  type Nullish,
  type Optional,
  type VoidFn,
} from "@ubloimmo/front-util";
import { useMemo, type LazyExoticComponent } from "react";

import { parseFixedLength } from "@/sizes/size.utils";
import { cssRem, isCssLengthUsage } from "@utils";

import type { GeneratedIcon, MissingIcon } from "./Icon.types";
import type { CssPx, CssRem, FixedCssLength } from "@types";

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

/**
 * Type guard to check if an icon is a missing icon placeholder.
 *
 * @param {Nullish<GeneratedIcon | MissingIcon>} icon - The icon component to check
 * @returns {boolean} True if the icon is a missing icon placeholder, false otherwise
 */
export const isMissingIcon = (
  icon: Nullish<
    LazyExoticComponent<GeneratedIcon | MissingIcon> | GeneratedIcon
  >
): icon is LazyExoticComponent<MissingIcon> => {
  return Boolean(!icon || ("__missing" in icon && icon.__missing));
};

export const isGeneratedIcon = (
  icon: Nullable<
    | LazyExoticComponent<GeneratedIcon>
    | LazyExoticComponent<MissingIcon>
    | GeneratedIcon
  >
): icon is LazyExoticComponent<GeneratedIcon> => {
  return Boolean(icon && !isMissingIcon(icon));
};
