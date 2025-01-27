import { isArray, isString, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useMemo, useState } from "react";

import { type ListSearchConfig, type UseListSearch } from "./ListContext.types";
import { BooleanOperators } from "../List.enums";
import {
  DataProviderFilterParam,
  filterOptionData,
  filterOptionMatch,
  type FilterOptionData,
  type FilterProperty,
  type FilterSearchOperator,
} from "../modules";

import { isEmptyString, useDebounceValue, useStatic } from "@utils";

const SEARCH_OPTION_LABEL = "**INTERNAL**LIST_SEARCH_OPTION**INTERNAL**";

const generateQueryFilterParam = <TItem extends object>(
  properties: FilterProperty<TItem>[],
  query: string,
  strategy?: FilterSearchOperator,
): DataProviderFilterParam<TItem> => {
  // santitize strategy
  const operator: FilterSearchOperator = strategy ?? "contains";
  // generate and select option based on query and properties
  const option: FilterOptionData<TItem> = {
    ...filterOptionData<TItem>(
      SEARCH_OPTION_LABEL,
      properties.map((property) =>
        filterOptionMatch(property, operator, query),
      ),
      { hidden: true, disabled: true, operator: BooleanOperators.OR },
    ),
    selected: true,
  };
  // return filter param
  return {
    operator: BooleanOperators.OR,
    selectedOptions: [option],
  };
};

export const useListContextSearch: UseListSearch = <TItem extends object>({
  initialQuery,
  properties,
  strategy,
  debounceDelay,
}: ListSearchConfig<TItem>) => {
  const [query, setQuery] = useState<string>(
    isString(initialQuery) ? initialQuery : "",
  );

  const delay = useMemo(() => debounceDelay ?? 500, [debounceDelay]);

  const debounceOptions = useStatic({
    trailing: true,
    leading: false,
  });

  const [debouncedQuery, setDebouncedQuery] = useDebounceValue(
    query,
    delay,
    debounceOptions,
  );

  const queryFilters = useMemo<DataProviderFilterParam<TItem>[]>(() => {
    // ensure query is not empty
    if (isEmptyString(debouncedQuery)) return [];
    // ensure matches can be generated from properties
    if (!isArray(properties)) return [];
    if (!properties.length) return [];
    return [generateQueryFilterParam(properties, debouncedQuery, strategy)];
  }, [debouncedQuery, properties, strategy]);

  const changeQuery = useCallback(
    (newQuery: Nullable<string>) => {
      const updatedQuery = newQuery ?? "";
      if (updatedQuery === query) return;
      setQuery(updatedQuery);
      setDebouncedQuery(updatedQuery);
    },
    [query, setDebouncedQuery],
  );

  return {
    query,
    queryFilters,
    changeQuery,
  };
};
