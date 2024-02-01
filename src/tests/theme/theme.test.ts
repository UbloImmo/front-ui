import { describe, it, expect } from "bun:test";
import type { Theme } from "../../types";

describe("theme", async () => {
  const { buildTheme } = await import("../../themes");
  const { testColorPalette, testLegacyPalette } = await import(
    "./palette.test"
  );

  let theme: Theme;
  describe("build process", () => {
    it("should build the theme object", () => {
      expect(buildTheme).toBeFunction();
      expect(buildTheme).not.toThrow();
      theme = buildTheme();
    });
  });

  describe("theme data", () => {
    it("should be an object", () => {
      expect(theme).toBeDefined();
      expect(theme).toBeObject();
      expect(theme).not.toBeEmptyObject();
    });

    it("should contain the legacy palette", () => {
      expect(theme.palette).toBeDefined();
      testLegacyPalette(theme.palette);
    });

    it("should contain all keys of the color palette", () => {
      testColorPalette(theme);
    });
  });
});
