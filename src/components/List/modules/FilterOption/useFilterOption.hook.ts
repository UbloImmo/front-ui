import { useMemo } from "react";

import { useStatic, useUikitTranslation } from "@utils";

import { filterOptionData, type FilterOption } from ".";

import type { IFilter } from "../Filter/Filter.types";

export const CLEAR_FILTER_OPTION_SIGNATURE =
  "***INTERNAL***CLEAR_FILTER_OPTION***INTERNAL***";

/**
 * A hook that creates a special filter option used to clear/reset a filter.
 * It creates a base option with "All" text and a dashed circle icon, then
 * overrides its select method to clear the parent filter.
 *
 * @param {IFilter<Record<string, unknown>>} filter - The parent filter that will be cleared
 * @returns {FilterOption<Record<string, unknown>>} A filter option that clears its parent filter when selected
 */
export const useClearFilterOption = (
  filter: IFilter<Record<string, unknown>>
): FilterOption<Record<string, unknown>> => {
  const tl = useUikitTranslation();
  // create the base option once
  const baseOption = useStatic(() =>
    filterOptionData<Record<string, unknown>>(tl.status.all(), [], {
      icon: "CircleDashed",
      color: "gray-600",
    })
  );

  // return the option with the select method overridden to clear the filter,
  // the unselect method overridden to do nothing,
  // and the label and signature overridden to match the clear filter use case
  return useMemo(() => {
    const select = filter.allowCompleteSelection
      ? filter.selectAll
      : filter.clear;
    return {
      ...baseOption,
      select,
      unselect: () => {},
      label: filter.emptyLabel ?? baseOption.label,
      signature: CLEAR_FILTER_OPTION_SIGNATURE,
    };
  }, [
    baseOption,
    filter.allowCompleteSelection,
    filter.clear,
    filter.emptyLabel,
    filter.selectAll,
  ]);
};
