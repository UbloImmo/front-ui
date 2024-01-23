import { describe, expect, it } from "bun:test";
import { buildSpacingMap, defaultSpacingMapConfig } from "../sizes";
import { cssRem } from "../utils";
import type { Spacings } from "../types";

describe("spacings", () => {
  let spacings: Spacings;
  it("should create a spacing map", () => {
    expect(buildSpacingMap).toBeDefined();
    expect(buildSpacingMap).not.toThrow();
    const { minFactor, maxFactor, mediumFactor } = defaultSpacingMapConfig;
    spacings = buildSpacingMap(minFactor, maxFactor, mediumFactor);
  });
  it("should be offset by 16px by default", () => {
    expect(spacings.xxx_small).toEqual(cssRem(0.125));
    expect(spacings.xx_small).toEqual(cssRem(0.25));
    expect(spacings.x_small).toEqual(cssRem(0.5));
    expect(spacings.small).toEqual(cssRem(0.75));
    expect(spacings.medium).toEqual(cssRem(1));
    expect(spacings.large).toEqual(cssRem(1.25));
    expect(spacings.x_large).toEqual(cssRem(1.5));
    expect(spacings.xx_large).toEqual(cssRem(1.75));
    expect(spacings.xxx_large).toEqual(cssRem(2));
    expect(spacings.xxxx_large).toEqual(cssRem(2.25));
    expect(spacings.xxxxx_large).toEqual(cssRem(2.5));
    expect(spacings.xxxxxx_large).toEqual(cssRem(2.75));
  });
});
