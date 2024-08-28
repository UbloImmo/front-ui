import {
  Nullable,
  isArray,
  isFunction,
  isNull,
  isObject,
  isString,
  type Nullish,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import { useState, useCallback, useEffect, useMemo } from "react";

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
    placeholder: "",
    searchable: false,
    Option: null,
    SelectedOption: null,
    controlIcon: "CaretDownFill",
  };

export const useSelectOptions = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  props: SelectInputProps<TValue, TExtraData>
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
    [mergedProps, logger]
  );

  /**
   * Effect used for loading initial select options if it is a function
   */
  useEffect(() => {
    loadOptions(null);
  }, [mergedProps.options, loadOptions]);

  return {
    options,
    initialOptions,
    isLoading,
    refetchOptions: loadOptions,
    mergedProps,
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
 * Assigns the "active" property to each SelectOption or SelectOptionGroup in the options array based on the provided value.
 *
 * @template TValue - The type of the value.
 * @param {SelectOptionOrGroup<TValue>[]} options - The array of SelectOption or SelectOptionGroup objects.
 * @param {TValue} value - The value to compare against.
 * @return {SelectOptionOrGroup<TValue>[]} - The modified array of SelectOption or SelectOptionGroup objects.
 */
const assignActiveOption = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  options: SelectOptionOrGroup<TValue, TExtraData>[],
  value: Nullable<TValue>
): SelectOptionOrGroup<TValue, TExtraData>[] => {
  return options.map(
    (optionOrGroup): SelectOptionOrGroup<TValue, TExtraData> => {
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

  const allFlattenOptions = useMemo(() => {
    return flattenSelectOptions(options);
  }, [options]);

  const isQuerying = useMemo(
    () => isString(autoCompleteQuery) && isNonEmptyString(autoCompleteQuery),
    [autoCompleteQuery]
  );

  useEffect(() => {
    if (
      isOpen &&
      isQuerying &&
      isString(autoCompleteQuery) &&
      (autoCompleteQuery !== activeOption?.label || !activeOption)
    ) {
      refetchOptions(
        isEmptyString(autoCompleteQuery) ? null : autoCompleteQuery
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoCompleteQuery, isQuerying]);

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

  const displayOptions = useMemo<
    SelectOptionOrGroup<TValue, TExtraData>[]
  >(() => {
    const rootOptions = isQuerying ? filteredOptions : allFlattenOptions;

    return assignActiveOption(options, internalValue)
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
  }, [isQuerying, filteredOptions, allFlattenOptions, options, internalValue]);

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
