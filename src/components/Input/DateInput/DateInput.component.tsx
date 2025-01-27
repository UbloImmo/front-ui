import {
  isBoolean,
  isFunction,
  isNullish,
  isString,
  transformObject,
  type Nullable,
} from "@ubloimmo/front-util";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import styled from "styled-components";

import { dateInputStyles } from "./DateInput.styles";
import {
  dateFormatters,
  isValidDateNativeStr,
  normalizeToDate,
  normalizeToDateISO,
  normalizeToDateNativeStr,
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
  useInputId,
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";

import { Calendar, type CalendarOnChangeFn } from "@/components/Calendar";
import { Icon } from "@/components/Icon";
import { Popover } from "@layouts";
import { useHtmlAttribute, useLogger, useMergedProps, useTestId } from "@utils";

import type { DateInputDefaultProps, DateInputProps } from "./DateInput.types";
import type {
  InputOnChangeFn,
  InputValue,
  NativeInputOnBlurFn,
  NativeInputValue,
} from "../Input.types";
import type { TestIdProps } from "@types";

const defaultDateInputProps: DateInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  onBlur: null,
  onChangeNative: null,
  name: null,
  numberOfMonths: 1,
  autoComplete: "date",
  min: null,
  max: null,
  format: "iso",
};

/**
 * A simple date input combined with a Calendar.
 *
 * @version 0.0.2
 *
 * @param {DateInputProps & TestIdProps} props - The input props.
 * @return {JSX.Element} The rendered date input component.
 */
const DateInput = (props: DateInputProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultDateInputProps, props);
  const { debug } = useLogger("InputDate", {
    hideDebug: true,
    spacing: 0,
  });
  const [innerDateStr, setInnerDateStr] = useState<string>(
    normalizeToDateNativeStr(mergedProps.value) ?? "",
  );

  const computedDateISO = useMemo(() => {
    return normalizeToDateISO(innerDateStr);
  }, [innerDateStr]);

  // update innerDateStr if form value changes
  useEffect(() => {
    const outerDateStr = normalizeToDateNativeStr(mergedProps.value);
    if (isString(outerDateStr) && outerDateStr !== innerDateStr) {
      setInnerDateStr(outerDateStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  const [isFocused, setIsFocused] = useState(false);

  const inputValue = useInputValue<"date">(innerDateStr, props);

  const calendarValue = useMemo<Nullable<Date>>(() => {
    return normalizeToDate(computedDateISO);
  }, [computedDateISO]);

  const setInnerValueAndPropagate = useCallback(
    (value: Nullable<InputValue<"date">>) => {
      setInnerDateStr(value ?? "");
      if (isFunction<InputOnChangeFn<"date">>(mergedProps.onChange)) {
        const formatter = dateFormatters[mergedProps.format];
        mergedProps.onChange(
          isValidDateNativeStr(value) ? formatter(value) : null,
        );
      }
    },
    [mergedProps],
  );

  const onChange = useInputOnChange<"date">(
    () => true,
    (nativeValue) => (isString(nativeValue) ? nativeValue : null),
    setInnerValueAndPropagate,
    mergedProps.onChangeNative,
  );

  const onCalendarChange = useCallback<CalendarOnChangeFn>(
    (date) => {
      setInnerValueAndPropagate(normalizeToDateNativeStr(date));
    },
    [setInnerValueAndPropagate],
  );

  const [calendarShown, setCalendarShown] = useState(false);

  const { inputRef, forwardRef } = useInputRef(mergedProps);

  const inputStyles = useInputStyles(mergedProps);

  const testId = useTestId("input-date", props);

  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  const toggleCalendarShown = useCallback(
    (open?: boolean) => {
      if (isFocused) return;
      setCalendarShown(isBoolean(open) ? open : !calendarShown);
      if (isFocused) {
        setTimeout(() => {
          if (isNullish(inputRef.current)) return;
          inputRef.current[open ? "focus" : "blur"]();
        }, 1);
      }
    },
    [calendarShown, inputRef, isFocused],
  );

  debug({ innerDateStr, computedDateISO, outerValue: mergedProps.value });

  const onFocus = useCallback<NativeInputOnBlurFn>((e) => {
    e.preventDefault();
    setIsFocused(true);
  }, []);

  const preventDefaultOnClick = useCallback<
    MouseEventHandler<HTMLInputElement>
  >((e) => {
    e.preventDefault();
  }, []);

  const onBlur = useCallback<NativeInputOnBlurFn>(
    (event) => {
      if (isFunction<NativeInputOnBlurFn>(mergedProps.onBlur))
        mergedProps.onBlur(event);
      setIsFocused(false);
    },
    [mergedProps],
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      if (event.code === "Space" || event.code === "Enter") {
        setCalendarShown(true);
        event.preventDefault();
      }
      if (event.code === "Escape") {
        setCalendarShown(false);
      }
    },
    [],
  );

  const inputType = useMemo<"text" | "date">(() => {
    return isFocused ? "date" : "text";
  }, [isFocused]);

  const dynamicInputValue = useMemo<NativeInputValue>(() => {
    return isString(inputValue)
      ? isFocused
        ? inputValue
        : (normalizeToDateStr(inputValue) ?? "")
      : "";
  }, [isFocused, inputValue]);

  const minMax = useMemo(() => {
    return { min: mergedProps.min, max: mergedProps.max };
  }, [mergedProps]);

  const inputMinMax = useMemo(() => {
    if (!isFocused)
      return {
        min: undefined,
        max: undefined,
      };
    return transformObject(
      minMax,
      (date) => normalizeToDateNativeStr(date) ?? undefined,
    );
  }, [minMax, isFocused]);

  const calendarMinMax = useMemo(() => {
    return transformObject(minMax, normalizeToDate);
  }, [minMax]);

  debug({
    minMax,
    calendarMinMax,
    inputMinMax,
    tests: {
      native: normalizeToDateNativeStr(minMax.max),
    },
  });

  const inputDisabled = useMemo(() => {
    return isBoolean(mergedProps.disabled) && mergedProps.disabled;
  }, [mergedProps]);

  const id = useInputId(mergedProps);

  return (
    <Popover
      content={
        <Calendar
          testId="input-date-calendar"
          overrideTestId
          date={calendarValue}
          onChange={onCalendarChange}
          numberOfMonths={mergedProps.numberOfMonths}
          disabled={mergedProps.disabled}
          {...calendarMinMax}
        />
      }
      fill
      open={calendarShown && !inputDisabled}
      onOpenChange={toggleCalendarShown}
      align="end"
      collisionPadding="s-1"
    >
      <StyledInputContainer {...inputStyles} data-testid="input-date-container">
        <StyledDateInput
          data-testid={testId}
          value={dynamicInputValue}
          type={inputType}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={preventDefaultOnClick}
          onKeyDown={onKeyDown}
          placeholder={mergedProps.placeholder}
          disabled={inputDisabled}
          required={mergedProps.required}
          ref={forwardRef}
          autoComplete={autoComplete}
          pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])\/(0[1-9]|1[012])\/[0-9]{4}"
          id={id}
          {...inputMinMax}
          {...inputStyles}
        />
        <StyledInputControlGroup $noFocus {...inputStyles}>
          <StyledInputGroupedControl
            {...inputStyles}
            $noFocus
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

const StyledDateInput = styled(StyledInput)`
  ${dateInputStyles}
`;
