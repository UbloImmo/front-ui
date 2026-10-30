import type { KeyOf } from "@ubloimmo/front-util";

/**
 * Time string in 24 hour format (HH:MM)
 */
export type TimeStr = `${number}:${number}`;

export type TimeSplit = {
  hour: number;
  minute: number;
};

export type TimePartType = KeyOf<TimeSplit, string>;

export type TimeSlot = {
  hour: number;
  minutes: number[];
};

export type TimeSlotMap = Map<
  number,
  { hour: number; minutes: number[]; minuteSet: Set<number> }
>;
