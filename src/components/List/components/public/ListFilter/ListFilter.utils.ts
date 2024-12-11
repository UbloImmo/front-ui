import {
  isBoolean,
  isString,
  type GenericFn,
  type Logger,
  type Nullable,
  type VoidFn,
} from "@ubloimmo/front-util";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type RefObject,
} from "react";

import { useListContext } from "@/components/List/context";
import {
  filterData,
  type FilterSignature,
  type IFilter,
  type FilterOption,
} from "@/components/List/modules";
import { useClearFilterOption } from "@/components/List/modules/FilterOption/useFilterOption.hook";
import {
  clamp,
  isEmptyString,
  isNegative,
  isPositive,
  toStyleProps,
  useLogger,
} from "@utils";

import type { ListFilterProps, ListFilterStyleProps } from "./ListFilter.types";

const useSatitizedFilter = (
  props: ListFilterProps,
  logger: Logger
): IFilter<Record<string, unknown>> => {
  const { getFilterBySignature } = useListContext<Record<string, unknown>>();

  return useMemo<IFilter<Record<string, unknown>>>(() => {
    if (props.filter) return props.filter;

    if (props.signature) {
      const foundFilter = getFilterBySignature(props.signature);
      if (foundFilter) return foundFilter;
    }
    logger.warn(
      "No filter or signature provided, defaulting to an empty filter"
    );
    const emptyData = filterData<Record<string, unknown>>(
      "[EMPTY FILTER]",
      [],
      {
        hidden: true,
        disabled: true,
      }
    );
    return {
      ...emptyData,
      active: false,
      selectedOptions: [],
      options: [],
      optionDividers: [],
      clear: () => {},
      selectAll: () => {},
    };
  }, [getFilterBySignature, logger, props.filter, props.signature]);
};

const useFilterStyleProps = (
  filter: IFilter<Record<string, unknown>>,
  open?: boolean,
  renderMulti?: boolean
) => {
  return useMemo<ListFilterStyleProps>(() => {
    const { disabled, loading, active } = filter;
    return toStyleProps({
      disabled,
      loading,
      active,
      multi: renderMulti ?? false,
      open,
    });
  }, [filter, open, renderMulti]);
};

const useFilterQuery = () => {
  const queryInputRef = useRef<Nullable<HTMLInputElement>>(null);

  const [query, setQuery] = useState<Nullable<string>>("");

  return {
    queryInputRef,
    query,
    setQuery,
  };
};

const useFilteredOptions = (
  filter: IFilter<Record<string, unknown>>,
  query: Nullable<string>
): FilterOption<Record<string, unknown>>[] => {
  const clearFilterOption = useClearFilterOption(filter);

  const filteredOptions = useMemo(() => {
    const options = filter.options.filter(({ label }) => {
      if (!isString(query) || isEmptyString(query)) return true;
      return label
        .trim()
        .toLowerCase()
        .includes(`${query}`.trim().toLocaleLowerCase());
    });
    if (filter.optionsSort === "asc")
      return options.sort((a, b) => a.label.localeCompare(b.label));
    if (filter.optionsSort === "desc")
      return options.sort((a, b) => b.label.localeCompare(a.label));
    return options;
  }, [filter.options, query, filter.optionsSort]);

  return useMemo(
    () => [...filteredOptions, clearFilterOption],
    [filteredOptions, clearFilterOption]
  );
};

type WalkHighlightFn = GenericFn<[delta: 1 | -1]>;

const useFilterHighlight = (
  filteredOptions: FilterOption<Record<string, unknown>>[]
): [Nullable<FilterSignature>, WalkHighlightFn, VoidFn] => {
  const [highlightSignature, setHighlightSignature] =
    useState<Nullable<FilterSignature>>(null);

  const scrollToHighlightedOption = useCallback(
    (signature: Nullable<FilterSignature>) => {
      if (!signature) return;
      const selector = `[data-option-signature="${signature}"]`;
      const optionElement = document.querySelector(selector);
      if (!optionElement) return;
      optionElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
    },
    []
  );

  const walkHighlight = useCallback<WalkHighlightFn>(
    (delta) => {
      const previousOptionIndex = filteredOptions.findIndex(
        ({ signature }) => signature === highlightSignature
      );
      const lowerLimit = 0;
      const upperLimit = filteredOptions.length - 1;

      let currentOptionIndex = previousOptionIndex;
      let currentOptionIsDisabled = true;

      while (currentOptionIsDisabled) {
        const nextOptionIndex = clamp(
          currentOptionIndex + delta,
          lowerLimit,
          upperLimit
        );
        const isSame = nextOptionIndex === currentOptionIndex;
        currentOptionIndex = nextOptionIndex;
        if (isSame) break;
        currentOptionIsDisabled =
          filteredOptions[currentOptionIndex]?.disabled ?? false;
        if (
          currentOptionIsDisabled &&
          ((nextOptionIndex === lowerLimit && isNegative(delta)) ||
            (nextOptionIndex === upperLimit && isPositive(delta)))
        ) {
          currentOptionIndex = previousOptionIndex;
          break;
        }
      }
      const nextOptionSignature =
        filteredOptions[currentOptionIndex]?.signature ?? null;
      setHighlightSignature(nextOptionSignature);
      scrollToHighlightedOption(nextOptionSignature);
    },
    [filteredOptions, highlightSignature, scrollToHighlightedOption]
  );

  const resetHighlight = useCallback(() => {
    setHighlightSignature(null);
  }, [setHighlightSignature]);

  return [highlightSignature, walkHighlight, resetHighlight];
};

const useFilterKeyboardEvents = (
  walkHighlight: WalkHighlightFn,
  closeOptions: VoidFn,
  queryInputRef: RefObject<HTMLInputElement>,
  open?: boolean
) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") walkHighlight(1);
      if (event.key === "ArrowUp") walkHighlight(-1);
      if (event.key === "Escape") closeOptions();
    };

    let inputRef: typeof queryInputRef.current;

    // setTimeout is used to ensure the input is loaded once opened
    setTimeout(() => {
      if (!queryInputRef.current || !open) return;
      inputRef = queryInputRef.current;
      inputRef.addEventListener("keydown", onKeyDown, { passive: true });
    });
    return () => inputRef?.removeEventListener("keydown", onKeyDown);
  }, [walkHighlight, open, closeOptions, queryInputRef]);
};

const useFilterSubmitQuery = (
  highlightSignature: Nullable<FilterSignature>,
  filter: IFilter<Record<string, unknown>>,
  closeOptions: VoidFn
) => {
  return useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();

      if (!highlightSignature) return;
      const option = filter.options.find(
        ({ signature }) => signature === highlightSignature
      );
      if (!option) return;
      option[option.selected ? "unselect" : "select"]();
      closeOptions();
    },
    [filter, highlightSignature, closeOptions]
  );
};

export const useListFilter = (props: ListFilterProps) => {
  const logger = useLogger("ListFilter");

  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    if (isBoolean(props.open) && props.open !== open) setOpen(props.open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const filter = useSatitizedFilter(props, logger);

  const renderMulti = useMemo(
    () => filter.active && filter.selectedOptions.length > 1 && !filter.loading,
    [filter]
  );

  const { query, queryInputRef, setQuery } = useFilterQuery();

  const filteredOptions = useFilteredOptions(filter, query);

  const [highlightSignature, walkHighlight, resetHighlight] =
    useFilterHighlight(filteredOptions);

  const openOptions = useCallback(() => {
    if (open || filter.loading) return;
    setOpen(true);
    setQuery(null);
    resetHighlight();
    setTimeout(() => queryInputRef.current?.focus());
    if (props.onOpened) props.onOpened();
  }, [open, filter.loading, setQuery, resetHighlight, props, queryInputRef]);

  const closeOptions = useCallback(() => {
    const wasOpen = open;
    setOpen(false);
    setQuery(null);
    resetHighlight();
    if (props.onClosed && wasOpen) props.onClosed();
  }, [open, props, setQuery, resetHighlight]);

  const selectOptionOnEnter = useFilterSubmitQuery(
    highlightSignature,
    filter,
    closeOptions
  );

  const styleProps = useFilterStyleProps(filter, open, renderMulti);

  useFilterKeyboardEvents(walkHighlight, closeOptions, queryInputRef, open);

  const getOptionDivider = (signature: FilterSignature) => {
    return (
      filter.optionDividers.find(
        ({ beforeSignature }) => beforeSignature === signature
      ) ?? null
    );
  };

  const isQuerying = useMemo(
    () => isString(query) && !isEmptyString(query),
    [query]
  );

  return {
    filter,
    styleProps,
    renderMulti,
    queryInputRef,
    setQuery,
    isQuerying,
    filteredOptions,
    highlightSignature,
    openOptions,
    closeOptions,
    selectOptionOnEnter,
    open,
    getOptionDivider,
  };
};
