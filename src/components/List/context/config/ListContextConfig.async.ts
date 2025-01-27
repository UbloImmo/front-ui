import { useCallback } from "react";

import {
  filterData,
  filterOptionData,
  filterPresetData,
  type FilterData,
  type FilterOptionData,
  type FilterOptionDataOrSignature,
  type FilterOptionDividerData,
  type FilterPresetData,
  type ListConfigAsyncFilterFn,
  type ListConfigAsyncFilterPresetFn,
  type ListConfigAsyncOptionFn,
  type ListConfigAsyncOptionsFn,
  type ListConfigMatchFn,
} from "../../modules";

import { mergeDefaultProps, useLogger } from "@utils";

import type {
  HydrateFilterConfigFn,
  UseListConfigAsync,
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
export const useListConfigAsync: UseListConfigAsync = <TItem extends object>(
  match: ListConfigMatchFn<TItem>,
  registerOption: VoidFn<[FilterOptionData<TItem>]>,
  registerFilter: VoidFn<[FilterData]>,
  updateFilter: VoidFn<[FilterData]>,
  registerFilterPreset: VoidFn<[FilterPresetData]>,
  updateFilterPreset: VoidFn<[FilterPresetData]>,
  hydrateFilterConfig: HydrateFilterConfigFn,
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
    [logger, registerOption],
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
            mergeDefaultProps(sharedConfig, config),
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
    [logger, match, registerOption],
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
      optionsOrSignatures: MaybePromise<MaybePromise<TPayload>[]>,
    ): Promise<TPayload[]> => {
      return await Promise.all(await optionsOrSignatures);
    },
    [],
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
    ],
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
          true,
        );
        registerFilterPreset(tempFilterPresetData);
        // wait for options to load
        const optionsOrSignatures = await awaitAsyncOptions(
          optionsOrSignaturesPromise,
        );
        // create new filter preset data based on loaded options and config
        const data = filterPresetData<TItem>(
          label,
          optionsOrSignatures,
          config,
        );
        updateFilterPreset(data);
        return data;
      } catch (error) {
        logger.error(error);
        return null;
      }
    },
    [awaitAsyncOptions, logger, registerFilterPreset, updateFilterPreset],
  );

  return {
    option,
    options,
    filter,
    filterPreset,
  };
};
