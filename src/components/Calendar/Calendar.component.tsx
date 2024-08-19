import {
  isArray,
  isNullish,
  objectValues,
  transformObject,
  type Nullable,
  type Optional,
} from "@ubloimmo/front-util";
import { compareAsc } from "date-fns";
import { fr } from "date-fns/locale";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DayPicker as ReactDayPicker } from "react-day-picker";
import styled from "styled-components";

import { calendarWrapperStyles } from "./Calendar.styles";
import { defaultCalendarAssistiveTextTemplate } from "./Calendar.utils";
import { CalendarFooter } from "./components/CalendarFooter.component";
import { CalendarNav } from "./components/CalendarNav.component";

import {
  useTestId,
  useMergedProps,
  clamp,
  useHtmlAttribute,
  useLogger,
} from "@utils";

import type {
  CalendarProps,
  CalendarDefaultProps,
  CalenderInnerProps,
  CalendarRange,
  CalendarMatcher,
} from "./Calendar.types";
import type { TestIdProps } from "@types";
import type { DateRange } from "react-day-picker";

const defaultCalendarProps: CalendarDefaultProps = {
  date: null,
  range: null,
  onChange: null,
  required: false,
  numberOfMonths: 1,
  locale: fr,
  mode: "single",
  disabled: false,
  hidden: false,
  assistiveTextTemplate: defaultCalendarAssistiveTextTemplate,
  min: null,
  max: null,
};

/**
 * A simple, customizable calendar. Based on [react-day-picker](https://github.com/gpbl/react-day-picker)
 *
 * @version 0.0.1
 *
 * @param {CalendarProps & TestIdProps} props - Calendar component props
 * @returns {JSX.Element}
 */
const Calendar = (props: CalendarProps & TestIdProps): JSX.Element => {
  const { debug } = useLogger("Calendar", { hideDebug: true });
  const mergedProps = useMergedProps(defaultCalendarProps, props);
  const assistiveTextTemplate = useMergedProps(
    defaultCalendarAssistiveTextTemplate,
    mergedProps.assistiveTextTemplate
  );
  const testId = useTestId("calendar", props);

  const [dateStart, setDateStart] = useState<Nullable<Date>>(
    mergedProps.date ?? mergedProps.range?.from ?? null
  );
  const [dateEnd, setDateEnd] = useState<Nullable<Date>>(
    mergedProps.range?.to ?? null
  );

  const calendarRange = useMemo<CalendarRange>(
    () => ({
      from: dateStart,
      to: dateEnd,
    }),
    [dateEnd, dateStart]
  );

  debug({ calendarRange });

  useEffect(() => {
    const start = mergedProps.range?.from ?? mergedProps.date;
    if (start !== dateStart) {
      setDateStart(start);
    }
    if (mergedProps.range?.to !== dateEnd) {
      setDateEnd(mergedProps.range?.to ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.range]);

  useEffect(() => {
    if (!mergedProps.onChange) return;
    mergedProps.onChange(
      calendarRange.from,
      mergedProps.mode === "range" && calendarRange.to ? calendarRange.to : null
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calendarRange]);

  const numberOfMonths = useMemo(
    () => clamp(mergedProps.numberOfMonths, 1, 3),
    [mergedProps.numberOfMonths]
  );

  const selectSingle = useCallback(
    (date: Optional<Date>) => {
      setDateStart(date ?? null);
    },
    [setDateStart]
  );

  const selectRange = useCallback(
    (dateRange: Optional<DateRange>) => {
      if (!dateRange) {
        setDateStart(null);
        setDateEnd(null);
        return;
      }
      const { from, to } = dateRange;
      setDateStart(from ?? null);
      if (from && to && compareAsc(from, to) !== 0) {
        setDateEnd(to);
      } else {
        setDateEnd(null);
      }
    },
    [setDateStart, setDateEnd]
  );

  const dayPickerProps = useMemo<CalenderInnerProps>(() => {
    if (mergedProps.mode === "range") {
      const dateRange: DateRange = transformObject(
        calendarRange,
        (value): Optional<Date> => value ?? undefined
      );
      return {
        selected: dateRange,
        mode: "range",
        onSelect: selectRange,
      };
    }
    return {
      selected: calendarRange.from ?? undefined,
      mode: "single",
      onSelect: selectSingle,
    };
  }, [mergedProps.mode, selectSingle, calendarRange, selectRange]);

  const assistiveText = useMemo<string>(() => {
    if (objectValues(calendarRange).every(isNullish))
      return assistiveTextTemplate.empty(mergedProps.mode);
    if (mergedProps.mode === "range")
      return assistiveTextTemplate.range(calendarRange);
    if (calendarRange.from)
      return assistiveTextTemplate.single(calendarRange.from);
    return assistiveTextTemplate.empty(mergedProps.mode);
  }, [assistiveTextTemplate, calendarRange, mergedProps.mode]);

  const defaultMonth = useHtmlAttribute(calendarRange.from);

  const minMax = useMemo<CalendarMatcher[]>(() => {
    const matchers: CalendarMatcher[] = [];
    if (mergedProps.max) {
      matchers.push({
        after: mergedProps.max,
      });
    }
    if (mergedProps.min) {
      matchers.push({
        before: mergedProps.min,
      });
    }
    return matchers;
  }, [mergedProps]);

  const disabled = useMemo<CalendarMatcher[]>(() => {
    if (!mergedProps.disabled && !minMax.length) return [];
    if (!mergedProps.disabled) return minMax;
    if (isArray(mergedProps.disabled))
      return {
        ...(mergedProps.disabled as CalendarMatcher[]),
        ...minMax,
      };
    return [mergedProps.disabled, ...minMax];
  }, [mergedProps.disabled, minMax]);

  debug({ disabled, minMax });

  return (
    <CalendarWrapper data-testid={testId}>
      <ReactDayPicker
        {...dayPickerProps}
        showOutsideDays={numberOfMonths > 1}
        numberOfMonths={numberOfMonths}
        defaultMonth={defaultMonth}
        disabled={disabled}
        hidden={mergedProps.hidden}
        locale={mergedProps.locale}
        components={{
          Nav: CalendarNav,
          Footer: CalendarFooter,
        }}
        footer={assistiveText}
      />
    </CalendarWrapper>
  );
};
Calendar.defaultProps = defaultCalendarProps;

export { Calendar };

const CalendarWrapper = styled.div`
  ${calendarWrapperStyles}
`;
