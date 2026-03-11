import { isString } from "@ubloimmo/front-util";
import { useCallback, useMemo, useRef } from "react";

import { BooleanOperators } from "../List.enums";

import { useMap } from "@utils";

import type {
  FilterSignature,
  DataProviderFilterParam,
  FilterOptionData,
  FilterData,
  FilterOptionMap,
} from "../modules";
import type {
  GetOptionBySignatureFn,
  ListContextConfig,
  TriggerDataProviderFilterFn,
  UpdateOptionSelectionFn,
  UseListOptions,
  UseListOptionsReturn,
} from "./ListContext.types";

export const useListOptions: UseListOptions = <TItem extends object>(
  config: Pick<
    ListContextConfig<TItem>,
    "options" | "optionsMap" | "filters" | "operator"
  >,
  triggerDataProviderFilter: TriggerDataProviderFilterFn<TItem>
): UseListOptionsReturn<TItem> => {
  const selectedOptionsSetRef = useRef<Set<FilterSignature>>(new Set());

  /**
   * Reactive reference to config options
   * If `optionsMap` is provided, return it as is
   * If deprecated `options` is provided, convert it to a map & return it
   */
  const configOptionsMap = useMemo<FilterOptionMap<TItem>>(() => {
    if (config.optionsMap) return config.optionsMap;
    if (!config.options?.length) return new Map();

    return new Map(config.options.map((option) => [option.signature, option]));
  }, [config.options, config.optionsMap]);

  /**
   * Reactive options map that uses {@link configOptionsMap} as source of truth
   */
  const optionsMap = useMap<FilterSignature, FilterOptionData<TItem>>(Map, {
    reactiveValue: configOptionsMap,
    autoCommitMutations: false,
    // we clear the internal ref initially so the first render picks up and adds all selected options to the set
    initiallyCleared: true,
    onReactiveAdd: (option, signature) => {
      if (option.selected) selectedOptionsSetRef.current.add(signature);
    },
    onReactiveDelete: (signature) => {
      selectedOptionsSetRef.current.delete(signature);
    },
  });

  /**
   * Filters the data provider based on the current options and any extra filters
   *
   * @param {FilterOptionData<TItem>[]} updatedOptions - The current state of filter options
   * @param {DataProviderFilterParam<TItem>[]} extraFilters - Additional filters to apply (e.g. search query generated)
   */
  const applyOptions = useCallback(
    (extraFilters: DataProviderFilterParam<TItem>[] = []) => {
      // begin remake
      const filters = [
        ...(config.filters ?? []).map(
          ({ optionSignatures, operator }): DataProviderFilterParam<TItem> => {
            const selectedOptions: FilterOptionData<TItem>[] = [];
            for (const signature of optionSignatures) {
              const option = optionsMap.get(signature);
              if (!option?.selected) continue;
              selectedOptions.push(option);
            }
            return {
              operator,
              selectedOptions,
            };
          }
        ),
        ...extraFilters,
      ];
      const operator = config.operator ?? BooleanOperators.AND;
      const selectedOptions: FilterOptionData<TItem>[] = [];
      for (const signature of selectedOptionsSetRef.current) {
        const option = optionsMap.get(signature);
        if (!option?.selected) continue;
        selectedOptions.push(option);
      }
      if (filters?.length) {
        triggerDataProviderFilter({
          filters,
          operator,
          selectedOptions,
        });
        return;
      }
      triggerDataProviderFilter({
        options: Array.from(optionsMap.values()),
        operator,
        selectedOptions,
      });
    },
    [config.filters, config.operator, optionsMap, triggerDataProviderFilter]
  );

  const updateOptionSelection = useCallback<UpdateOptionSelectionFn>(
    (
      optionSignature: FilterSignature,
      selected: boolean,
      filter?: Pick<FilterData, "multi" | "optionSignatures">,
      autoCommitMutation = true
    ) => {
      let needsCommit = false;
      // Update the target option
      optionsMap.update(optionSignature, (option) => {
        if (option.disabled) return option;
        selectedOptionsSetRef.current[selected ? "add" : "delete"](
          optionSignature
        );
        needsCommit = true;
        return {
          ...option,
          selected: selected || option.fixed,
        };
      });
      // unselect other options if a non-multi filter was provided as context
      if (filter && !filter.multi && filter.optionSignatures.size) {
        for (const signature of filter.optionSignatures) {
          if (signature === optionSignature) continue;
          optionsMap.update(signature, (option) => {
            selectedOptionsSetRef.current[option.fixed ? "add" : "delete"](
              signature
            );
            needsCommit = true;
            return { ...option, selected: option.fixed };
          });
        }
      }
      if (autoCommitMutation && needsCommit) optionsMap.commit();
    },
    [optionsMap]
  );

  const getOptionBySignature = useCallback<GetOptionBySignatureFn<TItem>>(
    (optionSignature) => {
      if (!isString(optionSignature)) return null;
      return optionsMap.get(optionSignature) ?? null;
    },
    [optionsMap]
  );

  return {
    selectedOptionSignatures: selectedOptionsSetRef.current,
    optionsMap,
    updateOptionSelection,
    getOptionBySignature,
    applyOptions,
  };
};
