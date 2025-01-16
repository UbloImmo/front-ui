import { isString } from "@ubloimmo/front-util";

import type { FilterOptionDividerData } from "./FilterOptionDivider.types";

/**
 * Creates a filter option divider data object
 *
 * @param {string} label - The label for the filter option divider
 * @returns {FilterOptionDividerData} The filter option divider data object
 */
export const filterOptionDividerData = (
  label: string
): FilterOptionDividerData => {
  if (!isString(label)) {
    console.error("Missing label for filter option divider");
    label = "[DIVIDER]";
  }

  const kind = "divider";

  return {
    kind,
    label,
  };
};
