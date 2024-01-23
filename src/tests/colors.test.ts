import type {
  ColorCollection,
  HexColor,
  HexColorAlpha,
  HexColorOpaque,
  HexColorShorthand,
  HexColorShorthandAlpha,
  RgbaColorStr,
} from "../types/themes/color.types";
import { describe, expect, it } from "bun:test";
import {
  blendColors,
  hexColorConverter,
  isValidHexStr,
  rgbaColorConverter,
} from "../utils/color.utils";
import { objectEntries } from "@ubloimmo/front-util";

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

const colorCollections = {
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

  describe("isValidHex", () => {
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
