import { colors } from "@ubloimmo/front-tokens";
import {
  transformObject,
  objectKeys,
  objectFromEntries,
  arrayFilter,
  isNull,
  Nullable,
  isArray,
} from "@ubloimmo/front-util";

import { rgbaColorConverter, blendColors } from "../../utils";

import {
  AnyPaletteColorShadeKeys,
  DynamicColorPalette,
  DynamicColorPaletteKey as DynamicColorPaletteKey,
  ColorPalette,
  DefaultPaletteColorShadeKey,
  DynamicColorPaletteSubset,
  GrayscalePaletteColorShadeKey,
  PaletteColorShade,
  PaletteColorShaded,
  StaticColorPalette,
  Token,
  RgbaColorArr,
} from "@types";

/**
 * Creates a function that takes an opacity value and returns the RGBA color with the specified opacity.
 *
 * @param {number} a - The opacity value to be applied to the RGBA color.
 * @return {string} The RGBA color with the specified opacity.
 */
export const shadeOpacityFactory = (rgbaColorArr: RgbaColorArr) => {
  if (!rgbaColorArr || !isArray(rgbaColorArr))
    throw new Error("Invalid color provided");
  const [r, g, b] = rgbaColorArr;
  return (a: number) => rgbaColorConverter.arrToStr([r, g, b, a]);
};

/**
 * Transforms a color token group into a shaded palette color.
 *
 * @param {Record<TShades[number], Token<"COLOR">>} colorTokenGroup - The color token group to be transformed.
 * @return {PaletteColorShaded<TShades>} The shaded palette color.
 */
const colorTokenGroupToPaletteColorShaded = <
  TShades extends AnyPaletteColorShadeKeys
>(
  colorTokenGroup: Record<TShades[number], Token<"COLOR">>
): PaletteColorShaded<TShades> => {
  return transformObject(
    colorTokenGroup,
    (token: Token<"COLOR">): PaletteColorShade => ({
      rgba: token.value,
      hex: rgbaColorConverter.strToHex(token.value),
      opacity: shadeOpacityFactory(rgbaColorConverter.strToArr(token.value)),
    })
  );
};

/**
 * Builds a static color palette based on the provided colors object.
 *
 * @return {StaticColorPalette} The static color palette object.
 */
const buildStaticColorPalette = (): StaticColorPalette => {
  const { success, error, warning, pending, gray } = colors;
  const statusShades = { success, error, warning, pending };
  return {
    ...transformObject(
      statusShades,
      colorTokenGroupToPaletteColorShaded<DefaultPaletteColorShadeKey[]>
    ),
    gray: colorTokenGroupToPaletteColorShaded<GrayscalePaletteColorShadeKey[]>(
      gray
    ),
  };
};

/**
 * Keys used to filter status & primary colors from client colors
 */
const STATIC_COLOR_KEYS: (keyof typeof colors)[] = [
  "success",
  "error",
  "warning",
  "pending",
  "gray",
];

/**
 * Retrieves the client slugs from the color tokens.
 *
 * @return {DynamicColorPaletteKey[]} An array of client color palette keys.
 */
export const getDynamicThemeSlugs = (): DynamicColorPaletteKey[] => {
  return objectKeys(colors).filter(
    (colorKey): colorKey is DynamicColorPaletteKey =>
      !STATIC_COLOR_KEYS.includes(colorKey)
  );
};

/**
 * Builds the client color palette based on the provided colors object.
 *
 * @return {DynamicColorPalette} The client color palette object.
 */
const dynamicClientColorPalette = (): DynamicColorPalette => {
  // filter out static color keys
  const dynamicColorKeys = getDynamicThemeSlugs();
  // match client color keys to their tokens
  const dynamicColorTokens = objectFromEntries(
    arrayFilter(
      dynamicColorKeys.map(
        (
          key
        ): [
          DynamicColorPaletteKey,
          Nullable<Record<DefaultPaletteColorShadeKey, Token<"COLOR">>>
        ] => {
          const dynamicColorTokenGroup = colors[
            key
          ] as unknown as (typeof colors)[DynamicColorPaletteKey] & {
            main?: Token<"COLOR">;
          };
          // TODO: remove this step once api serves complete color themes per organization
          const dynamicColorBase =
            dynamicColorTokenGroup?.main ?? dynamicColorTokenGroup.base;
          if (!dynamicColorBase) return [key, null];

          // blend between light and main to generate medium
          const mediumColor = blendColors(
            dynamicColorBase.value,
            dynamicColorTokenGroup.light.value,
            0.5
          );
          const mediumToken: Token<"COLOR"> = {
            name: "medium",
            type: "COLOR",
            value: mediumColor,
          };
          const updatedTokenGroup = {
            dark: dynamicColorTokenGroup.dark,
            base: dynamicColorBase,
            medium: mediumToken,
            light: dynamicColorTokenGroup.light,
          };
          return [key, updatedTokenGroup];
        }
      ),
      (item) => !isNull(item[1])
    ) as [
      DynamicColorPaletteKey,
      Record<DefaultPaletteColorShadeKey, Token<"COLOR">>
    ][]
  );
  return transformObject(
    dynamicColorTokens,
    colorTokenGroupToPaletteColorShaded<DefaultPaletteColorShadeKey[]>
  );
};

/**
 * Builds a dynamic color palette for the specified client.
 *
 * @param {DynamicColorPaletteKey} forClient - the key of the client color palette
 * @return {DynamicColorPaletteSubset} the dynamic color palette for the specified client
 */
export const buildDynamicColorPalette = (
  forClient: DynamicColorPaletteKey = "primary"
): DynamicColorPaletteSubset => {
  const clientColorPalette = dynamicClientColorPalette();
  return {
    primary: clientColorPalette[forClient],
  };
};

/**
 * Builds a color palette for the specified client.
 *
 * @param {DynamicColorPaletteKey} forClient - the key for the client color palette
 * @return {ColorPalette} the color palette for the specified client
 */
export const buildColorPalette = (
  forClient: DynamicColorPaletteKey = "primary"
): ColorPalette => {
  return {
    ...buildDynamicColorPalette(forClient),
    ...buildStaticColorPalette(),
  };
};

export const colorPalette = buildColorPalette();
