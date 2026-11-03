import { isString, type GenericFn, type Nullable } from "@ubloimmo/front-util";
import { isSameDay, isSameMinute, set } from "date-fns";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { defaultCommonInputProps } from "../Input.common";
import styles from "./DateTimeInput.module.scss";
import { DateInput, type DateInputProps } from "../DateInput";
import { TimeInput, type TimeInputProps } from "../TimeInput";
import { extractTimeAndDate } from "./DateTimeInput.utils";

import {
  compare,
  dateToDateISO,
  getTimeOfDate,
  isTimeStr,
  isValidDate,
  isValidDateISO,
  normalizeToDate,
  parseTimeStr,
  useLogger,
  useMergedProps,
  useTestId,
} from "@utils";

import type { InputOnChangeFn, InputValue } from "../Input.types";
import type {
  DateTimeInputDefaultProps,
  DateTimeInputProps,
} from "./DateTimeInput.types";
import type { TimeSplit, TestIdProps } from "@types";

const MINUTES_IN_HOUR = 60;

const defaultDateTimeInputProps: DateTimeInputDefaultProps = {
  ...defaultCommonInputProps,
  value: null,
  onChange: null,
  name: null,
  min: null,
  max: null,
  step: 1,
  timePlaceholder: null,
};

/**
 * Native date & time combined input.
 *
 * @version 0.0.1
 *
 * @param {TimeInputProps & TestIdProps} props - The input props.
 * @return {ReactNode} The rendered time input component.
 */
export function DateTimeInput(
  props: DateTimeInputProps & TestIdProps
): ReactNode {
  const mergedProps = useMergedProps(defaultDateTimeInputProps, props);

  const {
    value,
    onChange,
    min,
    max,
    step,
    timePlaceholder,
    name,
    ...commonInputProps
  } = mergedProps;

  const { warn } = useLogger("DateTimeInput");

  /**
   * Ensures a given value is a valid date-time ISO string
   *
   * Logs a warning and falls back to `null` if the value is invalid
   *
   * @param {Nullable<InputValue<"date-time">>} givenValue - Value to check
   * @returns {Nullable<InputValue<"date-time">>} The given value if valid, `null` otherwise
   */
  const ensureDateISO = useCallback(
    (givenValue: Nullable<InputValue<"date-time">>) => {
      if (!givenValue) return null;
      if (!isValidDateISO(givenValue)) {
        warn(
          `Invalid value provided. Expected valid date-time ISO string, but got "${givenValue}"`
        );
        return null;
      }
      return givenValue;
    },
    [warn]
  );

  const [dateTime, setDateTime] = useState(() => ensureDateISO(value ?? null));

  /**
   * Syncs the local date-time state with the `value` prop whenever it changes
   */
  useEffect(() => {
    if (mergedProps.value !== dateTime) {
      setDateTime(ensureDateISO(mergedProps.value));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  /**
   * Current date-time value, split into the values of the date & time inputs
   */
  const inputValues = useMemo(() => extractTimeAndDate(dateTime), [dateTime]);

  /**
   * `min` & `max` date-time bounds, each split into a date bound & a time bound
   */
  const inputMinMax = useMemo(
    () => ({
      min: extractTimeAndDate(min),
      max: extractTimeAndDate(max),
    }),
    [min, max]
  );

  /**
   * Checks whether a date falls on the same day as the `min` bound
   *
   * Time bounds only apply on the day of their date bound
   *
   * @param {Nullable<Date>} date - Date to check
   * @returns {boolean} True if the date is on the `min` date, false otherwise or if there is no `min`
   */
  const isMinDate = useCallback(
    (date: Nullable<Date>) => {
      const minDate = normalizeToDate(inputMinMax.min.date);
      return !!date && !!minDate && isSameDay(date, minDate);
    },
    [inputMinMax.min.date]
  );

  /**
   * Checks whether a date falls on the same day as the `max` bound
   *
   * Time bounds only apply on the day of their date bound
   *
   * @param {Nullable<Date>} date - Date to check
   * @returns {boolean} True if the date is on the `max` date, false otherwise or if there is no `max`
   */
  const isMaxDate = useCallback(
    (date: Nullable<Date>) => {
      const maxDate = normalizeToDate(inputMinMax.max.date);
      return !!date && !!maxDate && isSameDay(date, maxDate);
    },
    [inputMinMax.max.date]
  );

  /**
   * Gets the time to default to when a date is picked without any previous time
   *
   * @param {Nullable<Date>} date - Date being picked
   * @returns {TimeSplit} The `min` time if the date is the `min` date, midnight otherwise
   */
  const getMinTime = useCallback(
    (date: Nullable<Date>): TimeSplit => {
      if (!isMinDate(date)) return { hour: 0, minute: 0 };
      return parseTimeStr(inputMinMax.min.time) ?? { hour: 0, minute: 0 };
    },
    [inputMinMax.min.time, isMinDate]
  );

  /**
   * Keeps a time within the time bounds applying to the given date
   *
   * Does nothing if the bounds wrap around midnight (`min` time is later than `max` time)
   *
   * @param {Nullable<Date>} date - Date the time belongs to
   * @param {TimeSplit} time - Time to clamp
   * @returns {TimeSplit} The time, moved to the closest applying bound if it was outside of it
   */
  const clampTime = useCallback(
    (date: Nullable<Date>, time: TimeSplit): TimeSplit => {
      const minBound = isMinDate(date)
        ? parseTimeStr(inputMinMax.min.time)
        : null;
      const maxBound = isMaxDate(date)
        ? parseTimeStr(inputMinMax.max.time)
        : null;
      const toMinutes = ({ hour, minute }: TimeSplit) =>
        hour * MINUTES_IN_HOUR + minute;
      // min is later than max on the same date, the range wraps around midnight
      // the time picker handles it, so there is nothing to clamp to
      if (minBound && maxBound && toMinutes(minBound) > toMinutes(maxBound))
        return time;
      if (minBound && toMinutes(time) < toMinutes(minBound)) return minBound;
      if (maxBound && toMinutes(time) > toMinutes(maxBound)) return maxBound;
      return time;
    },
    [inputMinMax.min.time, inputMinMax.max.time, isMinDate, isMaxDate]
  );

  /**
   * `min` & `max` time bounds forwarded to the time input
   *
   * Each one only applies while the selected date is on its bound's date, and is `null` otherwise
   */
  const timeMinMax = useMemo(() => {
    const selectedDate = normalizeToDate(inputValues.date);
    return {
      min: isMinDate(selectedDate) ? inputMinMax.min.time : null,
      max: isMaxDate(selectedDate) ? inputMinMax.max.time : null,
    };
  }, [
    inputValues.date,
    inputMinMax.min.time,
    inputMinMax.max.time,
    isMinDate,
    isMaxDate,
  ]);

  /**
   * Updates the local date-time state using the provided update function
   *
   * Calls `onChange` and commits the new value only if it differs from the previous one by at least a minute
   *
   * @param {GenericFn} updateFn - Receives the previous value & returns the updated one
   */
  const updateDateTime = useCallback(
    (
      updateFn: GenericFn<
        [Nullable<InputValue<"date-time">>],
        Nullable<InputValue<"date-time">>
      >
    ) => {
      setDateTime((prev) => {
        const updated = updateFn(prev);
        const ensured = ensureDateISO(updated);
        const isDifferent =
          compare(prev, ensured, compare.neq) &&
          (isString(ensured) && isString(prev)
            ? !isSameMinute(prev, ensured)
            : true);
        if (isDifferent) {
          onChange?.(ensured);
          return ensured;
        }
        return prev;
      });
    },
    [onChange, ensureDateISO]
  );

  /**
   * Applies a time picked in the time input to the current date
   *
   * Ignores empty or incomplete times, and seconds & milliseconds are reset to `0`
   *
   * @param {Nullable<InputValue<"time">>} time - Time reported by the time input
   */
  const onTimeChange = useCallback<InputOnChangeFn<"time">>(
    (time) => {
      // only accept time strings
      if (!isTimeStr(time)) return;
      const timeSplit = parseTimeStr(time);
      // only set the time if value is non-null
      if (!timeSplit) return;
      updateDateTime((prev) => {
        let date = normalizeToDate(prev);
        // ensure date exists in local state, if not, clear it
        if (!date) return null;

        date = set(date, {
          hours: timeSplit.hour,
          minutes: timeSplit.minute,
          seconds: 0,
          milliseconds: 0,
        });
        if (!isValidDate(date)) return null;
        return dateToDateISO(date);
      });
    },
    [updateDateTime]
  );

  /**
   * Applies a date picked in the date input to the current value
   *
   * Clears the whole value if the date is cleared. Otherwise, keeps the previous time
   * (or defaults to the `min` time / midnight) clamped to the bounds applying to the new date
   *
   * @param {Nullable<InputValue<"date">>} updatedDate - Date reported by the date input
   */
  const onDateChange = useCallback<InputOnChangeFn<"date">>(
    (updatedDate) => {
      let date = normalizeToDate(updatedDate);
      updateDateTime((prev) => {
        // clear all if date is cleared
        if (!date || !isValidDate(date)) return null;
        const prevDate = normalizeToDate(prev);
        const minTime = getMinTime(date);
        // if no time set, use min time if the date is the min date, midnight otherwise
        if (!prevDate) {
          date = set(date, { hours: minTime.hour, minutes: minTime.minute });
          return dateToDateISO(date);
        }
        // reuse previously set time if existing, min time otherwise
        // then clamp it to the bounds applying to the new date
        const prevTime = parseTimeStr(getTimeOfDate(prevDate)) ?? minTime;
        const time = clampTime(date, prevTime);
        date = set(date, {
          hours: time.hour,
          minutes: time.minute,
          seconds: 0,
          milliseconds: 0,
        });
        return dateToDateISO(date);
      });
    },
    [getMinTime, clampTime, updateDateTime]
  );

  const dateTestId = useTestId("input-date", props);
  const testId = useTestId("input-date-time", props);

  /**
   * Props forwarded to the date input
   */
  const dateInputProps = useMemo<DateInputProps & TestIdProps>(
    () => ({
      ...commonInputProps,
      value: inputValues.date,
      onChange: onDateChange,
      name: name ? `${name}-date` : null,
      min: inputMinMax.min.date,
      max: inputMinMax.max.date,
      format: "iso",
      testId: dateTestId,
      overrideTestId: true,
    }),
    [
      commonInputProps,
      name,
      dateTestId,
      inputValues.date,
      inputMinMax.min.date,
      inputMinMax.max.date,
      onDateChange,
    ]
  );

  /**
   * Props forwarded to the time input
   *
   * It stays disabled until a date is set
   */
  const timeInputProps = useMemo<TimeInputProps & TestIdProps>(
    () => ({
      ...commonInputProps,
      value: inputValues.time,
      onChange: onTimeChange,
      name: name ? `${name}-time` : null,
      placeholder: timePlaceholder ?? commonInputProps.placeholder,
      // time bounds only apply on the days of their date bounds
      min: timeMinMax.min,
      max: timeMinMax.max,
      // date should be set before setting time
      disabled: commonInputProps.disabled || !inputValues.date,
      testId,
      overrideTestId: true,
      step,
    }),
    [
      commonInputProps,
      inputValues.time,
      inputValues.date,
      name,
      timePlaceholder,
      timeMinMax.min,
      timeMinMax.max,
      onTimeChange,
      testId,
      step,
    ]
  );

  return (
    <div
      className={styles["date-time-input-container"]}
      data-testid={`${testId}-wrapper`}
    >
      <DateInput {...dateInputProps} />
      <TimeInput {...timeInputProps} />
    </div>
  );
}
