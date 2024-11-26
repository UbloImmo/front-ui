import { describe, expect, it, mock, type Mock } from "bun:test";

import { CurrencyInput } from "./CurrencyInput.component";
import { CurrencyInputProps } from "./CurrencyInput.types";
import {
  computeCurrencySign,
  currencyFloatToInt,
  currencyFloatToStr,
  currencyIntToFloat,
  currencyIntToStr,
  currencyNumberToStr,
  currencyStrToInt,
  formatCurrencyInputValue,
  formatCurrencyInt,
  nativeCurrencyValueToInt,
  sanitizeCurrencyInputValue,
} from "./CurrencyInput.utils";

import { testComponentFactory } from "@/tests";

import type { CurrencyFloat, CurrencyInt } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";

const testId = "input-currency";

// TODO: missing currency input fns & hooks tests
describe("Input", () => {
  const testInput = testComponentFactory<CurrencyInputProps>(
    "CurrencyInput",
    CurrencyInput
  );

  const testDefaultProps = testInput(CurrencyInput.defaultProps);
  testDefaultProps("should render", async ({ findByTestId }) => {
    expect(await findByTestId(testId)).not.toBeNull();
  });

  testInput({})("should render", async ({ findByTestId }) => {
    expect(await findByTestId(testId)).not.toBeNull();
  });

  describe("CurrencyInput", () => {
    describe("currencyIntToFloat", () => {
      it("should be a function", () => {
        expect(currencyIntToFloat).toBeFunction();
      });

      it("should throw if not provided with a number", () => {
        // @ts-expect-error needed to make it throw
        expect(() => currencyIntToFloat("not a number")).toThrow(
          "currencyInt must be a number"
        );
      });

      it("should convert a currency int to a float", () => {
        expect(currencyIntToFloat(456456)).toBe(4564.56);
      });

      it("should not take decimals into account if provided with a float", () => {
        expect(currencyIntToFloat(45645.6)).toBe(456.45);
      });
    });

    describe("currencyFloatToInt", () => {
      it("should be a function", () => {
        expect(currencyFloatToInt).toBeFunction();
      });

      it("should throw if not provided with a number", () => {
        // @ts-expect-error needed to make it throw
        expect(() => currencyFloatToInt("not a number")).toThrow(
          `currencyFloat must be a number, received not a number`
        );
      });

      it("should convert a currency float to an int without rounding", () => {
        expect(currencyFloatToInt(4564.56)).toBe(456456);
        expect(currencyFloatToInt(4564.5689)).toBe(456456);
      });

      it("should not suffer from precision errors", () => {
        const testValues: [CurrencyFloat, CurrencyInt][] = [
          [130.39, 13039],
          [2.04, 204],
          [1, 100],
          [0.1, 10],
          [0.03, 3],
          [7.06, 706],
          [0.45699, 45],
          [0.9, 90],
        ];
        testValues.forEach(([value, expected]) => {
          expect(currencyFloatToInt(value)).toBe(expected);
        });
      });

      global.console.warn = mock(() => {});

      it("should warn if overflowing", () => {
        currencyFloatToInt(Number.MAX_SAFE_INTEGER + 1);
        expect(global.console.warn).toHaveBeenCalled();
        (global.console.warn as Mock<VoidFn>).mockReset();
      });
    });

    describe("currencyFloatToStr", () => {
      it("should be a function", () => {
        expect(currencyFloatToStr).toBeFunction();
      });

      it("should throw if not provided with a number", () => {
        // @ts-expect-error needed to make it throw
        expect(() => currencyFloatToStr("not a number")).toThrow(
          "currencyFloat must be a number"
        );
      });

      it("should convert a currency float to an string while replacing points with commas", () => {
        expect(currencyFloatToStr(4564.56)).toBe("4564,56");
        expect(currencyFloatToStr(4564.5699)).toBe("4564,56");
      });
    });

    describe("currencyIntToStr", () => {
      it("should be a function", () => {
        expect(currencyIntToStr).toBeFunction();
      });

      it("should throw if not provided with a number", () => {
        // @ts-expect-error needed to make it throw
        expect(() => currencyIntToStr("not a number")).toThrow(
          "currencyInt must be a number"
        );
      });

      it("should return a float currency string", () => {
        expect(currencyIntToStr(456456)).toBe("4564,56");
      });
    });

    describe("currencyNumberToStr", () => {
      it("should be a function", () => {
        expect(currencyNumberToStr).toBeFunction();
      });

      it("should not throw if not provided with a number", () => {
        // @ts-expect-error needed to make it return default value
        expect(() => currencyNumberToStr("not a number")).not.toThrow();
      });

      it("should return 0,00 if not provided with a number", () => {
        // @ts-expect-error needed to make it return default value)
        expect(currencyNumberToStr("not a number")).toBe("0,00");
      });

      it("should return a float currency string from any number", () => {
        expect(currencyNumberToStr(0)).toBe("0,00");
        expect(currencyNumberToStr(0.456)).toBe("0,45");
        expect(currencyNumberToStr(4756.7)).toBe("4756,70");
      });
    });

    describe("currencyStrToInt", () => {
      it("should be a function", () => {
        expect(currencyStrToInt).toBeFunction();
      });

      it("should not throw if not provided with a string", () => {
        // @ts-expect-error needed to make it return default value
        expect(() => currencyStrToInt(0.756)).not.toThrow();
        // @ts-expect-error needed to make it return default value
        expect(() => currencyStrToInt(undefined)).not.toThrow();
      });

      it("should return null if not provided with a string", () => {
        // @ts-expect-error needed to make it return null
        expect(currencyStrToInt(0.756)).toBe(null);
        // @ts-expect-error needed to make it return null
        expect(currencyStrToInt(undefined)).toBe(null);
      });

      it("sould return null if no float could be parsed", () => {
        // @ts-expect-error needed to make it return null
        expect(currencyStrToInt("not a number")).toBe(null);
      });

      it("should return a valid int from a currency string", () => {
        expect(currencyStrToInt("4564,56")).toBe(456456);
        expect(currencyStrToInt("4564,5")).toBe(456450);
        // @ts-expect-error needed to test edge cases
        expect(currencyStrToInt("12")).toBe(1200);
        // @ts-expect-error needed to test edge cases
        expect(currencyStrToInt("0.75")).toBe(75);
      });
    });

    describe("nativeCurrencyValueToFloat", () => {
      it("should be a function", () => {
        expect(nativeCurrencyValueToInt).toBeFunction();
      });

      it("should not throw", () => {
        expect(nativeCurrencyValueToInt).not.toThrow();
      });

      it("should return null if provided with a nullish value or an empty string", () => {
        // @ts-expect-error needed to make it return null
        expect(nativeCurrencyValueToInt(null)).toBe(null);
        expect(nativeCurrencyValueToInt(undefined)).toBe(null);
        expect(nativeCurrencyValueToInt("")).toBe(null);
        // @ts-expect-error needed to make it return null
        expect(nativeCurrencyValueToInt({})).toBe(null);
      });

      it("should normalize strings, floats and ints to currency floats", () => {
        expect(nativeCurrencyValueToInt("0")).toBe(0);
        expect(nativeCurrencyValueToInt("12")).toBe(1200);
        expect(nativeCurrencyValueToInt("0.0")).toBe(0);
        expect(nativeCurrencyValueToInt("0.456")).toBe(45);
        expect(nativeCurrencyValueToInt("4564.56")).toBe(456456);
        expect(nativeCurrencyValueToInt("4564.5689")).toBe(456456);
        expect(nativeCurrencyValueToInt(0)).toBe(0);
        expect(nativeCurrencyValueToInt(12)).toBe(1200);
        expect(nativeCurrencyValueToInt(0.0)).toBe(0);
        expect(nativeCurrencyValueToInt(0.456)).toBe(45);
        expect(nativeCurrencyValueToInt(4564.56)).toBe(456456);
        expect(nativeCurrencyValueToInt(4564.5689)).toBe(456456);
      });
    });

    describe("computeCurrencySign", () => {
      it("should be a function", () => {
        expect(computeCurrencySign).toBeFunction();
      });

      it("should not throw", () => {
        expect(computeCurrencySign).not.toThrow();
      });

      it("should return the default sign or null if no value is provided", () => {
        // @ts-expect-error needed to make it return null
        expect(computeCurrencySign(undefined, "-")).toBe("-");
        // @ts-expect-error needed to make it return null
        expect(computeCurrencySign()).toBe(null);
      });
      it("should correctly return the sign", () => {
        expect(computeCurrencySign(-1)).toBe("-");
        expect(computeCurrencySign(1)).toBe("+");
        expect(computeCurrencySign(0)).toBe(null);
      });
    });

    describe("formatCurrencyInt", () => {
      it("should be a function", () => {
        expect(formatCurrencyInt).toBeFunction();
      });

      it("should throw if not provided with a number", () => {
        expect(formatCurrencyInt).toThrow();
      });

      it("should handle empty strings", () => {
        expect(sanitizeCurrencyInputValue("")).toBe("");
      });

      it("should return a currency string with a symbol", () => {
        expect(formatCurrencyInt(123456)).toBe("1 234,56 €");
        expect(formatCurrencyInt(0)).toBe("0,00 €");
        expect(formatCurrencyInt(-123456)).toBe("-1 234,56 €");
        expect(formatCurrencyInt(12345)).toBe("123,45 €");
        expect(formatCurrencyInt(99999999999)).toBe("999 999 999,99 €");
      });
    });

    describe("sanitizeCurrencyInputValue", () => {
      it("should remove start spaces", () => {
        expect(sanitizeCurrencyInputValue(" 123,45")).toBe("123,45");
        expect(sanitizeCurrencyInputValue("   123,45")).toBe("123,45");
      });

      it("should allow numbers, a decimal point, negative sign and spaces", () => {
        expect(sanitizeCurrencyInputValue("abc123$%^&,45")).toBe("123,45");
        expect(sanitizeCurrencyInputValue("abc123,45def")).toBe("123,45");
      });

      it("should only allow one decimal point", () => {
        expect(sanitizeCurrencyInputValue("123...45")).toBe("123,45");
        expect(sanitizeCurrencyInputValue("123,,,45")).toBe("123,45");
        expect(sanitizeCurrencyInputValue("123.,.45")).toBe("123,45");
      });

      it("should only allow one consecutive negative sign", () => {
        expect(sanitizeCurrencyInputValue("--123,45")).toBe("-123,45");
        expect(sanitizeCurrencyInputValue("---123,45")).toBe("-123,45");
      });

      it("should only allow a negative sign at the beginning", () => {
        expect(sanitizeCurrencyInputValue("-123,45")).toBe("-123,45");
        expect(sanitizeCurrencyInputValue("+123,45")).toBe("123,45");
      });

      it("should handle complex combinations", () => {
        expect(sanitizeCurrencyInputValue("  --123...45   €")).toBe("-123,45 ");
        expect(sanitizeCurrencyInputValue("abc-123,45-def")).toBe("-123,45");
      });

      it("should replace multiple spaces with a single space", () => {
        expect(sanitizeCurrencyInputValue("123   456,78")).toBe("123 456,78");
        expect(sanitizeCurrencyInputValue("123,45  ")).toBe("123,45 ");
      });
    });

    describe("formatCurrencyInputValue", () => {
      it("should be a function", () => {
        expect(formatCurrencyInputValue).toBeFunction();
      });

      it("should handle non-string native values", () => {
        const formatter = formatCurrencyInputValue(123);
        expect(formatter(123400)).toBe("1234,00");
      });

      it("should preserve spaces from native input", () => {
        const formatter = formatCurrencyInputValue("1 234");
        expect(formatter(123400)).toBe("1 234");
      });

      it("should handle negative values", () => {
        const formatter = formatCurrencyInputValue("-1 234");
        expect(formatter(-123400)).toBe("-1 234");
      });

      it("should preserve multiple spaces", () => {
        const formatter = formatCurrencyInputValue("1 234 567");
        const result = formatter(-123456700);
        expect(result).toBe("-1 234 567");
      });

      it("should handle input with trailing space", () => {
        const formatter = formatCurrencyInputValue("1 234 ");
        const result = formatter(-123400);
        expect(result).toBe("-1 234 ");
      });
    });
  });
});
