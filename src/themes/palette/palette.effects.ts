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

const isToken = <TType extends TokenType>(
  value: TokenValues<TType> | Token<TType>
): value is Token<TType> => {
  if (!isObject(value)) return false;
  const tokenKeys: (keyof Token)[] = ["name", "value", "type"];
  const includesTokenKeys = tokenKeys.every((key) => key in value);
  return includesTokenKeys;
};

const effectTokenToEffect = (
  token: Token<"EFFECT">,
  parentName?: string
): ParsedEffect => {
  const name =
    parentName && parentName !== token.name
      ? `${parentName}-${token.name}`
      : token.name;
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

const effectTokenOrGroupToEffect = (
  tokenOrGroup: TokenValues<"EFFECT"> | Token<"EFFECT">,
  parentName?: string
): ParsedEffect[] => {
  if (isToken(tokenOrGroup)) {
    return [effectTokenToEffect(tokenOrGroup, parentName)];
  }
  return objectEntries(tokenOrGroup).flatMap(([key, item]) => {
    const name = parentName ? `${parentName}-${key}` : key;
    return effectTokenOrGroupToEffect(item, name);
  });
};

const parsedEffectToCssVar = (
  { value, name, color }: ParsedEffect,
  colorVarsSplit: [CssVarName, RgbaColorStr][]
): CssVar<string> | CssVar<`${string} ${CssVarUsage}`> => {
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

export const effectsToCssVars = (colorVars: CssVar<RgbaColorStr>[]) => {
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
