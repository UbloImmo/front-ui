import { effects } from "@ubloimmo/front-tokens/lib/tokens.values";
import { isObject, objectEntries } from "@ubloimmo/front-util";

import {
  cssVar,
  rgbaRegex,
  rgbaColorConverter,
  parseCssVar,
  isSameShade,
} from "../../utils";

import type {
  Token,
  TokenValues,
  TokenType,
  ParsedEffect,
  RgbaColorStr,
  RgbaColorArr,
  CssVar,
  CssVarName,
  CssVarUsage,
  CssRelativeRgbaColor,
} from "@types";

const substitutionRegex = /\$\$(rgba\([\d,.\s]+\))\$\$/g;
const PRIMARY_NAME_DEFAULT = "primary-default" as const;
const PRIMARY_NAME = "primary" as const;
const EFFECT_COLOR_DELTA = 2;

/**
 * Predicate function to check if the input value is a Token of a specific type.
 *
 * @template {TokenType} TType - the type of the Token to check for
 * @param {TokenValues<TType> | Token<TType>} value - the value to check if it is a Token of a specific type
 * @return {value is Token<TType>} true if the value is a Token of a specific type, false otherwise
 */
const isToken = <TType extends TokenType>(
  value: TokenValues<TType> | Token<TType>
): value is Token<TType> => {
  if (!isObject(value)) return false;
  const tokenKeys: (keyof Token)[] = ["name", "value", "type"];
  const includesTokenKeys = tokenKeys.every((key) => key in value);
  return includesTokenKeys;
};

/**
 * Converts an effect token to a parsed effect
 * while extracting color usages if present
 *
 * @param {Token<"EFFECT">} token - The effect token to be converted
 * @param {string} [parentName] - The optional parent name to use
 * @return {ParsedEffect} The parsed effect object
 */
export const parseEffectToken = (
  token: Token<"EFFECT">,
  parentName?: string
): ParsedEffect => {
  const name = (parentName ?? token.name).replaceAll("/", "-");
  const basicToken = { ...token, name };
  // reset regex before & after checking
  rgbaRegex.lastIndex = 0;
  const matches = token.value.match(rgbaRegex);
  rgbaRegex.lastIndex = 0;
  if (!matches || matches.length === 0) return basicToken;

  const value = token.value.replaceAll(rgbaRegex, (match: string) => {
    const normalized = rgbaColorConverter.arrToStr(
      rgbaColorConverter.strToArr(match as RgbaColorStr)
    );
    return `$$${normalized}$$`;
  });
  // reset regex
  rgbaRegex.lastIndex = 0;

  return {
    name,
    value,
    originalValue: token.value,
    type: token.type,
  };
};

/**
 * Generate an array of ParsedEffect objects from a token or group of tokens.
 *
 * @param {TokenValues<"EFFECT"> | Token<"EFFECT">} tokenOrGroup - The token or group of tokens to convert to ParsedEffect objects.
 * @param {string} parentName - (Optional) The parent name to use for grouping effects.
 * @return {ParsedEffect[]} An array of ParsedEffect objects generated from the token or group.
 */
const effectTokenOrGroupToEffect = (
  tokenOrGroup: TokenValues<"EFFECT"> | Token<"EFFECT">,
  parentName?: string
): ParsedEffect[] => {
  if (isToken(tokenOrGroup)) {
    return [parseEffectToken(tokenOrGroup, parentName)];
  }
  // collapse token groups into an array
  return objectEntries(tokenOrGroup).flatMap(([key, item]) => {
    const name = parentName ? `${parentName}-${key}` : key;
    return effectTokenOrGroupToEffect(item, name);
  });
};

/**
 * Generates a CSS variable rule from a parsed effect.
 * If the effect contains a color, replaces it with the corresponding css variable usage
 *
 * @param {ParsedEffect} effect - The parsed effect object.
 * @param {Array<[CssVarName, RgbaColorStr]>} colorVarsSplit - An array of color variables and their corresponding RGBA color strings.
 * @return {CssVar<string> | CssVar<`${string}${CssVarUsage}`>} - The generated CSS variable.
 */
export const parsedEffectToCssVar = (
  { value, name, originalValue }: ParsedEffect,
  colorVarsSplit: [CssVarName, RgbaColorArr][] = []
):
  | CssVar<string>
  | CssVar<`${string}${CssVarUsage}`>
  | CssVar<CssRelativeRgbaColor> => {
  // return regular css var if no effect color parsed
  if (!originalValue) {
    console.warn("missing", name, value);
    return cssVar(name, value);
  }
  // reset regex beforechecking
  substitutionRegex.lastIndex = 0;
  // replace colors with variables or revert changes in string value
  const parsedValue = value.replaceAll(
    substitutionRegex,
    (_match, colorStr: RgbaColorStr) => {
      // check if effect color is included in color vars
      const matchingColorVar = colorVarsSplit.find(([_name, rgba]) => {
        // console.debug(
        //   `comparing ${name} (${colorStr}) with ${_name} (${rgba}), delta: ${EFFECT_COLOR_DELTA}`
        // );
        const isFound = isSameShade(rgba, colorStr, EFFECT_COLOR_DELTA);
        return isFound;
      });
      // return original rgba color if not found
      if (!matchingColorVar) {
        console.warn("missing", name, colorStr);
        return colorStr;
      }
      const matchingVarName = matchingColorVar[0];
      const effectColorAlpha = rgbaColorConverter.strToObj(colorStr).a;

      // map ublo's primary color to client primary color
      const newVarName = matchingVarName.includes(PRIMARY_NAME_DEFAULT)
        ? (matchingVarName.replace(
            PRIMARY_NAME_DEFAULT,
            PRIMARY_NAME
          ) as CssVarName)
        : matchingVarName;
      // derive color from variable and keep alpha
      const relativeColor: CssRelativeRgbaColor = `rgb(from var(${newVarName}) r g b / ${effectColorAlpha})`;
      // and use them as replacement
      return relativeColor;
    }
  );
  // reset regex after checking
  substitutionRegex.lastIndex = 0;
  // format as css var
  return cssVar(name, parsedValue);
};

/**
 * Generates CSS variables from effect tokens
 * & replaces color usages with corresponding color vars
 *
 * @param {CssVar<RgbaColorStr>[]} colorVars - an array of CSS variables with RGBA color strings
 * @return {(CssVar<string> | CssVar<`${string}${CssVarUsage}`>)[]} a list of CSS variable decalrations
 */
export const effectsToCssVars = (
  colorVars: CssVar<RgbaColorStr>[]
): (CssVar<string> | CssVar<`${string}${CssVarUsage}`>)[] => {
  const parsedEffects = effectTokenOrGroupToEffect(effects);
  // sanitize color vars
  // TODO: used flattened list without color vars formatting
  const colorVarsSplit = colorVars
    .map(parseCssVar<RgbaColorStr>)
    .map(({ name, value }): [CssVarName, RgbaColorArr] => [
      name,
      rgbaColorConverter.strToArr(value),
    ]);
  return parsedEffects.map((parsedEffect) =>
    parsedEffectToCssVar(parsedEffect, colorVarsSplit)
  );
};
