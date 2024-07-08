import {
  isFloat,
  isInt,
  isNull,
  isNullish,
  isNumber,
  isString,
  isUndefined,
} from "@ubloimmo/front-util";
import { useCallback, useMemo, useState } from "react";

import { invertSignMap, signIconMap } from "./CurrencyInput.data";
import { useInputOnChange, useInputValue } from "../Input.utils";

import { arrayOf } from "@/utils/array.utils";
import { clamp, isEmptyString, isNegative, isZero, toFixed } from "@utils";

import type {
  CurrencyInputDefaultProps,
  UseCurrencyInputReturn,
} from "./CurrencyInput.types";
import type { NativeInputValue } from "../Input.types";
import type {
  NumberSign,
  CurrencyFloat,
  CurrencyInt,
  CurrencyStr,
  FormattedCurrencyStrWithSymbol,
} from "@types";
import type { GenericFn, Nullable, Nullish } from "@ubloimmo/front-util";

const CURRENCY_DECIMALS = 2;
const CURRENCY_FACTOR = 10 ** CURRENCY_DECIMALS;

/**
 * Converts a currency integer to a floating-point number.
 *
 * @param {CurrencyInt} currencyInt - The currency integer to be converted.
 * @return {number} The converted floating-point number.
 * @throws {Error} If the input is not a number.
 */
export const currencyIntToFloat = (currencyInt: CurrencyInt): number => {
  if (!isNumber(currencyInt)) throw new Error("currencyInt must be a number");
  // remove currency decimals in case value is not int
  if (!isInt(currencyInt)) {
    currencyInt = toFixed(currencyInt, 0);
  }
  return toFixed(currencyInt / CURRENCY_FACTOR, CURRENCY_DECIMALS);
};

/**
 * Converts a floating-point currency value to an integer.
 *
 * @param {CurrencyFloat} currencyFloat - The floating-point currency value to be converted.
 * @return {CurrencyInt} The converted integer value.
 * @throws {Error} If the input is not a number.
 */
export const currencyFloatToInt = (
  currencyFloat: CurrencyFloat
): CurrencyInt => {
  if (!isNumber(currencyFloat))
    throw new Error(
      `currencyFloat must be a number, received ${currencyFloat}`
    );

  const int = toFixed(currencyFloat * CURRENCY_FACTOR, 0);
  // FIXME: handle big integer values
  if (int > Number.MAX_SAFE_INTEGER || int < Number.MIN_SAFE_INTEGER) {
    console.warn(
      `Overflowing currency integer (${int}), some precision may be lost`
    );
  }
  return int;
};

/**
 * Converts a floating-point currency value to a string representation
 * with commas as decimal separators and always 2 digits after the decimal point.
 *
 * @param {CurrencyFloat} currencyFloat - The floating-point currency value to be converted.
 * @return {CurrencyStr} The string representation of the currency value.
 * @throws {Error} If the input is not a number.
 */
export const currencyFloatToStr = (
  currencyFloat: CurrencyFloat
): CurrencyStr => {
  if (!isNumber(currencyFloat))
    throw new Error("currencyFloat must be a number");
  if (isInt(currencyFloat)) return `${currencyFloat},00`;
  let currencyStr = String(toFixed(currencyFloat, CURRENCY_DECIMALS)).replace(
    ".",
    ","
  ) as CurrencyStr;
  // add missing 0 if needed
  if (!currencyStr.includes(",")) return currencyStr;
  const secondDecimal = currencyStr.at(currencyStr.indexOf(",") + 2);
  if (isUndefined(secondDecimal)) {
    currencyStr = `${currencyStr}0` as CurrencyStr;
  }
  return currencyStr;
};

/**
 * Converts a currency integer to a string representation
 * with commas as decimal separators and always 2 digits after the decimal point.
 *
 * @param {CurrencyInt} currencyInt - The currency integer to be converted.
 * @return {CurrencyStr} The string representation of the currency value.
 * @throws {Error} If the input is not a number.
 */
export const currencyIntToStr = (currencyInt: CurrencyInt): CurrencyStr => {
  if (!isNumber(currencyInt)) throw new Error("currencyInt must be a number");
  return currencyFloatToStr(currencyIntToFloat(currencyInt));
};

/**
 * Converts a nullable currency number to a string representation.
 *
 * @param {Nullable<CurrencyInt | CurrencyFloat>} currencyNumber - The nullable currency number to be converted.
 * @return {CurrencyStr} The string representation of the currency number.
 */
export const currencyNumberToStr = (
  currencyNumber: Nullable<CurrencyInt | CurrencyFloat>
): CurrencyStr => {
  let currencyStr: CurrencyStr;
  if (!isNumber(currencyNumber)) {
    currencyStr = currencyIntToStr(0);
  } else if (isInt(currencyNumber)) {
    currencyStr = currencyIntToStr(currencyNumber);
  } else {
    currencyStr = currencyFloatToStr(currencyNumber);
  }
  return currencyStr;
};

/**
 * Converts a string representation of a currency value to a nullable integer value.
 *
 * @param {CurrencyStr} currencyStr - The string representation of the currency value.
 * @return {Nullable<CurrencyInt>} The nullable integer value of the currency, or null if the input is not a valid number.
 */
export const currencyStrToInt = (
  currencyStr: CurrencyStr
): Nullable<CurrencyInt> => {
  if (!isString(currencyStr)) return null;
  const floatOrNaN = parseFloat(
    currencyStr.replace(",", ".").replaceAll(" ", "")
  );
  if (isNaN(floatOrNaN)) return null;
  return currencyFloatToInt(floatOrNaN);
};

/**
 * Converts a native currency value to a nullable integer value.
 *
 * @param {NativeInputValue} nativeCurrencyValue - The native currency value to convert.
 * @return {Nullable<CurrencyInt>} The nullable integer value of the currency, or null if the input is not a valid number.
 */
export const nativeCurrencyValueToFloat = (
  nativeCurrencyValue: NativeInputValue
): Nullable<CurrencyInt> => {
  if (isNullish(nativeCurrencyValue)) {
    return null;
  }
  if (isInt(nativeCurrencyValue)) {
    return toFixed(nativeCurrencyValue * CURRENCY_FACTOR, 0);
  }
  if (isFloat(nativeCurrencyValue)) {
    return currencyFloatToInt(nativeCurrencyValue);
  }
  if (!isString(nativeCurrencyValue)) {
    return null;
  }
  if (isEmptyString(nativeCurrencyValue)) {
    return null;
  }
  return currencyStrToInt(nativeCurrencyValue as CurrencyStr);
};

/**
 * Generates a regular expression pattern for validating currency input based on the provided minimum value.
 *
 * @param {Pick<CurrencyInputDefaultProps, "min">} options - An object containing the minimum value for the currency input.
 * @param {Nullish<number>} options.min - The minimum value for the currency input. If not provided, defaults to 0.
 * @return {string} The regular expression pattern for validating currency input.
 */
export const useCurrencyInputValidationPattern = ({
  min,
}: Pick<CurrencyInputDefaultProps, "min">): string => {
  return useMemo(() => {
    return `^[+${
      (min ?? 0) < 0 ? "-" : ""
    }]?[0-9\\s]+(?:[.,][0-9]{0,${CURRENCY_DECIMALS}})?$`;
  }, [min]);
};

/**
 * Computes the currency sign based on the given value and default sign.
 *
 * @param {Nullable<CurrencyInt>} value - The value to compute the currency sign for.
 * @param {Nullish<NumberSign>} [defaultSign] - The default sign to use if the value is nullish, not a number, or zero.
 * @returns {Nullable<NumberSign>} The computed currency sign, or the default sign if provided and applicable.
 */
export const computeCurrencySign = (
  value: Nullable<CurrencyInt>,
  defaultSign?: Nullish<NumberSign>
): Nullable<NumberSign> => {
  if (isNullish(value) || !isNumber(value) || isZero(value))
    return defaultSign ?? null;
  if (isNegative(value)) return "-";
  return "+";
};

// ------------------------ REWRITE ------------------------

/**
 * Sanitizes a currency input value by removing unnecessary characters and formatting it.
 *
 * @param {string} nativeStringValue - The input value to be sanitized.
 * @return {string} The sanitized currency input value.
 */
const sanitizeCurrencyInputValue = (nativeStringValue: string): string => {
  return (
    nativeStringValue
      // remove start spaces
      .trimStart()
      // only allow numbers, a decimal point, negative sign and spaces
      // eslint-disable-next-line no-useless-escape
      .replaceAll(/[^\d\s\.\-,]/g, "")
      // only allow one decimal point
      // eslint-disable-next-line no-useless-escape
      .replaceAll(/[,\.]+/g, ",")
      // only allow one consecutive negative sign
      // eslint-disable-next-line no-useless-escape
      .replaceAll(/\-+/g, "-")
      // only allow a signe negative sign at the beginning
      // eslint-disable-next-line no-useless-escape
      .replaceAll(/(\-[\d.,\s]*)(-)/g, "$1")
      // replace consective spaces with a single space
      .replace(/\s+/g, " ")
  );
};

/**
 * Returns a function that formats a currency input value based on the provided native input value.
 *
 * @param {NativeInputValue} nativeValue - The input value to be formatted.
 * @return {GenericFn<[CurrencyInt], string>} - A function that takes a currency integer and returns the formatted currency input value.
 */
const formatCurrencyInputValue =
  (nativeValue: NativeInputValue): GenericFn<[CurrencyInt], string> =>
  (currencyInt: CurrencyInt): string => {
    const floatValue = currencyIntToFloat(currencyInt);
    const stringValue = currencyFloatToStr(floatValue);
    if (!isString(nativeValue)) return stringValue;
    // sanitize native input value
    const nativeInputValueSanitized = sanitizeCurrencyInputValue(nativeValue);
    // store space positions
    const spaces = arrayOf(
      nativeInputValueSanitized.length,
      (index) => nativeInputValueSanitized[index] === " "
    );
    // remove spaces from native input before comparing it with generated string
    let nativeInputValueFullTrimmed = nativeInputValueSanitized.replaceAll(
      " ",
      ""
    );
    // add negative sign to trimmed native input value if needed
    let negativeSpaceOffset = 0;
    if (
      stringValue.startsWith("-") &&
      !nativeInputValueFullTrimmed.startsWith("-")
    ) {
      negativeSpaceOffset = 1;
      nativeInputValueFullTrimmed = `-${nativeInputValueFullTrimmed}`;
    }

    // restrict string value to native input's length
    const stringValueClipped = stringValue.substring(
      0,
      nativeInputValueFullTrimmed.length
    );
    // re-add spaces to string value
    let spaceOffset = 0;
    let stringValueClippedWithSpaces = stringValueClipped
      .split("")
      .map((char, index) => {
        if (spaces[index + spaceOffset - negativeSpaceOffset]) {
          spaceOffset++;
          return ` ${char}`;
        }
        return char;
      })
      .join("");
    // add final space if present in native value
    if (nativeInputValueSanitized.endsWith(" ")) {
      stringValueClippedWithSpaces += " ";
    }
    return stringValueClippedWithSpaces;
  };

/**
 * Converts a native currency value to a currency integer.
 *
 * @param {NativeInputValue} nativeValue - The native currency value to be converted.
 * @return {Nullable<CurrencyInt>} The converted currency integer, or null if the input is undefined.
 */
const convertNativeCurrencyValueToCurrencyInt = (
  nativeValue: NativeInputValue
): Nullable<CurrencyInt> => {
  if (isUndefined(nativeValue)) return null;
  const sanizitedNativeValue = isString(nativeValue)
    ? sanitizeCurrencyInputValue(nativeValue)
    : nativeValue;

  const processedValue = nativeCurrencyValueToFloat(sanizitedNativeValue);

  return processedValue;
};

/**
 * Generates a custom hook for managing currency input.
 *
 * @param {CurrencyInputDefaultProps} mergedProps - The merged default props for the currency input.
 * @return {UseCurrencyInputReturn} An object containing the following properties:
 *   - onChange: The input change event handler.
 *   - inputValue: The formatted input value.
 *   - signIcon: The icon representing the currency sign.
 *   - toggleSign: The function to toggle the currency sign.
 */
export const useCurrencyInput = (
  mergedProps: CurrencyInputDefaultProps
): UseCurrencyInputReturn => {
  const [nativeInputValue, setNativeInputValue] = useState<NativeInputValue>();

  /**
   * Clamps a given value between the min and max props
   * While scaling them to a currency integer
   */
  const clampToMinMax = useCallback(
    (value: Nullable<CurrencyInt>) => {
      if (isNull(value)) return null;
      return clamp(
        value,
        (mergedProps.min ?? -Infinity) * CURRENCY_FACTOR,
        (mergedProps.max ?? Infinity) * CURRENCY_FACTOR
      );
    },
    [mergedProps]
  );

  const clampedValue = useMemo(
    () => clampToMinMax(mergedProps.value),
    [mergedProps.value, clampToMinMax]
  );

  const [toggleableSign, setToggleableSign] = useState(
    computeCurrencySign(
      mergedProps.value,
      mergedProps.defaultSign ?? "+"
    ) as NumberSign
  );

  /**
   * Derived sign strictly from props or native value as fallback
   */
  const derivedSign = useMemo(() => {
    const currencyInt =
      `${nativeInputValue ?? ""}`.trim() === "-"
        ? -1
        : convertNativeCurrencyValueToCurrencyInt(nativeInputValue);
    const currencySign = computeCurrencySign(
      clampedValue ?? currencyInt,
      mergedProps.defaultSign
    ) as NumberSign;

    // update toggleable sign in the background if not shown
    setToggleableSign(currencySign);
    return currencySign;
  }, [nativeInputValue, mergedProps, clampedValue]);

  const sign = useMemo(() => {
    if (mergedProps.showSign) return toggleableSign;
    return derivedSign;
  }, [derivedSign, toggleableSign, mergedProps.showSign]);

  const signIcon = useMemo(() => {
    return signIconMap[sign];
  }, [sign]);

  const onChange = useInputOnChange<"currency">(
    () => true,
    (nativeValue) => {
      setNativeInputValue(nativeValue);
      const currencyInt = clampToMinMax(
        convertNativeCurrencyValueToCurrencyInt(nativeValue)
      );
      if (isNull(currencyInt)) return currencyInt;
      if (mergedProps.showSign) {
        const absoluteCurrencyInt = Math.abs(currencyInt);
        return sign === "-" ? -absoluteCurrencyInt : absoluteCurrencyInt;
      }
      return currencyInt;
    },
    mergedProps.onChange,
    mergedProps.onChangeNative
  );

  const inputValue = useInputValue<"currency">(
    clampedValue,
    formatCurrencyInputValue(nativeInputValue),
    () => {
      const currencyInt = clampToMinMax(
        convertNativeCurrencyValueToCurrencyInt(nativeInputValue)
      );
      if (isNull(currencyInt)) {
        if (isString(nativeInputValue))
          return sanitizeCurrencyInputValue(nativeInputValue);
        return "";
      }
      return formatCurrencyInputValue(nativeInputValue)(currencyInt);
    },
    !!mergedProps.onChange || !mergedProps.value
  );

  const strictInputValue = useMemo(() => {
    const valueStr = isString(inputValue) ? inputValue : "";
    if (mergedProps.showSign) {
      return valueStr.replaceAll("-", "");
    }
    return inputValue ?? "";
  }, [inputValue, mergedProps]);

  const toggleSign = useCallback(() => {
    if (isNull(clampedValue)) {
      setToggleableSign(invertSignMap[toggleableSign]);
      return;
    }
    if (mergedProps.onChange)
      mergedProps.onChange(clampToMinMax(-clampedValue));
  }, [toggleableSign, mergedProps, clampedValue, clampToMinMax]);

  return {
    onChange,
    inputValue: strictInputValue,
    signIcon,
    toggleSign,
  };
};

/**
 * Formats a currency integer to a string representation with the currency symbol.
 *
 * @param {CurrencyInt} currencyInt - The currency integer to format.
 * @return {`${CurrencyStr} €`} The formatted currency string with the currency symbol.
 *
 * @throws {Error} If the input is not an int.
 */
export const formatCurrencyInt = (
  currencyInt: CurrencyInt
): FormattedCurrencyStrWithSymbol => {
  const currencyStr = currencyIntToStr(currencyInt);
  const [intStr, decimalStr = "00"] = currencyStr.split(",");
  let i = 0;
  const intStrWithSpaces = intStr
    .split("")
    .reverse()
    .map((digit, index) => {
      i++;
      if (i % 3 === 0 && index !== 0) {
        return ` ${digit}`;
      }
      return digit;
    })
    .reverse()
    .join("");

  const currencyStrWithSpaces = [intStrWithSpaces, decimalStr]
    .join(",")
    .trim() as CurrencyStr;

  return `${currencyStrWithSpaces} €`;
};
