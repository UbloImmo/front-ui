import { fakeFetchFactory } from "@ubloimmo/front-util/";
import { describe, it, expect, mock } from "bun:test";

import { testLegacyPalette, testColorPalette } from "./palette.test";
import {
  buildTheme,
  getThemeOverrides,
  defaultOrganizationData,
} from "../../themes";

import type { Theme } from "../../types";

const fakeFetchNull = await fakeFetchFactory(() => ({
  organization: {
    name: null,
  },
}));

const fakeFetchDefaultTheme = await fakeFetchFactory({
  organization: {
    ...defaultOrganizationData,
    name: "ublo",
    palette: {
      base: "#5a37d8",
      dark: "#3c27a3",
      light: "#e9e6f8",
    },
  },
});

describe("theme", () => {
  describe("overrides", () => {
    it("should be a function", () => {
      expect(getThemeOverrides).toBeDefined();
      expect(getThemeOverrides).toBeFunction();
      expect(async () => await getThemeOverrides(fakeFetchNull)).not.toThrow();
    });

    it("should return null in localhost", async () => {
      const getOverrides = mock(
        async () => await getThemeOverrides(fakeFetchNull)
      );
      const overrides = await getOverrides();
      expect(getOverrides).toHaveBeenCalled();
      expect(overrides).toBeNull();
    });

    it("should return a theme override object in a staging or production env", async () => {
      const getOverrides = mock(
        async () => await getThemeOverrides(fakeFetchDefaultTheme)
      );
      const overrides = await getOverrides();
      expect(getOverrides).toHaveBeenCalled();
      expect(overrides).toBeObject();
    });
  });

  let theme: Theme;
  describe("build process", () => {
    it("should build the theme object", () => {
      expect(buildTheme).toBeFunction();
      expect(buildTheme).not.toThrow();
      theme = buildTheme();
    });

    it("should build the theme and include overrides", async () => {
      const getOverrides = mock(
        async () => await getThemeOverrides(fakeFetchDefaultTheme)
      );
      const build = mock(buildTheme);
      const overrides = await getOverrides();
      const theme = build(overrides);
      expect(build).not.toThrow();
      expect(theme).toBeObject();
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
