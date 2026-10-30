import {
  isBoolean,
  isFunction,
  isNullish,
  isString,
  Nullable,
} from "@ubloimmo/front-util";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  defaultCommonInputProps,
  StyledInput,
  StyledInputContainer,
  StyledInputControlGroup,
  StyledInputGroupedControl,
} from "../Input.common";
import {
  InputOnChangeFn,
  InputValue,
  NativeInputOnBlurFn,
} from "../Input.types";
import {
  useInputId,
  useInputOnChange,
  useInputRef,
  useInputStyles,
  useInputValue,
} from "../Input.utils";
import styles from "./TimeInput.module.scss";

import { Icon } from "@/components/Icon";
import { TimePicker } from "@/components/TimePicker";
import { Popover } from "@/layouts/Popover";
import { TestIdProps, TimeStr } from "@types";
import {
  clamp,
  useCssClasses,
  useHtmlAttribute,
  useMergedProps,
  useTestId,
  isTimeStr,
} from "@utils";

import type { TimeInputDefaultProps, TimeInputProps } from "./TimeInput.types";

const SECONDS_IN_MINUTE = 60;
const MIN_STEP = 1;
const MAX_STEP = 60;

const defaultTimeInputProps: TimeInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  min: null,
  max: null,
  step: 1,
};

/**
 * Native time input.
 *
 * @version 0.0.1
 *
 * @param {TimeInputProps & TestIdProps} props - The input props.
 * @return {ReactNode} The rendered time input component.
 */
const TimeInput = (props: TimeInputProps & TestIdProps): ReactNode => {
  const mergedProps = useMergedProps(defaultTimeInputProps, props);

  const [time, setTime] = useState<Nullable<TimeStr>>(
    mergedProps.value ?? null
  );
  const [pickerShown, setPickerShown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (mergedProps.value !== time) {
      setTime(mergedProps.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  const setInnerValueAndPropagate = useCallback(
    (value: Nullable<InputValue<"time">>) => {
      setTime(value);
      if (isFunction<InputOnChangeFn<"time">>(mergedProps.onChange)) {
        mergedProps.onChange(value);
      }
    },
    [mergedProps]
  );

  const onChange = useInputOnChange<"time">(
    (nativeValue) => isString(nativeValue),
    (nativeValue) => (isTimeStr(nativeValue) ? nativeValue : null),
    setInnerValueAndPropagate,
    mergedProps.onChangeNative
  );

  const value = useInputValue<"time">(time, props);

  const inputStyles = useInputStyles(mergedProps);

  const step = useMemo(
    () => clamp(mergedProps.step, MIN_STEP, MAX_STEP),
    [mergedProps.step]
  );
  const stepSeconds = useMemo(() => step * SECONDS_IN_MINUTE, [step]);

  const testId = useTestId("input-time", props);

  const { forwardRef, inputRef } = useInputRef(mergedProps);

  const togglePickerShown = useCallback(
    (open?: boolean) => {
      if (isFocused) return;
      setPickerShown(isBoolean(open) ? open : !pickerShown);
      if (isFocused) {
        setTimeout(() => {
          if (isNullish(inputRef.current)) return;
          inputRef.current[open ? "focus" : "blur"]();
        }, 1);
      }
    },
    [pickerShown, inputRef, isFocused]
  );

  const togglePickerShownOnClick = useCallback(
    () => togglePickerShown(),
    [togglePickerShown]
  );

  const onBlur = useCallback<NativeInputOnBlurFn>(
    (event) => {
      if (isFunction<NativeInputOnBlurFn>(mergedProps.onBlur))
        mergedProps.onBlur(event);
      setIsFocused(false);
    },
    [mergedProps]
  );

  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    (event) => {
      if (event.code === "Space" || event.code === "Enter") {
        setPickerShown(true);
        event.preventDefault();
      }
      if (event.code === "Escape") {
        setPickerShown(false);
      }
    },
    []
  );

  const onFocus = useCallback<NativeInputOnBlurFn>((e) => {
    e.preventDefault();
    setIsFocused(true);
  }, []);

  const preventDefaultOnClick = useCallback<
    MouseEventHandler<HTMLInputElement>
  >((e) => {
    e.preventDefault();
  }, []);

  const inputType = useMemo<"text" | "time">(() => {
    return isFocused ? "time" : "text";
  }, [isFocused]);

  const autoComplete = useHtmlAttribute(mergedProps.autoComplete);

  const id = useInputId(mergedProps);
  const className = useCssClasses(styles["time-input"]);

  return (
    <Popover
      content={
        <TimePicker
          testId="input-time-picker"
          overrideTestId
          time={time}
          step={step}
          min={mergedProps.min}
          max={mergedProps.max}
          disabled={mergedProps.disabled}
          onChange={setInnerValueAndPropagate}
        />
      }
      fill
      fillHeight
      open={pickerShown && !mergedProps.disabled}
      onOpenChange={togglePickerShown}
      align="end"
      collisionPadding="s-1"
    >
      <StyledInputContainer
        {...inputStyles}
        data-testid={`${testId}-container`}
      >
        <StyledInput
          className={className}
          data-testid={testId}
          value={value}
          type={inputType}
          step={stepSeconds}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          onClick={preventDefaultOnClick}
          onKeyDown={onKeyDown}
          placeholder={mergedProps.placeholder}
          required={mergedProps.required}
          disabled={mergedProps.disabled}
          autoComplete={autoComplete}
          ref={forwardRef}
          id={id}
          {...inputStyles}
        />
        <StyledInputControlGroup $noFocus {...inputStyles}>
          <StyledInputGroupedControl
            {...inputStyles}
            $noFocus
            data-testid="input-control"
            onClick={togglePickerShownOnClick}
            title="Pick a time"
            aria-label="Pick a time"
            role="button"
            aria-haspopup="menu"
            aria-roledescription="Button for showing or closing a detailed time picker"
          >
            <Icon name="Clock" />
          </StyledInputGroupedControl>
        </StyledInputControlGroup>
      </StyledInputContainer>
    </Popover>
  );
};

TimeInput.__DEFAULT_PROPS = defaultTimeInputProps;

export { TimeInput };
