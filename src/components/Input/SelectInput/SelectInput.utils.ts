import {
  Nullable,
  isArray,
  isFunction,
  isObject,
  isString,
  type Nullish,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { useState, useCallback, useEffect, useMemo } from "react";

import { defaultCommonInputProps } from "../Input.common";

import { isNonEmptyString, useLogger, useMergedProps } from "@utils";

import type {
  DefaultSelectInputProps,
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
    placeholder: "",
    searchable: false,
  };

export const useSelectOptions = <TValue extends NullishPrimitives>(
  props: SelectInputProps<TValue>
) => {
  const logger = useLogger("SelectInput");

  const mergedProps = useMergedProps<
    DefaultSelectInputProps<TValue>,
    SelectInputProps<TValue>
  >(defaultSelectInputProps as DefaultSelectInputProps<TValue>, props);
  /**
   * Initial select options from props
   */
  const [initialOptions, setInitialOptions] = useState<
    SelectOptionOrGroup<TValue>[]
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
  const loadOptions = useCallback(async () => {
    if (isLoading) return;
    if (!isFunction<SelectOptionsQueryFn<TValue>>(mergedProps.options)) {
      if (isArray(mergedProps.options)) {
        setOptions(mergedProps.options);
        setInitialOptions(mergedProps.options);
      }
      return;
    }
    setIsLoading(true);
    try {
      const data = await mergedProps.options();
      setOptions(data);
      setInitialOptions(data);
    } catch (e) {
      logger.error(e);
      logger.warn("Failed to load form data");
    }
    setIsLoading(false);
  }, [mergedProps, logger, isLoading]);

  /**
   * Effect used for loading initial select options if it is a function
   */
  useEffect(() => {
    loadOptions();
  }, [mergedProps.options, loadOptions]);

  return {
    options,
    initialOptions,
    isLoading,
    refetchOptions: loadOptions,
    mergedProps,
  };
};

export const isSelectOption = <TValue extends NullishPrimitives>(
  optionOrGroup: SelectOptionOrGroup<TValue>
): optionOrGroup is SelectOption<TValue> => {
  return "value" in optionOrGroup && !("options" in optionOrGroup);
};

export const isSelectOptionGroup = <TValue extends NullishPrimitives>(
  optionOrGroup: SelectOptionOrGroup<TValue>
): optionOrGroup is SelectOptionGroup<TValue> => {
  return !("value" in optionOrGroup) && "options" in optionOrGroup;
};

/**
 * Assigns the "active" property to each SelectOption or SelectOptionGroup in the options array based on the provided value.
 *
 * @template TValue - The type of the value.
 * @param {SelectOptionOrGroup<TValue>[]} options - The array of SelectOption or SelectOptionGroup objects.
 * @param {TValue} value - The value to compare against.
 * @return {SelectOptionOrGroup<TValue>[]} - The modified array of SelectOption or SelectOptionGroup objects.
 */
const assignActiveOption = <TValue extends NullishPrimitives>(
  options: SelectOptionOrGroup<TValue>[],
  value: Nullable<TValue>
): SelectOptionOrGroup<TValue>[] => {
  return options.map((optionOrGroup): SelectOptionOrGroup<TValue> => {
    if (isSelectOption(optionOrGroup))
      return {
        ...optionOrGroup,
        active: optionOrGroup.value === value,
      };

    return {
      ...optionOrGroup,
      options: optionOrGroup.options.map((groupOption) => ({
        ...groupOption,
        active: groupOption.value === value,
      })),
    };
  });
};

const flattenOptions = <TValue extends NullishPrimitives>(
  options: SelectOptionOrGroup<TValue>[]
): SelectOption<TValue>[] => {
  return options.flatMap((option) => {
    if (isSelectOption(option)) {
      return option;
    }

    return option.options;
  });
};

export const useSelectValue = <TValue extends NullishPrimitives>(
  mergedProps: DefaultSelectInputProps<TValue>,
  options: SelectOptionOrGroup<TValue>[]
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

  const allFlattenOptions = useMemo(() => {
    return flattenOptions(options);
  }, [options]);

  const isQuerying = useMemo(
    () => isString(autoCompleteQuery) && isNonEmptyString(autoCompleteQuery),
    [autoCompleteQuery]
  );

  const activeOption = useMemo(() => {
    return (
      allFlattenOptions.find(({ value }) => value === internalValue) ?? null
    );
  }, [allFlattenOptions, internalValue]);

  const filteredOptions = useMemo(() => {
    if (!mergedProps.searchable) {
      return allFlattenOptions;
    }
    if (
      isString(autoCompleteQuery) &&
      isObject(activeOption) &&
      autoCompleteQuery === activeOption?.label
    ) {
      return allFlattenOptions;
    }

    return allFlattenOptions.filter((option) => {
      return option.label
        .toLowerCase()
        .includes(autoCompleteQuery?.toLowerCase() ?? "");
    });
  }, [
    activeOption,
    allFlattenOptions,
    autoCompleteQuery,
    mergedProps.searchable,
  ]);

  const displayOptions = useMemo(() => {
    const rootOptions = isQuerying ? filteredOptions : allFlattenOptions;

    return assignActiveOption(rootOptions, internalValue);
  }, [filteredOptions, internalValue, isQuerying, allFlattenOptions]);

  useEffect(() => {
    if (
      activeOption &&
      activeOption.label &&
      activeOption.label !== autoCompleteQuery
    ) {
      setAutoCompleteQuery(activeOption.label);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeOption]);

  useEffect(() => {
    if (!mergedProps.onChange) return;

    if (activeOption) {
      mergedProps.onChange(activeOption.value);
    } else {
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
