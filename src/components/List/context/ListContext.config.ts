import { useCallback, useMemo, useReducer, useRef, useState } from "react";

import { BooleanOperators } from "../List.enums";
import {
  filterData,
  filterOptionData,
  filterPresetData,
  type FilterBooleanOperator,
  type FilterComparisonOperator,
  type FilterConfig,
  type FilterData,
  type FilterDataMap,
  type FilterOptionConfig,
  type FilterOptionData,
  type FilterOptionMap,
  type FilterOptionMatch,
  type FilterOptionValue,
  type FilterPresetConfig,
  type FilterPresetData,
  type FilterPresetMap,
  type FilterProperty,
  type FilterSignature,
  type ListConfigAsyncFilterFn,
  type ListConfigAsyncFilterPresetFn,
  type ListConfigAsyncOptionsFn,
  type ListConfigFilterFn,
  type ListConfigFilterFnParams,
  type ListConfigFilterPresetFn,
  type ListConfigFilterPresetFnParams,
  type ListConfigMatchesFn,
  type ListConfigMatchFn,
  type ListConfigMatchFnParams,
  type ListConfigOptionFn,
  type ListConfigOptionFnParams,
  type ListConfigOptionLabeledValue,
  type ListConfigOptionsFn,
  type UseDataProviderFn,
} from "../modules";

import { mergeDefaultProps, useLogger, useUikitTranslation } from "@utils";

import type {
  HydrateFilterConfigFn,
  ListContextConfig,
  UseListConfig,
  UseListConfigAsync,
  UseListConfigFilterPresetReducerAction,
  UseListConfigFilterReducerAction,
  UseListConfigReturn,
} from "./ListContext.types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";

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

  const filter = useCallback<ListConfigAsyncFilterFn<TItem>>(
    async (
      label: string,
      optionsOrSignaturesPromise: Promise<
        (FilterSignature | FilterOptionData<TItem>)[]
      >,
      config?: FilterConfig
    ): Promise<Nullable<FilterData>> => {
      try {
        const hydrated = hydrateFilterConfig(config);
        // store temporary filter data and mark it as loading
        const tempFilterData = filterData<TItem>(label, [], hydrated, true);
        registerFilter(tempFilterData);
        // wait for options to load
        const optionsOrSignatures = await optionsOrSignaturesPromise;
        // create new filter data based on loaded options and config
        const data = filterData<TItem>(label, optionsOrSignatures, hydrated);
        // update filter data with loaded options
        updateFilter(data);
        return data;
      } catch (error) {
        logger.error(error);
        return null;
      }
    },
    [hydrateFilterConfig, logger, registerFilter, updateFilter]
  );

  const filterPreset = useCallback<ListConfigAsyncFilterPresetFn<TItem>>(
    async (
      label: string,
      optionsOrSignaturesPromise: Promise<
        (FilterOptionData<TItem> | FilterSignature)[]
      >,
      config?: FilterPresetConfig
    ): Promise<Nullable<FilterPresetData>> => {
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
        const optionsOrSignatures = await optionsOrSignaturesPromise;
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
    [logger, registerFilterPreset, updateFilterPreset]
  );

  return {
    options,
    filter,
    filterPreset,
  };
};

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
    (map: FilterDataMap, [type, filter]: UseListConfigFilterReducerAction) => {
      const copy = new Map(map);
      // simply add the filter if it's the first time we see it
      if (type === "register") copy.set(filter.signature, filter);
      // update the filter if it's already in the map
      if (type === "update") {
        // find the old filter based on its index & label
        const signature = Array.from(copy.values()).find(
          (f) => f.index === filter.index && f.label === filter.label
        )?.signature;
        // delete it if found
        if (signature) copy.delete(signature);
        // add the updated filter
        copy.set(filter.signature, filter);
      }
      return copy;
    },
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
    (
      map: FilterPresetMap,
      [type, preset]: UseListConfigFilterPresetReducerAction
    ) => {
      const copy = new Map(map);
      // simply add the filter if it's the first time we see it
      if (type === "register") copy.set(preset.signature, preset);
      // update the filter if it's already in the map
      if (type === "update") {
        // find the old filter based on its label
        const signature = Array.from(copy.values()).find(
          (p) => p.label === preset.label
        )?.signature;
        // delete it if found
        if (signature) copy.delete(signature);
        // add the updated filter
        copy.set(preset.signature, preset);
      }
      return copy;
    },
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

  const match = useCallback<ListConfigMatchFn<TItem>>(
    (...params: ListConfigMatchFnParams<TItem>): FilterOptionMatch<TItem> => {
      if (params.length === 1) return params[0];
      if (params.length !== 3) throw new Error("Invalid number of arguments");
      return {
        property: params[0],
        comparison: params[1],
        value: params[2],
      };
    },
    []
  );

  const matches = useCallback<ListConfigMatchesFn<TItem>>(
    (
      property: FilterProperty<TItem>,
      comparison: FilterComparisonOperator,
      values: FilterOptionValue[]
    ): FilterOptionMatch<TItem>[] => {
      return values.map((value) => match(property, comparison, value));
    },
    [match]
  );

  const option = useCallback<ListConfigOptionFn<TItem>>(
    (...params: ListConfigOptionFnParams<TItem>): FilterOptionData<TItem> => {
      const optionData = filterOptionData<TItem>(...params);
      registerOption(optionData);
      return optionData;
    },
    []
  );

  const options = useCallback<ListConfigOptionsFn<TItem>>(
    (
      property: FilterProperty<TItem>,
      comparison: FilterComparisonOperator,
      labeledValues: ListConfigOptionLabeledValue[],
      sharedConfig: FilterOptionConfig = {}
    ) => {
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

  const config = useMemo<ListContextConfig<TItem>>(() => {
    const optionsList = Array.from(optionsMap.values());
    const filtersList = Array.from(filtersMap.values()).sort(
      (a, b) => a.index - b.index
    );
    const filterPresetsList = Array.from(filterPresetsMap.values());

    return {
      filters: filtersList,
      options: optionsList,
      filterPresets: filterPresetsList,
      useDataProvider: dataProvider,
      operator,
    };
  }, [filtersMap, optionsMap, filterPresetsMap, dataProvider, operator]);

  return {
    config,
    async,
    match,
    matches,
    option,
    options,
    filter,
    filterPreset,
    setOperator,
  };
};
