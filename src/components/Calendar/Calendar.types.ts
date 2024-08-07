import type { StyleProps } from "@types";
import type { GenericFn, Nullable, VoidFn } from "@ubloimmo/front-util";
import type {
  DayProps,
  Locale,
  Matcher,
  PropsBase,
  PropsRange,
  PropsSingle,
} from "react-day-picker";

export type CalendarRange = {
  from: Nullable<Date>;
  to: Nullable<Date>;
};

export type CalendarValue = {
  date: Nullable<Date>;
  range?: Nullable<CalendarRange>;
};

type CalendarMatchers = Matcher | Matcher[];

export type CalendarMode = "single" | "range";

export type CalenderInnerProps = PropsBase & (PropsSingle | PropsRange);

export type CalendarAssistiveTextTemplate = {
  /**
   * Formatter function that runs when no date is selected
   * @param {CalendarMode} mode - The calendar mode, either `single` or `range`
   * @return {string} - Text to display when no date is selected
   */
  empty: GenericFn<[CalendarMode], string>;
  /**
   * Formatter function that runs when a single date is selected
   * @param {Date} date - The selected date or null
   * @return {string} - Text to display when a single date is selected
   */
  single: GenericFn<[Date], string>;
  /**
   * Formatter function that runs when a range of dates is selected
   * @param {CalendarRange} dateRange - The selected date range. Can be partial
   * @return {string} - Text to display when a range of dates is selected
   *
   * @remarks Partial range handling is expected from this formatter.
   */
  range: GenericFn<[CalendarRange], string>;
};

export type CalendarOnChangeFn = VoidFn<[Nullable<Date>, Nullable<Date>]>;

export type CalendarProps = Partial<CalendarValue> & {
  onChange?: Nullable<CalendarOnChangeFn>;
  required?: boolean;
  numberOfMonths?: number;
  locale?: Locale;
  mode?: CalendarMode;
  disabled?: CalendarMatchers;
  hidden?: CalendarMatchers;
  assistiveTextTemplate?: Partial<CalendarAssistiveTextTemplate>;
};

export type CalendarDefaultProps = Required<CalendarProps>;

export type CalendarDayStyleProps = StyleProps<
  Record<string, unknown> & DayProps
>;
