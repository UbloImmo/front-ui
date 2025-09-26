import {
  type Nullable,
  isArray,
  isFunction,
  isNull,
  isObject,
  isString,
  type GenericFn,
  type Nullish,
  type NullishPrimitives,
  type VoidFn,
  AsyncFn,
  isNullish,
} from "@ubloimmo/front-util";
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  type RefObject,
  useLayoutEffect,
  useRef,
  useTransition,
  useReducer,
} from "react";

import { defaultCommonInputProps } from "../Input.common";

import { breakpoints } from "@/sizes";
import { UNIT_PX } from "@types";
import {
  arrayOf,
  type ComparisonValue,
  compare,
  isEmptyString,
  isNonEmptyString,
  toFixed,
  useLogger,
  useMergedProps,
  useUikitTranslation,
} from "@utils";

import type {
  SelectInputCreateOptionFn,
  SelectInputIngestUnknowValueFn,
  DefaultSelectInputProps,
  RefetchSelectOptionsFn,
  SelectInputProps,
  SelectOption,
  SelectOptionGroup,
  SelectOptionOrGroup,
  SelectOptionsQueryFn,
  SelectInputOptionProps,
  SelectInputCreateButtonTemplateFn,
} from "./SelectInput.types";

export const defaultSelectInputProps: DefaultSelectInputProps<NullishPrimitives> =
  {
    ...defaultCommonInputProps,
    value: null,
    onChange: null,
    name: null,
    options: [],
    filterOption: null,
    placeholder: "",
    searchable: false,
    Option: null,
    SelectedOption: null,
    controlIcon: "CaretDownFill",
    clearable: false,
    onOptionChange: null,
    alwaysDisplayActiveOption: false,
    creatable: false,
  };

/**
 * Manages the autoComplete query of a select input
 */
export const useSelectAutoCompleteQuery = (
  searchable?: Nullish<boolean | "manual">
) => {
  const [autoCompleteQuery, setAutoCompleteQuery] = useState<Nullable<string>>(
    searchable ? "" : null
  );

  return {
    autoCompleteQuery,
    setAutoCompleteQuery,
  };
};

const useSelectOptionCreation = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  {
    creatable: creatableBase,
  }: Pick<SelectInputProps<TValue, TExtraData>, "creatable">,
  internalOptions: SelectOptionOrGroup<TValue, TExtraData>[],
  flattenedOptions: SelectOption<TValue, TExtraData>[],
  isLoading: boolean
) => {
  const logger = useLogger("SelectInput::creation");
  const creatable = useMemo(() => creatableBase || null, [creatableBase]);

  /**
   * Set of loaded option values for fast(ish) existence check
   */
  const loadedOptionValues = useMemo(
    () =>
      new Set<ComparisonValue<Nullable<TValue>>>(
        flattenedOptions.map(({ value }) => compare.normalize(value))
      ),
    [flattenedOptions]
  );

  /**
   * Checks whether a candidate value needs to be registered
   */
  const hasAlreadyBeenLoadedOrCreated = useCallback(
    (
      created: SelectOption<TValue, TExtraData>[],
      valueToCheck: Nullable<TValue>
    ) => {
      const createdValues = new Set(
        created.map(({ value }) => compare.normalize(value))
      );
      return createdValues
        .union(loadedOptionValues)
        .has(compare.normalize(valueToCheck));
    },
    [loadedOptionValues]
  );

  /**
   * Reducer that handles created options and their registration
   */
  const [createdOptions, registerCreatedOption] = useReducer(
    (
      options: SelectOption<TValue, TExtraData>[],
      optionToRegister: SelectOption<TValue, TExtraData>
    ) => {
      // abort if creatable is not enabled -> options is always []
      if (!creatable) return options;
      // ensure we don't already have this option, either created or internally loaded
      if (hasAlreadyBeenLoadedOrCreated(options, optionToRegister.value))
        return options;
      // if all checks are successful, add the created option
      return [...options, optionToRegister];
    },
    []
  );

  /**
   * Creates a new option from a string label using `creatable.createOption`
   */
  const createOption = useCallback(
    async (
      label: string
    ): Promise<Nullable<SelectOption<TValue, TExtraData>>> => {
      try {
        // abort if needed props are missing
        if (!creatable) return null;
        if (
          !isFunction<SelectInputCreateOptionFn<TValue, TExtraData>>(
            creatable.createOption
          )
        )
          return null;
        // create option using props callback
        const createdOption = await creatable.createOption(label);
        if (!createdOption) return null;
        registerCreatedOption(createdOption);
        // await delay(0);
        return createdOption;
      } catch (error) {
        logger.error(error);
        if (creatable?.onCreationError)
          creatable.onCreationError(error as Error, label);
        return null;
      }
    },
    [creatable, logger]
  );

  /**
   * Creates a new option from an ingested value using `creatable.ingestUnknownValue`
   */
  const ingestValue = useCallback(
    async (unknownValue: TValue) => {
      if (
        !creatable ||
        isLoading ||
        !isFunction<SelectInputIngestUnknowValueFn<TValue, TExtraData>>(
          creatable.ingestUnknownValue
        ) ||
        hasAlreadyBeenLoadedOrCreated(createdOptions, unknownValue)
      )
        return;
      const ingestedOption = await creatable.ingestUnknownValue(unknownValue);
      if (!ingestedOption) return;
      registerCreatedOption(ingestedOption);
    },
    [creatable, createdOptions, hasAlreadyBeenLoadedOrCreated, isLoading]
  );

  /**
   * Superset of internal options with created options appended
   */
  const mergedOptions = useMemo<
    SelectOptionOrGroup<TValue, TExtraData>[]
  >(() => {
    if (!creatable || !createdOptions.length) return internalOptions;
    if (isNonEmptyString(creatable.createdOptionsGroupLabel))
      return internalOptions.concat([
        {
          label: creatable.createdOptionsGroupLabel,
          options: createdOptions,
        },
      ]);
    return internalOptions.concat(createdOptions);
  }, [internalOptions, createdOptions, creatable]);

  /**
   * Superset of internal flattened options with created options appended
   */
  const mergedFlattenedOptions = useMemo(() => {
    if (!creatable || !createdOptions.length) return flattenedOptions;
    return flattenedOptions.concat(createdOptions);
  }, [createdOptions, flattenedOptions, creatable]);

  const tl = useUikitTranslation();

  const getCreateButtonProps = useCallback(
    (
      autoCompleteQuery: string,
      onSelectCallback: AsyncFn<[string], void>
    ): SelectInputOptionProps<TValue, TExtraData> => {
      const value = null;
      const label = isFunction<SelectInputCreateButtonTemplateFn>(
        creatable?.createButtonLabelTemplate
      )
        ? creatable.createButtonLabelTemplate(autoCompleteQuery)
        : tl.action.create(`"${autoCompleteQuery}"`);
      const style = creatable?.createButtonStyle ?? {};
      const Option = creatable?.CustomCreateButton;
      const onSelect = () => onSelectCallback(autoCompleteQuery);
      return {
        icon: "PlusCircle",
        ...style,
        value,
        label,
        Option,
        onSelect,
      };
    },
    [creatable, tl.action]
  );

  return {
    createdOptions,
    createOption,
    ingestValue,
    mergedOptions,
    mergedFlattenedOptions,
    getCreateButtonProps,
  };
};

export const useSelectOptions = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  props: Pick<
    SelectInputProps<TValue, TExtraData>,
    "options" | "filterOption" | "creatable"
  >,
  autoCompleteQuery: Nullable<string>
) => {
  const logger = useLogger("SelectInput");

  const mergedProps = useMergedProps<
    DefaultSelectInputProps<TValue, TExtraData>,
    SelectInputProps<TValue, TExtraData>
  >(
    defaultSelectInputProps as DefaultSelectInputProps<TValue, TExtraData>,
    props
  );

  /**
   * Initial select options from props
   */
  const [initialOptions, setInitialOptions] = useState<
    SelectOptionOrGroup<TValue, TExtraData>[]
  >(() => {
    if (isArray(mergedProps.options)) return mergedProps.options;
    return [];
  });

  /**
   * Flag used for tracking initial data load
   */
  const [isLoading, setIsLoading] = useState(isFunction(mergedProps.options));

  /**
   * Internal select options
   */
  const [options, setOptions] = useState(initialOptions);

  /**
   * Loads select options from query into `data` and `initialData` states
   * white updating `isLoading` state
   */
  const loadOptions = useCallback<RefetchSelectOptionsFn>(
    async (query: Nullable<string>) => {
      if (
        !isFunction<SelectOptionsQueryFn<TValue, TExtraData>>(
          mergedProps.options
        )
      ) {
        if (isArray(mergedProps.options)) {
          setOptions(mergedProps.options);
          setInitialOptions(mergedProps.options);
        }
        return;
      }
      setIsLoading(true);
      try {
        const data = await mergedProps.options(query ?? null);
        setOptions(data);
        setInitialOptions(data);
      } catch (e) {
        logger.error(e);
        logger.warn("Failed to load form data");
      }
      setIsLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mergedProps.options, logger]
  );

  const flattenedOptions = useMemo(() => {
    const allOptions = flattenSelectOptions(options);
    if (!mergedProps.filterOption) return allOptions;
    return allOptions.filter(mergedProps.filterOption);
  }, [mergedProps.filterOption, options]);

  const {
    mergedOptions,
    mergedFlattenedOptions,
    createOption,
    ingestValue,
    getCreateButtonProps,
  } = useSelectOptionCreation(props, options, flattenedOptions, isLoading);

  /**
   * Effect used for loading initial select options if it is a function and / or it changes
   * Passes the current autoComplete query on reload
   *
   * @todo
   * Find out if this behavior is needed.
   * If not, remove this useEffect's dependencies to make it only run on first render
   */
  useEffect(() => {
    loadOptions(autoCompleteQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadOptions, mergedProps.options]);

  return {
    options: mergedOptions,
    initialOptions,
    isLoading,
    refetchOptions: loadOptions,
    mergedProps,
    flattenedOptions: mergedFlattenedOptions,
    createOption,
    ingestValue,
    getCreateButtonProps,
  };
};

export const isSelectOption = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  optionOrGroup: SelectOptionOrGroup<TValue, TExtraData>
): optionOrGroup is SelectOption<TValue, TExtraData> => {
  return "value" in optionOrGroup && !("options" in optionOrGroup);
};

export const isSelectOptionGroup = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  optionOrGroup: SelectOptionOrGroup<TValue, TExtraData>
): optionOrGroup is SelectOptionGroup<TValue, TExtraData> => {
  return !("value" in optionOrGroup) && "options" in optionOrGroup;
};

/**
 * Assigns an 'active' property to each option in the given array of options or option groups.
 *
 * @template TValue - The type of the option value, extending NullishPrimitives.
 * @template TExtraData - The type of extra data associated with the option, extending NullishPrimitives.
 * @param {SelectOptionOrGroup<TValue, TExtraData>[]} options - The array of options or option groups to process.
 * @param {(value: Nullable<TValue>) => boolean} isOptionActive - A function that determines if an option is active based on its value.
 * @returns {SelectOptionOrGroup<TValue, TExtraData>[]} The processed array with 'active' properties assigned.
 */
export const assignActiveOptions = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  options: SelectOptionOrGroup<TValue, TExtraData>[],
  isOptionActive: GenericFn<[Nullable<TValue>], boolean>
): SelectOptionOrGroup<TValue, TExtraData>[] => {
  return options.map(
    (optionOrGroup): SelectOptionOrGroup<TValue, TExtraData> => {
      if (isSelectOption(optionOrGroup))
        return {
          ...optionOrGroup,
          active: isOptionActive(optionOrGroup.value),
        };

      return {
        ...optionOrGroup,
        options: optionOrGroup.options.map((groupOption) => ({
          ...groupOption,
          active: isOptionActive(groupOption.value),
        })),
      };
    }
  );
};

export const flattenSelectOptions = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  options: SelectOptionOrGroup<TValue, TExtraData>[]
): SelectOption<TValue, TExtraData>[] => {
  return options.flatMap((option) => {
    if (isSelectOption(option)) {
      return option;
    }

    return option.options;
  });
};

const getOptionByValue = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  flatOptions: SelectOption<TValue, TExtraData>[],
  targetValue: Nullable<TValue>
) => {
  const opt = flatOptions.find(({ value }) =>
    compare(value, targetValue, compare.eq, "both")
  );
  return opt ?? null;
};

export const useSelectUnknownValueIngestion = <
  TValue extends NullishPrimitives,
>(
  tryIngestingUnknownValue: AsyncFn<[unknownValue: TValue]>,
  isLoading: boolean,
  currentValue: Nullable<TValue>
) => {
  useEffect(() => {
    if (isLoading || isNullish(currentValue)) return;
    tryIngestingUnknownValue(currentValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentValue]);
};

export const useSelectValue = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
>(
  mergedProps: DefaultSelectInputProps<TValue, TExtraData>,
  options: SelectOptionOrGroup<TValue, TExtraData>[],
  flattenedOptions: SelectOption<TValue, TExtraData>[],
  refetchOptions: RefetchSelectOptionsFn,
  isOpen: boolean,
  autoCompleteQuery: Nullable<string>,
  setAutoCompleteQuery: VoidFn<[query: Nullable<string>]>
) => {
  const [internalValue, _setInternalValue] = useState<Nullable<TValue>>(
    mergedProps.value ?? null
  );

  const activeOption = useMemo<
    Nullable<SelectOption<TValue, TExtraData>>
  >(() => {
    return getOptionByValue(flattenedOptions, internalValue);
  }, [flattenedOptions, internalValue]);

  const [_, startTransition] = useTransition();

  const setInternalValue = useCallback(
    (setValue: Nullable<TValue>) => {
      startTransition(() => {
        _setInternalValue(setValue);
        const option = getOptionByValue(flattenedOptions, setValue);
        setAutoCompleteQuery(option?.label ?? null);
      });
    },
    [flattenedOptions, setAutoCompleteQuery]
  );

  const clearInternalValue = useCallback(() => {
    startTransition(() => {
      _setInternalValue(null);
      setAutoCompleteQuery(null);
    });
  }, [setAutoCompleteQuery]);

  // track external value with internal state
  useEffect(() => {
    if (mergedProps.uncontrolled) return;

    if (mergedProps.value !== internalValue) {
      setInternalValue(mergedProps.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  const isQuerying = useMemo(
    () => isString(autoCompleteQuery) && isNonEmptyString(autoCompleteQuery),
    [autoCompleteQuery]
  );

  // trigger options reload when query changes or select opens to an empty value when searchable
  useEffect(() => {
    if (
      isOpen &&
      isString(autoCompleteQuery) &&
      mergedProps.searchable &&
      (autoCompleteQuery !== activeOption?.label || !activeOption)
    ) {
      refetchOptions(
        isEmptyString(autoCompleteQuery) ? null : autoCompleteQuery
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCompleteQuery, isOpen]);

  const filteredOptions = useMemo(() => {
    if (!mergedProps.searchable || mergedProps.searchable === "manual") {
      return flattenedOptions;
    }
    if (
      isString(autoCompleteQuery) &&
      isObject(activeOption) &&
      autoCompleteQuery === activeOption?.label
    ) {
      return flattenedOptions;
    }

    return flattenedOptions.filter((option) => {
      return option.label
        .toLowerCase()
        .includes(autoCompleteQuery?.toLowerCase() ?? "");
    });
  }, [
    activeOption,
    flattenedOptions,
    autoCompleteQuery,
    mergedProps.searchable,
  ]);

  const displayOptions = useMemo<
    SelectOptionOrGroup<TValue, TExtraData>[]
  >(() => {
    let rootOptions = isQuerying ? filteredOptions : flattenedOptions;

    if (
      !rootOptions.length &&
      !!activeOption &&
      mergedProps.alwaysDisplayActiveOption
    ) {
      rootOptions = [activeOption];
    }
    const rootOptionValues = new Set(rootOptions.map(({ value }) => value));

    const referenceOptions: typeof options =
      !!options.length ||
      !activeOption ||
      !mergedProps.alwaysDisplayActiveOption
        ? options
        : [activeOption];
    const referenceOptionsValues = new Set(
      referenceOptions.flatMap((o) =>
        isSelectOption(o) ? [o.value] : o.options.map((oo) => oo.value)
      )
    );

    if (activeOption && !referenceOptionsValues.has(activeOption.value)) {
      referenceOptions.push(activeOption);
    }

    const optionGroupsToDisplay: SelectOptionOrGroup<TValue, TExtraData>[] =
      referenceOptions
        .map((optionOrGroup) => {
          if (isSelectOption(optionOrGroup)) {
            if (rootOptionValues.has(optionOrGroup.value)) return optionOrGroup;
            return null;
          }
          const groupOptions = optionOrGroup.options.filter((option) =>
            rootOptionValues.has(option.value)
          );
          if (!groupOptions.length) return null;
          if (!groupOptions.length) return null;

          if (!groupOptions.length) return null;

          return {
            ...optionOrGroup,
            options: groupOptions,
          };
        })
        .filter((optionOrGroup) => !isNull(optionOrGroup));

    return assignActiveOptions(
      optionGroupsToDisplay,
      (optionValue) => optionValue === internalValue
    );
  }, [
    isQuerying,
    filteredOptions,
    flattenedOptions,
    options,
    internalValue,
    activeOption,
    mergedProps.alwaysDisplayActiveOption,
  ]);

  useEffect(() => {
    if (activeOption && activeOption.value !== mergedProps.value) {
      mergedProps.onChange?.(activeOption.value);
      mergedProps.onOptionChange?.(activeOption);
    } else if (internalValue !== mergedProps.value && isNull(internalValue)) {
      mergedProps.onChange?.(null);
      mergedProps.onOptionChange?.(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption, internalValue]);

  return {
    autoCompleteQuery,
    setAutoCompleteQuery,
    internalValue,
    setInternalValue,
    // setInternalValueFromCreation,
    clearInternalValue,
    isQuerying,
    activeOption,
    displayOptions,
  };
};

export const useSelectInputKeyboardEvents = (
  wrapperRef: RefObject<Nullable<HTMLDivElement>>,
  inputId: string,
  closeOptions: VoidFn
) => {
  useLayoutEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!e.target) return;
      if ("id" in e.target && e.target.id === inputId) return;
      if (!wrapperRef.current) return;
      if (wrapperRef.current.contains(e.target as HTMLElement)) return;

      closeOptions();
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeOptions();
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [closeOptions, inputId, wrapperRef]);
};

const getDefaultWrapperHeight = () => {
  return (window.innerHeight <= breakpoints.XS ? 10 : 8) * UNIT_PX;
};

const INTERSECTION_PADDING = 12;
const INTERSECTION_THRESHOLD_COUNT = 10;
const INTERSECTION_THRESHOLDS = arrayOf(INTERSECTION_THRESHOLD_COUNT, (index) =>
  toFixed(index / INTERSECTION_THRESHOLD_COUNT, 2)
);

/**
 * Hook that handles the intersection of the select input options container with the viewport.
 * It automatically shifts the options container up or down when it would otherwise be clipped
 * by the viewport boundaries.
 *
 * @param {boolean} isOpen - Whether the options container is open
 * @param {RefObject<HTMLDivElement>} [wrapperRef] - Reference to the wrapper element
 * @returns Object containing:
 *   - isIntersecting: Whether the options container is intersecting with the viewport boundaries
 *   - isShifted: Whether the options container should be shifted up to avoid clipping
 *   - optionsContainerRef: Reference to attach to the options container element
 */
export const useSelectInputIntersection = (
  isOpen: boolean,
  wrapperRef?: RefObject<HTMLDivElement>
) => {
  const optionsContainerRef = useRef<HTMLDivElement>(null);

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const [isShifted, setIsShifted] = useState<boolean>(false);

  useLayoutEffect(() => {
    // do nothing if IntersectionObserver is not supported
    if (!("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        const intersecting = entry.intersectionRatio < 1;
        // check if the element will intersect if shifted up
        const height = entry.boundingClientRect.height;
        const top = entry.boundingClientRect.top;
        const rootTop = entry.rootBounds?.top ?? 0;
        const rootBottom = entry.rootBounds?.bottom ?? window.innerHeight;
        // get height of the wrapper, since we need to take it into account when shifting
        const wrapperHeight =
          wrapperRef?.current?.getBoundingClientRect().height ??
          getDefaultWrapperHeight();
        // compute needed available space to shift
        const shiftedToTop =
          top - height - wrapperHeight + INTERSECTION_PADDING;
        const shiftedToBottom =
          top + height + wrapperHeight - INTERSECTION_PADDING;
        // check if we can shift
        const canShift = isShifted
          ? shiftedToBottom <= rootBottom
          : shiftedToTop >= rootTop;
        // check if we should shift
        const shouldShift = canShift && intersecting;
        setIsIntersecting(intersecting);
        if (shouldShift) {
          setIsShifted(!isShifted);
        }
      },
      {
        root: window.document,
        threshold: INTERSECTION_THRESHOLDS,
      }
    );

    if (optionsContainerRef.current) {
      observer.observe(optionsContainerRef.current);
    }

    // reset the shift state when the options container is closed
    // so that options always try to appear down from the input
    if (!isOpen && isShifted) {
      setIsShifted(false);
    }

    return () => observer.disconnect();
  }, [isOpen, isShifted, wrapperRef]);

  return {
    isIntersecting,
    isShifted,
    optionsContainerRef,
  };
};
