import { objectValues, objectKeys } from "@ubloimmo/front-util";
import { describe, expect, it } from "bun:test";

import { buildSpacingMap, defaultSpacingMapConfig } from "../sizes/spacings";

import { SPACING_PREFIX, type SpacingLabel, type Spacings } from "@types";
import { arrayOf, isCssRem } from "@utils";

describe("spacings", () => {
  let spacings: Spacings;

  it("should create a spacing map", () => {
    expect(buildSpacingMap).toBeDefined();
    expect(buildSpacingMap).not.toThrow();
    spacings = buildSpacingMap(defaultSpacingMapConfig.maxScale);
    expect(spacings).not.toBeEmptyObject();
    expect(spacings["s-05"]).toBeString();
  });
  it("should contain all scales", () => {
    const scales = arrayOf(
      defaultSpacingMapConfig.maxScale - 1,
      (scale): SpacingLabel => `${SPACING_PREFIX}-${scale + 1}`,
    );
    const spacingMap = buildSpacingMap(defaultSpacingMapConfig.maxScale);
    scales.forEach((scale) => {
      expect(spacingMap).toHaveProperty(scale);
      expect(spacingMap[scale]).toBeString();
    });
  });
  it("should contain all scales", () => {
    expect(Object.keys(spacings).length - 1).toEqual(
      defaultSpacingMapConfig.maxScale,
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
