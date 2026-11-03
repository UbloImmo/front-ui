import {
  isNull,
  isString,
  type GenericFn,
  type Nullable,
  type ValueMap,
} from "@ubloimmo/front-util";
import {
  format,
  formatISO,
  isDate,
  isMatch,
  isValid,
  parse,
  parseISO,
} from "date-fns";

import type { DateInputFormat } from "@types";

const DATE_STR_FORMAT = "dd/MM/yyyy";
const DATE_STR_FORMAT_NATIVE = "yyyy-MM-dd";

/**
 * Converts a date object to its ISO string representation.
 *
 * @param {Nullable<Date>} date - the date object to convert
 * @return {Nullable<string>} the ISO string representation of the date, or null if the input date is null
 * @throws if the input is invalid
 */
export function dateToDateISO(date: Date): string;
export function dateToDateISO(date: Nullable<Date>): Nullable<string>;
export function dateToDateISO(date: Nullable<Date>): Nullable<string> {
  if (isNull(date)) return null;
  return formatISO(date);
}

/**
 * Converts a date string in ISO format to a string representation in the format (dd/MM/yyyy).
 *
 * @param {Nullable<string>} dateISO - the date string in ISO format to convert
 * @return {Nullable<string>} the string representation of the date, or null if the input date is null
 * @throws if the input is invalid
 */
export function dateISOToDateStr(dateISO: string): string;
export function dateISOToDateStr(dateISO: Nullable<string>): Nullable<string>;
export function dateISOToDateStr(dateISO: Nullable<string>): Nullable<string> {
  if (isNull(dateISO)) return null;
  return format(parseISO(dateISO), DATE_STR_FORMAT);
}

/**
 * Converts a date ISO string to its native string representation (yyyy-MM-dd).
 *
 * @param {Nullable<string>} dateISO - the date ISO string to convert
 * @return {Nullable<string>} the native string representation of the date, or null if the input date is null
 * @throws if the input is invalid
 */
export function dateISOToDateNativeStr(dateISO: string): string;
export function dateISOToDateNativeStr(
  dateISO: Nullable<string>
): Nullable<string>;
export function dateISOToDateNativeStr(
  dateISO: Nullable<string>
): Nullable<string> {
  if (isNull(dateISO)) return null;
  return format(parseISO(dateISO), DATE_STR_FORMAT_NATIVE);
}

/**
 * Converts a date string (dd/MM/yyyy) to its ISO string representation.
 *
 * @param {Nullable<string>} dateStr - the date string to convert
 * @return {Nullable<string>} the ISO string representation of the date, or null if the input date string is null
 * @throws if the input is invalid
 */
export function dateStrToDateISO(dateStr: string): string;
export function dateStrToDateISO(dateStr: Nullable<string>): Nullable<string>;
export function dateStrToDateISO(dateStr: Nullable<string>): Nullable<string> {
  const date = dateStrToDate(dateStr);
  return dateToDateISO(date);
}

/**
 * Converts a date native string (yyyy-MM-dd) to its string representation in the format (dd/MM/yyyy).
 *
 * @param {Nullable<string>} dateNativeStr - the date native string to convert
 * @return {Nullable<string>} the string representation of the date, or null if the input date native string is null
 * @throws if the input is invalid
 */
export function dateNativeStrToDateStr(dateNativeStr: string): string;
export function dateNativeStrToDateStr(
  dateNativeStr: Nullable<string>
): Nullable<string>;
export function dateNativeStrToDateStr(
  dateNativeStr: Nullable<string>
): Nullable<string> {
  const date = dateNativeStrToDate(dateNativeStr);
  return dateISOToDateStr(dateToDateISO(date));
}

/**
 * Converts a date string in ISO format to a Date object.
 *
 * @param {Nullable<string>} dateISO - the date string in ISO format to convert
 * @return {Nullable<Date>} the Date object representation of the date, or null if the input date is null
 */
export function dateISOToDate(dateISO: string): Date;
export function dateISOToDate(dateISO: Nullable<string>): Nullable<Date>;
export function dateISOToDate(dateISO: Nullable<string>): Nullable<Date> {
  if (isNull(dateISO)) return null;
  return parseISO(dateISO);
}

/**
 * Converts a date string (dd/MM/yyyy) to a Date object.
 *
 * @param {Nullable<string>} dateStr - the date string to convert
 * @return {Nullable<Date>} the Date object representation of the date, or null if the input date string is null
 */
export function dateStrToDate(dateStr: string): Date;
export function dateStrToDate(dateStr: Nullable<string>): Nullable<Date>;
export function dateStrToDate(dateStr: Nullable<string>): Nullable<Date> {
  if (isNull(dateStr)) return null;
  return parse(dateStr, DATE_STR_FORMAT, new Date());
}

/**
 * Converts a date string (yyyy-MM-dd) to a Date object.
 *
 * @param {Nullable<string>} dateNativeStr - the date string to convert
 * @return {Nullable<Date>} the Date object representation of the date, or null if the input date string is null
 */
export function dateNativeStrToDate(dateNativeStr: string): Date;
export function dateNativeStrToDate(
  dateNativeStr: Nullable<string>
): Nullable<Date>;
export function dateNativeStrToDate(
  dateNativeStr: Nullable<string>
): Nullable<Date> {
  if (isNull(dateNativeStr)) return null;
  return parse(dateNativeStr, DATE_STR_FORMAT_NATIVE, new Date());
}

/**
 * Checks if a given argument is valid date.
 *
 * @param {unknown} date - the date to check
 * @return {boolean} true if the date is valid, false otherwise
 */
export const isValidDate = (date: unknown): date is Date => {
  return isDate(date) && isValid(date);
};

/**
 * Checks if a given argument is a valid date string (dd/MM/yyyy).
 *
 * @param {unknown} dateStr - the date string to check
 * @return {boolean} true if the date string is valid, false otherwise
 */
export function isValidDateStr(dateStr: unknown): dateStr is string {
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
}

/**
 * Checks if a given argument is a valid native date string (yyyy-MM-dd).
 *
 * @param {unknown} dateStr - the date string to check
 * @return {boolean} true if the native date string is valid, false otherwise
 */
export function isValidDateNativeStr(
  dateNativeStr: unknown
): dateNativeStr is string {
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
}

/**
 * Checks if a given argument is a valid date ISO string.
 *
 * @param {unknown} dateISO - the date ISO string to check
 * @return {boolean} true if the date ISO string is valid, false otherwise
 */
export function isValidDateISO(dateISO: unknown): dateISO is string {
  if (!isString(dateISO)) return false;
  if (isValidDateNativeStr(dateISO)) return false;
  const date = dateISOToDate(dateISO);
  return isValidDate(date);
}

/**
 * Converts a given date-like object to a date ISO string.
 *
 * @param {Nullable<string | Date>} dateLike - the date-like object to convert
 * @return {Nullable<string>} the date ISO string, or null if the conversion fails
 */
export function normalizeToDateISO(
  dateLike: Nullable<string | Date>
): Nullable<string> {
  if (isValidDate(dateLike)) return dateToDateISO(dateLike);
  if (isValidDateNativeStr(dateLike)) {
    return dateToDateISO(dateNativeStrToDate(dateLike));
  }
  if (isValidDateStr(dateLike)) return dateStrToDateISO(dateLike);
  if (isValidDateISO(dateLike)) return dateLike;
  return null;
}

/**
 * Normalizes a date-like object to a date string (dd/MM/yyyy).
 *
 * @param {Nullable<string | Date>} dateLike - the date-like object to normalize
 * @return {Nullable<string>} the normalized date string, or null if the input is invalid
 */
export function normalizeToDateStr(
  dateLike: Nullable<string | Date>
): Nullable<string> {
  if (isValidDate(dateLike)) return dateISOToDateStr(dateToDateISO(dateLike));
  if (isValidDateStr(dateLike)) return dateLike;
  if (isValidDateISO(dateLike)) return dateISOToDateStr(dateLike);
  if (isValidDateNativeStr(dateLike)) return dateNativeStrToDateStr(dateLike);
  return null;
}

/**
 * Normalizes a given date-like object to a Date object.
 *
 * @param {Nullable<string | Date>} dateLike - the date-like object to normalize
 * @return {Nullable<Date>} the normalized Date object, or null if the input is invalid
 */
export function normalizeToDate(
  dateLike: Nullable<string | Date>
): Nullable<Date> {
  if (isValidDate(dateLike)) return dateLike;
  if (isValidDateNativeStr(dateLike)) return dateNativeStrToDate(dateLike);
  if (isValidDateISO(dateLike)) return dateISOToDate(dateLike);
  if (isValidDateStr(dateLike)) return dateStrToDate(dateLike);
  return null;
}

/**
 * Normalizes a given date-like object to a native date string (yyyy-MM-dd).
 *
 * @param {Nullable<string | Date>} dateLike - the date-like object to normalize
 * @return {Nullable<string>} the normalized native date string, or null if the input is invalid
 */
export function normalizeToDateNativeStr(
  dateLike: Nullable<string | Date>
): Nullable<string> {
  if (isValidDateNativeStr(dateLike)) return dateLike;
  if (isValidDate(dateLike))
    return dateISOToDateNativeStr(dateToDateISO(dateLike));
  if (isValidDateStr(dateLike))
    return dateISOToDateNativeStr(dateStrToDateISO(dateLike));
  if (isValidDateISO(dateLike)) return dateISOToDateNativeStr(dateLike);
  return null;
}

export const dateFormatters: ValueMap<
  DateInputFormat,
  GenericFn<[Nullable<Date | string>], Nullable<string>>
> = {
  iso: normalizeToDateISO,
  native: normalizeToDateNativeStr,
  "dd/mm/yyyy": normalizeToDateStr,
};
