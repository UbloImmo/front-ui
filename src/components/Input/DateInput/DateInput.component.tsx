import {
  isBoolean,
  isFunction,
  isNullish,
  isString,
  type Nullable,
} from "@ubloimmo/front-util";
import { useCallback, useEffect, useId, useMemo, useState } from "react";

import {
  dateToDateISO,
  isValidDateStr,
  normalizeToDate,
  normalizeToDateISO,
  normalizeToDateStr,
} from "./DateInput.utils";
import {
  defaultCommonInputProps,
  StyledInput,
  StyledInputContainer,
  StyledInputControlGroup,
  StyledInputGroupedControl,
} from "../Input.common";
import {
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { Popover } from "@layouts";
import { useHtmlAttribute, useLogger, useMergedProps, useTestId } from "@utils";

import {
  Calendar,
  CalendarOnChangeFn,
  Icon,
  InputOnChangeFn,
} from "@components";

import type { DateInputDefaultProps, DateInputProps } from "./DateInput.types";
import type { InputValue, NativeInputOnBlurFn } from "../Input.types";
import type { TestIdProps } from "@types";

const defaultDateInputProps: DateInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onBlur: null,
  onChangeNative: null,
  name: null,
  numberOfMonths: 1,
};

/**
 * A simple date input combined with a Calendar.
 *
 * @version 0.0.1
 *
 * @param {DateInputProps & TestIdProps} props - The input props.
 * @return {JSX.Element} The rendered date input component.
 */
const DateInput = (props: DateInputProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultDateInputProps, props);
  const { log } = useLogger("InputDate");

  const [innerDateISO, setInnerDateISO] = useState<Nullable<string>>(
    normalizeToDateISO(mergedProps.value)
  );

  // const [innerDateStr, setInnerDateStr] = useState<string>(
  //   normalizeToDateStr(mergedProps.value) ?? ""
  // );

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const dateISO = normalizeToDateISO(mergedProps.value);
    if (dateISO !== innerDateISO) setInnerDateISO(dateISO);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  const inputValue = useInputValue<"date">(innerDateISO, props, (rawValue) => {
    return normalizeToDateStr(rawValue) ?? rawValue;
  });

  const calendarValue = useMemo<Nullable<Date>>(() => {
    return normalizeToDate(innerDateISO);
  }, [innerDateISO]);

  const setInnerValueAndPropagate = useCallback(
    (value: Nullable<InputValue<"date">>) => {
      setInnerDateISO(value);
      if (isFunction<InputOnChangeFn<"date">>(mergedProps.onChange))
        mergedProps.onChange(value);
    },
    [mergedProps]
  );

  const onChange = useInputOnChange<"date">(
    (nativeValue): nativeValue is InputValue<"date"> => isString(nativeValue),
    (nativeValue) => {
      if (
        isString(nativeValue) &&
        nativeValue.length > 0 &&
        isValidDateStr(nativeValue)
      ) {
        return normalizeToDateISO(nativeValue);
      }
      return null;
    },
    setInnerValueAndPropagate,
    mergedProps.onChangeNative
  );

  const onCalendarChange = useCallback<CalendarOnChangeFn>(
    (date) => {
      setInnerValueAndPropagate(dateToDateISO(date));
    },
    [setInnerValueAndPropagate]
  );

  const [calendarShown, setCalendarShown] = useState(false);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const inputStyles = useInputStyles(mergedProps);

  const testId = useTestId("input-date", props);

  const inputId = useId();

  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  const toggleCalendarShown = useCallback(
    (open?: boolean) => {
      log("toggle calendar");
      log({ isFocused, open });
      if (isFocused) return;
      setCalendarShown(isBoolean(open) ? open : !calendarShown);
      if (isFocused) {
        setTimeout(() => {
          if (isNullish(inputRef.current)) return;
          inputRef.current[open ? "focus" : "blur"]();
        }, 1);
      }
    },
    [calendarShown, inputRef, isFocused, log]
  );

  log({ innerValue: innerDateISO, inputValue });

  const onFocus = useCallback(() => {
    setIsFocused(true);
    setCalendarShown(false);
  }, []);

  const onBlur = useCallback<NativeInputOnBlurFn>(
    (event) => {
      if (isFunction<NativeInputOnBlurFn>(mergedProps.onBlur))
        mergedProps.onBlur(event);
      setIsFocused(false);
    },
    [mergedProps]
  );

  return (
    <Popover
      content={
        <Calendar
          date={calendarValue}
          onChange={onCalendarChange}
          numberOfMonths={mergedProps.numberOfMonths}
          disabled={mergedProps.disabled}
        />
      }
      fill
      open={calendarShown}
      onOpenChange={toggleCalendarShown}
      align="end"
    >
      <StyledInputContainer {...inputStyles} data-testid="input-date-container">
        <StyledInput
          data-testid={testId}
          value={inputValue}
          id={inputId}
          type="text"
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={mergedProps.placeholder}
          disabled={mergedProps.disabled}
          required={mergedProps.required}
          aria-roledescription="Champs de saisie mot de passe"
          role="textbox"
          ref={forwardRef}
          autoComplete={autoComplete}
          pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[012])\/[0-9]{4}"
          {...inputStyles}
        ></StyledInput>
        <StyledInputControlGroup>
          <StyledInputGroupedControl
            {...inputStyles}
            data-testid="input-control"
            onClick={toggleCalendarShown}
            title="Pick a date"
            aria-label="Pick a date"
            role="button"
            aria-roledescription="Button for show or closing a detailed calendar"
          >
            <Icon name="Calendar3" />
          </StyledInputGroupedControl>
        </StyledInputControlGroup>
      </StyledInputContainer>
    </Popover>
  );
};

DateInput.defaultProps = defaultDateInputProps;

export { DateInput };
