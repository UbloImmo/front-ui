import { RgbaColorCollection } from "@/types/themes/color.types";
import { describe, expect, test } from "bun:test";
import { rgbaColorConverter } from "@/utils/color.utils";

const redColor: RgbaColorCollection = {
  str: "rgba(255, 0, 0, 1)",
  arr: [255, 0, 0, 1],
  obj: { r: 255, g: 0, b: 0, a: 1 },
};

const greenColor: RgbaColorCollection = {
  str: "rgba(0, 255, 0, 1)",
  arr: [0, 255, 0, 1],
  obj: { r: 0, g: 255, b: 0, a: 1 },
};

const blueColor: RgbaColorCollection = {
  str: "rgba(0, 0, 255, 1)",
  arr: [0, 0, 255, 1],
  obj: { r: 0, g: 0, b: 255, a: 1 },
};

const testColorConversion = <
  TInput extends keyof RgbaColorCollection,
  TOutput extends keyof RgbaColorCollection
>(
  input: TInput,
  output: TOutput,
  converter: (
    input: RgbaColorCollection[TInput]
  ) => RgbaColorCollection[TOutput]
) => {
  if (input === output) return;
  test(`convert ${input} to ${output}`, () => {
    expect(converter(redColor[input])).toEqual(redColor[output]);
    expect(converter(greenColor[input])).toEqual(greenColor[output]);
    expect(converter(blueColor[input])).toEqual(blueColor[output]);
  });
};

describe("color conversion", () => {
  testColorConversion("str", "arr", rgbaColorConverter.strToArr);
  testColorConversion("str", "obj", rgbaColorConverter.strToObj);
  testColorConversion("arr", "str", rgbaColorConverter.arrToStr);
  testColorConversion("arr", "obj", rgbaColorConverter.arrToObj);
  testColorConversion("obj", "str", rgbaColorConverter.objToStr);
  testColorConversion("obj", "arr", rgbaColorConverter.objToArr);
});
