import { isString } from "@ubloimmo/front-util";

import type { FilterOptionDividerData } from "./FilterOptionDivider.types";

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
