import { objectValues, objectKeys } from "@ubloimmo/front-util";
import { describe, expect, it } from "bun:test";

import { buildSpacingMap, defaultSpacingMapConfig } from "../sizes";
import { isCssRem } from "../utils";

import type { Spacings } from "../types";

describe("spacings", () => {
  let spacings: Spacings;

  it("should create a spacing map", () => {
    expect(buildSpacingMap).toBeDefined();
    expect(buildSpacingMap).not.toThrow();
    spacings = buildSpacingMap(defaultSpacingMapConfig.maxScale);
    expect(spacings).not.toBeEmptyObject();
  });
  it("should contain all scales", () => {
    expect(Object.keys(spacings).length - 1).toEqual(
      defaultSpacingMapConfig.maxScale
    );
  });
  it("should only contain css rem values", () => {
    objectValues(spacings).forEach((value) => {
      expect(isCssRem(value)).toBeTrue();
    });
  });
  it("should contain scales declared with the 's' prefix", () => {
    objectKeys(spacings).forEach((key) => {
      expect(key.startsWith("s")).toBeTrue();
    });
  });
});
