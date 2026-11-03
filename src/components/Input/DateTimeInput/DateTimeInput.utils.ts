import { TimeStr } from "@types";
import { dateToDateISO, getTimeOfDate, normalizeToDate } from "@utils";

import type { Nullable } from "@ubloimmo/front-util";

export function extractTimeAndDate(
  value: Nullable<string>
): { time: TimeStr; date: string } | { time: null; date: null } {
  const date = normalizeToDate(value);
  if (!date) return { time: null, date: null };
  const time = getTimeOfDate(date);
  const dateISO = dateToDateISO(date);
  return {
    time,
    date: dateISO,
  };
}
