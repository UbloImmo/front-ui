import { describe, expect, it } from "bun:test";
import { buildSpacingMap, defaultSpacingMapConfig } from "../sizes";
import { isCssRem } from "../utils";
import type { Spacings } from "../types";
import { objectValues, objectKeys } from "@ubloimmo/front-util";

const buildMap = buildSpacingMap;

describe("spacings", () => {
  let spacings: Spacings;
  it("should create a spacing map", () => {
    expect(buildMap).toBeDefined();
    expect(buildMap).not.toThrow();
    spacings = buildMap(defaultSpacingMapConfig.maxScale);
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
