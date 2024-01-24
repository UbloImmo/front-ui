import { describe, it, expect } from "bun:test";
import {
  cssPx,
  cssPxToCssRem,
  cssRem,
  cssRemToCssPx,
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

const lengths: LengthCollection = {
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
  const keys = objectKeys(lengths[input]);
  const outputKeys = objectKeys(lengths[output]);

  it(`should convert from ${input} to ${output}`, () => {
    keys.forEach((key, index) => {
      const outputKey = outputKeys[index];
      expect(converter(lengths[input][key])).toEqual(
        lengths[output][outputKey]
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

  describe("predicates", () => {
    it("should identify css pixels", () => {
      expect(isCssPx).toBeFunction();
      expect(isCssPx).not.toThrow();
      expect(isCssPx(lengths.cssPx.int)).toBeTrue();
      expect(isCssPx(lengths.cssPx.float)).toBeTrue();
      expect(isCssPx(lengths.cssPx.negative)).toBeTrue();
      expect(isCssPx(lengths.cssRem.int)).toBeFalse();
      expect(isCssPx(lengths.cssRem.float)).toBeFalse();
      expect(isCssPx(lengths.cssRem.negative)).toBeFalse();
      expect(isCssPx(lengths.px.int)).toBeFalse();
      expect(isCssPx(lengths.px.float)).toBeFalse();
      expect(isCssPx(lengths.px.negative)).toBeFalse();
    });

    it("should identify css rems", () => {
      expect(isCssRem).toBeFunction();
      expect(isCssRem).not.toThrow();
      expect(isCssRem(lengths.cssPx.int)).toBeFalse();
      expect(isCssRem(lengths.cssPx.float)).toBeFalse();
      expect(isCssRem(lengths.cssPx.negative)).toBeFalse();
      expect(isCssRem(lengths.cssRem.int)).toBeTrue();
      expect(isCssRem(lengths.cssRem.float)).toBeTrue();
      expect(isCssRem(lengths.cssRem.negative)).toBeTrue();
      expect(isCssRem(lengths.px.int)).toBeFalse();
      expect(isCssRem(lengths.px.float)).toBeFalse();
      expect(isCssRem(lengths.px.negative)).toBeFalse();
    });
  });
});
