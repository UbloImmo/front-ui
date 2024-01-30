import { colors, effects } from "@ubloimmo/front-tokens/lib/tokens.values";
import {
  LegacyDegreesPalette,
  LegacyEmphasisPalette,
  LegacyFullPalette,
  LegacyLightAndDarkPalette,
  LegacyPalette,
  LegacyShadows,
  TokenValueGroup,
  Token,
} from "../../types";
import { objectKeys, transformObject } from "@ubloimmo/front-util";

/**
 * Generates a legacy palette color from a color token group.
 *
 * @template {TokenValueGroup} TColorTokenGroup
 * @template {LegacyPalette[string]} TReturnPalette
 * @param {TokenValueGroup} colorTokenGroup - The color token group to extract colors from.
 * @param {(keyof TColorTokenGroup & keyof TReturnPalette)[]} extractKeys - The keys to extract colors from the color token group.
 * @return {TReturnPalette} - The generated legacy palette color.
 */
const colorTokenToLegacyPaletteColor = <
  TReturnPalette extends LegacyPalette[string],
  TColorTokenGroup extends TokenValueGroup = TokenValueGroup
>(
  colorTokenGroup: TColorTokenGroup,
  extractKeys: (
    | [keyof TColorTokenGroup, keyof TReturnPalette]
    | (keyof TReturnPalette & keyof TColorTokenGroup)
  )[]
): TReturnPalette => {
  const lookupKeys = extractKeys.map(
    (
      keyDef: (typeof extractKeys)[number]
    ): [keyof TColorTokenGroup, keyof TReturnPalette] =>
      Array.isArray(keyDef) ? keyDef : [keyDef, keyDef]
  );
  return Object.fromEntries(
    lookupKeys.map(
      ([extractKey, mapToKey]: [
        keyof TColorTokenGroup,
        keyof TReturnPalette
      ]): [keyof TReturnPalette, string] => {
        const token = colorTokenGroup[extractKey];
        return [mapToKey, token.value];
      }
    )
  ) as Record<keyof TReturnPalette, string> as TReturnPalette;
};

/**
 * Converts color tokens to legacy color palette.
 *
 * @return {Omit<LegacyPalette, "shadows">} The legacy color palette.
 *
 * @see colorTokenToLegacyPaletteColor
 */
const colorTokensToLegacyColorPalette = (): Omit<LegacyPalette, "shadows"> => {
  const { error, warning, pending, success, primary, gray } = colors;
  const legacyStateTokens = { error, warning, pending, success, info: primary };
  return {
    primary: colorTokenToLegacyPaletteColor<LegacyFullPalette>(primary, [
      "base",
      "dark",
      "light",
    ]),
    ...transformObject(
      legacyStateTokens,
      (token): LegacyFullPalette =>
        colorTokenToLegacyPaletteColor<LegacyFullPalette>(token, [
          "base",
          "dark",
          "light",
        ])
    ),
    background: colorTokenToLegacyPaletteColor<LegacyLightAndDarkPalette>(
      gray,
      [
        ["100", "dark"],
        ["50", "light"],
      ]
    ),
    white: {
      base: "rgba(255,255,255,1)",
    },
    black: colorTokenToLegacyPaletteColor<LegacyEmphasisPalette>(gray, [
      ["700", "inactive"],
      ["600", "disabled"],
      ["800", "mediumEmphasis"],
      ["900", "highEmphasis"],
    ]),
    gray: colorTokenToLegacyPaletteColor<LegacyDegreesPalette>(gray, [
      ["100", "_50"],
      ["200", "_100"],
      ["300", "_200"],
      ["400", "_300"],
    ]),
  };
};

/**
 * Maps exported effect token keys to {@link LegacyShadows} keys.
 */
const effectTokenToLegacyShadowKeyMap = {
  bottomDivider: "bottomDivider",
  upfront: "high",
  input: "input",
  clickable: "button",
  flat: "flat",
} as const;

/**
 * All {@link LegacyShadows} keys that have not match in exported effect tokens
 */
type MissingLegacyShadows = Omit<
  LegacyShadows,
  (typeof effectTokenToLegacyShadowKeyMap)[keyof typeof effects]
>;

/**
 * Extracts the value of the effect token shadow for a given effect key.
 *
 * @param {keyof typeof effects} effectKey - The key of the effect in the effects object.
 * @return {string} The value of the effect token shadow.
 */
export const extractEffectTokenShadow = (
  effectKey: keyof typeof effects
): string => {
  if (!effects[effectKey]) return "";
  // TODO: remove this cast once effects have been exported from Design Tokens figma file
  return (effects[effectKey] as Token)?.value ?? "";
};

/**
 * Hard-coded shadows that are in use in legacy palette but have no match in exported tokens
 */
// TODO: Remove missing shadows once there are more exported effects
const missingLegacyShadows: MissingLegacyShadows = {
  high: "0 0 1px rgba(12, 26, 75, 0.33), 0 0.75rem 1.875rem rgba(37, 34, 117, 0.08)",
  card: "0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)",
  color:
    "0px 0px 1px rgba(12, 26, 75, 0.33), 0px 30px 40px rgba(109, 95, 254, 0.08)",
  input: "0px 0px 1px 0px #32324733, 0px 1px 2px 0px #32324714",
  button:
    "0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)",
  flat: "0px 0px 1px rgba(12, 26, 75, 0.33)",
  bottomDivider: "inset 0px -0.5px 0px #e5e5e5",
  topDivider: "inset 0px 0.5px 0px #e5e5e5",
  carousselCard:
    "0px 30px 40px 0px rgba(109, 95, 254, 0.08), 0px 0px 1px 0px rgba(12, 26, 75, 0.33)",
};

/**
 * Converts effect tokens to a subset of {@link LegacyShadows}.
 *
 * @return {Omit<LegacyShadows, keyof MissingLegacyShadows>} The converted legacy shadows.
 */
const effectTokensToLegacyShadows = (): Omit<
  LegacyShadows,
  keyof MissingLegacyShadows
> => {
  return Object.fromEntries(
    objectKeys(effects).map((effectKey): [keyof LegacyShadows, string] => [
      effectTokenToLegacyShadowKeyMap[effectKey],
      extractEffectTokenShadow(effectKey),
    ])
  ) as Record<keyof LegacyShadows, string>;
};

/**
 * Builds the legacy shadows.
 *
 * @return {LegacyShadows} The legacy shadows.
 */
const buildLegacyShadows = (): LegacyShadows => {
  return {
    ...missingLegacyShadows,
    ...effectTokensToLegacyShadows(),
  };
};

/**
 * Builds the legacy palette by combining the color tokens from the color palette
 * and the shadows from the legacy shadows.
 *
 * @return {LegacyPalette} The legacy palette object.
 */
export const buildLegacyColorPalette = (): LegacyPalette => {
  return {
    ...colorTokensToLegacyColorPalette(),
    shadows: buildLegacyShadows(),
    // cast to LegacyPalette since TSC does not understand this spread operator
  } as LegacyPalette;
};

export const legacyColorPalette = buildLegacyColorPalette();
