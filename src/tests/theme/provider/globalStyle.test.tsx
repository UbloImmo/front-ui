import { describe, it, expect, afterAll } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import React from "react";
import {
  buildGlobalStyle,
  buildTheme,
  paletteColorToCssVars,
  spacingsToCssVars,
  GlobalStyle,
} from "../../../themes";
import { buildSpacingMap } from "../../../sizes";

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
  });

  describe("jsx element", () => {
    it("should render the global", () => {
      expect(GlobalStyle).toBeDefined();
      const rendered = render(<GlobalStyle theme={buildTheme()} />);
      expect(rendered).toBeObject();
    });
  });
});

afterAll(() => {
  cleanup();
});
