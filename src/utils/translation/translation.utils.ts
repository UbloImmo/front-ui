import { isFunction, isNumber, transformObject } from "@ubloimmo/front-util";

import { isNonEmptyString } from "../string.utils";

import type {
  TranslationFn,
  CompleteTranslationFnMap,
  CompleteTranslationMap,
  TranslationSubsetName,
} from "./translation.types";

/**
 * Transforms a complete translation map into a complete translation function map.
 *
 * @param {CompleteTranslationMap<TTranslationSubsetName>} translationMap - The
 *   complete translation map to transform.
 * @return {CompleteTranslationFnMap<TTranslationSubsetName>} A complete
 *   translation function map.
 *
 * @remarks A translation function is created for every translation value that
 *   is not a function. The translation function takes a variable number of
 *   strings as arguments and returns a joined string of all its arguments that
 *   are non-empty strings. Existing translation functions are left untouched.
 */
export const makeTranslationFnMap = <
  TTranslationSubsetName extends TranslationSubsetName = TranslationSubsetName
>(
  translationMap: CompleteTranslationMap<TTranslationSubsetName>
): CompleteTranslationFnMap<TTranslationSubsetName> => {
  return transformObject(translationMap, (translation) => {
    if (isFunction<TranslationFn>(translation)) {
      return translation;
    }
    return (...args: (string | number)[]) =>
      [translation, ...args]
        .filter((arg) => isNonEmptyString(arg) || isNumber(arg))
        .join(" ");
  });
};
