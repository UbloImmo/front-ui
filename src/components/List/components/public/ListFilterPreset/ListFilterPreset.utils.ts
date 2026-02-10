import { useMemo } from "react";

import { useListContext } from "@/components/List/context";
import { filterPresetData, type FilterPreset } from "@/components/List/modules";
import { useLogger } from "@utils";

import type {
  ListFilterPresetProps,
  ListFilterPresetStyleProps,
} from "./ListFilterPreset.types";
import type { Logger } from "@ubloimmo/front-util";

/**
 * Hook to sanitize and handle a filter preset
 *
 * @param {ListFilterPresetProps} props - The filter preset props
 * @param {Logger} logger - Logger instance for warnings
 * @returns {FilterPreset<Record<string, unknown>>} The sanitized filter preset with wrapped callbacks
 */
const useSanitizedFilterPreset = <TItem extends object = object>(
  props: ListFilterPresetProps<TItem>,
  logger: Logger
): FilterPreset<TItem> => {
  const { getFilterPresetBySignature } = useListContext<TItem>();
  /**
   * Memoized filter preset that handles both direct preset and signature-based preset retrieval
   *
   * @returns {FilterPreset<Record<string, unknown>>} The sanitized filter preset
   * - Returns provided filterPreset if it exists
   * - Returns preset found by signature if signature exists
   * - Returns empty disabled preset as fallback
   */
  const sanitizedFilterPreset = useMemo<FilterPreset<TItem>>(() => {
    if (props.filterPreset) return props.filterPreset;
    if (props.signature) {
      const foundFilterPreset = getFilterPresetBySignature(props.signature);
      if (foundFilterPreset) return foundFilterPreset;
    }
    logger.warn(
      "No filter preset or signature provided, defaulting to an empty filter preset"
    );
    const emptyData = filterPresetData<TItem>("[EMPTY FILTER PRESET]", [], {
      disabled: true,
    });
    return {
      ...emptyData,
      select: () => {},
      unselect: () => {},
      toggle: () => {},
      options: [],
      active: false,
      loading: false,
      count: 0,
    };
  }, [props.filterPreset, props.signature, getFilterPresetBySignature, logger]);

  /**
   * Memoized wrapper functions that handle the filter preset's select, unselect, and toggle functions
   *
   * @returns {FilterPreset<Record<string, unknown>>} The sanitized filter preset with wrapped callbacks
   */
  return useMemo<FilterPreset<TItem>>(() => {
    /**
     * Wrapper function that calls the filter preset's select function
     * and the onSelected callback if provided
     */
    const select = () => {
      sanitizedFilterPreset.select();
      if (props.onSelected) props.onSelected();
    };

    /**
     * Wrapper function that calls the filter preset's unselect function
     * and the onUnselected callback if provided
     */
    const unselect = () => {
      sanitizedFilterPreset.unselect();
      if (props.onUnselected) props.onUnselected();
    };

    /**
     * Wrapper function that calls the filter preset's toggle function
     * and the onToggled callback if provided
     */
    const toggle = () => {
      sanitizedFilterPreset.toggle();
      if (props.onToggled) props.onToggled();
    };

    return {
      ...sanitizedFilterPreset,
      select,
      unselect,
      toggle,
    };
  }, [sanitizedFilterPreset, props]);
};

export const useListFilterPreset = <TItem extends object = object>(
  props: ListFilterPresetProps<TItem>
) => {
  const logger = useLogger("ListFilterPreset");
  const filterPreset = useSanitizedFilterPreset(props, logger);

  const styleProps = useMemo<ListFilterPresetStyleProps>(() => {
    const { disabled, active, colorKey } = filterPreset;
    return {
      disabled,
      active,
      colorKey,
    };
  }, [filterPreset]);

  return {
    filterPreset,
    styleProps,
  };
};
