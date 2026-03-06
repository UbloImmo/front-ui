import { isBoolean, isString, type VoidFn } from "@ubloimmo/front-util";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import type {
  ListContextConfig,
  UseListContextSearchParams,
  UseListContextSearchParamsReturn,
  UseListOptionsReturn,
} from "./ListContext.types";
import type { FilterSignature } from "../modules/shared.types";

const LIST_OPTIONS_SEARCH_PARAM_NAME = "list-options";
const SEARCH_PARAM_DELIMITER = ";";

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
  {
    optionsMap,
    updateOptionSelection,
    selectedOptionSignatures,
  }: UseListOptionsReturn<TItem>,
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
   * A callback that updateds to the URL search parameters.
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
   * A callback that writes the current list options to the URL search parameters.
   */
  const writeOptions = useCallback(() => {
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
    });
  }, [selectedOptionSignatures, updateSeachParams]);

  /**
   * A callback that reads the current list options from the URL search parameters.
   *
   * @returns {FilterSignature[]} The current list options
   */
  const readOptionsSignatures = useCallback((): FilterSignature[] => {
    const searchParams = readSearchParams();
    const value = searchParams.get(LIST_OPTIONS_SEARCH_PARAM_NAME);
    if (!value) return [];
    return value
      .split(SEARCH_PARAM_DELIMITER)
      .filter((paramSignature) => optionsMap.has(paramSignature));
  }, [optionsMap, readSearchParams]);

  /**
   * A callback that initializes the list options from the URL search parameters.
   */
  const initOptionsFromSearchParams = useCallback(() => {
    const signatures = readOptionsSignatures();
    signatures.forEach((signature) => updateOptionSelection(signature, true));
  }, [readOptionsSignatures, updateOptionSelection]);

  /**
   * Writes the current list options to the URL search parameters when the options change.
   */
  useLayoutEffect(() => {
    if (configLoading || !write || !initialSynced) return;
    writeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsMap, write, configLoading, initialSynced]);

  /**
   * Initializes the list options from the URL search parameters when the component mounts.
   */
  useLayoutEffect(() => {
    // initialSynced only starts as false if read is true
    if (initialSynced || configLoading) return;
    setInitialSynced(true);
    initOptionsFromSearchParams();
  }, [configLoading, initOptionsFromSearchParams, initialSynced]);

  return {
    initialSynced,
  };
};
