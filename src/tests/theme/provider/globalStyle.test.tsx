import { describe, it, expect } from "bun:test";
import { buildSpacingMap } from "../../../sizes";
import {
  spacingsToCssVars,
  paletteColorToCssVars,
  buildTheme,
  buildGlobalStyle,
  textSizesToCssVars,
  GlobalStyle,
  cssReset,
  declareGlobalStyle,
  joinCssVarCollection,
} from "../../../themes";
import { objectValues } from "@ubloimmo/front-util";
import { testComponentFactory } from "../../test.utils";

describe("global style", () => {
  describe("build process", () => {
    it("should convert spacings to CSS variables", () => {
      expect(spacingsToCssVars).toBeDefined();
      expect(spacingsToCssVars).toBeFunction();
      const spacings = buildSpacingMap();
      expect(() => spacingsToCssVars(spacings)).not.toThrow();
      expect(spacingsToCssVars(spacings)).toBeArray();
      const spacingsCssVars = spacingsToCssVars(spacings);
      spacingsCssVars.forEach((cssVar) => {
        expect(cssVar).toBeString();
        expect(cssVar).toInclude("s");
      });
    });

    it("should join a collection of CSS variables into a single string", () => {
      expect(joinCssVarCollection).toBeDefined();
      expect(joinCssVarCollection).toBeFunction();
      expect(() => joinCssVarCollection([])).not.toThrow();
      expect(joinCssVarCollection([[], []])).toBeString();
    });

    it("should convert shaded palette colors to CSS variables", () => {
      expect(paletteColorToCssVars).toBeDefined();
      expect(paletteColorToCssVars).toBeFunction();
      const { primary } = buildTheme();
      expect(() => paletteColorToCssVars("primary", primary)).not.toThrow();
      expect(paletteColorToCssVars("primary", primary)).toBeArray();
      const primaryCssVars = paletteColorToCssVars("primary", primary);
      primaryCssVars.forEach((cssVar) => {
        expect(cssVar).toBeString();
        expect(cssVar).toInclude("primary-");
      });
    });

    it("should convert text styles to CSS variables", () => {
      expect(textSizesToCssVars).toBeDefined();
      expect(textSizesToCssVars).toBeFunction();
      expect(() => textSizesToCssVars()).not.toThrow();
      const textCssVars = textSizesToCssVars();
      expect(textCssVars).toBeObject();
      expect(textCssVars).toContainKeys(["desktop", "mobile"]);
      objectValues(textCssVars).forEach((cssVars) =>
        cssVars.forEach((cssVar) => {
          expect(cssVar).toBeString();
        })
      );
    });

    it("should work even when the theme is missing", () => {
      expect(buildGlobalStyle).toBeDefined();
      expect(buildGlobalStyle).toBeFunction();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore buildGlobalStyle() is typed to require the theme as its only argument. but it should be resilient even when it is missing
      expect(() => buildGlobalStyle()).not.toThrow();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore buildGlobalStyle() is typed to require the theme as its only argument. but it should be resilient even when it is missing
      expect(buildGlobalStyle()).toBeObject();
    });

    it("should build the global style", () => {
      expect(buildGlobalStyle).toBeDefined();
      expect(buildGlobalStyle).toBeFunction();
      expect(() => buildGlobalStyle(buildTheme())).not.toThrow();
      expect(buildGlobalStyle(buildTheme())).toBeObject();
    });

    it("should declare the global style css", () => {
      expect(declareGlobalStyle).toBeDefined();
      expect(declareGlobalStyle).toBeFunction();
      expect(declareGlobalStyle([], [])).toBeObject();
    });

    it("should include a css reset", () => {
      expect(cssReset).toBeDefined();
      expect(cssReset).toBeFunction();
      expect(cssReset).not.toThrow();
      expect(cssReset()).toBeObject();
    });
  });

  describe("jsx element", () => {
    testComponentFactory("GlobalStyle", GlobalStyle);
  });
});
