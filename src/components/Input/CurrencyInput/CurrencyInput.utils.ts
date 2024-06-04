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

import { signIconMap } from "./CurrencyInput.data";
import { useInputOnChange, useInputValue } from "../Input.utils";

import { isEmptyString, isNegative, isZero, toFixed } from "@utils";

import type { CurrencyInputDefaultProps } from "./CurrencyInput.types";
import type { NativeInputValue, NativeInputOnChangeFn } from "../Input.types";
import type {
  NumberSign,
  CurrencyFloat,
  CurrencyInt,
  CurrencyStr,
} from "@types";
import type { Nullable, Nullish } from "@ubloimmo/front-util";

const CURRENCY_DECIMALS = 2;
const CURRENCY_FACTOR = 10 ** CURRENCY_DECIMALS;

const currencyIntToFloat = (currencyInt: CurrencyInt): number => {
  if (!isNumber(currencyInt)) throw new Error("currencyInt must be a number");
  // remove currency decimals in case value is not int
  if (!isInt(currencyInt)) {
    currencyInt = toFixed(currencyInt, 0);
  }
  return toFixed(currencyInt / CURRENCY_FACTOR, CURRENCY_DECIMALS);
};

const currencyFloatToInt = (currencyFloat: CurrencyFloat): CurrencyInt => {
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

const currencyFloatToStr = (currencyFloat: CurrencyFloat): CurrencyStr => {
  if (!isNumber(currencyFloat))
    throw new Error("currencyFloat must be a number");
  return String(toFixed(currencyFloat, CURRENCY_DECIMALS)).replace(
    ".",
    ","
  ) as CurrencyStr;
};

const currencyIntToStr = (currencyInt: CurrencyInt): CurrencyStr => {
  if (!isNumber(currencyInt)) throw new Error("currencyInt must be a number");
  return currencyFloatToStr(currencyIntToFloat(currencyInt));
};

export const currencyNumberToStr = (
  currencyNumber: Nullable<CurrencyInt | CurrencyFloat>
): CurrencyStr => {
  let currencyStr: CurrencyStr;
  if (!isNumber(currencyNumber)) {
    currencyStr = currencyFloatToStr(0);
  } else if (isInt(currencyNumber)) {
    currencyStr = currencyIntToStr(currencyNumber);
  } else {
    currencyStr = currencyFloatToStr(currencyNumber);
  }
  return currencyStr;
};

export const isCurrencyPartialNumber = (currencyStr: CurrencyStr): boolean => {
  if (!isString(currencyStr)) return false;
  return !!currencyStr.match(/\d*[.]0*$/gm);
};

const currencyStrToInt = (currencyStr: CurrencyStr): Nullable<CurrencyInt> => {
  const floatOrNaN = parseFloat(
    currencyStr.replace(",", ".").replaceAll(" ", "")
  );
  if (isNaN(floatOrNaN)) return null;
  return currencyFloatToInt(floatOrNaN);
};

export const nativeCurrencyValueToFloat = (
  nativeCurrencyValue: NativeInputValue
): Nullable<CurrencyInt> => {
  if (isUndefined(nativeCurrencyValue)) {
    return null;
  }
  if (isInt(nativeCurrencyValue)) {
    return currencyFloatToInt(nativeCurrencyValue);
  }
  if (isFloat(nativeCurrencyValue)) {
    return toFixed(nativeCurrencyValue, CURRENCY_DECIMALS);
  }
  if (isEmptyString(nativeCurrencyValue)) {
    return null;
  }
  return currencyStrToInt(nativeCurrencyValue as CurrencyStr);
};

export const useCurrencyInputValidationPattern = ({
  min,
}: Pick<CurrencyInputDefaultProps, "min">) => {
  return useMemo(
    () =>
      `^[+${
        (min ?? 0) < 0 ? "-" : ""
      }]?[0-9]+(?:[.][0-9]{0,${CURRENCY_DECIMALS}})?$`,
    [min]
  );
};

const computeCurrencySign = (
  value: Nullable<CurrencyInt>,
  defaultSign?: Nullish<NumberSign>
): Nullable<NumberSign> => {
  if (isNullish(value) || isZero(value)) return defaultSign ?? null;
  if (isNegative(value)) return "-";
  return "+";
};

export const useCurrencyInput = (mergedProps: CurrencyInputDefaultProps) => {
  const [nativeValue, setNativeValue] = useState<NativeInputValue>();

  const [forceNegative, setForceNegative] = useState(
    computeCurrencySign(mergedProps.value, mergedProps.defaultSign) === "-"
  );

  const isNegativeSign = useMemo(() => {
    if (!mergedProps.value) return forceNegative;
    const isNegativeValue = isNegative(mergedProps.value);
    setForceNegative(isNegativeValue);
    return isNegativeValue;
  }, [mergedProps.value, forceNegative]);

  const sign = useMemo(() => {
    return isNegativeSign ? "-" : "+";
  }, [isNegativeSign]);

  const toggleSign = useCallback(() => {
    if (mergedProps.disabled || !mergedProps.onChange) return;
    // si il n'y a pas de valeur on retourne 0 et on inverse la valeur de forceNegative
    if (!mergedProps.value) {
      mergedProps.onChange(0);
      setForceNegative(!forceNegative);
      return;
    }
    // si il y a une valeur on inverse le signe de cette valeur lorsque qu'on clique sur l'icône + ou -
    mergedProps.onChange(-mergedProps.value);
  }, [forceNegative, mergedProps]);

  const signIcon = useMemo(() => {
    return signIconMap[sign];
  }, [sign]);

  const strictInputValue = useInputValue<"currency">(
    mergedProps.value,
    currencyNumberToStr
  );

  const updateForceNegativeOnNativeChange = useCallback<NativeInputOnChangeFn>(
    (event) => {
      const eventValue = event.target.value;
      setNativeValue(eventValue);
      if (!mergedProps.showSign) {
        setForceNegative(
          isEmptyString(eventValue) || eventValue.startsWith("-")
        );
      } else {
        if (eventValue === "-") {
          setForceNegative(true);
        }
        if (eventValue === "+") {
          setForceNegative(false);
        }
      }
      if (mergedProps.onChangeNative) {
        mergedProps.onChangeNative(event);
      }
    },
    [mergedProps]
  );

  const onChange = useInputOnChange<"currency">(
    // side effect in onChange condition
    () => true,
    (nativeValue) => {
      const processedValue = nativeCurrencyValueToFloat(nativeValue);
      if (isNull(processedValue)) return null;
      if (forceNegative) return -Math.abs(processedValue);
      return processedValue;
    },
    mergedProps.onChange,
    updateForceNegativeOnNativeChange
  );

  const inputValue = useMemo(() => {
    // accept some spaces and and decimal separators
    const rawValue = (() => {
      if (!isString(nativeValue)) return "";
      // accept only strings
      if (!isString(strictInputValue)) return nativeValue;
      console.warn({ strictInputValue, nativeValue });
      if (
        nativeValue.includes(" ") ||
        nativeValue.includes(",") ||
        nativeValue.includes(".")
      ) {
        return nativeValue;
      }
      return strictInputValue;
    })();
    // normalize null to empty string
    if (!isString(rawValue)) return "";

    // remove sign if needed
    const absoluteValue = `${rawValue}`.replaceAll("-", "").replaceAll("+", "");
    const baseValue =
      !mergedProps.showSign && isNegativeSign ? rawValue : absoluteValue;

    const formattedValue = baseValue
      // trim if spaces in decimal position
      .replaceAll(/\.\s*/g, ".")
      // remove all letters
      .replaceAll(/[a-zA-Z]/g, "")
      // only accept numbers after decimal position
      // no multiple decimal separators
      // eslint-disable-next-line no-useless-escape
      .replaceAll(/(\.\d*)([\w\s\.,]*)/g, "$1");

    return formattedValue;
  }, [mergedProps.showSign, isNegativeSign, nativeValue, strictInputValue]);

  return {
    onChange,
    inputValue,
    sign,
    signIcon,
    toggleSign,
  };
};
