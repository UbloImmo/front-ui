import type { TimePartType, TimeStr } from "@types";
import type { Nullable, VoidFn } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type TimePickerOnChangeFn = VoidFn<[time: Nullable<TimeStr>]>;

export type TimePickerProps = {
  /**
   * Time in in `HH:MM` 24-hour format or null
   *
   * @type {Nullable<TimeStr>}
   * @default null
   */
  time?: Nullable<TimeStr>;
  /**
   * Callback function that runs when the time is changed due to user selection
   *
   * @type {Nullable<TimePickerOnChangeFn>}
   * @default null
   */
  onChange?: Nullable<TimePickerOnChangeFn>;
  /**
   * Whether time selection is disabled as a whole
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * Minimum time in `HH:MM` 24-hour format
   *
   * @type {Nullable<TimeStr>}
   * @default null
   */
  min?: Nullable<TimeStr>;
  /**
   * Maximum time in `HH:MM` 24-hour format
   *
   * @type {Nullable<TimeStr>}
   * @default null
   */
  max?: Nullable<TimeStr>;
  /**
   * Time step in minutes
   *
   * @type {number}
   * @default 1
   */
  step?: number;
};

export type TimePickerDefaultProps = Required<TimePickerProps>;

export type TimePickerItemProps = {
  timePart: number;
  onClick: VoidFn<[timePart: number]>;
  disabled: boolean;
  selected: boolean;
  type: TimePartType;
};

export type TimePickerColumnProps = {
  children: ReactNode;
  selection: Nullable<number>;
  type: TimePartType;
  defaultSelection: number;
};
