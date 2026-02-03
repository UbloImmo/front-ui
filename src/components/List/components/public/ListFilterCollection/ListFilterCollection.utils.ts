import {
  isNullish,
  isObject,
  type Nullable,
  type VoidFn,
} from "@ubloimmo/front-util";
import { useCallback, useMemo, useState } from "react";

import { ListFilterProps } from "../ListFilter/ListFilter.types";

import { useListContext } from "@/components/List/context";
import {
  useEscapeOrOutsideClickEvent,
  useMergedProps,
  useTestId,
  useUikitTranslation,
} from "@utils";

import type {
  ListFilterCollectionDefaultProps,
  ListFilterCollectionProps,
} from "./ListFilterCollection.types";
import type { FilterSignature } from "@/components/List/modules";
import type { StyleOverrideProps, TestIdProps } from "@types";

/**
 * Default props for the ListFilterCollection component
 */
const listFilterCollectionDefaultProps: ListFilterCollectionDefaultProps = {
  title: null,
  filters: null,
};

const useListFilterCollectionEvents = (
  setOpenFilterSignature: VoidFn<[Nullable<FilterSignature>]>
) => {
  const close = useCallback(
    () => setOpenFilterSignature(null),
    [setOpenFilterSignature]
  );

  return useEscapeOrOutsideClickEvent<HTMLDivElement>(close);
};

/**
 * Hook that handles the logic for the ListFilterCollection component
 *
 * @param {ListFilterCollectionProps & TestIdProps & StyleOverrideProps} props - The component props
 */
export const useListFilterCollection = (
  props: ListFilterCollectionProps &
    TestIdProps &
    Omit<StyleOverrideProps, "as">
) => {
  const mergedProps = useMergedProps(listFilterCollectionDefaultProps, props);
  const testId = useTestId("list-filter-collection", props);
  const { filters } = useListContext();
  const [openFilterSignature, setOpenFilterSignature] =
    useState<FilterSignature | null>(null);

  const tl = useUikitTranslation();

  const title = useMemo(() => {
    return mergedProps.title ?? tl.action.filterBy();
  }, [mergedProps.title, tl]);

  const filterSignatures = useMemo<FilterSignature[]>(() => {
    return isNullish(mergedProps.filters) || !mergedProps.filters.length
      ? filters.map(({ signature }) => signature)
      : mergedProps.filters.map((filterOrSignature) =>
          isObject(filterOrSignature) && "signature" in filterOrSignature
            ? filterOrSignature.signature
            : filterOrSignature
        );
  }, [mergedProps.filters, filters]);

  const listFilters = useMemo<(ListFilterProps & { key: string })[]>(() => {
    return filterSignatures.map((signature, index) => {
      const key = [signature, index].join("-");
      const open = openFilterSignature === signature;
      const onOpened = () => setOpenFilterSignature(signature);
      const onClosed = () => setOpenFilterSignature(null);
      return {
        signature,
        key,
        open,
        onOpened,
        onClosed,
      };
    });
  }, [filterSignatures, openFilterSignature, setOpenFilterSignature]);

  const hasFilters = useMemo(() => !!listFilters.length, [listFilters]);

  const clearDisplayedFilters = useCallback(() => {
    listFilters.forEach(({ signature }) => {
      const filter = filters.find(
        ({ signature: filterSignature }) => filterSignature === signature
      );
      if (filter) filter.clear();
    });
  }, [filters, listFilters]);

  const hasActiveFilters = useMemo(() => {
    return filters.some(({ active }) => active);
  }, [filters]);

  const clearBtnHidden = useMemo(() => !hasActiveFilters, [hasActiveFilters]);

  const { ref, id } = useListFilterCollectionEvents(setOpenFilterSignature);

  return {
    title,
    filterSignatures,
    testId,
    openFilterSignature,
    setOpenFilterSignature,
    listFilters,
    mergedProps,
    hasFilters,
    ref,
    id,
    hasActiveFilters,
    clearDisplayedFilters,
    clearBtnHidden,
  };
};
