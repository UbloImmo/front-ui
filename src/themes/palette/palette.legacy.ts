import { colors, effects } from "@ubloimmo/front-tokens/lib/tokens.values";
import {
  LegacyDegreesPalette,
  LegacyEmphasisPalette,
  LegacyFullPalette,
  LegacyLightAndDarkPalette,
  LegacyPalette,
  LegacyShadows,
} from "@/types/themes/palette/palette.legacy.types";
import { TokenValueGroup } from "@/types/token.types";
import { transformObject } from "@ubloimmo/front-util";

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
      ]): [keyof TReturnPalette, string] => [
        mapToKey,
        colorTokenGroup[extractKey].value,
      ]
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
  const { state, ublo, background, gray, black, white } = colors;
  return {
    primary: colorTokenToLegacyPaletteColor<LegacyFullPalette>(ublo, [
      ["main", "base"],
      "dark",
      "light",
    ]),
    ...transformObject(
      state,
      (token): LegacyFullPalette =>
        colorTokenToLegacyPaletteColor<LegacyFullPalette>(token, [
          ["main", "base"],
          "dark",
          "light",
        ])
    ),
    background: colorTokenToLegacyPaletteColor<LegacyLightAndDarkPalette>(
      background,
      ["light", "dark"]
    ),
    white: {
      base: white.value,
    },
    black: colorTokenToLegacyPaletteColor<LegacyEmphasisPalette>(black, [
      "inactive",
      "disabled",
      ["medium", "mediumEmphasis"],
      ["black", "highEmphasis"],
    ]),
    gray: colorTokenToLegacyPaletteColor<LegacyDegreesPalette>(gray, [
      ["50", "_50"],
      ["100", "_100"],
      ["200", "_200"],
      ["300", "_300"],
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
const extractEffectTokenShadow = (effectKey: keyof typeof effects): string => {
  return effects[effectKey].value;
};

/**
 * Hard-coded shadows that are in use in legacy palette but have no match in exported tokens
 */
const missingLegacyShadows: MissingLegacyShadows = {
  card: "0px 1px 2px rgba(50, 50, 71, 0.08), 0px 0px 1px rgba(50, 50, 71, 0.2)",
  topDivider: "inset 0px 0.5px 0px #e5e5e5",
  color:
    "0px 0px 1px rgba(12, 26, 75, 0.33), 0px 30px 40px rgba(109, 95, 254, 0.08)",
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
    (Object.keys(effects) as (keyof typeof effects)[]).map(
      (effectKey): [keyof LegacyShadows, string] => [
        effectTokenToLegacyShadowKeyMap[effectKey],
        extractEffectTokenShadow(effectKey),
      ]
    )
  ) as Record<keyof LegacyShadows, string>;
};

/**
 * Builds the legacy shadows.
 *
 * @return {LegacyShadows} The legacy shadows.
 */
const buildLegacyShadows = (): LegacyShadows => {
  return {
    ...effectTokensToLegacyShadows(),
    ...missingLegacyShadows,
  };
};

/**
 * Builds the legacy palette by combining the color tokens from the color palette
 * and the shadows from the legacy shadows.
 *
 * @return {LegacyPalette} The legacy palette object.
 */
export const buildLegacyPalette = (): LegacyPalette => {
  return {
    ...colorTokensToLegacyColorPalette(),
    shadows: buildLegacyShadows(),
  };
};

export const legacyPalette = buildLegacyPalette();