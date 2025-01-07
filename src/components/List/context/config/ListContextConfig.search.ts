import { useCallback, useMemo, useState } from "react";

import {
  ListSearchConfigSetterFns,
  type ListSearchConfig,
  type ListSearchConfigErrorMarginSetterFn,
  type ListSearchConfigInitialQuerySetterFn,
  type ListSearchConfigPropertiesSetterFn,
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
  errorMargin: 0,
  properties: [],
});

/**
 * Hook that manages the list's search configuration by exposing setters to update the search config
 *
 * @template {object} TItem - The type of the item to search
 * @returns {UseListSearchConfigReturn<TItem>} Object containing the search config & setters to update it
 */
export const useListConfigSearch: UseListSearchConfig = <
  TItem extends object
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
   * Updates just the error margin in the configuration
   *
   * @param {number} errorMargin - The new error margin
   */
  const errorMargin = useCallback<ListSearchConfigErrorMarginSetterFn>(
    (errorMargin = defaults.errorMargin) => set({ errorMargin }),
    [defaults.errorMargin, set]
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
   * Memoized object containing all the setter functions
   */
  const setters = useMemo<ListSearchConfigSetterFns<TItem>>(
    () => ({
      set,
      properties,
      strategy,
      errorMargin,
      initialQuery,
    }),
    [set, properties, strategy, errorMargin, initialQuery]
  );

  return { searchConfig, setters };
};
