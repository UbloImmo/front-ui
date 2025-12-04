import { isFunction, isString, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  autoFormatMonthYear,
  formatMonthYearForBackend,
  incrementMonthOrYear,
  isValidMonthYearStr,
  yearMonthToMonthYear,
} from "./MonthYearInput.utils";
import { defaultCommonInputProps, StyledInput } from "../Input.common";
import {
  useInputId,
  useInputOnChange,
  useInputRef,
  useInputStyles,
} from "../Input.utils";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type {
  MonthYearInputDefaultProps,
  MonthYearInputProps,
} from "./MonthYearInput.types";
import type {
  InputOnChangeFn,
  NativeInputOnBlurFn,
  NativeInputValue,
} from "../Input.types";
import type { TestIdProps } from "@types";

const defaultMonthYearInputProps: MonthYearInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onBlur: null,
  onChangeNative: null,
  name: null,
};

/**
 * A simple month/year input with automatic formatting and validation.
 * User sees MM/YYYY format but outputs YYYY-MM format to backend.
 *
 * @version 0.0.1
 *
 * @param {MonthYearInputProps & TestIdProps} props - The input props.
 * @return {JSX.Element} The rendered month/year input component.
 */
const MonthYearInput = (
  props: MonthYearInputProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultMonthYearInputProps, props);

  // Convert YYYY-MM to MM/YYYY for display
  const [innerValue, setInnerValue] = useState<string>(
    yearMonthToMonthYear(mergedProps.value) ?? ""
  );

  // Track cursor position to determine if editing month or year
  const [cursorPosition, setCursorPosition] = useState<number>(0);
  const [inputElement, setInputElement] =
    useState<Nullable<HTMLInputElement>>(null);

  // Update innerValue if form value changes externally
  useEffect(() => {
    const outerValue = yearMonthToMonthYear(mergedProps.value) ?? "";
    if (outerValue !== innerValue) {
      setInnerValue(outerValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  const setInnerValueAndPropagate = useCallback(
    (value: Nullable<string>) => {
      const rawValue = value ?? "";
      const isDeleting = rawValue.length < innerValue.length;

      // If user is deleting, don't auto-format (allow them to delete the slash)
      if (isDeleting) {
        setInnerValue(rawValue);

        if (isFunction<InputOnChangeFn<"month-year">>(mergedProps.onChange)) {
          const digitsOnly = rawValue.replace(/\D/g, "");
          // Only propagate if it could become valid (has some digits) or is empty
          if (digitsOnly === "") {
            mergedProps.onChange(null);
          }
        }
        return;
      }

      // User is typing - apply auto-formatting
      const formattedValue = autoFormatMonthYear(rawValue);
      setInnerValue(formattedValue);

      if (isFunction<InputOnChangeFn<"month-year">>(mergedProps.onChange)) {
        // Only propagate if valid or empty
        if (isValidMonthYearStr(formattedValue)) {
          // Convert MM/YYYY to YYYY-MM for backend
          const outputValue = formatMonthYearForBackend(formattedValue);
          mergedProps.onChange(outputValue);
        } else if (formattedValue === "") {
          mergedProps.onChange(null);
        }
      }
    },
    [mergedProps, innerValue]
  );

  const onChange = useInputOnChange<"month-year">(
    () => true,
    (nativeValue) => (isString(nativeValue) ? nativeValue : null),
    setInnerValueAndPropagate,
    mergedProps.onChangeNative
  );

  const { forwardRef } = useInputRef(mergedProps);

  const inputStyles = useInputStyles(mergedProps);

  const testId = useTestId("input-month-year", props);

  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  const onBlur = useCallback<NativeInputOnBlurFn>(
    (event) => {
      if (isFunction<NativeInputOnBlurFn>(mergedProps.onBlur)) {
        mergedProps.onBlur(event);
      }
      setCursorPosition(0);
    },
    [mergedProps]
  );

  const onFocus = useCallback(() => {
    if (inputElement) {
      setCursorPosition(inputElement.selectionStart ?? 0);
    }
  }, [inputElement]);

  const onSelect = useCallback(() => {
    if (inputElement) {
      setCursorPosition(inputElement.selectionStart ?? 0);
    }
  }, [inputElement]);

  const onClick = useCallback(() => {
    if (inputElement) {
      setCursorPosition(inputElement.selectionStart ?? 0);
    }
  }, [inputElement]);

  const handleRef = useCallback(
    (el: Nullable<HTMLInputElement>) => {
      setInputElement(el);
      if (forwardRef) forwardRef(el);
    },
    [forwardRef]
  );

  // Determine if cursor is in month or year section
  const isEditingMonth = cursorPosition <= 2;

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();

        const increment = event.key === "ArrowUp" ? 1 : -1;
        const newValue = incrementMonthOrYear(
          innerValue,
          isEditingMonth,
          increment
        );

        setInnerValue(newValue);

        // Propagate to backend
        if (isFunction<InputOnChangeFn<"month-year">>(mergedProps.onChange)) {
          const outputValue = formatMonthYearForBackend(newValue);
          mergedProps.onChange(outputValue);
        }

        // Restore cursor position
        setTimeout(() => {
          if (inputElement) {
            inputElement.setSelectionRange(cursorPosition, cursorPosition);
          }
        }, 0);
      }
    },
    [innerValue, isEditingMonth, cursorPosition, inputElement, mergedProps]
  );

  const id = useInputId(mergedProps);

  const displayValue = useMemo<NativeInputValue>(() => {
    return innerValue;
  }, [innerValue]);

  return (
    <StyledInput
      data-testid={testId}
      value={displayValue}
      type="text"
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      onSelect={onSelect}
      onClick={onClick}
      onKeyDown={onKeyDown}
      placeholder={mergedProps.placeholder || "MM/YYYY"}
      disabled={mergedProps.disabled}
      required={mergedProps.required}
      ref={handleRef}
      autoComplete={autoComplete}
      pattern="(0[1-9]|1[0-2])\/[0-9]{4}"
      id={id}
      maxLength={7}
      {...inputStyles}
    />
  );
};

MonthYearInput.defaultProps = defaultMonthYearInputProps;

export { MonthYearInput };
