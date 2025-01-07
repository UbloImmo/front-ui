import { isString } from "@ubloimmo/front-util";
import { useCallback, useEffect } from "react";

import { BooleanOperators } from "../List.enums";
import {
  type DataProviderFilterParam,
  type FilterOptionData,
  type IDataProvider,
} from "../modules";

import { useDataArray } from "@utils";

import type {
  GetOptionBySignatureFn,
  ListContextConfig,
  UpdateOptionSelectionFn,
  UseListOptions,
  UseListOptionsReturn,
} from "./ListContext.types";

export const useListOptions: UseListOptions = <TItem extends object>(
  config: Pick<ListContextConfig<TItem>, "options" | "filters" | "operator">,
  dataProvider: IDataProvider<TItem>
): UseListOptionsReturn<TItem> => {
  const options = useDataArray(config.options ?? [], true);

  const filterDataOnChange = useCallback(
    (updatedOptions: FilterOptionData<TItem>[]) => {
      const filters = config.filters?.map(
        ({ optionSignatures, operator }): DataProviderFilterParam<TItem> => {
          const selectedOptions = updatedOptions.filter(
            ({ signature, selected }) =>
              optionSignatures.includes(signature) && selected
          );
          return {
            operator,
            selectedOptions,
          };
        }
      );
      const operator = config.operator ?? BooleanOperators.AND;
      if (filters?.length) {
        dataProvider.filter({
          filters,
          operator,
        });
        return;
      }
      dataProvider.filter({
        options: updatedOptions,
        operator,
      });
    },
    [dataProvider, config.filters, config.operator]
  );

  useEffect(() => {
    if (!dataProvider.loading) filterDataOnChange(options.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.data, dataProvider.loading]);

  const updateOptionSelection = useCallback<UpdateOptionSelectionFn>(
    (
      optionSignature,
      selected,
      multi = false,
      isFilterOption = () => false
    ) => {
      const isTargetOption = ({ signature }: FilterOptionData<TItem>) =>
        signature === optionSignature;
      // Update the target option
      options.updateItemWhere(isTargetOption, (option) => {
        if (option.disabled) return option;
        return {
          ...option,
          selected: selected || option.fixed,
        };
      });
      if (multi) return;
      // Update the filter's other options
      options.updateItemWhere(
        (option) => !isTargetOption(option) && isFilterOption(option.signature),
        (option) => {
          return {
            ...option,
            selected: option.fixed,
          };
        }
      );
    },
    [options]
  );

  const getOptionBySignature = useCallback<GetOptionBySignatureFn<TItem>>(
    (optionSignature) => {
      if (!isString(optionSignature)) return null;
      return (
        options.find(({ signature }) => signature === optionSignature) ?? null
      );
    },
    [options]
  );

  return {
    options,
    updateOptionSelection,
    getOptionBySignature,
  };
};
