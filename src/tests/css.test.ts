import { describe, it, expect } from "bun:test";
import {
  cssPx,
  cssPxToCssRem,
  cssRem,
  cssRemToCssPx,
  cssVar,
  cssVarName,
  cssVarUsage,
  isCssPx,
  isCssRem,
  pxToRem,
  remToPx,
} from "../utils";
import { GenericFn, objectKeys } from "@ubloimmo/front-util";
import { CssPx, CssRem } from "../types";

type LengthUnitCollection<TUnit extends number | CssRem | CssPx> = {
  int: TUnit;
  float: TUnit;
  negative: TUnit;
};

type LengthCollection = {
  px: LengthUnitCollection<number>;
  cssPx: LengthUnitCollection<CssPx>;
  rem: LengthUnitCollection<number>;
  cssRem: LengthUnitCollection<CssRem>;
};

type LengthUnitKey = keyof LengthCollection;

export const testLenghts: LengthCollection = {
  px: { int: 12, float: 128.4, negative: -24 },
  cssPx: { int: "12px", float: "128.4px", negative: "-24px" },
  rem: { int: 0.75, float: 8.025, negative: -1.5 },
  cssRem: { int: "0.75rem", float: "8.025rem", negative: "-1.5rem" },
} as const;

const testLengthConversion = <
  TInput extends LengthUnitKey,
  TOutput extends LengthUnitKey
>(
  input: TInput,
  output: TOutput,
  converter: GenericFn<
    [LengthCollection[TInput][keyof LengthCollection[TInput]]],
    LengthCollection[TOutput][keyof LengthCollection[TOutput]]
  >
) => {
  const keys = objectKeys(testLenghts[input]);
  const outputKeys = objectKeys(testLenghts[output]);

  it(`should convert from ${input} to ${output}`, () => {
    keys.forEach((key, index) => {
      const outputKey = outputKeys[index];
      expect(converter(testLenghts[input][key])).toEqual(
        testLenghts[output][outputKey]
      );
    });
  });
};

describe("css", () => {
  describe("unit conversion", () => {
    testLengthConversion("px", "cssPx", cssPx);
    testLengthConversion("rem", "cssRem", cssRem);
    testLengthConversion("px", "rem", pxToRem);
    testLengthConversion("rem", "px", remToPx);
    testLengthConversion("cssPx", "cssRem", cssPxToCssRem);
    testLengthConversion("cssRem", "cssPx", cssRemToCssPx);
  });

  describe("variables", () => {
    it("should create a css variable name", () => {
      expect(cssVarName).toBeFunction();
      expect(cssVarName).not.toThrow();
      expect(cssVarName("foo")).toEqual("--foo");
    });

    it("should create a css variable rule", () => {
      expect(cssVar).toBeFunction();
      expect(cssVar).not.toThrow();
      expect(cssVar("foo", testLenghts.cssRem.float)).toEqual(
        `--foo: ${testLenghts.cssRem.float};`
      );
    });

    it("should create a css variable object", () => {
      expect(cssVarUsage).toBeFunction();
      expect(cssVarUsage).not.toThrow();
      expect(cssVarUsage("foo")).toEqual("var(--foo)");
    });
  });

  describe("predicates", () => {
    it("should identify css pixels", () => {
      expect(isCssPx).toBeFunction();
      expect(isCssPx).not.toThrow();
      expect(isCssPx(testLenghts.cssPx.int)).toBeTrue();
      expect(isCssPx(testLenghts.cssPx.float)).toBeTrue();
      expect(isCssPx(testLenghts.cssPx.negative)).toBeTrue();
      expect(isCssPx(testLenghts.cssRem.int)).toBeFalse();
      expect(isCssPx(testLenghts.cssRem.float)).toBeFalse();
      expect(isCssPx(testLenghts.cssRem.negative)).toBeFalse();
      expect(isCssPx(testLenghts.px.int)).toBeFalse();
      expect(isCssPx(testLenghts.px.float)).toBeFalse();
      expect(isCssPx(testLenghts.px.negative)).toBeFalse();
    });

    it("should identify css rems", () => {
      expect(isCssRem).toBeFunction();
      expect(isCssRem).not.toThrow();
      expect(isCssRem(testLenghts.cssPx.int)).toBeFalse();
      expect(isCssRem(testLenghts.cssPx.float)).toBeFalse();
      expect(isCssRem(testLenghts.cssPx.negative)).toBeFalse();
      expect(isCssRem(testLenghts.cssRem.int)).toBeTrue();
      expect(isCssRem(testLenghts.cssRem.float)).toBeTrue();
      expect(isCssRem(testLenghts.cssRem.negative)).toBeTrue();
      expect(isCssRem(testLenghts.px.int)).toBeFalse();
      expect(isCssRem(testLenghts.px.float)).toBeFalse();
      expect(isCssRem(testLenghts.px.negative)).toBeFalse();
    });
  });
});
