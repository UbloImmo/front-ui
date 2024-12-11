import { isObject, isString } from "@ubloimmo/front-util";

import type {
  FilterOptionDivider,
  FilterOptionDividerData,
} from "./FilterOptionDivider.types";

export const isFilterOptionDividerData = (
  item: unknown
): item is FilterOptionDividerData => {
  return (
    isObject(item) &&
    "kind" in item &&
    item.kind === "divider" &&
    "label" in item &&
    isString(item.label)
  );
};

export const isFilterOptionDivider = (
  item: unknown
): item is FilterOptionDivider => {
  return (
    isFilterOptionDividerData(item) &&
    "index" in item &&
    "signature" in item &&
    isString(item.signature)
  );
};
