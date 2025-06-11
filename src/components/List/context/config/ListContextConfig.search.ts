import { useCallback, useMemo, useState } from "react";

import {
  ListSearchConfigSetterFns,
  type ListSearchConfig,
  type ListSearchConfigDebounceDelaySetterFn,
  type ListSearchConfigInitialQuerySetterFn,
  type ListSearchConfigPropertiesSetterFn,
  type ListSearchConfigSearchAsOptionsSetterFn,
  type ListSearchConfigSetterFn,
  type ListSearchConfigStrategySetterFn,
  type UseListSearchConfig,
} from "../ListContext.types";

import { mergeDefaultProps, useStatic } from "@utils";

/**
 * Generates a typed default search config
 *
 * @template {object} TItem - The type of the item to search
 * @returns {Required<ListSearchConfig<TItem>>} The default search config
 */
const defaultSearchConfig = <TItem extends object>(): Required<
  ListSearchConfig<TItem>
> => ({
  initialQuery: null,
  strategy: "contains",
  properties: [],
  debounceDelay: 500,
  searchAsOptions: true,
});

/**
 * Hook that manages the list's search configuration by exposing setters to update the search config
 *
 * @template {object} TItem - The type of the item to search
 * @returns {UseListSearchConfigReturn<TItem>} Object containing the search config & setters to update it
 */
export const useListConfigSearch: UseListSearchConfig = <
  TItem extends object,
>() => {
  /**
   * Default search configuration for the list
   */
  const defaults = useStatic(defaultSearchConfig<TItem>);

  /**
   * State containing the current search configuration
   */
  const [searchConfig, setSearchConfig] =
    useState<Required<ListSearchConfig<TItem>>>(defaults);

  /**
   * Sets the entire search configuration at once
   *
   * @param {ListSearchConfig<TItem>} config - The new search configuration
   */
  const set = useCallback<ListSearchConfigSetterFn<TItem>>(
    (config = defaults) => setSearchConfig(mergeDefaultProps(defaults, config)),
    [defaults]
  );

  /**
   * Updates just the searchable properties in the configuration
   *
   * @param {FilterProperty<TItem>[]} properties - The new searchable properties
   */
  const properties = useCallback<ListSearchConfigPropertiesSetterFn<TItem>>(
    (properties = defaults.properties) => set({ properties }),
    [defaults.properties, set]
  );

  /**
   * Updates just the search strategy in the configuration
   *
   * @param {ListSearchStrategy} strategy - The new search strategy
   */
  const strategy = useCallback<ListSearchConfigStrategySetterFn>(
    (strategy = defaults.strategy) => set({ strategy }),
    [defaults.strategy, set]
  );

  /**
   * Updates just the initial query in the configuration
   *
   * @param {Nullable<string>} initialQuery - The new initial query
   */
  const initialQuery = useCallback<ListSearchConfigInitialQuerySetterFn>(
    (initialQuery = defaults.initialQuery) => set({ initialQuery }),
    [defaults.initialQuery, set]
  );

  /**
   * Updates just the debounce delay in the configuration
   *
   * @param {number} debounceDelay - The new debounce delay
   */
  const debounceDelay = useCallback<ListSearchConfigDebounceDelaySetterFn>(
    (debounceDelay = defaults.debounceDelay) => set({ debounceDelay }),
    [defaults.debounceDelay, set]
  );

  /**
   * Updates just the search as options in the configuration
   *
   * @param {boolean} searchAsOptions - Whether the search query should be sent as bespoke options to the data provider
   */
  const searchAsOptions = useCallback<ListSearchConfigSearchAsOptionsSetterFn>(
    (searchAsOptions = defaults.searchAsOptions) => set({ searchAsOptions }),
    [defaults.searchAsOptions, set]
  );

  /**
   * Memoized object containing all the setter functions
   */
  const setters = useMemo<ListSearchConfigSetterFns<TItem>>(
    () => ({
      set,
      properties,
      strategy,
      initialQuery,
      debounceDelay,
      searchAsOptions,
    }),
    [set, properties, strategy, initialQuery, debounceDelay, searchAsOptions]
  );

  return { searchConfig, setters };
};
