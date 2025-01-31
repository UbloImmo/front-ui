import { objectKeys } from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";

import {
  cssPx,
  cssRem,
  cssFr,
  pxToRem,
  remToPx,
  cssPxToCssRem,
  cssRemToCssPx,
  cssVarName,
  cssVar,
  cssVarUsage,
  isCssPx,
  isCssRem,
  isCssFr,
  cssLengthUsage,
  REM_FACTOR,
} from "@utils";

import type { CssFr, CssLength, CssPx, CssRem } from "@types";
import type {
  GenericFn,
  NullishPrimitives,
  Predicate,
} from "@ubloimmo/front-util";

type LengthUnitCollection<TUnit extends CssLength> = {
  int: TUnit;
  float: TUnit;
  negative: TUnit;
};

type LengthCollection = {
  px: LengthUnitCollection<number>;
  cssPx: LengthUnitCollection<CssPx>;
  rem: LengthUnitCollection<number>;
  cssRem: LengthUnitCollection<CssRem>;
  fr: LengthUnitCollection<number>;
  cssFr: LengthUnitCollection<CssFr>;
};

type LengthUnitKey = keyof LengthCollection;

export const testLenghts: LengthCollection = {
  px: { int: 12, float: 128.4, negative: -24 },
  cssPx: { int: "12px", float: "128.4px", negative: "-24px" },
  rem: { int: 0.75, float: 8.025, negative: -1.5 },
  cssRem: { int: "0.75rem", float: "8.025rem", negative: "-1.5rem" },
  fr: { int: 12, float: 128.4, negative: -24 },
  cssFr: { int: "12fr", float: "128.4fr", negative: "-24fr" },
} as const;

const testLengthConversion = <
  TInput extends LengthUnitKey,
  TOutput extends LengthUnitKey,
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

const testLengthPredicate = <
  TPredicateType extends NullishPrimitives,
  TInput extends LengthUnitKey,
>(
  input: TInput,
  predicate: Predicate<TPredicateType>
) => {
  it(`should identify a ${input}`, () => {
    expect(predicate).toBeDefined();
    expect(predicate).toBeFunction();
    expect(predicate).not.toThrow();
    objectKeys(testLenghts).forEach((key) => {
      const inputKeys = objectKeys(testLenghts[key]);
      const shouldReturnTrue = key === input;

      inputKeys.forEach((inputKey) => {
        expect(() => predicate(testLenghts[key][inputKey])).not.toThrow();
        expect(predicate(testLenghts[key][inputKey])).toEqual(shouldReturnTrue);
      });
    });
  });
};

describe("css", () => {
  describe("constants", () => {
    it("rem", () => {
      expect(REM_FACTOR).toBeNumber();
      expect(REM_FACTOR).toBe(16);
    });
  });
  describe("unit conversion", () => {
    testLengthConversion("px", "cssPx", cssPx);
    testLengthConversion("rem", "cssRem", cssRem);
    testLengthConversion("fr", "cssFr", cssFr);
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
    testLengthPredicate<CssPx, "cssPx">("cssPx", isCssPx);
    testLengthPredicate<CssRem, "cssRem">("cssRem", isCssRem);
    testLengthPredicate<CssFr, "cssFr">("cssFr", isCssFr);
  });

  describe("length usage", () => {
    it("should format a css length to its usage string", () => {
      expect(cssLengthUsage).toBeDefined();
      expect(cssLengthUsage).toBeFunction();
      expect(cssLengthUsage(testLenghts.rem.float)).toEqual(
        testLenghts.cssRem.float
      );
      expect(cssLengthUsage(testLenghts.cssRem.float)).toEqual(
        testLenghts.cssRem.float
      );
      expect(cssLengthUsage("s-1")).toEqual(cssVarUsage("s-1"));
    });
  });
});
