import { isObject } from "@ubloimmo/front-util";

import { computeFilterPresetSignature } from "./FilterPreset.utils";
import { BooleanOperators } from "../../List.enums";

import {
  mergeDefaultProps,
  normalizeToColorKey,
  normalizeToPaletteColor,
} from "@utils";

import type {
  FilterPresetConfig,
  FilterPresetData,
  ListConfigFilterPresetFnParams,
} from "./FilterPreset.types";
import type { FilterSignature } from "../shared.types";

const defaultFilterPresetStaticConfig: Required<
  Omit<FilterPresetConfig, "id" | "testId">
> = {
  color: "primary",
  disabled: false,
  operator: BooleanOperators.AND,
  hidden: false,
  exclusive: false,
};

/**
 * Creates filter preset data from the given parameters
 *
 * @template {object} TItem - The type of items being filtered
 * @param {string} label - The label of the filter preset
 * @param {Array<FilterOption<TItem> | FilterSignature>} optionsOrSignatures - Array of filter options or signatures to include in the preset
 * @param {FilterPresetConfig} config - Optional configuration for the filter preset
 * @returns {FilterPresetData} The constructed filter preset data
 */
export const filterPresetData = <TItem extends object>(
  ...[
    label,
    optionsOrSignatures = [],
    config = defaultFilterPresetStaticConfig,
    loading = false,
  ]: ListConfigFilterPresetFnParams<TItem>
): FilterPresetData => {
  const mergedConfig = mergeDefaultProps(
    defaultFilterPresetStaticConfig,
    config,
    true
  );
  const optionSignatures: FilterSignature[] = optionsOrSignatures.map(
    (option) => {
      if (isObject(option) && "signature" in option) return option.signature;
      return option;
    }
  );
  const signature = computeFilterPresetSignature(
    label,
    optionSignatures,
    mergedConfig.operator
  );
  const id = config.id ?? signature;
  const testId = config.testId ?? `list-filter-preset-${id}`;
  const paletteColor = normalizeToPaletteColor(mergedConfig.color);
  const colorKey = normalizeToColorKey(mergedConfig.color);

  return {
    ...mergedConfig,
    label,
    id,
    testId,
    optionSignatures,
    signature,
    paletteColor,
    colorKey,
    loading,
  };
};
