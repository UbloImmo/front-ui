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
  TItem extends object
>(
  config: Pick<ListContextConfig<TItem>, "filterPresets">,
  { options }: UseListOptionsReturn<TItem>,
  dataProvider: IDataProvider<TItem>
): UseListFilterPresetsReturn<TItem> => {
  const logger = useLogger("ListContext.filterPresets");
  const filterPresetDatas = useDataArray(config.filterPresets ?? [], true);

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
          const filterPresetOptions = filterPresetsOptionsMap[signature] ?? [];
          try {
            // return [signature, 0];
            const count = await dataProvider.fetchCount({
              options: filterPresetOptions,
              operator,
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
    filterPresetCounts.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.filterPresets, dataProvider.loading]);

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
    [
      filterPresetCounts.data,
      filterPresetCounts.isLoading,
      filterPresetsOptionsMap,
      updateFilterPresetSelection,
    ]
  );

  const filterPresets = useMemo<FilterPreset<TItem>[]>(() => {
    return filterPresetDatas.data.map(buildFilterPreset);
  }, [buildFilterPreset, filterPresetDatas.data]);

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
    updateFilterPresetSelection,
    getFilterPresetBySignature,
  };
};
