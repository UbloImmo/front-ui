import { objectFromEntries } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo } from "react";

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
  { options }: UseListOptionsReturn<TItem>,
  dataProvider: IDataProvider<TItem>
): UseListFilterPresetsReturn<TItem> => {
  const logger = useLogger("ListContext.filterPresets");
  const filterPresetDatas = useDataArray(config.filterPresets ?? [], true);

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
      const isFilterPresetOption = ({ signature }: FilterOptionData<TItem>) =>
        filterPreset.optionSignatures.includes(signature);
      if (filterPreset.exclusive) {
        options.updateItemWhere(
          (option) => !isFilterPresetOption(option),
          (option) => ({
            ...option,
            selected: option.fixed,
          })
        );
      }
      options.updateItemWhere(isFilterPresetOption, (option) => {
        return {
          ...option,
          selected: selected || option.fixed,
        };
      });
    },
    [filterPresetDatas, options]
  );

  const getFilterPresetOptions = useCallback(
    (
      filterPresetData: Pick<FilterPresetData, "optionSignatures">
    ): FilterOptionData<TItem>[] => {
      return options.filter(({ signature }) =>
        filterPresetData.optionSignatures.includes(signature)
      );
    },
    [options]
  );

  const filterPresetsOptionsMap = useMemo(() => {
    return objectFromEntries(
      (config.filterPresets ?? []).map(
        ({
          signature,
          optionSignatures,
        }): [FilterSignature, FilterOptionData<TItem>[]] => [
          signature,
          getFilterPresetOptions({ optionSignatures }),
        ]
      )
    );
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

  useEffect(() => {
    if (filterPresetConfigLoading) return;
    filterPresetCounts.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.filterPresets, filterPresetConfigLoading]);

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
