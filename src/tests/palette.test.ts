import { describe, expect, it } from "bun:test";
import {
  LegacyPalette,
  ColorPalette,
  grayscalePaletteColorShadeKeys,
  defaultPaletteColorShadeKeys,
  LegacyShadows,
} from "../types";
import {
  buildLegacyColorPalette,
  buildColorPalette,
  extractEffectTokenShadow,
} from "../themes";
import { effects, colors } from "@ubloimmo/front-tokens/lib/tokens.values";

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
      it("should return a legacy palette object", () => {
        expect(legacyPalette).toBeDefined();
        expect(legacyPalette).toBeObject();
        expect(legacyPalette).not.toBeEmptyObject();
        expect(legacyPalette).toContainKeys(LEGACY_PALETTE_KEYS);
        expect(legacyPalette.shadows).toContainKeys(LEGACY_SHADOW_KEYS);
      });
    });
  });
  describe("next", () => {
    let nextPalette: ColorPalette;
    describe("build process", () => {
      it("should not throw during build process", () => {
        expect(buildColorPalette).not.toThrow();
        nextPalette = buildColorPalette();
      });
      it("should return a palette object", () => {
        expect(nextPalette).toBeDefined();
        expect(nextPalette).toBeObject();
        expect(nextPalette).not.toBeEmptyObject();
        expect(nextPalette).toContainKeys(NEXT_PALETTE_KEYS);
        expect(nextPalette.gray).toContainKeys(grayscalePaletteColorShadeKeys);
        expect(nextPalette.pending).toContainKeys(defaultPaletteColorShadeKeys);
        expect(nextPalette.warning).toContainKeys(defaultPaletteColorShadeKeys);
        expect(nextPalette.error).toContainKeys(defaultPaletteColorShadeKeys);
        expect(nextPalette.success).toContainKeys(defaultPaletteColorShadeKeys);
        expect(nextPalette.primary).toContainKeys(defaultPaletteColorShadeKeys);
      });
    });
  });
});
