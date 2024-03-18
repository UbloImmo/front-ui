import { isObject, objectEntries } from "@ubloimmo/front-util";
import type {
  Token,
  TokenValues,
  TokenType,
  ParsedEffect,
  RgbaColorStr,
  CssVar,
  CssVarName,
  CssVarUsage,
} from "../../types";
import { effects } from "@ubloimmo/front-tokens/lib/tokens.values";
import {
  isValidRgbaStr,
  cssVar,
  cssVarUsage,
  rgbaRegex,
  rgbaColorConverter,
} from "../../utils";

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
const effectTokenToEffect = (
  token: Token<"EFFECT">,
  parentName?: string
): ParsedEffect => {
  const name = parentName ?? token.name;
  const basicToken = { ...token, name };

  const matches = rgbaRegex.exec(token.value);
  if (!matches) return basicToken;

  const color = matches[0];
  if (!isValidRgbaStr(color)) return basicToken;

  return {
    name: name,
    value: token.value,
    color: color,
    type: token.type,
  };
};

/**
 * Generate an array of ParsedEffect objects from a token or group of tokens.
 *
 * @param {TokenValues<"EFFECT"> | Token<"EFFECT">} tokenOrGroup - The token or group of tokens to convert to ParsedEffect objects.
 * @param {string} parentName - (Optional) The parent name to use for grouping effects.
 * @param {string} directParentName - (Optional) The direct parent name for avoiding repetitions.
 * @return {ParsedEffect[]} An array of ParsedEffect objects generated from the token or group.
 */
const effectTokenOrGroupToEffect = (
  tokenOrGroup: TokenValues<"EFFECT"> | Token<"EFFECT">,
  parentName?: string,
  directParentName?: string
): ParsedEffect[] => {
  if (isToken(tokenOrGroup)) {
    return [effectTokenToEffect(tokenOrGroup, parentName)];
  }
  // collapse token groups into an array
  return objectEntries(tokenOrGroup).flatMap(([key, item]) => {
    // avoid repetititions in name if key and direct parent are the same
    // e.g. collapse `shadow-input-default-default` to `shadow-input-default`
    const name = parentName
      ? directParentName === key
        ? parentName
        : `${parentName}-${key}`
      : key;
    return effectTokenOrGroupToEffect(item, name, key);
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
const parsedEffectToCssVar = (
  { value, name, color }: ParsedEffect,
  colorVarsSplit: [CssVarName, RgbaColorStr][]
): CssVar<string> | CssVar<`${string}${CssVarUsage}`> => {
  const basicEffectCssVar = cssVar(name, value);
  // return regular css var if no effect color parsed
  if (!color) {
    return basicEffectCssVar;
  }

  // format color accordingly to remove figma token artifacts
  const correctedColor = rgbaColorConverter.arrToStr(
    rgbaColorConverter.strToArr(color)
  );

  // check if effect color is included in color vars
  const matchingColorVar = colorVarsSplit.find(
    ([_name, rgba]) => rgba === correctedColor
  );
  if (!matchingColorVar) {
    return basicEffectCssVar;
  }
  // format matching color var name as css var usage
  const matchingVarName = cssVarUsage(matchingColorVar[0].substring(2));

  // replace color
  const replacedValue = value.replace(color, matchingVarName);
  return cssVar(name, replacedValue);
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
  const colorVarsSplit = colorVars.map(
    (colorVar) =>
      colorVar.split(":").map((part) => part.trim().replaceAll(";", "")) as [
        CssVarName,
        RgbaColorStr
      ]
  );
  return parsedEffects.map((parsedEffect) =>
    parsedEffectToCssVar(parsedEffect, colorVarsSplit)
  );
};
