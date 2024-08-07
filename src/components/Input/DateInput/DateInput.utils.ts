import { isNull, type Nullable } from "@ubloimmo/front-util";
import {
  format,
  formatISO,
  getYear,
  isDate,
  isMatch,
  isValid,
  parse,
  parseISO,
} from "date-fns";

import type { InputValue } from "../Input.types";

const DATE_STR_FORMAT = "dd/MM/yyyy";

export const dateToDateISO = (date: Nullable<Date>): Nullable<string> => {
  if (isNull(date)) return null;
  return formatISO(date);
};

export const dateISOToDateStr = (
  dateISO: Nullable<string>
): Nullable<string> => {
  if (isNull(dateISO)) return null;
  return format(parseISO(dateISO), DATE_STR_FORMAT);
};

export const dateStrToDateISO = (
  dateStr: Nullable<string>
): Nullable<string> => {
  const date = dateStrToDate(dateStr);
  return dateToDateISO(date);
};

export const dateISOToDate = (
  dateISO: Nullable<InputValue<"date">>
): Nullable<Date> => {
  if (isNull(dateISO)) return null;
  return parseISO(dateISO);
};

export const dateStrToDate = (dateStr: Nullable<string>): Nullable<Date> => {
  if (isNull(dateStr)) return null;
  return parse(dateStr, DATE_STR_FORMAT, new Date());
};

export const isValidDate = (date: unknown): date is Date => {
  return isDate(date) && isValid(date);
};

export const isValidDateStr = (dateStr: Nullable<string>): boolean => {
  if (isNull(dateStr)) return false;
  if (!isMatch(dateStr, DATE_STR_FORMAT)) return false;
  const date = dateStrToDate(dateStr);

  if (!isValidDate(date)) return false;
  // check if all 4 year digits are included
  const year = getYear(date);
  console.log(year);
  return year.toString().length === 4;
};

export const isValidDateISO = (dateISO: Nullable<string>): boolean => {
  const date = dateISOToDate(dateISO);
  return isValidDate(date);
};

export const normalizeToDateISO = (
  dateOrDateStrOrISO: Nullable<string | Date>
): Nullable<string> => {
  if (isValidDate(dateOrDateStrOrISO)) return dateToDateISO(dateOrDateStrOrISO);
  if (isValidDateISO(dateOrDateStrOrISO)) return dateOrDateStrOrISO;
  if (isValidDateStr(dateOrDateStrOrISO))
    return dateStrToDateISO(dateOrDateStrOrISO);
  return null;
};

export const normalizeToDateStr = (
  dateOrDateStrOrISO: Nullable<string | Date>
): Nullable<string> => {
  if (isValidDate(dateOrDateStrOrISO))
    return dateISOToDateStr(dateToDateISO(dateOrDateStrOrISO));
  if (isValidDateISO(dateOrDateStrOrISO))
    return dateISOToDateStr(dateOrDateStrOrISO);
  if (isValidDateStr(dateOrDateStrOrISO)) return dateOrDateStrOrISO;
  return null;
};

export const normalizeToDate = (
  dateOrDateStrOrISO: Nullable<string | Date>
): Nullable<Date> => {
  if (isValidDate(dateOrDateStrOrISO)) return dateOrDateStrOrISO;
  if (isValidDateISO(dateOrDateStrOrISO))
    return dateISOToDate(dateOrDateStrOrISO);
  if (isValidDateStr(dateOrDateStrOrISO))
    return dateStrToDate(dateOrDateStrOrISO);
  return null;
};
