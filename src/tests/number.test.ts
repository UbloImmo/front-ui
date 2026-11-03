import { describe, expect, it } from "bun:test";

import {
  clamp,
  ensureFiniteNumber,
  ensureInt,
  isBetween,
  isFiniteNumber,
  isInt,
  isNegative,
  isPositive,
  isZero,
  lerp,
  toFixed,
} from "@utils";

describe("number utils", () => {
  describe("lerp", () => {
    it("should return the bounds at t = 0 and t = 1", () => {
      expect(lerp(10, 20, 0)).toBe(10);
      expect(lerp(10, 20, 1)).toBe(20);
    });
    it("should interpolate between the bounds", () => {
      expect(lerp(0, 100, 0.5)).toBe(50);
      expect(lerp(10, 20, 0.25)).toBe(12.5);
    });
    it("should interpolate downwards", () => {
      expect(lerp(20, 10, 0.5)).toBe(15);
    });
    it("should extrapolate outside of [0, 1]", () => {
      expect(lerp(0, 10, 2)).toBe(20);
      expect(lerp(0, 10, -1)).toBe(-10);
    });
  });

  describe("clamp", () => {
    it("should return the value when within bounds", () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });
    it("should return the bounds when inclusive", () => {
      expect(clamp(0, 0, 10)).toBe(0);
      expect(clamp(10, 0, 10)).toBe(10);
    });
    it("should clamp to the minimum", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });
    it("should clamp to the maximum", () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
    it("should default to unbounded", () => {
      expect(clamp(-1000)).toBe(-1000);
      expect(clamp(1000)).toBe(1000);
      expect(clamp(-5, 0)).toBe(0);
      expect(clamp(15, undefined, 10)).toBe(10);
    });
    it("should clamp infinities", () => {
      expect(clamp(Infinity, 0, 10)).toBe(10);
      expect(clamp(-Infinity, 0, 10)).toBe(0);
    });
  });

  describe("toFixed", () => {
    it("should truncate fraction digits without rounding", () => {
      expect(toFixed(1.239, 2)).toBe(1.23);
      expect(toFixed(1.999, 1)).toBe(1.9);
      expect(toFixed(0.129, 2)).toBe(0.12);
    });
    it("should keep numbers with fewer fraction digits than requested", () => {
      expect(toFixed(1.5, 3)).toBe(1.5);
      expect(toFixed(2, 2)).toBe(2);
    });
    it("should truncate negative numbers towards zero", () => {
      expect(toFixed(-1.239, 2)).toBe(-1.23);
    });
    it("should drop the fraction entirely when no digits are requested", () => {
      expect(toFixed(1.9, 0)).toBe(1);
      expect(toFixed(-1.9, 0)).toBe(-1);
    });
    it("should return NaN for NaN", () => {
      expect(toFixed(NaN, 2)).toBeNaN();
    });
  });

  describe("isNegative", () => {
    it("should be true for negative numbers", () => {
      expect(isNegative(-1)).toBeTrue();
      expect(isNegative(-0.001)).toBeTrue();
      expect(isNegative(-Infinity)).toBeTrue();
    });
    it("should be false for zero and positive numbers", () => {
      expect(isNegative(0)).toBeFalse();
      expect(isNegative(-0)).toBeFalse();
      expect(isNegative(1)).toBeFalse();
    });
    it("should be false for NaN", () => {
      expect(isNegative(NaN)).toBeFalse();
    });
  });

  describe("isPositive", () => {
    it("should be true for positive numbers", () => {
      expect(isPositive(1)).toBeTrue();
      expect(isPositive(0.001)).toBeTrue();
      expect(isPositive(Infinity)).toBeTrue();
    });
    it("should be false for zero and negative numbers", () => {
      expect(isPositive(0)).toBeFalse();
      expect(isPositive(-0)).toBeFalse();
      expect(isPositive(-1)).toBeFalse();
    });
    it("should be false for NaN", () => {
      expect(isPositive(NaN)).toBeFalse();
    });
  });

  describe("isZero", () => {
    it("should be true for zero and negative zero", () => {
      expect(isZero(0)).toBeTrue();
      expect(isZero(-0)).toBeTrue();
    });
    it("should be false for non-zero numbers", () => {
      expect(isZero(1)).toBeFalse();
      expect(isZero(-1)).toBeFalse();
      expect(isZero(0.0001)).toBeFalse();
    });
    it("should be false for NaN", () => {
      expect(isZero(NaN)).toBeFalse();
    });
  });

  describe("isBetween", () => {
    it("should be true for numbers within bounds", () => {
      expect(isBetween(5, 0, 10)).toBeTrue();
      expect(isBetween(5, 0, 10, true)).toBeTrue();
    });
    it("should include the bounds by default", () => {
      expect(isBetween(0, 0, 10)).toBeTrue();
      expect(isBetween(10, 0, 10)).toBeTrue();
    });
    it("should exclude the bounds when exclusive", () => {
      expect(isBetween(0, 0, 10, true)).toBeFalse();
      expect(isBetween(10, 0, 10, true)).toBeFalse();
    });
    it("should be false for numbers outside of bounds", () => {
      expect(isBetween(-1, 0, 10)).toBeFalse();
      expect(isBetween(11, 0, 10)).toBeFalse();
      expect(isBetween(-1, 0, 10, true)).toBeFalse();
      expect(isBetween(11, 0, 10, true)).toBeFalse();
    });
    it("should be false for NaN", () => {
      expect(isBetween(NaN, 0, 10)).toBeFalse();
      expect(isBetween(NaN, 0, 10, true)).toBeFalse();
    });
  });

  describe("isFiniteNumber", () => {
    it("should be true for finite numbers", () => {
      expect(isFiniteNumber(0)).toBeTrue();
      expect(isFiniteNumber(-0)).toBeTrue();
      expect(isFiniteNumber(42)).toBeTrue();
      expect(isFiniteNumber(-1.5)).toBeTrue();
    });
    it("should be false for NaN and infinities", () => {
      expect(isFiniteNumber(NaN)).toBeFalse();
      expect(isFiniteNumber(Infinity)).toBeFalse();
      expect(isFiniteNumber(-Infinity)).toBeFalse();
    });
    it("should be false for non-number values", () => {
      expect(isFiniteNumber("1")).toBeFalse();
      expect(isFiniteNumber(null)).toBeFalse();
      expect(isFiniteNumber(undefined)).toBeFalse();
      expect(isFiniteNumber({})).toBeFalse();
      expect(isFiniteNumber(true)).toBeFalse();
    });
  });

  describe("ensureFiniteNumber", () => {
    it("should return finite numbers as is", () => {
      expect(ensureFiniteNumber(5, 1)).toBe(5);
      expect(ensureFiniteNumber(0, 1)).toBe(0);
      expect(ensureFiniteNumber(-2.5, 1)).toBe(-2.5);
    });
    it("should return the fallback for NaN and infinities", () => {
      expect(ensureFiniteNumber(NaN, 1)).toBe(1);
      expect(ensureFiniteNumber(Infinity, 1)).toBe(1);
      expect(ensureFiniteNumber(-Infinity, 1)).toBe(1);
    });
    it("should return the fallback for non-number values", () => {
      expect(ensureFiniteNumber("5", 1)).toBe(1);
      expect(ensureFiniteNumber(null, 1)).toBe(1);
      expect(ensureFiniteNumber(undefined, 1)).toBe(1);
    });
  });

  describe("isInt", () => {
    it("should be true for integers", () => {
      expect(isInt(0)).toBeTrue();
      expect(isInt(-0)).toBeTrue();
      expect(isInt(42)).toBeTrue();
      expect(isInt(-7)).toBeTrue();
      expect(isInt(5.0)).toBeTrue();
    });
    it("should be false for fractional numbers", () => {
      expect(isInt(1.5)).toBeFalse();
      expect(isInt(-0.1)).toBeFalse();
    });
    it("should be false for NaN and infinities", () => {
      expect(isInt(NaN)).toBeFalse();
      expect(isInt(Infinity)).toBeFalse();
      expect(isInt(-Infinity)).toBeFalse();
    });
    it("should be false for non-number values", () => {
      expect(isInt("1")).toBeFalse();
      expect(isInt(null)).toBeFalse();
      expect(isInt(undefined)).toBeFalse();
      expect(isInt({})).toBeFalse();
    });
  });

  describe("ensureInt", () => {
    it("should return integers as is", () => {
      expect(ensureInt(5, 1)).toBe(5);
      expect(ensureInt(0, 1)).toBe(0);
      expect(ensureInt(-3, 1)).toBe(-3);
    });
    it("should return the fallback for fractional numbers", () => {
      expect(ensureInt(7.5, 1)).toBe(1);
      expect(ensureInt(-0.5, 1)).toBe(1);
    });
    it("should return the fallback for NaN and infinities", () => {
      expect(ensureInt(NaN, 1)).toBe(1);
      expect(ensureInt(Infinity, 1)).toBe(1);
      expect(ensureInt(-Infinity, 1)).toBe(1);
    });
    it("should return the fallback for non-number values", () => {
      expect(ensureInt("5", 1)).toBe(1);
      expect(ensureInt(null, 1)).toBe(1);
      expect(ensureInt(undefined, 1)).toBe(1);
    });
  });
});
