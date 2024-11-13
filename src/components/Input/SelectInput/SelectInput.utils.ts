import {
  Nullable,
  isArray,
  isFunction,
  isNull,
  isObject,
  isString,
  type GenericFn,
  type Nullish,
  type NullishPrimitives,
  type VoidFn,
} from "@ubloimmo/front-util";
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  type RefObject,
  useLayoutEffect,
} from "react";

import { defaultCommonInputProps } from "../Input.common";

import {
  isEmptyString,
  isNonEmptyString,
  useLogger,
  useMergedProps,
} from "@utils";

import type {
  DefaultSelectInputProps,
  RefetchSelectOptionsFn,
  SelectInputProps,
  SelectOption,
  SelectOptionGroup,
  SelectOptionOrGroup,
  SelectOptionsQueryFn,
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
  };

export const useSelectOptions = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  props: Pick<SelectInputProps<TValue, TExtraData>, "options" | "filterOption">
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

  /**
   * Effect used for loading initial select options if it is a function
   */
  useEffect(() => {
    loadOptions(null);
  }, [loadOptions, mergedProps.options]);

  return {
    options,
    initialOptions,
    isLoading,
    refetchOptions: loadOptions,
    mergedProps,
    flattenedOptions,
  };
};

export const isSelectOption = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  optionOrGroup: SelectOptionOrGroup<TValue, TExtraData>
): optionOrGroup is SelectOption<TValue, TExtraData> => {
  return "value" in optionOrGroup && !("options" in optionOrGroup);
};

export const isSelectOptionGroup = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
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
  TExtraData extends NullishPrimitives = NullishPrimitives
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
  TExtraData extends NullishPrimitives = NullishPrimitives
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

export const useSelectValue = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  mergedProps: DefaultSelectInputProps<TValue, TExtraData>,
  options: SelectOptionOrGroup<TValue, TExtraData>[],
  flattenedOptions: SelectOption<TValue, TExtraData>[],
  refetchOptions: RefetchSelectOptionsFn,
  isOpen: boolean
) => {
  const [internalValue, setInternalValue] = useState<Nullable<TValue>>(
    mergedProps.value ?? null
  );

  useEffect(() => {
    if (mergedProps.uncontrolled) return;
    if (mergedProps.value !== internalValue) {
      setInternalValue(mergedProps.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value, mergedProps.uncontrolled]);

  const [autoCompleteQuery, setAutoCompleteQuery] = useState<Nullish<string>>(
    mergedProps.searchable ? "" : null
  );

  const isQuerying = useMemo(
    () => isString(autoCompleteQuery) && isNonEmptyString(autoCompleteQuery),
    [autoCompleteQuery]
  );

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
  }, [autoCompleteQuery]);

  const activeOption = useMemo(() => {
    return (
      flattenedOptions.find(({ value }) => value === internalValue) ?? null
    );
  }, [flattenedOptions, internalValue]);

  const filteredOptions = useMemo(() => {
    if (!mergedProps.searchable) {
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
    const rootOptions = isQuerying ? filteredOptions : flattenedOptions;

    return assignActiveOptions(
      options,
      (optionValue) => optionValue === internalValue
    )
      .map((optionOrGroup) => {
        if (isSelectOption(optionOrGroup)) {
          return rootOptions.find(
            (rootOption) => rootOption.value === optionOrGroup.value
          )
            ? optionOrGroup
            : null;
        }

        const groupOptions = optionOrGroup.options.filter((groupOption) =>
          rootOptions.find(
            (rootOption) => rootOption.value === groupOption.value
          )
        );

        if (!groupOptions.length) return null;

        return {
          ...optionOrGroup,
          options: groupOptions,
        };
      })
      .filter((optionOrGroup) => !isNull(optionOrGroup));
  }, [isQuerying, filteredOptions, flattenedOptions, options, internalValue]);

  useEffect(() => {
    if (
      activeOption &&
      activeOption.label &&
      activeOption.label !== autoCompleteQuery &&
      !isQuerying
    ) {
      setAutoCompleteQuery(activeOption.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  useEffect(() => {
    if (!mergedProps.onChange) return;

    if (activeOption) {
      mergedProps.onChange(activeOption.value);
    } else if (internalValue !== mergedProps.value) {
      mergedProps.onChange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  return {
    autoCompleteQuery,
    setAutoCompleteQuery,
    internalValue,
    setInternalValue,
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
