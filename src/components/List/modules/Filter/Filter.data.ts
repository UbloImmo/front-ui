import {
  computeFilterDataSignature,
  separateOptionsAndDividers,
} from "./Filter.utils";
import { BooleanOperators } from "../../List.enums";

import { mergeDefaultProps } from "@utils";

import type {
  FilterConfig,
  FilterData,
  ListConfigFilterFnParams,
} from "./Filter.types";

const defaultStaticFilterConfig: Required<Omit<FilterConfig, "testId" | "id">> =
  {
    disabled: false,
    hidden: false,
    multi: true,
    operator: BooleanOperators.OR,
    emptyLabel: null,
    allowCompleteSelection: false,
    noResultsIfInactive: false,
    index: 0,
    optionsSort: "none",
  };

/**
 * Creates filter data from the given parameters
 *
 * @template {object} TItem - The type of items being filtered
 * @param {string} [label="[MISSING FILTER LABEL]"] - The label of the filter
 * @param {(FilterSignature | FilterOptionData<TItem> | FilterOptionDividerData)[]} optionOrSignatures - The filter options or their signatures
 * @param {FilterConfig} [config={}] - Configuration options for the filter
 * @param {boolean} [loading=false] - Whether the filter is in a loading state
 * @returns {FilterData} The constructed filter data object
 */
export const filterData = <TItem extends object>(
  ...[
    label = "[MISSING FILTER LABEL]",
    optionOrSignatures = [],
    config = {},
    loading = false,
  ]: ListConfigFilterFnParams<TItem>
): FilterData => {
  const staticConfig = mergeDefaultProps(defaultStaticFilterConfig, config);

  const operator = config.operator ?? BooleanOperators.OR;
  const { optionSignatures, optionDividers } =
    separateOptionsAndDividers(optionOrSignatures);
  const signature = computeFilterDataSignature(
    label,
    optionSignatures,
    operator
  );
  const id = config.id ?? signature;
  const testId = config.testId ?? `list-filter-${id}`;
  return {
    label,
    optionSignatures,
    optionDividers,
    signature,
    id,
    testId,
    loading,
    ...staticConfig,
  };
};
