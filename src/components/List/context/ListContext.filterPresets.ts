import { objectFromEntries } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useRef } from "react";

import { BooleanOperators } from "../List.enums";

import { useAsyncData, useDataArray, useLogger } from "@utils";

import type {
  FilterOptionData,
  FilterPreset,
  FilterPresetData,
  FilterSignature,
  IDataProvider,
} from "../modules";
import type {
  GetFilterPresetBySignatureFn,
  ListContextConfig,
  UseListFilterPresets,
  UseListFilterPresetsReturn,
  UseListOptionsReturn,
} from "./ListContext.types";

export const useListFilterPresets: UseListFilterPresets = <
  TItem extends object,
>(
  config: Pick<ListContextConfig<TItem>, "filterPresets">,
  { optionsMap, updateOptionSelection }: UseListOptionsReturn<TItem>,
  dataProvider: IDataProvider<TItem>
): UseListFilterPresetsReturn<TItem> => {
  const logger = useLogger("ListContext.filterPresets");
  // TODO: convert to map
  const filterPresetDatas = useDataArray(config.filterPresets ?? [], true);

  const allFilterPresetOptionSignatures = useMemo(() => {
    return filterPresetDatas.data.reduce(
      (acc, item) => acc.union(item.optionSignatures),
      new Set<FilterSignature>()
    );
  }, [filterPresetDatas.data]);

  const filterPresetConfigLoading = useMemo(
    () => filterPresetDatas.data.some(({ loading }) => loading),
    [filterPresetDatas.data]
  );

  const updateFilterPresetSelection = useCallback(
    (filterPresetSignature: FilterSignature, selected: boolean) => {
      const filterPreset = filterPresetDatas.find(
        ({ signature }) => signature === filterPresetSignature
      );
      if (!filterPreset || filterPreset.disabled) return;

      let needsCommit = false;

      // when exclusive, always disables all options related to other filter presets
      if (filterPreset.exclusive) {
        for (const signature of allFilterPresetOptionSignatures) {
          const optionSelected = filterPreset.optionSignatures.has(signature)
            ? selected
            : false;
          updateOptionSelection(signature, optionSelected, undefined, false);
          needsCommit = true;
        }
        // otherwise, just sets this filter preset's option's selection
      } else {
        for (const signature of filterPreset.optionSignatures) {
          updateOptionSelection(signature, selected, undefined, false);
          needsCommit = true;
        }
      }

      if (needsCommit) optionsMap.commit();
    },
    [
      allFilterPresetOptionSignatures,
      filterPresetDatas,
      optionsMap,
      updateOptionSelection,
    ]
  );

  const getFilterPresetOptions = useCallback(
    (
      filterPresetData: Pick<FilterPresetData, "optionSignatures">
    ): FilterOptionData<TItem>[] => {
      const filterPresetOptions: FilterOptionData<TItem>[] = [];
      for (const signature of filterPresetData.optionSignatures) {
        const option = optionsMap.get(signature);
        if (!option) continue;
        filterPresetOptions.push(option);
      }
      return filterPresetOptions;
    },
    [optionsMap]
  );

  const filterPresetsOptionsMap = useMemo(() => {
    const optionsMap: { [k: FilterSignature]: FilterOptionData<TItem>[] } = {};
    if (!config.filterPresets?.length) return optionsMap;
    for (const filterPreset of config.filterPresets) {
      optionsMap[filterPreset.signature] = getFilterPresetOptions(filterPreset);
    }
    return optionsMap;
  }, [config.filterPresets, getFilterPresetOptions]);

  const fetchFilterPresetCounts = useCallback(async (): Promise<
    Record<FilterSignature, number>
  > => {
    const counts = await Promise.all(
      (config.filterPresets ?? []).map(
        async ({ signature, operator }): Promise<[FilterSignature, number]> => {
          // Clone the options to avoid mutating the original data
          // and select them so that they are taken into account when filtering
          const filterPresetOptions = (
            filterPresetsOptionsMap[signature] ?? []
          )?.map((option) => ({
            ...option,
            selected: true,
          }));
          try {
            const count = await dataProvider.fetchCount({
              options: filterPresetOptions,
              selectedOptions: filterPresetOptions,
              search: null,
              operator,
              activeSorts: null,
            });
            return [signature, count];
          } catch (error) {
            logger.error(error);
            return [signature, 0];
          }
        }
      )
    );
    return objectFromEntries(counts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.filterPresets, filterPresetsOptionsMap, logger]);

  const filterPresetCounts = useAsyncData(fetchFilterPresetCounts);
  const filterPresetCountsFetched = useRef(false);

  useEffect(() => {
    if (filterPresetCountsFetched.current) return;
    if (filterPresetConfigLoading) return;
    if (!dataProvider.data?.length) return;
    filterPresetCounts.refetch();
    filterPresetCountsFetched.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    config.filterPresets,
    filterPresetConfigLoading,
    dataProvider.data?.length,
  ]);

  const buildFilterPreset = useCallback(
    (filterPresetData: FilterPresetData): FilterPreset<TItem> => {
      const select = () =>
        updateFilterPresetSelection(filterPresetData.signature, true);
      const unselect = () =>
        updateFilterPresetSelection(filterPresetData.signature, false);

      const filterPresetOptions =
        filterPresetsOptionsMap[filterPresetData.signature] ?? [];
      const allActive = filterPresetOptions.every(({ selected }) => selected);
      const someActive = filterPresetOptions.some(({ selected }) => selected);
      const active =
        filterPresetData.operator === BooleanOperators.AND
          ? allActive
          : someActive;
      const toggle = active ? unselect : select;

      const count = filterPresetCounts.data?.[filterPresetData.signature] ?? 0;

      return {
        ...filterPresetData,
        options: filterPresetOptions,
        active,
        select,
        unselect,
        toggle,
        loading: filterPresetCounts.isLoading,
        count,
      };
    },
    [filterPresetCounts, filterPresetsOptionsMap, updateFilterPresetSelection]
  );

  const filterPresets = useMemo<FilterPreset<TItem>[]>(() => {
    return filterPresetDatas.data.map(buildFilterPreset);
  }, [buildFilterPreset, filterPresetDatas.data]);

  const filterPresetsLoading = useMemo(
    () => filterPresetConfigLoading || filterPresetCounts.isLoading,
    [filterPresetCounts.isLoading, filterPresetConfigLoading]
  );

  const getFilterPresetBySignature = useCallback<
    GetFilterPresetBySignatureFn<TItem>
  >(
    (filterPresetSignature) => {
      return (
        filterPresets.find(
          ({ signature }) => signature === filterPresetSignature
        ) ?? null
      );
    },
    [filterPresets]
  );

  return {
    filterPresets,
    filterPresetsLoading,
    updateFilterPresetSelection,
    getFilterPresetBySignature,
  };
};
