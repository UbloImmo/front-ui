import {
  GenericFn,
  isNumber,
  Nullable,
  transformObject,
} from "@ubloimmo/front-util";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { TimePickerItem } from "./components/TimePickerItem.component";
import { useTimePickerStyles } from "./TimePicker.styles";
import { Text } from "../Text";
import { TimePickerColumn } from "./components/TimePickerColumn.component";

import { GridItem, GridLayout } from "@layouts";
import {
  useTestId,
  useMergedProps,
  compare,
  formatTimeSplit,
  makeTimeSlots,
  parseTimeStr,
  makeTimeSlotMap,
} from "@utils";

import type {
  TimePickerProps,
  TimePickerDefaultProps,
} from "./TimePicker.types";
import type { TestIdProps, TimeSplit } from "@types";

const MIN_HOUR = 0;

const defaultTimePickerProps: TimePickerDefaultProps = {
  time: null,
  onChange: null,
  disabled: false,
  min: null,
  max: null,
  step: 1,
};

/**
 * Allows user selection of a specific time by choosing its hour and minute separately
 *
 * @version 0.0.1
 *
 * @param {TimePickerProps & TestIdProps} props - TimePicker component props
 * @returns {ReactNode} TimePicker component
 */
const TimePicker = (props: TimePickerProps & TestIdProps): ReactNode => {
  const mergedProps = useMergedProps(defaultTimePickerProps, props);

  const [time, setTime] = useState(() => parseTimeStr(mergedProps.time));

  const updateTime = useCallback(
    (updateFn: GenericFn<[Nullable<TimeSplit>], Nullable<TimeSplit>>) => {
      setTime((prev) => {
        const updated = updateFn(prev);
        if (compare(prev, updated, compare.neq)) {
          mergedProps.onChange?.(formatTimeSplit(updated));
          return updated;
        }
        return prev;
      });
    },
    [mergedProps]
  );

  useEffect(() => {
    const parsed = parseTimeStr(mergedProps.time);
    if (compare(parsed, time, compare.neq)) {
      setTime(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.time]);

  const min = useMemo(() => parseTimeStr(mergedProps.min), [mergedProps.min]);
  const max = useMemo(() => parseTimeStr(mergedProps.max), [mergedProps.max]);

  const timeSlots = useMemo(
    () => ({
      bound: makeTimeSlots(min, max, mergedProps.step),
      unbound: makeTimeSlots(null, null, mergedProps.step),
    }),
    [min, max, mergedProps.step]
  );
  const timeHour = useMemo(
    () =>
      time?.hour ?? timeSlots.bound.at(0)?.hour ?? timeSlots.unbound[0].hour,
    [time, timeSlots]
  );

  const timeSlotMaps = useMemo(
    () => transformObject(timeSlots, makeTimeSlotMap),
    [timeSlots]
  );

  const testId = useTestId("time-picker", props);
  const styles = useTimePickerStyles();

  const setHour = useCallback(
    (hour: number) => {
      const hourSlot = timeSlotMaps.bound.get(hour);
      // not selectable, hour outside min / max
      if (!hourSlot) return;
      updateTime((prev) => {
        // no previous value,
        // reset minute to first slot minute
        if (!prev)
          return {
            hour,
            minute: hourSlot.minutes[0],
          };
        // current minute outside bounds,
        // select closest in-bound minute
        if (!hourSlot.minuteSet.has(prev.minute)) {
          const firstMinute = hourSlot.minutes[0];
          const lastMinute =
            hourSlot.minutes[hourSlot.minutes.length - 1] ?? firstMinute;
          const prevMinute = prev.minute;
          const firstDiff = Math.abs(firstMinute - prevMinute);
          const lastDiff = Math.abs(lastMinute - prevMinute);
          const closestMinute = firstDiff < lastDiff ? firstMinute : lastMinute;
          return {
            hour,
            minute: closestMinute,
          };
        }
        return {
          hour,
          minute: prev.minute,
        };
      });
    },
    [timeSlotMaps.bound, updateTime]
  );

  const setMinute = useCallback(
    (minute: number) => {
      const hourSlot = timeSlotMaps.bound.get(timeHour);
      // not selectable, minute outside min / max for current hour
      if (!hourSlot) return;
      if (!hourSlot.minuteSet.has(minute)) return;
      updateTime((prev) => {
        if (!prev)
          return {
            hour: hourSlot.hour,
            minute,
          };
        return {
          hour: prev.hour,
          minute,
        };
      });
    },
    [timeHour, timeSlotMaps.bound, updateTime]
  );

  const hourItems = useMemo(
    () =>
      timeSlots.unbound.map(({ hour }, index) => {
        const key = `${hour}-${index}`;
        const disabled = mergedProps.disabled || !timeSlotMaps.bound.has(hour);
        const selected = hour === time?.hour;
        return (
          <TimePickerItem
            timePart={hour}
            key={key}
            disabled={disabled}
            onClick={setHour}
            selected={selected}
            type="hour"
          />
        );
      }),
    [
      setHour,
      time?.hour,
      timeSlotMaps.bound,
      timeSlots.unbound,
      mergedProps.disabled,
    ]
  );

  const minuteItems = useMemo(
    () =>
      (timeSlotMaps.unbound.get(timeHour)?.minutes ?? []).map(
        (minute, index) => {
          const key = `${minute}-${index}`;
          const disabled =
            mergedProps.disabled ||
            !isNumber(time?.hour) ||
            !timeSlotMaps.bound.get(time.hour)?.minuteSet?.has(minute);
          const selected = minute === time?.minute;
          return (
            <TimePickerItem
              key={key}
              timePart={minute}
              disabled={disabled}
              onClick={setMinute}
              selected={selected}
              type="minute"
            />
          );
        }
      ),
    [
      setMinute,
      time,
      timeHour,
      timeSlotMaps.bound,
      timeSlotMaps.unbound,
      mergedProps.disabled,
    ]
  );

  return (
    <GridLayout
      columns={["1fr", "auto", "1fr"]}
      rows={1}
      testId={testId}
      overrideTestId
      gap={0}
      className={styles.picker}
    >
      <TimePickerColumn
        type="hour"
        selection={time?.hour ?? null}
        defaultSelection={min?.hour ?? MIN_HOUR}
      >
        {hourItems}
      </TimePickerColumn>

      <GridItem className={styles.separator}>
        <Text color="gray-600" weight="medium">
          :
        </Text>
      </GridItem>
      <TimePickerColumn
        type="minute"
        selection={time?.minute ?? null}
        defaultSelection={min?.minute ?? MIN_HOUR}
      >
        {minuteItems}
      </TimePickerColumn>
    </GridLayout>
  );
};

TimePicker.__DEFAULT_PROPS = defaultTimePickerProps;

export { TimePicker };
