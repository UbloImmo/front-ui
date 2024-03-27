import {
  objectEntries,
  objectValues,
  type GenericFn,
} from "@ubloimmo/front-util";
import { describe, expect, it } from "bun:test";

import { testPrimitives } from "./test.data";
import {
  blendColors,
  hexColorConverter,
  isColorKey,
  isPaletteColor,
  isSameColor,
  isSameShade,
  isValidHexStr,
  isValidRgbaStr,
  rgbaColorConverter,
} from "../utils/color.utils";

import type {
  AnyColor,
  ColorCollection,
  HexColor,
  HexColorAlpha,
  HexColorOpaque,
  HexColorShorthand,
  HexColorShorthandAlpha,
  RgbaColorStr,
} from "../types";

type PrimaryColor = "red" | "green" | "blue";

const red: ColorCollection = {
  rgbaStr: "rgba(255, 0, 0, 1)",
  rgbaArr: [255, 0, 0, 1],
  rgbaObj: { r: 255, g: 0, b: 0, a: 1 },
  hexShort: "#F00" as HexColorShorthand,
  hexShortAlpha: "#F00F" as HexColorShorthandAlpha,
  hexOpaque: "#FF0000" as HexColorOpaque,
  hexAlpha: "#FF0000FF" as HexColorAlpha,
} as const;

const green: ColorCollection = {
  rgbaStr: "rgba(0, 255, 0, 1)",
  rgbaArr: [0, 255, 0, 1],
  rgbaObj: { r: 0, g: 255, b: 0, a: 1 },
  hexShort: "#0F0" as HexColorShorthand,
  hexShortAlpha: "#0F0F" as HexColorShorthandAlpha,
  hexOpaque: "#00FF00" as HexColorOpaque,
  hexAlpha: "#00FF00FF" as HexColorAlpha,
} as const;

const blue: ColorCollection = {
  rgbaStr: "rgba(0, 0, 255, 1)",
  rgbaArr: [0, 0, 255, 1],
  rgbaObj: { r: 0, g: 0, b: 255, a: 1 },
  hexShort: "#00F" as HexColorShorthand,
  hexShortAlpha: "#00FF" as HexColorShorthandAlpha,
  hexOpaque: "#0000FF" as HexColorOpaque,
  hexAlpha: "#0000FFFF" as HexColorAlpha,
} as const;

export const colorCollections = {
  red,
  green,
  blue,
} as const;

const redAndGreen: RgbaColorStr = "rgba(128, 128, 0, 1)" as const;
const redAndBlue: RgbaColorStr = "rgba(128, 0, 128, 1)" as const;
const greenAndBlue: RgbaColorStr = "rgba(0, 128, 128, 1)" as const;
const colorBlends: Record<PrimaryColor, Record<PrimaryColor, RgbaColorStr>> = {
  red: {
    red: red.rgbaStr,
    green: redAndGreen,
    blue: redAndBlue,
  },
  green: {
    red: redAndGreen,
    green: green.rgbaStr,
    blue: greenAndBlue,
  },
  blue: {
    red: redAndBlue,
    green: greenAndBlue,
    blue: blue.rgbaStr,
  },
} as const;

const testColorConversion = <
  TInput extends keyof ColorCollection,
  TOutput extends keyof ColorCollection
>(
  input: TInput,
  output: TOutput,
  converter: (input: ColorCollection[TInput]) => ColorCollection[TOutput]
) => {
  it(`should convert ${input} to ${output}`, () => {
    expect(converter(red[input])).toEqual(red[output]);
    expect(converter(green[input])).toEqual(green[output]);
    expect(converter(blue[input])).toEqual(blue[output]);
  });
};

const testHexColorConversion = <TOutput extends keyof ColorCollection>(
  output: TOutput,
  converter: (input: HexColor) => ColorCollection[TOutput]
) => {
  testColorConversion("hexShort", output, converter);
  testColorConversion("hexShortAlpha", output, converter);
  testColorConversion("hexOpaque", output, converter);
  testColorConversion("hexAlpha", output, converter);
};

describe("color conversion", () => {
  describe("from RGBA", () => {
    describe("to RGBA", () => {
      testColorConversion("rgbaStr", "rgbaArr", rgbaColorConverter.strToArr);
      testColorConversion("rgbaStr", "rgbaObj", rgbaColorConverter.strToObj);
      testColorConversion("rgbaArr", "rgbaStr", rgbaColorConverter.arrToStr);
      testColorConversion("rgbaArr", "rgbaObj", rgbaColorConverter.arrToObj);
      testColorConversion("rgbaObj", "rgbaStr", rgbaColorConverter.objToStr);
      testColorConversion("rgbaObj", "rgbaArr", rgbaColorConverter.objToArr);
    });

    describe("to Hex", () => {
      testColorConversion("rgbaStr", "hexAlpha", rgbaColorConverter.strToHex);
      testColorConversion("rgbaArr", "hexAlpha", rgbaColorConverter.arrToHex);
      testColorConversion("rgbaObj", "hexAlpha", rgbaColorConverter.objToHex);
    });
  });

  describe("from Hex", () => {
    describe("to Hex", () => {
      it("should throw for an invalid hex string", () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore normalize() is correctly typed to we have to disable TS for it to throw
        expect(() => hexColorConverter.normalize("hello world")).toThrow();
      });
      testHexColorConversion("hexAlpha", hexColorConverter.normalize);
    });

    describe("to RGBA", () => {
      testHexColorConversion("rgbaStr", hexColorConverter.hexToRgbaStr);
      testHexColorConversion("rgbaArr", hexColorConverter.hexToRgbaArr);
      testHexColorConversion("rgbaObj", hexColorConverter.hexToRgbaObj);
    });
  });
});

describe("color predicates", () => {
  describe("isValidHexStr", () => {
    it("should not throw", () => {
      expect(isValidHexStr).toBeFunction();
      expect(isValidHexStr).not.toThrow();
    });

    it("should return true for a valid hex string", () => {
      expect(isValidHexStr(red.hexAlpha)).toBeTrue();
      expect(isValidHexStr(red.hexShort)).toBeTrue();
      expect(isValidHexStr(red.hexOpaque)).toBeTrue();
      expect(isValidHexStr(red.hexShortAlpha)).toBeTrue();
    });

    it("should return false for an invalid hex string", () => {
      expect(isValidHexStr(red.rgbaStr)).toBeFalse();
      expect(isValidHexStr("hello world")).toBeFalse();
      expect(isValidHexStr("25FA15")).toBeFalse();
    });

    it("should return false for anything else", () => {
      objectValues(testPrimitives).forEach((primitive) => {
        expect(isValidHexStr(primitive)).toBeFalse();
      });
    });
  });

  describe("isValidRgbaStr", () => {
    it("should return true for a valid rgba string", () => {
      expect(isValidRgbaStr(red.rgbaStr)).toBeTrue();
      expect(isValidRgbaStr(green.rgbaStr)).toBeTrue();
      expect(isValidRgbaStr(blue.rgbaStr)).toBeTrue();
      expect(isValidRgbaStr("rgba(0,0,0,0.12678)")).toBeTrue();
    });

    it("should return false for an invalid rgba string", () => {
      expect(isValidRgbaStr("rgb(0, 0, 0, 0.12678)")).toBeFalse();
      expect(isValidRgbaStr("rgba(-1, 0, 0, 0.12678)")).toBeFalse();
      expect(isValidRgbaStr("rgba(256, 0, 0, 0.12678)")).toBeFalse();
      expect(isValidRgbaStr("rgba(255, 0, 0)")).toBeFalse();
      expect(isValidRgbaStr("rgb(255, 0, 0)")).toBeFalse();
      expect(isValidRgbaStr("rgb(255, 0, 0, 0.45)")).toBeFalse();
    });

    it("should return false for anything else", () => {
      objectValues(testPrimitives).forEach((primitive) => {
        expect(isValidRgbaStr(primitive)).toBeFalse();
      });
    });
  });

  describe("isColorKey", () => {
    it("should not throw", () => {
      expect(isColorKey).toBeFunction();
      expect(isColorKey).not.toThrow();
    });

    it("should return true for a valid color key", () => {
      ["success", "error", "warning", "pending", "gray", "primary"].forEach(
        (colorKey) => {
          expect(isColorKey(colorKey)).toBeTrue();
        }
      );
    });

    it("should return false for an invalid color key", () => {
      ["success", "error", "warning", "pending", "gray", "primary"]
        .map((key, index) => `${key}${index}`)
        .forEach((colorKey) => {
          expect(isColorKey(colorKey)).toBeFalse();
        });
    });

    it("should return false for anything else", () => {
      objectValues(testPrimitives).forEach((primitive) => {
        expect(isColorKey(primitive)).toBeFalse();
      });
    });
  });

  describe("isPaletteColor", () => {
    it("should not throw", () => {
      expect(isPaletteColor).toBeFunction();
      expect(isPaletteColor).not.toThrow();
    });

    it("should return true for a valid color key", () => {
      [
        "success-light",
        "error-dark",
        "warning-base",
        "pending-medium",
        "gray-700",
        "primary-base",
      ].forEach((colorKey) => {
        expect(isPaletteColor(colorKey)).toBeTrue();
      });
    });

    it("should return false for an invalid color key", () => {
      [
        "success-lightt",
        "error",
        "warning-",
        "pending-Medium",
        "gray-704",
        "primary-500",
      ].forEach((colorKey) => {
        expect(isPaletteColor(colorKey)).toBeFalse();
      });
    });

    it("should return false for anything else", () => {
      objectValues(testPrimitives).forEach((primitive) => {
        expect(isColorKey(primitive)).toBeFalse();
      });
    });
  });
});

/**
 * Test color blending between two specified colors and all color format combinations.
 *
 * @param {"red" | "green" | "blue"} colorA - the first color to blend
 * @param {"red" | "green" | "blue"} colorB - the second color to blend
 * @return {void}
 */
const testColorBlend = (colorA: PrimaryColor, colorB: PrimaryColor) => {
  const sources = objectEntries(colorCollections[colorA]);
  const targets = objectEntries(colorCollections[colorB]);

  sources.forEach(([sourceKey, source]) => {
    targets.forEach(([targetKey, target]) => {
      it(`should blend between ${sourceKey} and ${targetKey}`, () => {
        const targetBlend = colorBlends[colorA][colorB];
        expect(blendColors(source, target, 0.5)).toEqual(targetBlend);
        expect(blendColors(target, source, 0.5)).toEqual(targetBlend);
      });
    });
  });
};

describe("color blending", () => {
  testColorBlend("red", "red");
  testColorBlend("red", "green");
  testColorBlend("red", "blue");
  testColorBlend("green", "green");
  testColorBlend("green", "red");
  testColorBlend("green", "blue");
  testColorBlend("blue", "blue");
  testColorBlend("blue", "red");
  testColorBlend("blue", "green");
});

const testColorComparison = (
  colorA: PrimaryColor,
  colorB: PrimaryColor,
  comparator: GenericFn<[AnyColor, AnyColor], boolean>,
  expected: boolean
) => {
  const sources = objectEntries(colorCollections[colorA]);
  const targets = objectEntries(colorCollections[colorB]);

  sources.forEach(([sourceKey, source]) => {
    targets.forEach(([targetKey, target]) => {
      it(`should compare ${sourceKey} and ${targetKey}`, () => {
        expect(comparator(source, target)).toBe(expected);
        expect(comparator(target, source)).toBe(expected);
      });
    });
  });
};

describe("color comparison", () => {
  describe("isSameColor", () => {
    testColorComparison("red", "red", isSameColor, true);
    testColorComparison("red", "green", isSameColor, false);
    testColorComparison("red", "blue", isSameColor, false);
    testColorComparison("green", "green", isSameColor, true);
    testColorComparison("green", "red", isSameColor, false);
    testColorComparison("green", "blue", isSameColor, false);
    testColorComparison("blue", "blue", isSameColor, true);
    testColorComparison("blue", "red", isSameColor, false);
    testColorComparison("blue", "green", isSameColor, false);
  });
  describe("isSameShade", () => {
    testColorComparison("red", "red", isSameShade, true);
    testColorComparison("red", "green", isSameShade, false);
    testColorComparison("red", "blue", isSameShade, false);
    testColorComparison("green", "green", isSameShade, true);
    testColorComparison("green", "red", isSameShade, false);
    testColorComparison("green", "blue", isSameShade, false);
    testColorComparison("blue", "blue", isSameShade, true);
    testColorComparison("blue", "red", isSameShade, false);
    testColorComparison("blue", "green", isSameShade, false);
  });
});
