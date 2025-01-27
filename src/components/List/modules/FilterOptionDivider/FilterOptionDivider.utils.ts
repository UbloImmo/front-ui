import { isObject, isString } from "@ubloimmo/front-util";

import type { FilterOptionDividerData } from "./FilterOptionDivider.types";

/**
 * Type guard to check if an unknown value is a FilterOptionDividerData object
 *
 * @param {unknown} item - The value to check
 * @returns {boolean} True if the item is a FilterOptionDividerData object, false otherwise
 */
export const isFilterOptionDividerData = (
  item: unknown,
): item is FilterOptionDividerData => {
  return (
    isObject(item) &&
    "kind" in item &&
    item.kind === "divider" &&
    "label" in item &&
    isString(item.label)
  );
};
