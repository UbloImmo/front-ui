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
  type Filter,
  type FilterOption,
} from "@/components/List/modules";
import { useClearFilterOption } from "@/components/List/modules/FilterOption/FilterOption.hook";
import {
  clamp,
  isEmptyString,
  isNegative,
  isPositive,
  useLogger,
} from "@utils";

import type { ListFilterProps, ListFilterStyleProps } from "./ListFilter.types";

const FILTER_OPTION_LABEL_MAX_SINGLE_LINE_LENGTH = 34;

/**
 * Hook that returns a sanitized filter based on the provided props.
 * If a filter is directly provided in props, it will be returned as-is.
 * If a signature is provided, it will attempt to find the corresponding filter.
 * If neither is provided, returns an empty disabled filter.
 *
 * @param {ListFilterProps} props - The component props containing filter or signature
 * @param {Logger} logger - Logger instance for warnings
 * @returns {Filter<Record<string, unknown>>} The sanitized filter instance
 */
const useSatitizedFilter = (
  props: ListFilterProps,
  logger: Logger
): Filter<Record<string, unknown>> => {
  const { getFilterBySignature } = useListContext<Record<string, unknown>>();

  return useMemo<Filter<Record<string, unknown>>>(() => {
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

/**
 * Hook that returns style props for a filter component
 * @param {Filter<Record<string, unknown>>} filter - The filter instance
 * @param {boolean} [open] - Whether the filter options are open
 * @param {boolean} [renderMulti] - Whether to render in multi-line mode
 * @returns {ListFilterStyleProps} Style props for the filter component
 */
const useFilterStyleProps = (
  filter: Filter<Record<string, unknown>>,
  open?: boolean,
  renderMulti?: boolean
): ListFilterStyleProps => {
  return useMemo<ListFilterStyleProps>(() => {
    const { disabled, loading, active } = filter;
    return {
      disabled,
      loading,
      active,
      multi: renderMulti ?? false,
      open,
    };
  }, [filter, open, renderMulti]);
};

/**
 * Hook to manage filter query state and input ref
 * @returns {{
 *   queryInputRef: React.RefObject<HTMLInputElement | null>,
 *   query: string | null,
 *   setQuery: React.Dispatch<React.SetStateAction<string | null>>
 * }} Query state and ref
 */
const useFilterQuery = () => {
  const queryInputRef = useRef<Nullable<HTMLInputElement>>(null);

  const [query, setQuery] = useState<Nullable<string>>("");

  return {
    queryInputRef,
    query,
    setQuery,
  };
};

/**
 * Hook that filters and sorts filter options based on a search query
 * @template T - The type of data being filtered
 * @param {Filter<T>} filter - The filter instance containing options and sort preferences
 * @param {string | null} query - The search query to filter options by
 * @returns {FilterOption<T>[]} Array of filtered and sorted options with clear option appended
 */
const useFilteredOptions = (
  filter: Filter<Record<string, unknown>>,
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

/**
 * Hook that manages keyboard-based highlighting and scrolling of filter options
 * @template T - The type of data being filtered
 * @param {FilterOption<Record<string, unknown>>[]} filteredOptions - Array of filtered options to highlight
 * @returns {[Nullable<FilterSignature>, WalkHighlightFn, VoidFn]} Tuple containing: [Current highlighted option signature, Function to move highlight up/down, Function to reset highlight]
 */
const useFilterHighlight = (
  filteredOptions: FilterOption<Record<string, unknown>>[]
): [Nullable<FilterSignature>, WalkHighlightFn, VoidFn] => {
  const [highlightSignature, setHighlightSignature] =
    useState<Nullable<FilterSignature>>(null);

  /**
   * Scrolls the highlighted option into view
   * @param {Nullable<FilterSignature>} signature - Signature of option to scroll to
   */
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

  /**
   * Moves the highlight up or down through the filtered options
   * @param {1 | -1} delta - Direction to move (-1 for up, 1 for down)
   */
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

  /**
   * Resets the highlight state to null
   */
  const resetHighlight = useCallback(() => {
    setHighlightSignature(null);
  }, [setHighlightSignature]);

  return [highlightSignature, walkHighlight, resetHighlight];
};

/**
 * Hook to handle keyboard events for the filter's query input
 * @param {WalkHighlightFn} walkHighlight - Function to walk through the filtered options
 * @param {VoidFn} closeOptions - Function to close the options dropdown
 * @param {RefObject<HTMLInputElement>} queryInputRef - Ref to the query input element
 * @param {boolean} [open] - Whether the options dropdown is open
 * @returns {void}
 */
const useFilterKeyboardEvents = (
  walkHighlight: WalkHighlightFn,
  closeOptions: VoidFn,
  queryInputRef: RefObject<HTMLInputElement>,
  open?: boolean
): void => {
  useEffect(() => {
    /**
     * Prevents default event behavior and executes callback
     * @param {KeyboardEvent} event - Keyboard event to prevent
     * @param {VoidFn} callback - Function to execute after preventing default
     * @returns {void}
     */
    const prevent = (event: KeyboardEvent, callback: VoidFn): void => {
      event.preventDefault();
      event.stopPropagation();
      callback();
    };

    /**
     * Handles keydown events on the query input
     * @param {KeyboardEvent} event - Keyboard event from the query input
     * @returns {void}
     */
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "ArrowDown") prevent(event, () => walkHighlight(1));
      if (event.key === "ArrowUp") prevent(event, () => walkHighlight(-1));
      if (event.key === "Escape") prevent(event, closeOptions);
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

/**
 * Hook to handle form submission for the filter's query input
 * @param {Nullable<FilterSignature>} highlightSignature - Signature of the currently highlighted option
 * @param {Filter<Record<string, unknown>>} filter - Filter instance containing options and selection state
 * @param {VoidFn} closeOptions - Function to close the options dropdown
 * @returns {(event: FormEvent<HTMLFormElement>) => void} Form submit handler function
 */
const useFilterSubmitQuery = (
  highlightSignature: Nullable<FilterSignature>,
  filter: Filter<Record<string, unknown>>,
  closeOptions: VoidFn
) => {
  return useCallback(
    /**
     * Handles form submission events for the filter query
     * @param {FormEvent<HTMLFormElement>} event - Form submission event
     * @returns {void}
     */
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

/**
 * Custom hook to manage the state and behavior of a list filter component
 * @template T - Type of the data being filtered
 * @param {ListFilterProps} props - Props passed to the ListFilter component
 * @returns Object containing filter state and handler functions
 */
export const useListFilter = (props: ListFilterProps) => {
  const logger = useLogger("ListFilter");

  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    if (isBoolean(props.open) && props.open !== open) setOpen(props.open);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const filter = useSatitizedFilter(props, logger);

  const renderMulti = useMemo(
    () =>
      filter.active &&
      !filter.loading &&
      (filter.selectedOptions.length > 1 ||
        (filter.selectedOptions[0]?.label?.length ?? 0) >=
          FILTER_OPTION_LABEL_MAX_SINGLE_LINE_LENGTH - filter.label.length),
    [filter]
  );

  const { query, queryInputRef, setQuery } = useFilterQuery();

  const filteredOptions = useFilteredOptions(filter, query);

  const [highlightSignature, walkHighlight, resetHighlight] =
    useFilterHighlight(filteredOptions);

  /**
   * Opens the options dropdown if not already open and filter is not loading
   * @returns {void}
   */
  const openOptions = useCallback(() => {
    if (open || filter.loading) return;
    setOpen(true);
    setQuery(null);
    resetHighlight();
    setTimeout(() => queryInputRef.current?.focus());
    if (props.onOpened) props.onOpened();
  }, [open, filter.loading, setQuery, resetHighlight, props, queryInputRef]);

  /**
   * Closes the options dropdown and resets state
   * @returns {void}
   */
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

  /**
   * Gets the divider configuration for an option by its signature
   * @param {FilterSignature} signature - Signature of the option
   * @returns {Nullable<FilterOptionDivider>} Divider configuration or null if none exists
   */
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
