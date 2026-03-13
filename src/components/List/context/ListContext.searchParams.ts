import { isBoolean, isString, type VoidFn } from "@ubloimmo/front-util";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import { isEmptyString, isNegative, isNonEmptyString } from "@utils";

import type { Sort } from "../modules";
import type {
  ListContextConfig,
  UseListContextSearchParams,
  UseListContextSearchParamsReturn,
  UseListOptionsReturn,
  UseListSortsReturn,
} from "./ListContext.types";
import type { FilterProperty, FilterSignature } from "../modules/shared.types";

const LIST_OPTIONS_SEARCH_PARAM_NAME = "list-options";
const LIST_SORTS_SEARCH_PARAM_NAME = "list-sorts";
const SEARCH_PARAM_DELIMITER = ";";
const SORT_PARAM_DELIMITER = ":";
const SORT_PARAM_INVERTED = "inverted";
const SORT_PARAM_NON_INVERTED = "base";

/**
 * A callback that reads the current search parameters from the URL.
 *
 * @returns {URLSearchParams} The current search parameters
 */
const readWindowSearchParams = (): URLSearchParams => {
  // get current search params
  const currentUrl = new URL(window.location.href);
  const currentSearchParams = currentUrl.searchParams;
  // return a copy of the current search params
  return new URLSearchParams(currentSearchParams);
};

const writeWindowSearchParams = (searchParams: URLSearchParams): void => {
  window.location.search = searchParams.toString();
};

/**
 * A hook that manages the list context's search parameters.
 * It syncs the list options with the URL search parameters.
 *
 * @template TItem - The type of items in the list
 * @param {Pick<ListContextConfig<TItem>, "searchParams">} config - The list context configuration
 * @param {UseListOptionsReturn<TItem>} options - The list options state and methods
 * @param {boolean} configLoading - Whether the list configuration is loading
 * @returns {UseListContextSearchParamsReturn} The initial sync status
 */
export const useListContextSearchParams: UseListContextSearchParams = <
  TItem extends object,
>(
  { searchParams }: Pick<ListContextConfig<TItem>, "searchParams">,
  { optionsMap, selectedOptionSignatures }: UseListOptionsReturn<TItem>,
  {
    sortMap,
    activeSorts,
    setInternalSortFlagRefs,
    prioritizeSort,
    highlightedSortProperty,
    activeSortProperties,
    invertedSortProperties,
  }: UseListSortsReturn<TItem>,
  configLoading: boolean
): UseListContextSearchParamsReturn => {
  const readSearchParams = useMemo(
    () => searchParams?.readParams ?? readWindowSearchParams,
    [searchParams?.readParams]
  );

  const writeSearchParams = useMemo(
    () => searchParams?.writeParams ?? writeWindowSearchParams,
    [searchParams?.writeParams]
  );

  const readWrite = useMemo(
    () =>
      (isBoolean(searchParams?.sync) && searchParams.sync) ||
      (isString(searchParams?.sync) && searchParams.sync === "read-write"),
    [searchParams?.sync]
  );

  const read = useMemo(
    () => readWrite || searchParams?.sync === "read",
    [readWrite, searchParams?.sync]
  );

  const [initialSynced, setInitialSynced] = useState(!read);

  const write = useMemo(
    () => readWrite || searchParams?.sync === "write",
    [readWrite, searchParams?.sync]
  );

  /**
   * A callback that updates to the URL search parameters.
   *
   * @param {VoidFn<[searchParams: URLSearchParams]>} writer - A callback that writes to the search parameters
   */
  const updateSeachParams = useCallback(
    (writer?: VoidFn<[searchParams: URLSearchParams]>) => {
      // get current search params
      const nextSearchParams = readSearchParams();
      // write to search params
      if (writer) writer(nextSearchParams);
      // update the window search
      writeSearchParams(nextSearchParams);
    },
    [readSearchParams, writeSearchParams]
  );

  /**
   * A callback that writes the current list options & sorts to the URL search parameters.
   */
  const writeListConfig = useCallback(() => {
    updateSeachParams((searchParams) => {
      // remove search param if all options are unselected
      if (!selectedOptionSignatures.size) {
        searchParams.delete(LIST_OPTIONS_SEARCH_PARAM_NAME);
        // update search params
      } else {
        // only write selected options
        const paramValue = Array.from(selectedOptionSignatures).join(
          SEARCH_PARAM_DELIMITER
        );
        searchParams.set(LIST_OPTIONS_SEARCH_PARAM_NAME, paramValue);
      }
      // write sorting search params
      if (!sortMap.size || !activeSorts.length) {
        searchParams.delete(LIST_SORTS_SEARCH_PARAM_NAME);
      } else {
        // only write active sorts
        const paramValue = activeSorts
          .map(({ property, inverted, priority }) =>
            [
              property,
              inverted ? SORT_PARAM_INVERTED : SORT_PARAM_NON_INVERTED,
              priority,
            ].join(SORT_PARAM_DELIMITER)
          )
          .join(SEARCH_PARAM_DELIMITER);
        searchParams.set(LIST_SORTS_SEARCH_PARAM_NAME, paramValue);
      }
    });
  }, [activeSorts, selectedOptionSignatures, sortMap.size, updateSeachParams]);

  /**
   * A callback that reads the current list options & sorts from the URL search parameters.
   *
   * @returns {FilterSignature[]} The current list options
   */
  const readListConfig = useCallback(() => {
    const payload: {
      optionSignatures: FilterSignature[];
      sorts: Pick<
        Sort<TItem, FilterProperty<TItem>>,
        "property" | "inverted" | "prioritized"
      >[];
    } = {
      optionSignatures: [],
      sorts: [],
    };

    const searchParams = readSearchParams();

    const options = searchParams.get(LIST_OPTIONS_SEARCH_PARAM_NAME);
    if (isNonEmptyString(options)) {
      for (const paramSignature of options.split(SEARCH_PARAM_DELIMITER)) {
        if (optionsMap.has(paramSignature))
          payload.optionSignatures.push(paramSignature);
      }
    }

    const sorts = searchParams.get(LIST_SORTS_SEARCH_PARAM_NAME);
    if (isNonEmptyString(sorts)) {
      for (const sort of sorts.split(SEARCH_PARAM_DELIMITER)) {
        if (isEmptyString(sort)) continue;
        const [propertyParam, inversion, priorityStr] =
          sort.split(SORT_PARAM_DELIMITER);
        const priority = parseInt(priorityStr ?? "");
        if (
          !isNonEmptyString(propertyParam) ||
          !isNonEmptyString(inversion) ||
          isNaN(priority)
        )
          continue;
        const property = propertyParam as FilterProperty<TItem>;
        if (!sortMap.has(property)) continue;
        const inverted = inversion === SORT_PARAM_INVERTED;
        const prioritized = isNegative(priority);
        payload.sorts.push({
          property,
          inverted,
          prioritized,
        });
      }
    }

    return payload;
  }, [optionsMap, readSearchParams, sortMap]);

  /**
   * A callback that initializes the list options & sorts from the URL search parameters.
   */
  const initListFromSearchParams = useCallback(() => {
    const { optionSignatures, sorts } = readListConfig();
    if (optionSignatures.length) {
      let needsCommit = false;
      for (const signature of optionSignatures) {
        const option = optionsMap.get(signature);
        if (!option || option.disabled) continue;
        optionsMap.set(signature, { ...option, selected: true });
        needsCommit = true;
      }
      if (needsCommit) {
        optionsMap.commit();
      }
    }
    if (sorts.length) {
      let needsCommit = false;
      for (const { property, inverted, prioritized } of sorts) {
        const sortData = sortMap.get(property);
        if (!sortData) continue;
        setInternalSortFlagRefs(property, { active: true, inverted });
        sortMap.set(property, { ...sortData, active: true, inverted });
        if (prioritized) prioritizeSort(property);
        needsCommit = true;
      }
      if (needsCommit) sortMap.commit();
    }
  }, [
    optionsMap,
    prioritizeSort,
    readListConfig,
    setInternalSortFlagRefs,
    sortMap,
  ]);

  /**
   * Writes the current list options & sorts to the URL search parameters when the options change.
   */
  useLayoutEffect(() => {
    if (configLoading || !write || !initialSynced) return;
    writeListConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedOptionSignatures.size,
    activeSortProperties.size,
    invertedSortProperties.size,
    highlightedSortProperty,
    configLoading,
    initialSynced,
  ]);

  /**
   * Initializes the list options & sorts from the URL search parameters when the component mounts.
   */
  useLayoutEffect(() => {
    // initialSynced only starts as false if read is true
    if (initialSynced || configLoading || !read) return;
    setInitialSynced(true);
    initListFromSearchParams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configLoading, initialSynced]);

  return {
    initialSynced,
  };
};
