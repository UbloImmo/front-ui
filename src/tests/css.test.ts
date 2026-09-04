import { isNullish, objectKeys, objectValues } from "@ubloimmo/front-util";
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
  isCssProperties,
  isCssLengthUsage,
  isCssPercent,
  isCssLength,
  cssVariables,
  cssClasses,
  cssStyles,
  cssCh,
  isCssMinmax,
  cssMinmax,
  cssCalc,
  parseCssVar,
  parseCssMinmax,
  cssMinmaxWithData,
  isCssVarUsage,
  isCssLengthKeyword,
} from "@utils";

import type {
  CssCh,
  CssFr,
  CssLength,
  CssLengthKeyword,
  CssMinmax,
  CssPercent,
  CssPx,
  CssRem,
} from "@types";
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
  cssPercent: LengthUnitCollection<CssPercent>;
  ch: LengthUnitCollection<number>;
  cssCh: LengthUnitCollection<CssCh>;
  cssLengthKeyword: LengthUnitCollection<CssLengthKeyword>;
  cssMinmax: LengthUnitCollection<CssMinmax>;
};

type LengthUnitKey = keyof LengthCollection;

export const testLenghts: LengthCollection = {
  px: { int: 12, float: 128.4, negative: -24 },
  cssPx: { int: "12px", float: "128.4px", negative: "-24px" },
  rem: { int: 0.75, float: 8.025, negative: -1.5 },
  cssRem: { int: "0.75rem", float: "8.025rem", negative: "-1.5rem" },
  fr: { int: 12, float: 128.4, negative: -24 },
  cssFr: { int: "12fr", float: "128.4fr", negative: "-24fr" },
  cssPercent: { int: "12%", float: "128.4%", negative: "-24%" },
  ch: { int: 12, float: 128.4, negative: -24 },
  cssCh: { int: "12ch", float: "128.4ch", negative: "-24ch" },
  cssLengthKeyword: {
    int: "auto",
    float: "fit-content",
    negative: "max-content",
  },
  cssMinmax: {
    int: "minmax(45px, 78rem)",
    float: "minmax(min-content, 2.5fr)",
    negative: "minmax(-456%, auto)",
  },
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
    testLengthConversion("ch", "cssCh", cssCh);
    testLengthConversion("px", "rem", pxToRem);
    testLengthConversion("rem", "px", remToPx);
    testLengthConversion("cssPx", "cssRem", cssPxToCssRem);
    testLengthConversion("cssRem", "cssPx", cssRemToCssPx);
  });

  describe("declarations", () => {
    describe("minmax()", () => {
      it("should declare a cssMinmax", () => {
        expect(cssMinmax("auto", "1fr")).toBe("minmax(auto, 1fr)");
        expect(cssMinmax("min-content", "max-content")).toBe(
          "minmax(min-content, max-content)"
        );
        expect(cssMinmax(4, "auto")).toBe("minmax(4rem, auto)");
        expect(cssMinmax("max-content", "450px")).toBe(
          "minmax(max-content, 450px)"
        );
        expect(cssMinmax("2px", "s-8")).toBe("minmax(2px, var(--s-8))");
      });

      it("should convert a cssMinmax's bounds", () => {
        const { min, max, minmax } = cssMinmaxWithData(12, "s-2");
        expect(isCssRem(min)).toBeTrue();
        expect(min).toBe("12rem");
        expect(isCssVarUsage(max)).toBeTrue();
        expect(max).toBe("var(--s-2)");
        expect(isCssMinmax(minmax)).toBeTrue();
        expect(minmax).toBe("minmax(12rem, var(--s-2))");
      });

      it("should parse a cssMinmaxWithData object", () => {
        const result = cssMinmaxWithData(12, "s-2");
        expect(() => parseCssMinmax(result)).not.toThrow();
        const parsed = parseCssMinmax(result);
        expect(parsed).toBeObject();
        expect(parsed.min).toBe(result.min);
        expect(parsed.max).toBe(result.max);
      });

      it("should parsed a cssMinMax string", () => {
        const result = cssMinmaxWithData(12, "s-2");
        expect(() => parseCssMinmax(result.minmax)).not.toThrow();
        const parsed = parseCssMinmax(result.minmax);
        expect(parsed).toBeObject();
        expect(parsed.min).toBe(result.min);
        expect(parsed.max).toBe(result.max);

        objectValues(testLenghts.cssMinmax).forEach((minmax) => {
          expect(() => parseCssMinmax(minmax)).not.toThrow();
          const parsed = parseCssMinmax(minmax);
          expect(parsed).toBeObject();
          expect(parsed).not.toBeEmpty();
          expect(parsed).toHaveProperty("min");
          expect(parsed).toHaveProperty("max");
          expect(parsed.min).toBeString();
          expect(parsed.min).not.toBeEmpty();
          expect(parsed.max).toBeString();
          expect(parsed.max).not.toBeEmpty();
        });
      });
    });

    describe("calc()", () => {
      it("should declare a cssCalc", () => {
        expect(cssCalc("12px + 78%")).toBe("calc(12px + 78%)");
        expect(cssCalc("1rem - 50ch")).toBe("calc(1rem - 50ch)");
        expect(cssCalc(`12px + 78% * (1 - ${cssVarUsage("ratio")})`)).toBe(
          "calc(12px + 78% * (1 - var(--ratio)))"
        );
        expect(cssCalc("12px + 78%")).toBe("calc(12px + 78%)");
      });
    });
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

    it("should parse a css variable string", () => {
      expect(parseCssVar(cssVar("foo", testLenghts.cssRem.float))).toEqual({
        name: "--foo",
        value: testLenghts.cssRem.float,
      });
    });
  });

  describe("predicates", () => {
    testLengthPredicate("cssPx", isCssPx);
    testLengthPredicate("cssRem", isCssRem);
    testLengthPredicate("cssFr", isCssFr);
    testLengthPredicate("cssPercent", isCssPercent);
    testLengthPredicate("cssLengthKeyword", isCssLengthKeyword);
    testLengthPredicate("cssMinmax", isCssMinmax);

    it("should identify a cssMinmax", () => {
      expect(isCssMinmax("minmax(auto, 1fr)")).toBeTrue();
      expect(isCssMinmax("minmax(1fr, false)")).toBeTrue();
      expect(isCssMinmax("minmax(min-content, 2.5fr)")).toBeTrue();
      expect(isCssMinmax("minmax(78612.75756%, 20rem)")).toBeTrue();
      expect(isCssMinmax("minmax(78612.75756%,20rem)")).toBeFalse();
      expect(isCssMinmax("minmax(78612.75756%)")).toBeFalse();
      expect(isCssMinmax("minmax(78612.75756%,)")).toBeFalse();
      expect(isCssMinmax("minmax(78612.75756%, )")).toBeFalse();
    });

    it("should identify a CSSProperties object", () => {
      expect(isCssProperties).toBeFunction();
      expect(isCssProperties).not.toThrow();
      expect(isCssProperties({})).toBeTrue();
      expect(isCssProperties([])).toBeFalse();
      expect(isCssProperties("string")).toBeFalse();
      expect(isCssProperties(45)).toBeFalse();
    });

    it("should identify a css length", () => {
      expect(isCssLength).toBeFunction();
      expect(isCssLength).not.toThrow();
      expect(isCssLength(0)).toBeTrue();
      expect(isCssLength("1px")).toBeTrue();
      expect(isCssLength("2rem")).toBeTrue();
      expect(isCssLength("s-3")).toBeTrue();
      expect(isCssLength("4ch")).toBeTrue();
      expect(isCssLength("5%")).toBeTrue();
      expect(isCssLength("6fr")).toBeTrue();
      expect(isCssLengthUsage("auto")).toBeTrue();
    });

    it("should identify a css length usage", () => {
      expect(isCssLengthUsage).toBeFunction();
      expect(isCssLengthUsage).not.toThrow();
      expect(isCssLengthUsage(0)).toBeFalse();
      expect(isCssLengthUsage("1px")).toBeTrue();
      expect(isCssLengthUsage("2rem")).toBeTrue();
      expect(isCssLengthUsage("s-3")).toBeFalse();
      expect(isCssLengthUsage("4ch")).toBeTrue();
      expect(isCssLengthUsage("5%")).toBeTrue();
      expect(isCssLengthUsage("6fr")).toBeTrue();
      expect(isCssLengthUsage("auto")).toBeTrue();
    });
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
      expect(cssLengthUsage(testLenghts.cssPx.float)).toEqual(
        testLenghts.cssPx.float
      );
      expect(cssLengthUsage("s-1")).toEqual(cssVarUsage("s-1"));
      expect(cssLengthUsage("auto")).toEqual("auto");
    });
  });

  describe("css variables", () => {
    it("should be a function", () => {
      expect(cssVariables).toBeFunction();
      expect(cssVariables).not.toThrow();
    });

    const testVars = {
      padding: 45,
      "margin-bottom": "none",
      "45": "56rem",
      "omitted-null": null,
      "omitted-undefiend": undefined,
    };

    it("should format property names", () => {
      const result = cssVariables(testVars);
      for (const key in result) {
        expect(key).toStartWith("--");
        const baseKey = key.substring(2);
        expect(testVars).toHaveProperty(baseKey);
      }
    });

    it("should omit nullish properties", () => {
      const result = cssVariables(testVars);
      for (const key in testVars) {
        const transformedKey = cssVarName(key);
        const value = testVars[key as keyof typeof testVars];
        if (isNullish(value)) {
          expect(result).not.toHaveProperty(transformedKey);
        } else {
          expect(result).toHaveProperty(transformedKey);
        }
      }
    });

    it("should stringify properties", () => {
      const result = cssVariables(testVars);
      for (const key in result) {
        expect(key).toStartWith("--");
        const baseKey = key.substring(2);
        const value = result[key as keyof typeof result];
        expect(testVars).toHaveProperty(baseKey);
        const baseValue = testVars[baseKey as keyof typeof testVars];
        expect(value).toEqual(String(baseValue));
      }
    });
  });

  describe("css classes", () => {
    it("should be a function", () => {
      expect(cssClasses).toBeFunction();
      expect(cssClasses).not.toThrow();
    });

    it("should combine multiple classes", () => {
      expect(cssClasses("base", "secondary", "included")).toEqual(
        "base secondary included"
      );
      expect(
        cssClasses(
          "base",
          "secondary",
          ["not-included", false],
          ["included", true]
        )
      ).toEqual("base secondary included");
      expect(
        cssClasses({
          base: true,
          secondary: true,
          "not-included": false,
          included: true,
        })
      ).toEqual("base secondary included");
    });

    it("should handle a Map input", () => {
      expect(
        cssClasses(
          new Map([
            ["base", true],
            ["secondary", true],
            ["not-included", false],
            ["included", true],
          ])
        )
      ).toEqual("base secondary included");
    });

    it("should handle single string input", () => {
      expect(cssClasses("base")).toEqual("base");
    });

    it("should handle empty input", () => {
      expect(cssClasses()).toBeUndefined();
    });

    it("should handle nullish input", () => {
      expect(cssClasses(null, undefined)).toBeUndefined();
    });
  });

  describe("css styles", () => {
    it("should be a function", () => {
      expect(cssStyles).toBeFunction();
      expect(cssStyles).not.toThrow();
    });
    it("should merge multiple styles", () => {
      expect(cssStyles({ color: "red" }, { background: "blue" })).toEqual({
        color: "red",
        background: "blue",
      });
    });
    it("should override properties", () => {
      expect(cssStyles({ color: "red" }, { color: "blue" })).toEqual({
        color: "blue",
      });
    });
    it("should handle nullish input", () => {
      expect(cssStyles(null, undefined)).toEqual({});
    });
    it("should handle empty input", () => {
      expect(cssStyles()).toEqual({});
    });
    it("should handle single style input", () => {
      expect(cssStyles({ color: "red" })).toEqual({ color: "red" });
    });
  });
});
