import { isNumber, Nullable } from "@ubloimmo/front-util";

import { clamp, ensureInt } from "./number.utils";
import { isNonEmptyString } from "./string.utils";

import type { TimeSlot, TimeSlotMap, TimeSplit, TimeStr } from "@types";

const TIME_SEPARATOR = ":";

const MIN_HOUR = 0;
const MAX_HOUR = 23;
const MIN_MINUTE = 0;
const MAX_MINUTE = 59;

const MIN_STEP = 1;
const MAX_STEP = 60;

// strict zero-padded 24-hour `HH:MM`, hours 00-23 and minutes 00-59
const TIME_REGEX = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function parseTimeStr(time: Nullable<TimeStr>): Nullable<TimeSplit> {
  if (!isNonEmptyString(time)) return null;
  const match = TIME_REGEX.exec(time);
  if (!match) return null;
  return { hour: Number(match[1]), minute: Number(match[2]) };
}

/**
 * Checks whether a value is a valid 24-hour {@link TimeStr} string
 * @param {unknown} value - Value to check
 * @returns {boolean} True if the value is a {@link TimeStr}, false otherwise
 */
export function isTimeStr(value: unknown): value is TimeStr {
  return parseTimeStr(value as Nullable<TimeStr>) !== null;
}

export function makeTimeSlots(
  min: Nullable<TimeSplit>,
  max: Nullable<TimeSplit>,
  step: number
): TimeSlot[] {
  const stepMinute = clamp(ensureInt(step, MIN_STEP), MIN_STEP, MAX_STEP);

  const minHour = clamp(ensureInt(min?.hour, MIN_HOUR), MIN_HOUR, MAX_HOUR);
  const maxHour = clamp(ensureInt(max?.hour, MAX_HOUR), MIN_HOUR, MAX_HOUR);
  const minMinute = clamp(
    ensureInt(min?.minute, MIN_MINUTE),
    MIN_MINUTE,
    MAX_MINUTE
  );
  const maxMinute = clamp(
    ensureInt(max?.minute, MAX_MINUTE),
    MIN_MINUTE,
    MAX_MINUTE
  );

  const slots: TimeSlot[] = [];

  // edge case: min hour is later than max hour
  // (ex: night shift from 20:15 to 05:45 the next morning)
  // -> wrap around hours to next day
  if (minHour > maxHour) {
    // collect hours for this day and the next
    const wrapAroundHours: number[] = [];
    for (let h = minHour; h <= MAX_HOUR; h++) {
      wrapAroundHours.push(h);
    }
    for (let h = MIN_HOUR; h <= maxHour; h++) {
      wrapAroundHours.push(h);
    }
    // generate minutes for each
    for (const hour of wrapAroundHours) {
      const slot: TimeSlot = { hour, minutes: [] };
      const minM = hour === minHour ? minMinute : MIN_MINUTE;
      const maxM = hour === maxHour ? maxMinute : MAX_MINUTE;
      for (let m = minM; m <= maxM; m += stepMinute) {
        slot.minutes.push(m);
      }
      slots.push(slot);
    }
    return slots;
  }

  // edge case: same min/max hour but min is later than max
  // (ex: overnight period from 16:45 to 16:25 the next afternoon)
  // -> omits the gap in minutes between min & max in the shared hour, otherwise allowing all other values
  if (
    minHour === maxHour &&
    isNumber(max?.minute) &&
    isNumber(min?.minute) &&
    minMinute > maxMinute
  ) {
    // all hours are valid, but the shared hour excludes the gap between max and min minutes
    // (ex: 16:00 to 16:25 and 16:45 to 16:59 are valid, 16:30 is not)
    for (let h = MIN_HOUR; h <= MAX_HOUR; h++) {
      const minutes: number[] = [];
      if (h === minHour) {
        for (let m = MIN_MINUTE; m <= maxMinute; m += stepMinute) {
          minutes.push(m);
        }
        for (let m = minMinute; m <= MAX_MINUTE; m += stepMinute) {
          minutes.push(m);
        }
      } else {
        for (let m = MIN_MINUTE; m <= MAX_MINUTE; m += stepMinute) {
          minutes.push(m);
        }
      }
      slots.push({ hour: h, minutes });
    }
    return slots;
  }

  for (let h = minHour; h <= maxHour; h++) {
    const slot: TimeSlot = { hour: h, minutes: [] };
    const minM = h === minHour ? minMinute : MIN_MINUTE;
    const maxM = h === maxHour ? maxMinute : MAX_MINUTE;
    for (let m = minM; m <= maxM; m += stepMinute) {
      slot.minutes.push(m);
    }
    slots.push(slot);
  }

  return slots;
}

export function makeTimeSlotMap(timeSlots: TimeSlot[]): TimeSlotMap {
  const map: TimeSlotMap = new Map();

  timeSlots.forEach(({ hour, minutes }) => {
    map.set(hour, { hour, minutes, minuteSet: new Set(minutes) });
  });

  return map;
}

/**
 * Formats an hour or minute into a string
 * @param {number} timePart - Hour or minute to format
 * @returns {`${number}`} Strinfied timePart
 */
export function formatTimePart(timePart: number): `${number}` {
  return String(ensureInt(Math.abs(timePart), 0)).padStart(
    2,
    "0"
  ) as `${number}`;
}

/**
 * Formats a {@link TimeSplit} object into a {@link TimeStr} string
 * @param {Nullable<TimeSplit>} timeSplit - Object to format or null
 * @returns {Nullable<TimeStr>} Formatted 24-hour time string
 */
export function formatTimeSplit(timeSplit: TimeSplit): TimeStr;
export function formatTimeSplit(
  timeSplit: Nullable<TimeSplit>
): Nullable<TimeStr>;
export function formatTimeSplit(
  timeSplit: Nullable<TimeSplit>
): Nullable<TimeStr> {
  if (!timeSplit) return null;
  const { hour, minute } = timeSplit;
  return `${formatTimePart(hour)}${TIME_SEPARATOR}${formatTimePart(minute)}`;
}

/**
 * Gets the current time & returns it as a time string
 * @returns {TimeStr} Current time in a 24-hour time string format
 */
export function currentTime(): TimeStr {
  const now = new Date(Date.now());
  const hour = now.getHours();
  const minute = now.getMinutes();
  return formatTimeSplit({ hour, minute });
}
