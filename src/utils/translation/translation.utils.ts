import {
  isFunction,
  isNumber,
  isObject,
  transformObject,
} from "@ubloimmo/front-util";

import { defaultTranslations } from "./translation.defaults";
import { mergeDefaultProps } from "../props.utils";
import { isNonEmptyString } from "../string.utils";

import type {
  TranslationFn,
  CompleteTranslationFnMap,
  CompleteTranslationMap,
  TranslationSubsetName,
  TranslationMap,
  TranslationContext,
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
  if (!isObject(translationMap)) {
    return {} as CompleteTranslationFnMap<TTranslationSubsetName>;
  }
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

/**
 * Merges a given replacement map with the default translations.
 *
 * @param {TranslationMap} [replacementMap={}] The replacement map to merge
 *   with the default translations.
 * @return {TranslationContext} The merged translation context.
 */
export const mergeTranslationMap = (
  replacementMap: TranslationMap = {}
): TranslationContext => {
  if (!isObject(replacementMap))
    return transformObject(defaultTranslations, (translationMap) =>
      makeTranslationFnMap<TranslationSubsetName>(
        translationMap as CompleteTranslationMap<TranslationSubsetName>
      )
    ) as TranslationContext;
  return transformObject(
    defaultTranslations,
    (defaultTranslationsForSubset) => {
      return makeTranslationFnMap(
        mergeDefaultProps<
          CompleteTranslationMap<TranslationSubsetName>,
          TranslationMap<TranslationSubsetName>
        >(
          defaultTranslationsForSubset as CompleteTranslationMap<TranslationSubsetName>,
          replacementMap
        )
      );
    }
  ) as TranslationContext;
};
