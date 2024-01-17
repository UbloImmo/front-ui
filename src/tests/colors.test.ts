import {
  ColorCollection,
  HexColor,
  HexColorAlpha,
  HexColorOpaque,
  HexColorShorthand,
  HexColorShorthandAlpha,
} from "../types/themes/color.types";
import { describe, expect, it } from "bun:test";
import {
  hexColorConverter,
  isValidHexStr,
  rgbaColorConverter,
} from "../utils/color.utils";

const redColor: ColorCollection = {
  rgbaStr: "rgba(255, 0, 0, 1)",
  rgbaArr: [255, 0, 0, 1],
  rgbaObj: { r: 255, g: 0, b: 0, a: 1 },
  hexShort: "#F00" as HexColorShorthand,
  hexShortAlpha: "#F00F" as HexColorShorthandAlpha,
  hexOpaque: "#FF0000" as HexColorOpaque,
  hexAlpha: "#FF0000FF" as HexColorAlpha,
};

const greenColor: ColorCollection = {
  rgbaStr: "rgba(0, 255, 0, 1)",
  rgbaArr: [0, 255, 0, 1],
  rgbaObj: { r: 0, g: 255, b: 0, a: 1 },
  hexShort: "#0F0" as HexColorShorthand,
  hexShortAlpha: "#0F0F" as HexColorShorthandAlpha,
  hexOpaque: "#00FF00" as HexColorOpaque,
  hexAlpha: "#00FF00FF" as HexColorAlpha,
};

const blueColor: ColorCollection = {
  rgbaStr: "rgba(0, 0, 255, 1)",
  rgbaArr: [0, 0, 255, 1],
  rgbaObj: { r: 0, g: 0, b: 255, a: 1 },
  hexShort: "#00F" as HexColorShorthand,
  hexShortAlpha: "#00FF" as HexColorShorthandAlpha,
  hexOpaque: "#0000FF" as HexColorOpaque,
  hexAlpha: "#0000FFFF" as HexColorAlpha,
};

const testColorConversion = <
  TInput extends keyof ColorCollection,
  TOutput extends keyof ColorCollection
>(
  input: TInput,
  output: TOutput,
  converter: (input: ColorCollection[TInput]) => ColorCollection[TOutput]
) => {
  it(`should convert ${input} to ${output}`, () => {
    expect(converter(redColor[input])).toEqual(redColor[output]);
    expect(converter(greenColor[input])).toEqual(greenColor[output]);
    expect(converter(blueColor[input])).toEqual(blueColor[output]);
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
      expect(isValidHexStr(redColor.hexAlpha)).toBeTrue();
      expect(isValidHexStr(redColor.hexShort)).toBeTrue();
      expect(isValidHexStr(redColor.hexOpaque)).toBeTrue();
      expect(isValidHexStr(redColor.hexShortAlpha)).toBeTrue();
    });
    it("should return false for an invalid hex string", () => {
      expect(isValidHexStr(redColor.rgbaStr)).toBeFalse();
      expect(isValidHexStr("hello world")).toBeFalse();
      expect(isValidHexStr("25FA15")).toBeFalse();
    });
  });

  describe("from Hex", () => {
    describe("to Hex", () => {
      testHexColorConversion("hexAlpha", hexColorConverter.normalize);
    });

    describe("to RGBA", () => {
      testHexColorConversion("rgbaStr", hexColorConverter.hexToRgbaStr);
      testHexColorConversion("rgbaArr", hexColorConverter.hexToRgbaArr);
      testHexColorConversion("rgbaObj", hexColorConverter.hexToRgbaObj);
    });
  });
});
