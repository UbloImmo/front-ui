import { useCallback, useMemo, useReducer, useRef, useState } from "react";

import { BooleanOperators } from "../../List.enums";
import {
  filterData,
  filterOptionData,
  filterOptionDividerData,
  filterOptionMatch,
  filterPresetData,
  type FilterBooleanOperator,
  type FilterConfig,
  type FilterData,
  type FilterOptionData,
  type FilterOptionMap,
  type FilterOptionMatch,
  type FilterPresetData,
  type ListConfigFilterFn,
  type ListConfigFilterFnParams,
  type ListConfigFilterPresetFn,
  type ListConfigFilterPresetFnParams,
  type ListConfigMatchesFn,
  type ListConfigMatchFn,
  type ListConfigMatchFnParams,
  type ListConfigNotFn,
  type ListConfigOptionFn,
  type ListConfigOptionsFn,
  type UseDataProviderFn,
} from "../../modules";
import { invertMatchComparison } from "../../modules/FilterOption/FilterOption.utils";
import {
  listConfigFilterPresetReducer,
  listConfigFilterReducer,
} from "../ListContext.utils";
import { useListConfigAsync } from "./ListContext.searchConfig";

import { mergeDefaultProps, useUikitTranslation } from "@utils";

import type {
  HydrateFilterConfigFn,
  ListConfigOptionDividerFn,
  ListConfigSearchParams,
  ListContextConfig,
  UseListConfig,
  UseListConfigReturn,
} from "../ListContext.types";

/**
 * Hook that manages the list config by exposing callbacks that create & register filter options, filters & filter presets
 *
 * @param {UseDataProviderFn<TItem>} dataProvider - The data provider to use
 * @returns {UseListConfigReturn<TItem>} Object containing the list config & callbacks to further configure the list
 */
export const useListConfig: UseListConfig = <TItem extends object>(
  dataProvider: UseDataProviderFn<TItem>
): UseListConfigReturn<TItem> => {
  const nextFilterIndex = useRef(0);

  const incrementFilterIndex = useCallback(() => {
    nextFilterIndex.current += 1;
  }, []);

  const tl = useUikitTranslation();

  const hydrateFilterConfig = useCallback<HydrateFilterConfigFn>(
    (config?: FilterConfig): FilterConfig => {
      const indexedConfig = config
        ? {
            ...config,
            index: config.index ?? nextFilterIndex.current,
          }
        : {
            index: nextFilterIndex.current,
          };
      incrementFilterIndex();
      return {
        ...indexedConfig,
        emptyLabel: indexedConfig.emptyLabel ?? tl.status.all(),
      };
    },
    [incrementFilterIndex, tl.status]
  );

  const [optionsMap, registerOption] = useReducer(
    (map: FilterOptionMap<TItem>, option: FilterOptionData<TItem>) => {
      const copy = new Map(map);
      copy.set(option.signature, option);
      return copy;
    },
    new Map()
  );

  const [filtersMap, dispatchFilterAction] = useReducer(
    listConfigFilterReducer,
    new Map()
  );

  const registerFilter = useCallback(
    (filter: FilterData) => {
      dispatchFilterAction(["register", filter]);
    },
    [dispatchFilterAction]
  );

  const updateFilter = useCallback(
    (filter: FilterData) => {
      dispatchFilterAction(["update", filter]);
    },
    [dispatchFilterAction]
  );

  const [filterPresetsMap, dispatchFilterPresetAction] = useReducer(
    listConfigFilterPresetReducer,
    new Map()
  );

  const registerFilterPreset = useCallback(
    (preset: FilterPresetData) => {
      dispatchFilterPresetAction(["register", preset]);
    },
    [dispatchFilterPresetAction]
  );

  const updateFilterPreset = useCallback(
    (preset: FilterPresetData) => {
      dispatchFilterPresetAction(["update", preset]);
    },
    [dispatchFilterPresetAction]
  );

  const [operator, setOperator] = useState<FilterBooleanOperator>(
    BooleanOperators.AND
  );

  /**
   * Creates a match from the provided data
   *
   * @param {FilterProperty<TItem>} property - The property to create the match from
   * @param {FilterComparisonOperator} comparison - The comparison operator to create the match from
   * @param {FilterOptionValue} value - The value to create the match from
   * @returns {FilterOptionMatch<TItem>} The created match
   */
  const match = useCallback<ListConfigMatchFn<TItem>>(
    (...params: ListConfigMatchFnParams<TItem>): FilterOptionMatch<TItem> => {
      return filterOptionMatch(...params);
    },
    []
  );

  /**
   * Creates matches from the provided data
   *
   * @param {FilterProperty<TItem>} property - The property to create matches from
   * @param {FilterComparisonOperator} comparison - The comparison operator to create matches from
   * @param {FilterOptionValue[]} values - The values to create matches from
   * @returns {FilterOptionMatch<TItem>[]} The created matches
   */
  const matches = useCallback<ListConfigMatchesFn<TItem>>(
    (property, comparison, values) => {
      return values.map((value) => match(property, comparison, value));
    },
    [match]
  );

  /**
   * Negates a match
   *
   * @param {FilterOptionMatch<TItem>} match - The match to negate
   * @returns {FilterOptionMatch<TItem>} The negated match
   */
  const not = useCallback<ListConfigNotFn<TItem>>(
    ({ property, comparison, value }) => {
      return {
        property,
        comparison: invertMatchComparison(comparison),
        value,
      };
    },
    []
  );

  /**
   * Creates & registers a filter option from the provided data
   *
   * @param {string} label - The label of the generated filter option
   * @param {FilterOptionMatch<TItem>} matchOrMatches - The match or matches to create the filter option from
   * @param {FilterOptionConfig} [config = {}] - The config of the generated filter option, gets merged with the shared config
   * @returns {FilterOptionData<TItem>} The created filter option
   */
  const option = useCallback<ListConfigOptionFn<TItem>>((...params) => {
    const optionData = filterOptionData<TItem>(...params);
    registerOption(optionData);
    return optionData;
  }, []);

  /**
   * Creates a filter option divider from the provided data
   *
   * @param {string} label - The label of the generated filter option divider
   * @returns {FilterOptionDividerData} The created filter option divider
   */
  const divider = useCallback<ListConfigOptionDividerFn>(
    filterOptionDividerData,
    []
  );

  /**
   * Creates & registers filter options from the provided data
   *
   * @param {FilterProperty<TItem>} property - The property to create filter options from
   * @param {FilterComparisonOperator} comparison - The comparison operator to create filter options from
   * @param {ListConfigOptionLabeledValue[]} labeledValues - The labeled values to create filter options from
   * @param {FilterOptionConfig} [sharedConfig = {}] - The shared config of the generated filter options, gets merged with the config of each option
   * @returns {FilterOptionData<TItem>[]} The created filter options
   */
  const options = useCallback<ListConfigOptionsFn<TItem>>(
    (property, comparison, labeledValues, sharedConfig = {}) => {
      return labeledValues.map(({ label, value, config }) => {
        return option(
          label,
          match(property, comparison, value),
          mergeDefaultProps(sharedConfig, config)
        );
      });
    },
    [match, option]
  );

  /**
   * Creates & registers a filter from the provided data
   *
   * @param {string} label - The label of the generated filter
   * @param {MaybePromise<MaybePromise<FilterOptionDataOrSignature<TItem> | FilterOptionDividerData>[]>} optionsOrSignatures - The options or signatures to create the filter from, can be a promise of an array of promises
   * @param {FilterConfig} [config = {}] - The config of the generated filter, gets merged with the shared config
   * @returns {FilterData} The created filter
   */
  const filter = useCallback<ListConfigFilterFn<TItem>>(
    (
      ...[label, optionsOrSignatures, config]: ListConfigFilterFnParams<TItem>
    ): FilterData => {
      const hydrated = hydrateFilterConfig(config);
      const data = filterData<TItem>(label, optionsOrSignatures, hydrated);
      registerFilter(data);
      return data;
    },
    [hydrateFilterConfig, registerFilter]
  );

  /**
   * Creates & registers a filter preset from the provided data
   *
   * @param {string} label - The label of the generated filter preset
   * @param {MaybePromise<MaybePromise<FilterOptionDataOrSignature<TItem>>[]>} optionsOrSignatures - The options or signatures to create the filter preset from, can be a promise of an array of promises
   * @param {FilterPresetConfig} [config = {}] - The config of the generated filter preset, gets merged with the shared config
   * @returns {FilterPresetData} The created filter preset
   */
  const filterPreset = useCallback<ListConfigFilterPresetFn<TItem>>(
    (...params: ListConfigFilterPresetFnParams<TItem>): FilterPresetData => {
      const presetData = filterPresetData<TItem>(...params);
      registerFilterPreset(presetData);
      return presetData;
    },
    [registerFilterPreset]
  );

  const async = useListConfigAsync<TItem>(
    match,
    registerOption,
    registerFilter,
    updateFilter,
    registerFilterPreset,
    updateFilterPreset,
    hydrateFilterConfig
  );

  const [searchParams, configureSearchParams] =
    useState<ListConfigSearchParams>({
      sync: false,
      readParams: null,
      writeParams: null,
    });

  /**
   * A reactive, valid list config object
   */
  const config = useMemo<Required<ListContextConfig<TItem>>>(() => {
    const optionsList = Array.from(optionsMap.values());
    const filtersList = Array.from(filtersMap.values()).sort(
      (a, b) => a.index - b.index
    );
    const filterPresetsList = Array.from(filterPresetsMap.values());

    return {
      filters: filtersList,
      options: optionsList,
      filterPresets: filterPresetsList,
      searchParams,
      useDataProvider: dataProvider,
      operator,
    };
  }, [
    optionsMap,
    filtersMap,
    filterPresetsMap,
    searchParams,
    dataProvider,
    operator,
  ]);

  return {
    config,
    async,
    match,
    matches,
    not,
    divider,
    option,
    options,
    filter,
    filterPreset,
    setOperator,
    configureSearchParams,
  };
};
