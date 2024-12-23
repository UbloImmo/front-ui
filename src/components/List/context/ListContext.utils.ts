import type {
  FilterData,
  FilterDataMap,
  FilterPresetData,
  FilterPresetMap,
} from "../modules";
import type {
  UseListConfigFilterPresetReducerAction,
  UseListConfigFilterReducerAction,
} from "./ListContext.types";
import type { Nullable } from "@ubloimmo/front-util";

/**
 * Finds a filter in the map by its index & label
 *
 * @param {FilterDataMap} map - The map to search in
 * @param {FilterData} filter - The filter to search for
 * @returns {Nullable<FilterData>} The found filter or null if not found
 */
export const findFilterByIndexAndLabel = (
  map: FilterDataMap,
  filter: FilterData
): Nullable<FilterData> => {
  if (!map || !filter) return null;
  return (
    Array.from(map.values()).find(
      ({ index, label }) => index === filter.index && label === filter.label
    ) ?? null
  );
};

/**
 * Reducer function that manages the filters map
 *
 * @param map - The current filters map
 * @param action - The action to perform
 * @returns The new filters map
 */
export const listConfigFilterReducer = (
  map: FilterDataMap,
  [type, filter]: UseListConfigFilterReducerAction
) => {
  const copy = new Map(map);
  // simply add the filter if it's the first time we see it
  if (type === "register") copy.set(filter.signature, filter);
  // update the filter if it's already in the map
  if (type === "update") {
    // find the old filter based on its index & label
    const signature = findFilterByIndexAndLabel(copy, filter)?.signature;
    // delete it if found
    if (signature) copy.delete(signature);
    // add the updated filter
    copy.set(filter.signature, filter);
  }
  return copy;
};

/**
 * Finds a filter preset in the map by its label
 *
 * @param {FilterPresetMap} map - The map to search in
 * @param {FilterPresetData} preset - The filter preset to search for
 * @returns {Nullable<FilterPresetData>} The found filter preset or null if not found
 */
export const findFilterPresetByLabel = (
  map: FilterPresetMap,
  preset: FilterPresetData
): Nullable<FilterPresetData> => {
  if (!map || !preset) return null;
  return (
    Array.from(map.values()).find(({ label }) => label === preset.label) ?? null
  );
};

/**
 * Reducer function that manages the filter presets map
 *
 * @param map - The current filter presets map
 * @param action - The action to perform
 * @returns The new filter presets map
 */
export const listConfigFilterPresetReducer = (
  map: FilterPresetMap,
  [type, preset]: UseListConfigFilterPresetReducerAction
) => {
  const copy = new Map(map);
  // simply add the filter if it's the first time we see it
  if (type === "register") copy.set(preset.signature, preset);
  // update the filter if it's already in the map
  if (type === "update") {
    // find the old filter based on its label
    const signature = findFilterPresetByLabel(copy, preset)?.signature;
    // delete it if found
    if (signature) copy.delete(signature);
    // add the updated filter
    copy.set(preset.signature, preset);
  }
  return copy;
};
