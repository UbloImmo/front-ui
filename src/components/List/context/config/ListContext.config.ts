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
  type FilterOptionDataOrSignature,
  type FilterOptionDividerData,
  type FilterOptionMap,
  type FilterOptionMatch,
  type FilterPresetData,
  type ListConfigAsyncFilterFn,
  type ListConfigAsyncFilterPresetFn,
  type ListConfigAsyncOptionFn,
  type ListConfigAsyncOptionsFn,
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

import { mergeDefaultProps, useLogger, useUikitTranslation } from "@utils";

import type {
  HydrateFilterConfigFn,
  ListConfigOptionDividerFn,
  ListConfigSearchParams,
  ListContextConfig,
  UseListConfig,
  UseListConfigAsync,
  UseListConfigReturn,
} from "../ListContext.types";
import type { MaybePromise } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";

/**
 * Hook that exposes callbacks that create & register filter options, filters & filter presets asynchronously
 *
 * @param {ListConfigMatchFn<TItem>} match - The match function to use
 * @param {VoidFn<[FilterOptionData<TItem>]>} registerOption - The function to register a filter option
 * @param {VoidFn<[FilterData]>} registerFilter - The function to register a filter
 * @param {VoidFn<[FilterData]>} updateFilter - The function to update a filter
 * @param {VoidFn<[FilterPresetData]>} registerFilterPreset - The function to register a filter preset
 * @param {VoidFn<[FilterPresetData]>} updateFilterPreset - The function to update a filter preset
 * @param {HydrateFilterConfigFn} hydrateFilterConfig - The function to hydrate a filter config
 * @returns {UseListConfigAsyncReturn<TItem>} The created filter options, filters & filter presets
 */
const useListConfigAsync: UseListConfigAsync = <TItem extends object>(
  match: ListConfigMatchFn<TItem>,
  registerOption: VoidFn<[FilterOptionData<TItem>]>,
  registerFilter: VoidFn<[FilterData]>,
  updateFilter: VoidFn<[FilterData]>,
  registerFilterPreset: VoidFn<[FilterPresetData]>,
  updateFilterPreset: VoidFn<[FilterPresetData]>,
  hydrateFilterConfig: HydrateFilterConfigFn
) => {
  const logger = useLogger("ListConfigAsync");

  /**
   * Creates & registers a filter option from the provided data
   *
   * @param {string} label - The label of the generated filter option
   * @param {ListConfigAsyncOptionMatchGetterFn<TItem>} matchOrMatchesGetter - An async callback that returns the match or matches to create the filter option from
   * @param {FilterOptionConfig} [config = {}] - The config of the generated filter option, gets merged with the shared config
   * @returns {Promise<FilterOptionData<TItem>>} The created filter option
   * @throws If the async callback throws an error
   */
  const option = useCallback<ListConfigAsyncOptionFn<TItem>>(
    async (label, matchOrMatchesGetter, config = {}) => {
      try {
        const matchOrMatches = await matchOrMatchesGetter();
        const optionData = filterOptionData(label, matchOrMatches, config);
        registerOption(optionData);
        return optionData;
      } catch (error) {
        logger.error(error);
        throw error;
      }
    },
    [logger, registerOption]
  );

  /**
   * Creates & registers filter options from the provided data
   *
   * @param {FilterProperty<TItem>} property - The property to create filter options from
   * @param {FilterComparisonOperator} comparison - The comparison operator to create filter options from
   * @param {ListConfigAsyncOptionsGetLabeledValuesFn} labeledValuesGetter - An async callback that returns the labeled values to create filter options from
   * @param {FilterOptionConfig} [sharedConfig = {}] - The shared config of the generated filter options, gets merged with the config of each option
   * @returns {Promise<FilterOptionData<TItem>[]>} The created filter options or an empty array if an error occurs
   */
  const options = useCallback<ListConfigAsyncOptionsFn<TItem>>(
    async (property, comparison, labeledValuesGetter, sharedConfig = {}) => {
      try {
        const labeledValues = await labeledValuesGetter();
        const optionDatas = labeledValues.map(({ label, value, config }) => {
          const optionData = filterOptionData<TItem>(
            label,
            match(property, comparison, value),
            mergeDefaultProps(sharedConfig, config)
          );
          registerOption(optionData);
          return optionData;
        });
        return optionDatas;
      } catch (error) {
        logger.error(error);
        return [];
      }
    },
    [logger, match, registerOption]
  );

  /**
   * Awaits for the provided options or signatures to load
   *
   * @template TPayload - The type of the options or signatures
   *
   * @param {MaybePromise<MaybePromise<TPayload>[]>} optionsOrSignatures - The options or signatures to await, can be a promise of an array of promises
   * @returns {Promise<TPayload[]>} The loaded options or signatures
   */
  const awaitAsyncOptions = useCallback(
    async <TPayload>(
      optionsOrSignatures: MaybePromise<MaybePromise<TPayload>[]>
    ): Promise<TPayload[]> => {
      return await Promise.all(await optionsOrSignatures);
    },
    []
  );

  /**
   * Creates & registers a filter from an array of asynchronous or synchronous options or signatures
   *
   * @param {string} label - The label of the generated filter
   * @param {MaybePromise<MaybePromise<FilterOptionDataOrSignature<TItem> | FilterOptionDividerData>[]>} optionsOrSignaturesPromise - The options or signatures to create the filter from, can be a promise of an array of promises
   * @param {FilterConfig} [config = {}] - The config of the generated filter, gets merged with the shared config
   * @returns {Promise<Nullable<FilterData>>} The created filter or null if an error occurs
   */
  const filter = useCallback<ListConfigAsyncFilterFn<TItem>>(
    async (label, optionsOrSignaturesPromise, config = {}) => {
      try {
        const hydrated = hydrateFilterConfig(config);
        // store temporary filter data and mark it as loading
        const tempFilterData = filterData<TItem>(label, [], hydrated, true);
        registerFilter(tempFilterData);
        // wait for options to load
        const optionsOrDividers = await awaitAsyncOptions<
          FilterOptionDataOrSignature<TItem> | FilterOptionDividerData
        >(optionsOrSignaturesPromise);
        // create new filter data based on loaded options and config
        const data = filterData<TItem>(label, optionsOrDividers, hydrated);
        // update filter data with loaded options
        updateFilter(data);
        return data;
      } catch (error) {
        logger.error(error);
        return null;
      }
    },
    [
      awaitAsyncOptions,
      hydrateFilterConfig,
      logger,
      registerFilter,
      updateFilter,
    ]
  );

  /**
   * Creates & registers a filter preset from an array of asynchronous or synchronous options or signatures
   *
   * @param {string} label - The label of the generated filter preset
   * @param {MaybePromise<MaybePromise<FilterOptionDataOrSignature<TItem>>[]>} optionsOrSignaturesPromise - The options or signatures to create the filter preset from, can be a promise of an array of promises
   * @param {FilterPresetConfig} [config = {}] - The config of the generated filter preset, gets merged with the shared config
   * @returns {Promise<Nullable<FilterPresetData>>} The created filter preset or null if an error occurs
   */
  const filterPreset = useCallback<ListConfigAsyncFilterPresetFn<TItem>>(
    async (label, optionsOrSignaturesPromise, config = {}) => {
      try {
        // store temporary filter preset data and mark it as loading
        const tempFilterPresetData = filterPresetData<TItem>(
          label,
          [],
          config,
          true
        );
        registerFilterPreset(tempFilterPresetData);
        // wait for options to load
        const optionsOrSignatures = await awaitAsyncOptions(
          optionsOrSignaturesPromise
        );
        // create new filter preset data based on loaded options and config
        const data = filterPresetData<TItem>(
          label,
          optionsOrSignatures,
          config
        );
        updateFilterPreset(data);
        return data;
      } catch (error) {
        logger.error(error);
        return null;
      }
    },
    [awaitAsyncOptions, logger, registerFilterPreset, updateFilterPreset]
  );

  return {
    option,
    options,
    filter,
    filterPreset,
  };
};

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
