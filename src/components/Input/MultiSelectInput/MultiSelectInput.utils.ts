import { isNull } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useState } from "react";

import { assignActiveOptions } from "../SelectInput/SelectInput.utils";

import type { DefaultMultiSelectInputProps } from "./MultiSelectInput.types";
import type { SelectOptionOrGroup, SelectOption } from "../SelectInput";
import type { Nullable, NullishPrimitives } from "@ubloimmo/front-util";

const copySet = <TValue extends NullishPrimitives>(set: Set<TValue>) => {
  return new Set(Array.from(set));
};

export const useMultiSelectValue = <
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives
>(
  mergedProps: DefaultMultiSelectInputProps<TValue, TExtraData>,
  options: SelectOptionOrGroup<TValue, TExtraData>[],
  flattenedOptions: SelectOption<TValue, TExtraData>[]
) => {
  const [internalValue, setInternalValue] = useState<Set<TValue>>(
    new Set(mergedProps.value ?? [])
  );

  useEffect(() => {
    if (mergedProps.uncontrolled) return;
    const newValue = new Set(mergedProps.value ?? []);
    const intersection = internalValue.intersection(newValue);
    const isDifferent = intersection.size !== internalValue.size;
    if (isDifferent) {
      setInternalValue(newValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value, mergedProps.uncontrolled]);

  const clearInternalValue = useCallback(() => {
    // abort if there's nothing to clear
    if (!internalValue.size) return;
    setInternalValue(new Set<TValue>());
  }, [internalValue]);

  const selectOption = useCallback(
    (optionValue: Nullable<TValue>) => {
      // clicking on any `null` option will unselect all options
      if (isNull(optionValue)) {
        clearInternalValue();
        return;
      }
      const updatedCopy = copySet(internalValue).add(optionValue);
      setInternalValue(updatedCopy);
    },
    [clearInternalValue, internalValue]
  );

  const unselectOption = useCallback(
    (optionValue: Nullable<TValue>) => {
      // since null options clear the set, there is nothing to unselect;
      if (isNull(optionValue)) {
        return;
      }
      const copy = copySet(internalValue);
      const hasBeenDeleted = copy.delete(optionValue);
      // only update state if the option was selected in the first place
      if (hasBeenDeleted) {
        setInternalValue(copy);
      }
    },
    [internalValue]
  );

  const activeOptions = useMemo(() => {
    return flattenedOptions.filter(
      (option) => !isNull(option.value) && internalValue.has(option.value)
    );
  }, [flattenedOptions, internalValue]);

  const displayOptions = useMemo(() => {
    return assignActiveOptions(options, (optionValue) =>
      // any null option is active if the set is empty, else it's active if the set has it
      isNull(optionValue) ? !internalValue.size : internalValue.has(optionValue)
    );
  }, [options, internalValue]);

  useEffect(() => {
    if (!mergedProps.onChange) return;
    if (internalValue.size) {
      mergedProps.onChange(Array.from(internalValue));
    } else {
      mergedProps.onChange([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue]);

  return {
    internalValue,
    activeOptions,
    displayOptions,
    setInternalValue,
    selectOption,
    unselectOption,
  };
};
