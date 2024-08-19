import { isNull, isString, type Nullable } from "@ubloimmo/front-util";
import {
  format,
  formatISO,
  isDate,
  isMatch,
  isValid,
  parse,
  parseISO,
} from "date-fns";

import type { InputValue } from "../Input.types";

const DATE_STR_FORMAT = "dd/MM/yyyy";
const DATE_STR_FORMAT_NATIVE = "yyyy-MM-dd";

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

export const dateISOToDateNativeStr = (
  dateISO: Nullable<string>
): Nullable<string> => {
  if (isNull(dateISO)) return null;
  return format(parseISO(dateISO), DATE_STR_FORMAT_NATIVE);
};

export const dateStrToDateISO = (
  dateStr: Nullable<string>
): Nullable<string> => {
  const date = dateStrToDate(dateStr);
  return dateToDateISO(date);
};

export const dateNativeStrToDateStr = (
  dateNativeStr: Nullable<string>
): Nullable<string> => {
  const date = dateNativeStrToDate(dateNativeStr);
  return dateISOToDateStr(dateToDateISO(date));
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

export const dateNativeStrToDate = (
  dateNativeStr: Nullable<string>
): Nullable<Date> => {
  if (isNull(dateNativeStr)) return null;
  return parse(dateNativeStr, DATE_STR_FORMAT_NATIVE, new Date());
};

export const isValidDate = (date: unknown): date is Date => {
  return isDate(date) && isValid(date);
};

export const isValidDateStr = (dateStr: unknown): dateStr is string => {
  if (!isString(dateStr)) return false;
  if (!isMatch(dateStr, DATE_STR_FORMAT)) return false;
  const hasTwoSlashes =
    dateStr.split("").filter((char) => char === "/").length === 2;
  if (!hasTwoSlashes) return false;
  const date = dateStrToDate(dateStr);
  if (!isValidDate(date)) return false;
  // check if all 4 year digits are included
  const year = dateStr.split("/")[2];
  return year?.length === 4;
};

export const isValidDateNativeStr = (
  dateNativeStr: unknown
): dateNativeStr is string => {
  if (!isString(dateNativeStr)) return false;
  if (!isMatch(dateNativeStr, DATE_STR_FORMAT_NATIVE)) return false;
  const hasTwoDashes =
    dateNativeStr.split("").filter((char) => char === "-").length === 2;
  if (!hasTwoDashes) return false;
  const date = dateNativeStrToDate(dateNativeStr);
  if (!isValidDate(date)) return false;
  // check if all 4 year digits are included
  const year = dateNativeStr.split("-")[0];
  return year.length === 4;
};

export const isValidDateISO = (dateISO: unknown): dateISO is string => {
  if (!isString(dateISO)) return false;
  if (isValidDateNativeStr(dateISO)) return false;
  const date = dateISOToDate(dateISO);
  return isValidDate(date);
};

export const normalizeToDateISO = (
  dateLike: Nullable<string | Date>
): Nullable<string> => {
  if (isValidDate(dateLike)) return dateToDateISO(dateLike);
  if (isValidDateNativeStr(dateLike)) {
    return dateToDateISO(dateNativeStrToDate(dateLike));
  }
  if (isValidDateStr(dateLike)) return dateStrToDateISO(dateLike);
  if (isValidDateISO(dateLike)) return dateLike;
  return null;
};

export const normalizeToDateStr = (
  dateLike: Nullable<string | Date>
): Nullable<string> => {
  if (isValidDate(dateLike)) return dateISOToDateStr(dateToDateISO(dateLike));
  if (isValidDateStr(dateLike)) return dateLike;
  if (isValidDateISO(dateLike)) return dateISOToDateStr(dateLike);
  if (isValidDateNativeStr(dateLike)) return dateNativeStrToDateStr(dateLike);
  return null;
};

export const normalizeToDate = (
  dateLike: Nullable<string | Date>
): Nullable<Date> => {
  if (isValidDate(dateLike)) return dateLike;
  if (isValidDateNativeStr(dateLike)) return dateNativeStrToDate(dateLike);
  if (isValidDateISO(dateLike)) return dateISOToDate(dateLike);
  if (isValidDateStr(dateLike)) return dateStrToDate(dateLike);
  return null;
};

export const normalizeToDateNativeStr = (
  dateLike: Nullable<string | Date>
): Nullable<string> => {
  if (isValidDateNativeStr(dateLike)) return dateLike;
  if (isValidDate(dateLike))
    return dateISOToDateNativeStr(dateToDateISO(dateLike));
  if (isValidDateStr(dateLike))
    return dateISOToDateNativeStr(dateStrToDateISO(dateLike));
  if (isValidDateISO(dateLike)) return dateISOToDateNativeStr(dateLike);
  return null;
};
