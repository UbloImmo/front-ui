import { isNull, isString, type Nullable } from "@ubloimmo/front-util";

const MONTH_YEAR_REGEX = /^(0[1-9]|1[0-2])\/\d{4}$/;
const YEAR_MONTH_REGEX = /^\d{4}-(0[1-9]|1[0-2])$/;

/**
 * Checks if a string is a valid MM/YYYY format
 *
 * @param {unknown} value - the value to check
 * @return {boolean} true if valid MM/YYYY format
 */
export const isValidMonthYearStr = (value: unknown): value is string => {
  if (!isString(value)) return false;
  if (!MONTH_YEAR_REGEX.test(value)) return false;

  const [month, year] = value.split("/");
  const monthNum = parseInt(month!, 10);
  const yearNum = parseInt(year!, 10);

  return monthNum >= 1 && monthNum <= 12 && yearNum >= 1000 && yearNum <= 9999;
};

/**
 * Checks if a string is a valid YYYY-MM format
 *
 * @param {unknown} value - the value to check
 * @return {boolean} true if valid YYYY-MM format
 */
export const isValidYearMonthStr = (value: unknown): value is string => {
  if (!isString(value)) return false;
  if (!YEAR_MONTH_REGEX.test(value)) return false;

  const [year, month] = value.split("-");
  const monthNum = parseInt(month!, 10);
  const yearNum = parseInt(year!, 10);

  return monthNum >= 1 && monthNum <= 12 && yearNum >= 1000 && yearNum <= 9999;
};

/**
 * Converts MM/YYYY to YYYY-MM
 * MM/YYYY is what the user sees, YYYY-MM is what the backend expects
 *
 * @param {Nullable<string>} monthYearStr - the MM/YYYY string
 * @return {Nullable<string>} the YYYY-MM string or null
 */
export const monthYearToYearMonth = (
  monthYearStr: Nullable<string>
): Nullable<string> => {
  if (isNull(monthYearStr)) return null;
  if (!isValidMonthYearStr(monthYearStr)) return null;

  const [month, year] = monthYearStr.split("/");
  return `${year}-${month}`;
};

/**
 * Converts YYYY-MM to MM/YYYY
 * YYYY-MM is what the backend sends, MM/YYYY is what the user sees
 *
 * @param {Nullable<string>} yearMonthStr - the YYYY-MM string
 * @return {Nullable<string>} the MM/YYYY string or null
 */
export const yearMonthToMonthYear = (
  yearMonthStr: Nullable<string>
): Nullable<string> => {
  if (isNull(yearMonthStr)) return null;
  if (!isValidYearMonthStr(yearMonthStr)) return null;

  const [year, month] = yearMonthStr.split("-");
  return `${month}/${year}`;
};

/**
 * Formats a value to YYYY-MM format for backend
 *
 * @param {Nullable<string>} value - the value to format (can be MM/YYYY or YYYY-MM)
 * @return {Nullable<string>} the formatted value in YYYY-MM format or null
 */
export const formatMonthYearForBackend = (
  value: Nullable<string>
): Nullable<string> => {
  if (isNull(value)) return null;

  if (isValidYearMonthStr(value)) return value;
  if (isValidMonthYearStr(value)) return monthYearToYearMonth(value);

  return null;
};

/**
 * Auto-formats input as user types by adding "/" separator
 * Handles cases like "122025" -> "12/2025"
 * Auto-corrects invalid months: "2" -> "02/", "3" -> "03/"
 * Automatically adds "/" after valid 2-digit month
 *
 * @param {string} input - the raw input string
 * @return {string} the formatted string
 */
export const autoFormatMonthYear = (input: string): string => {
  // Remove any non-digit characters except slash
  const digitsOnly = input.replace(/[^\d]/g, "");

  // If empty, return empty
  if (digitsOnly.length === 0) return "";

  // If 1 digit
  if (digitsOnly.length === 1) {
    const firstDigit = parseInt(digitsOnly, 10);
    // If first digit is 2-9, auto-format to 0X/
    if (firstDigit >= 2 && firstDigit <= 9) {
      return `0${firstDigit}/`;
    }
    return digitsOnly;
  }

  // If 2+ digits, validate month range (01-12)
  let month = digitsOnly.slice(0, 2);
  const monthNum = parseInt(month, 10);

  // If month is 00, return just "0" (prevent 00)
  if (monthNum === 0) {
    return "0";
  }

  // If month is invalid (> 12), treat first digit as month and pad with 0
  if (monthNum > 12) {
    const firstDigit = digitsOnly.slice(0, 1);
    month = `0${firstDigit}`;
    const restDigits = digitsOnly.slice(1);

    // If we have more digits, they become the year
    if (restDigits.length > 0) {
      const year = restDigits.slice(0, 4); // Max 4 digits for year
      return `${month}/${year}`;
    }
    return `${month}/`;
  }

  // If only 2 digits, return month with slash
  if (digitsOnly.length === 2) return `${month}/`;

  // If 3+ digits, add the slash after first 2
  const year = digitsOnly.slice(2, 6); // Max 4 digits for year

  // If year starts with 0, don't include it
  if (year.length > 0 && year.startsWith("0")) {
    return `${month}/`;
  }

  return `${month}/${year}`;
};

/**
 * Increments or decrements the month or year in a MM/YYYY string
 *
 * @param {string} currentValue - the current value in MM/YYYY format
 * @param {boolean} isMonth - true to increment month, false for year
 * @param {number} increment - the amount to increment (1 or -1)
 * @return {string} the new value in MM/YYYY format
 */
export const incrementMonthOrYear = (
  currentValue: string,
  isMonth: boolean,
  increment: number
): string => {
  // Parse current value - handle partial values
  const parts = currentValue.split("/");
  const monthStr = parts[0] || "";
  const yearStr = parts[1] || "";

  let month = monthStr ? parseInt(monthStr, 10) : 1;
  let year = yearStr ? parseInt(yearStr, 10) : new Date().getFullYear();

  // If parsing failed, use defaults
  if (isNaN(month)) month = 1;
  if (isNaN(year)) year = new Date().getFullYear();

  if (isMonth) {
    // Increment/decrement month
    month += increment;
    if (month > 12) {
      month = 1;
      year += 1;
    } else if (month < 1) {
      month = 12;
      year -= 1;
    }
  } else {
    // Increment/decrement year
    year += increment;
    if (year < 1000) year = 1000;
    if (year > 9999) year = 9999;
  }

  return `${String(month).padStart(2, "0")}/${year}`;
};
