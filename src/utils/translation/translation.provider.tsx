import { transformObject } from "@ubloimmo/front-util";
import { createContext, useContext } from "react";

import { defaultTranslations } from "./translation.defaults";
import { makeTranslationFnMap } from "./translation.utils";
import { mergeDefaultProps, useStatic } from "../props.utils";

import type {
  CompleteTranslationMap,
  TranslationContext,
  TranslationContextProps,
  TranslationMap,
  TranslationSubsetName,
} from "./translation.types";

/**
 * Hook to get the default translation context merged with the given replacement map.
 *
 * The hook is memoized using the `useStatic` hook to
 * ensure that the translation context is only computed once.
 *
 * @param {TranslationMap} [replacementMap={}] The replacement map to merge
 *   with the default translations.
 * @return {TranslationContext} The merged translation context.
 */
const useUikitTranslationContext = (
  replacementMap: TranslationMap = {}
): TranslationContext => {
  return useStatic(() => {
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
  });
};

const UikitTranslationContext = createContext<TranslationContext>(
  transformObject(defaultTranslations, (defaultTranslationsForSubset) =>
    makeTranslationFnMap(
      defaultTranslationsForSubset as CompleteTranslationMap<TranslationSubsetName>
    )
  ) as TranslationContext
);

/**
 * Hook to get the current translation context.
 *
 * This hook returns the current translation context, which is an object that
 * maps translation keys to their translated values.
 *
 * @return {TranslationContext} The current translation context.
 */
export const useUikitTranslation = (): TranslationContext =>
  useContext(UikitTranslationContext);

/**
 * React context provider for the UI Kit's translation context.
 *
 * This component is used to provide the translation context to all components
 * that use the {@link useUikitTranslation} hook. It takes the optional `translations` prop and
 * uses the {@link useUikitTranslationContext} hook to merge the given translations
 * with the default ones.
 *
 * This component is useful when you want to override the default translations
 * or provide additional translations for your application.
 *
 * @param {TranslationContextProps} props
 * @param {TranslationMap} [props.translations={}] The replacement map to merge
 *   with the default translations.
 * @param {ReactNode} props.children The children components to be wrapped with
 *   the translation context.
 * @return {JSX.Element} The children wrapped with the translation context.
 */
export const UikitTranslationProvider = ({
  children,
  translations,
}: TranslationContextProps): JSX.Element => {
  const context = useUikitTranslationContext(translations);
  return (
    <UikitTranslationContext.Provider value={context}>
      {children}
    </UikitTranslationContext.Provider>
  );
};
