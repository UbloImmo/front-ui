import { isFunction, type Optional, type VoidFn } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { parseFixedLength } from "@/sizes/size.utils";
import { cssRem, isCssLengthUsage } from "@utils";

import type { GeneratedIcon, IconName, MissingIcon } from "./Icon.types";
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
  warn: VoidFn<[unknown]>,
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
  warn: VoidFn<[unknown]>,
): CssPx | CssRem => {
  return useMemo(() => {
    return parseIconSize(size, warn);
  }, [size, warn]);
};

/**
 * Loads an icon based on the provided name, trying different locations and types of icons.
 *
 * @param {IconName} name - The name of the icon to load.
 * @param {VoidFn<[unknown]>} warn - A function to call in case of a warning or failure during icon loading.
 * @return {Promise<{ default: GeneratedIcon | MissingIcon }>} The loaded icon or a missing icon placeholder.
 */
export const loadIcon = async (
  name: IconName,
  warn: VoidFn<[unknown]>,
): Promise<{ default: GeneratedIcon | MissingIcon }> => {
  const missingIcon: MissingIcon = () => <div />;
  missingIcon.__missing = true;
  const missingImport = { default: missingIcon };

  // Try loading icon in a targeted way to enable tree shaking
  try {
    // try as custom icon
    const { [name]: customIcon } = await import(
      `./__generated__/custom/${name}.icon.tsx`
    );
    if (customIcon && isFunction<GeneratedIcon>(customIcon))
      return { default: customIcon };
  } catch (_e) {
    // fail silently
  }
  // then try as bootstrap icon
  try {
    const { [name]: bootstrapIcon } = await import(
      `./__generated__/bootstrap/${name}.icon.tsx`
    );
    // finally using generated icon index
    if (bootstrapIcon && isFunction<GeneratedIcon>(bootstrapIcon))
      return { default: bootstrapIcon };
  } catch (_e) {
    // fail silently
  }
  try {
    const { [name]: anyIcon } = await import(`./__generated__`);
    // finally using generated icon index
    if (anyIcon && isFunction<GeneratedIcon>(anyIcon))
      return { default: anyIcon };
  } catch (_e) {
    // flag return import as missing
    warn(`Failed to import icon "${name}"`);
    return missingImport;
  }
  warn(`Failed to import icon "${name}"`);
  return missingImport;
};

/**
 * Type guard to check if an icon is a missing icon placeholder.
 *
 * @param {GeneratedIcon | MissingIcon} icon - The icon component to check
 * @returns {boolean} True if the icon is a missing icon placeholder, false otherwise
 */
export const isMissingIcon = (
  icon: GeneratedIcon | MissingIcon,
): icon is MissingIcon => {
  return "__missing" in icon && icon.__missing;
};
