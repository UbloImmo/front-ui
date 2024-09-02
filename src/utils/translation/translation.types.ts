import type { translationKeys } from "./translation.keys";
import type { Enum, GenericFn, KeyOf, ValueMap } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type TranslationSubsetName = KeyOf<typeof translationKeys>;

export type TranslationFn<TArgs extends unknown[] = string[]> = GenericFn<
  TArgs,
  string
>;

export type TranslationKeySubset<
  TTranslationSubsetName extends TranslationSubsetName
> = Enum<(typeof translationKeys)[TTranslationSubsetName]>;

export type Translation = TranslationFn | string;

export type TranslationKey<
  TTranslationSubsetName extends TranslationSubsetName = TranslationSubsetName
> = TranslationKeySubset<TTranslationSubsetName>;

export type CompleteTranslationMap<
  TTranslationSubsetName extends TranslationSubsetName = TranslationSubsetName
> = ValueMap<TranslationKey<TTranslationSubsetName>, Translation>;

export type TranslationMap<
  TTranslationSubsetName extends TranslationSubsetName = TranslationSubsetName
> = Partial<CompleteTranslationMap<TTranslationSubsetName>>;

export type DefaultTranslationMaps = {
  [TTranslationSubsetName in TranslationSubsetName]: CompleteTranslationMap<TTranslationSubsetName>;
};

export type CompleteTranslationFnMap<
  TTranslationSubsetName extends TranslationSubsetName = TranslationSubsetName
> = ValueMap<TranslationKey<TTranslationSubsetName>, TranslationFn>;

export type TranslationContext = {
  [TTranslationSubsetName in TranslationSubsetName]: CompleteTranslationFnMap<TTranslationSubsetName>;
};

export type TranslationContextProps = {
  children?: ReactNode;
  translations?: TranslationMap;
};
