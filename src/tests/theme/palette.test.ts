import { effects, colors } from "@ubloimmo/front-tokens/lib/tokens.values";
import { describe, expect, it } from "bun:test";

import {
  buildLegacyColorPalette,
  buildColorPalette,
  shadeOpacityFactory,
  extractEffectTokenShadow,
  parseEffectToken,
  parsedEffectToCssVar,
  paletteColorToCssVars,
  buildTheme,
} from "../../themes";
import {
  grayscalePaletteColorShadeKeys,
  defaultPaletteColorShadeKeys,
} from "../../types";
import { parseCssVar, rgbaColorConverter } from "../../utils";
import { colorCollections } from "../color.test";

import type {
  LegacyPalette,
  ColorPalette,
  LegacyShadows,
  RgbaColorStr,
  RgbaColorArr,
  CssVarName,
} from "../../types";

const LEGACY_PALETTE_KEYS: (keyof LegacyPalette)[] = [
  "shadows",
  "error",
  "warning",
  "pending",
  "info",
  "primary",
  "black",
  "gray",
  "white",
] as const;

const LEGACY_SHADOW_KEYS: (keyof LegacyShadows)[] = [
  "high",
  "card",
  "input",
  "button",
  "color",
  "flat",
  "bottomDivider",
  "topDivider",
  "carousselCard",
];

const NEXT_PALETTE_KEYS: (keyof ColorPalette)[] = [
  "primary",
  "pending",
  "warning",
  "error",
  "success",
  "gray",
];

/**
 * Validates the legacy palette object and its properties.
 *
 * @param {LegacyPalette} legacyPalette - the legacy palette object to be validated
 * @return {void}
 */
export const testLegacyPalette = (legacyPalette: LegacyPalette) => {
  expect(legacyPalette).toBeDefined();
  expect(legacyPalette).toBeObject();
  expect(legacyPalette).not.toBeEmptyObject();
  expect(legacyPalette).toContainKeys(LEGACY_PALETTE_KEYS);
  expect(legacyPalette.shadows).toContainKeys(LEGACY_SHADOW_KEYS);
};

/**
 * Function to test the color palette object for all its properties.
 *
 * @param {ColorPalette} colorPalette - the color palette object to test
 * @return {void}
 */
export const testColorPalette = (colorPalette: ColorPalette) => {
  expect(colorPalette).toBeDefined();
  expect(colorPalette).toBeObject();
  expect(colorPalette).not.toBeEmptyObject();
  expect(colorPalette).toContainKeys(NEXT_PALETTE_KEYS);
  expect(colorPalette.gray).toContainKeys(grayscalePaletteColorShadeKeys);
  expect(colorPalette.pending).toContainKeys(defaultPaletteColorShadeKeys);
  expect(colorPalette.warning).toContainKeys(defaultPaletteColorShadeKeys);
  expect(colorPalette.error).toContainKeys(defaultPaletteColorShadeKeys);
  expect(colorPalette.success).toContainKeys(defaultPaletteColorShadeKeys);
  expect(colorPalette.primary).toContainKeys(defaultPaletteColorShadeKeys);
};

describe("palette", () => {
  describe("legacy", () => {
    let legacyPalette: LegacyPalette;
    describe("build process", () => {
      it("should have access to exported tokens", () => {
        expect(effects).toBeDefined();
        expect(colors).toBeDefined();
        expect(effects).toBeObject();
        expect(colors).toBeObject();
      });

      it("should not throw during build process", () => {
        expect(buildLegacyColorPalette).not.toThrow();
        legacyPalette = buildLegacyColorPalette();
      });

      it("should extract palette shadows from front-tokens", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore extractEffectTokenShadow() is correctly typed to we have to disable TS for it to throw
        expect(extractEffectTokenShadow("high")).toBeString();
      });
    });

    describe("legacy palette data", () => {
      it("should return a legacy palette object", () => {
        testLegacyPalette(legacyPalette);
      });
    });
  });
  describe("next", () => {
    let colorPalette: ColorPalette;
    describe("build process", () => {
      it("should not throw during build process", () => {
        expect(buildColorPalette).not.toThrow();
        colorPalette = buildColorPalette();
      });
    });

    describe("color palette data", () => {
      it("should return a color palette object", () => {
        testColorPalette(colorPalette);
      });

      it("should allow changing the opacity of shades", () => {
        expect(shadeOpacityFactory).toBeFunction();
        expect(() =>
          shadeOpacityFactory(colorCollections.red.rgbaArr)
        ).not.toThrow();
        const redOpacityFn = shadeOpacityFactory(colorCollections.red.rgbaArr);
        expect(redOpacityFn).toBeFunction();
        expect(redOpacityFn).not.toThrow();
        expect(redOpacityFn(0.5)).toBeString();
        expect(redOpacityFn(0.5)).toEqual("rgba(255, 0, 0, 0.5)");
      });
    });
  });

  describe("effects", () => {
    describe("parsing", () => {
      it("should parse an effect token", () => {
        expect(parseEffectToken).toBeFunction();
        expect(() => parseEffectToken(effects.shadow.card)).not.toThrow();
        expect(parseEffectToken(effects.shadow.card)).toContainKey(
          "originalValue"
        );
        expect(
          parseEffectToken({ ...effects.shadow.card, value: "blur(45px)" })
        ).not.toContainKey("originalValue");
      });
    });
  });

  describe("converting to css var", () => {
    const { primary } = buildTheme();
    const cssVars = [
      ...paletteColorToCssVars("primary-default", primary),
      ...paletteColorToCssVars("primary", primary),
    ];
    const cssVarsSplit = cssVars
      .map(parseCssVar<RgbaColorStr>)
      .map(({ name, value }): [CssVarName, RgbaColorArr] => [
        name,
        rgbaColorConverter.strToArr(value),
      ]);
    const parsedEffect = parseEffectToken(effects.shadow.card);
    const parsedEffectWithoutColor = parseEffectToken({
      ...effects.shadow.card,
      value: "blur(45px)",
    });
    const parsedEffectWithPrimaryDefault = parseEffectToken(
      effects.shadow.input.default.focus
    );
    it("should not throw", () => {
      expect(parsedEffectToCssVar).toBeDefined();
      expect(parsedEffectToCssVar).toBeFunction();
      expect(() => parsedEffectToCssVar(parsedEffect)).not.toThrow();
    });

    it("should return a css var", () => {
      expect(parsedEffectToCssVar(parsedEffect, cssVarsSplit)).toBeString();
      expect(
        parsedEffectToCssVar(parsedEffectWithoutColor, cssVarsSplit)
      ).toBeString();
      expect(
        parsedEffectToCssVar(parsedEffectWithPrimaryDefault, cssVarsSplit)
      ).toBeString();
    });
  });
});
