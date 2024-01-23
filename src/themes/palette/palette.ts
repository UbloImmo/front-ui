import {
  AnyPaletteColorShadeKeys,
  ClientColorPalette,
  ClientColorPaletteKey,
  ColorPalette,
  DefaultPaletteShadeKey,
  DynamicColorPalette,
  GrayscalePaletteColorShadeKey,
  PaletteColorShade,
  PaletteColorShaded,
  StaticColorPalette,
} from "@/types/themes/palette/palette.types";
import { Token } from "@/types/token.types";
import { colors } from "@ubloimmo/front-tokens";
import {
  transformObject,
  objectKeys,
  objectFromEntries,
  arrayFilter,
  isNull,
  Nullable,
} from "@ubloimmo/front-util";
import { rgbaColorConverter } from "@/utils/color.utils";
import { RgbaColorArr } from "@/types/themes/color.types";

/**
 * Creates a function that takes an opacity value and returns the RGBA color with the specified opacity.
 *
 * @param {number} a - The opacity value to be applied to the RGBA color.
 * @return {string} The RGBA color with the specified opacity.
 */
const shadeOpacityFactory =
  ([r, g, b]: RgbaColorArr) =>
  (a: number) =>
    rgbaColorConverter.arrToStr([r, g, b, a]);

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
      colorTokenGroupToPaletteColorShaded<DefaultPaletteShadeKey[]>
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
  "primary", // included since it maps to ublo's colors and is exported by Design tokens library
];

/**
 * Builds the client color palette based on the provided colors object.
 *
 * @return {ClientColorPalette} The client color palette object.
 */
const buildClientColorPalette = (): ClientColorPalette => {
  // filter out static color keys
  const clientColorKeys = objectKeys(colors).filter(
    (colorKey) => !STATIC_COLOR_KEYS.includes(colorKey)
  ) as ClientColorPaletteKey[];
  // match client color keys to their tokens
  const clientColorTokens = objectFromEntries(
    arrayFilter(
      clientColorKeys.map(
        (
          key
        ): [
          ClientColorPaletteKey,
          Nullable<Record<DefaultPaletteShadeKey, Token<"COLOR">>>
        ] => {
          const clientColorTokenGroup = colors[
            key
          ] as unknown as (typeof colors)[ClientColorPaletteKey] & {
            main?: Token<"COLOR">;
          };
          // add missing medium color token (duplicate dark)
          // TODO: remove this step once client color design file is updated
          if (!clientColorTokenGroup?.main) return [key, null];
          const updatedTokenGroup = {
            dark: clientColorTokenGroup.dark,
            light: clientColorTokenGroup.light,
            medium: clientColorTokenGroup.dark,
            base: clientColorTokenGroup.main,
          };
          return [key, updatedTokenGroup];
        }
      ),
      ([_key, tokenGroup]) => !isNull(tokenGroup)
    ) as [
      ClientColorPaletteKey,
      Record<DefaultPaletteShadeKey, Token<"COLOR">>
    ][]
  );
  return transformObject(
    clientColorTokens,
    colorTokenGroupToPaletteColorShaded<DefaultPaletteShadeKey[]>
  );
};

/**
 * Builds a dynamic color palette for the specified client.
 *
 * @param {ClientColorPaletteKey} forClient - the key of the client color palette
 * @return {DynamicColorPalette} the dynamic color palette for the specified client
 */
const buildDynamicColorPalette = (
  forClient: ClientColorPaletteKey = "ublo"
): DynamicColorPalette => {
  const clientColorPalette = buildClientColorPalette();
  return {
    primary: clientColorPalette[forClient],
  };
};

export const buildColorPalette = (): ColorPalette => {
  return {
    ...buildStaticColorPalette(),
    ...buildDynamicColorPalette(),
  };
};

export const colorPalette = buildColorPalette();
