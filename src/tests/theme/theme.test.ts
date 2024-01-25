import { describe, it, expect } from "bun:test";
import { buildTheme } from "../../themes";
import { Theme } from "../../types";
import { testColorPalette, testLegacyPalette } from "./palette.test";

describe("theme", () => {
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
