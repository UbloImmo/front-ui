import { describe, it, expect } from "bun:test";

import { filterPresetData } from "./FilterPreset.data";
import { computeFilterPresetSignature } from "./FilterPreset.utils";

import type { FilterPresetConfig } from "./FilterPreset.types";

describe("FilterPreset module", () => {
  describe("utils", () => {
    describe("computeFilterPresetSignature", () => {
      it("should be a function", () => {
        expect(computeFilterPresetSignature).toBeFunction();
      });
      it("should throw if label is not a string", () => {
        // @ts-expect-error - label is required
        expect(() => computeFilterPresetSignature()).toThrow();
      });
      it("should throw if option signatures is not an array", () => {
        // @ts-expect-error - option signatures should be an array
        expect(() => computeFilterPresetSignature("label", null)).toThrow();
        // @ts-expect-error - option signatures is required
        expect(() => computeFilterPresetSignature("label")).toThrow();
      });
      it("should throw if operator is not a string", () => {
        // @ts-expect-error - operator is required
        expect(() => computeFilterPresetSignature("label", [])).toThrow();
        // @ts-expect-error - operator should be a string
        expect(() => computeFilterPresetSignature("label", [], 12)).toThrow();
      });
      it("should only return the label if option signatures is an empty array", () => {
        const label = "label";
        const signature = computeFilterPresetSignature(label, [], "AND");
        expect(signature).toBe(label);
      });
      it("should return a valid signature if provided with valid arguments", () => {
        const label = "label";
        const optionSignatures = ["option-signature-1", "option-signature-2"];
        const operator = "AND";
        const signature = computeFilterPresetSignature(
          label,
          optionSignatures,
          operator
        );
        expect(signature).toBe("label-option-signature-1ANDoption-signature-2");
      });
    });
  });

  describe("filterPresetData", () => {
    it("should be a function", () => {
      expect(filterPresetData).toBeFunction();
    });
    it("should throw if label is not a string", () => {
      // @ts-expect-error - label is required
      expect(() => filterPresetData()).toThrow();
    });
    it("should throw if optionsOrSignatures is not an array", () => {
      // @ts-expect-error - optionsOrSignatures is required
      expect(() => filterPresetData("label", {})).toThrow();
    });
    it("should throw if config is not an object", () => {
      // @ts-expect-error - config should be an object
      expect(() => filterPresetData("label", [], "config string")).toThrow();
    });
    it("should throw if loading is not a boolean", () => {
      expect(() =>
        // @ts-expect-error - loading is should be a boolean
        filterPresetData("label", [], {}, "loading string")
      ).toThrow();
    });
    it("should return a valid filter preset data if provided with valid arguments", () => {
      const label = "label";
      const optionsOrSignatures = ["option-signature-1", "option-signature-2"];
      const config: Required<FilterPresetConfig> = {
        color: "error",
        operator: "OR",
        disabled: false,
        hidden: false,
        exclusive: false,
        id: "id",
        testId: "testId",
      };
      const loading = false;
      const filterPreset = filterPresetData(
        label,
        optionsOrSignatures,
        config,
        loading
      );
      expect(filterPreset).toBeObject();
      expect(filterPreset.label).toBe(label);
      expect(filterPreset.optionSignatures).toEqual(optionsOrSignatures);
      expect(filterPreset.loading).toBe(loading);
      expect(filterPreset.color).toBe(config.color);
      expect(filterPreset.paletteColor).toBe("error-base");
      expect(filterPreset.colorKey).toBe("error");
      expect(filterPreset.operator).toBe(config.operator);
      expect(filterPreset.disabled).toBe(config.disabled);
      expect(filterPreset.hidden).toBe(config.hidden);
      expect(filterPreset.exclusive).toBe(config.exclusive);
      expect(filterPreset.id).toBe(config.id);
      expect(filterPreset.testId).toBe(config.testId);
    });
  });
});
