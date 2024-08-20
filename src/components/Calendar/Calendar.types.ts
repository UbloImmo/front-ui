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
  /**
   * The start date of the range
   *
   * @type {Nullable<Date>}
   * @default null
   */
  from: Nullable<Date>;
  /**
   * The end date of the range
   *
   * @type {Nullable<Date>}
   * @default null
   */
  to: Nullable<Date>;
};

export type CalendarValue = {
  /**
   * The selected date
   *
   * @remarks Maps to the selected date if mode is `single`, or the first date if mode is `range`
   *
   * @type {Nullable<Date>}
   * @default null
   */
  date: Nullable<Date>;
  /**
   * The selected date range
   *
   * @remarks if `range.to` is missing, defaults to `date` if provided.
   *
   * @type {Nullable<CalendarRange>}
   * @default null
   */
  range?: Nullable<CalendarRange>;
};

export type CalendarMatcher = Matcher;

export type CalendarMatchers = CalendarMatcher | CalendarMatcher[];

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

/**
 * Callback function that runs when a calendar's date selection changes
 *
 * @param {Nullable<Date>} from - The first selected date or null
 * @param {Nullable<Date>} to - The last selected date or null. Always null if `mode` is `single`
 *
 * @return {void}
 */
export type CalendarOnChangeFn = VoidFn<[Nullable<Date>, Nullable<Date>]>;

export type CalendarProps = Partial<CalendarValue> & {
  /**
   * Callback function that runs when a date is selected
   *
   * @type {Nullable<CalendarOnChangeFn>}
   * @default null
   */
  onChange?: Nullable<CalendarOnChangeFn>;
  /**
   * Whether a selected date is required
   *
   * @remarks If `true`, unselecting a date will not be allowed
   *
   * @type {boolean}
   * @default false
   */
  required?: boolean;
  /**
   * The number of months to display
   *
   * @remarks Clamped between 1 and 3
   *
   * @type {number}
   * @default 1
   */
  numberOfMonths?: number;
  /**
   * The `date-fns` locale to use for layout and wording
   *
   * @type {Locale}
   * @default `fr`
   */
  locale?: Locale;
  /**
   * The calendar's selection mode. Either `single` or `range`
   *
   * @type {CalendarMode}
   * @default "single"
   */
  mode?: CalendarMode;
  /**
   * The calendar's disabled date matchers
   *
   * @remarks Providing `true` will disable all dates
   *
   * @type {CalendarMatchers}
   * @default false
   */
  disabled?: CalendarMatchers;
  /**
   * The calendar's hidden date matchers
   *
   * @remarks Providing `true` will hide all dates
   *
   * @type {CalendarMatchers}
   * @default false
   */
  hidden?: CalendarMatchers;
  /**
   * The calendar's assistive text template definition
   *
   * @remarks Used to generate accessibility labels and ARIA descriptions
   *
   * @default "object"
   * @type {CalendarAssistiveTextTemplate}
   */
  assistiveTextTemplate?: Partial<CalendarAssistiveTextTemplate>;
  /**
   * The calendar's minimum date, inclusive.
   *
   * @remarks Gets added to the `disabled` matchers. Disables all dates before itself
   *
   * @type {Nullable<Date>}
   * @default null
   */
  min?: Nullable<Date>;
  /**
   * The calendar's maximum date, inclusive.
   *
   * @remarks Gets added to the `disabled` matchers. Disables all dates after itself
   *
   * @type {Nullable<Date>}
   * @default null
   */
  max?: Nullable<Date>;
};

export type CalendarDefaultProps = Required<CalendarProps>;

export type CalendarDayStyleProps = StyleProps<
  Record<string, unknown> & DayProps
>;
