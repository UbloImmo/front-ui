import { describe, it, expect } from "bun:test";

import {
  computeFilterDataSignature,
  separateOptionsAndDividers,
} from "./Filter.utils";
import { filterOptionData, filterOptionMatch } from "../FilterOption";
import { filterOptionDividerData } from "../FilterOptionDivider";
import { filterData } from "./Filter.data";

type MockData = {
  value: number;
};

describe("Filter module", () => {
  describe("utils", () => {
    describe("computeFilterDataSignature", () => {
      it("should be a function", () => {
        expect(computeFilterDataSignature).toBeFunction();
      });
      it("should throw if label is not provided", () => {
        // @ts-expect-error - label is required
        expect(() => computeFilterDataSignature()).toThrow();
      });
      it("should throw if option signatures is not a set", () => {
        // @ts-expect-error - option signatures is required
        expect(() => computeFilterDataSignature("label", null)).toThrow();
        // @ts-expect-error - option signatures is required
        expect(() => computeFilterDataSignature("label")).toThrow();
      });
      it("should throw if operator is not provided", () => {
        // @ts-expect-error - operator is required
        expect(() => computeFilterDataSignature("label", new Set())).toThrow();
      });
      it("should return the label if option signatures is an empty array", () => {
        expect(computeFilterDataSignature("label", new Set(), "AND")).toBe(
          "label"
        );
      });
      it("should return a signature if provided with valid arguments", () => {
        expect(
          computeFilterDataSignature(
            "label",
            new Set(["test-option-signature-1", "test-option-signature-2"]),
            "AND"
          )
        ).toBe("label-test-option-signature-1ANDtest-option-signature-2");
        expect(
          computeFilterDataSignature(
            "label",
            new Set(["test-option-signature-1"]),
            "AND"
          )
        ).toBe("label-test-option-signature-1");
      });
    });

    describe("separateOptionsAndDividers", () => {
      it("should be a function", () => {
        expect(separateOptionsAndDividers).toBeFunction();
      });
      it("should never throw", () => {
        // @ts-expect-error - optionsOrDividers is required
        expect(() => separateOptionsAndDividers()).not.toThrow();
        expect(() => separateOptionsAndDividers([])).not.toThrow();
        // @ts-expect-error - optionsOrDividers should be an array
        expect(() => separateOptionsAndDividers(undefined)).not.toThrow();
      });
      it("should return a valid object", () => {
        const result = separateOptionsAndDividers([]);
        expect(result).toEqual({
          optionSignatures: new Set(),
          optionDividers: [],
        });
      });
      const option1 = filterOptionData<MockData>(
        "option 1",
        filterOptionMatch("value", "<", 32)
      );
      const option2 = filterOptionData<MockData>(
        "option 2",
        filterOptionMatch("value", ">=", 10)
      );
      it("sould extract signatures from options", () => {
        const { optionDividers, optionSignatures } = separateOptionsAndDividers(
          [option1, option2]
        );
        expect(optionSignatures).toEqual(
          new Set([option1.signature, option2.signature])
        );
        expect(optionDividers).toEqual([]);
      });
      it("should keep signatures as is", () => {
        const { optionSignatures } = separateOptionsAndDividers([
          option1.signature,
          option2.signature,
        ]);
        expect(optionSignatures).toEqual(
          new Set([option1.signature, option2.signature])
        );
      });
      const divider = filterOptionDividerData("divider");
      it("should extract only valid dividers ", () => {
        const { optionDividers } = separateOptionsAndDividers([
          option1,
          divider,
          option2,
          divider,
        ]);
        expect(optionDividers).toEqual([
          {
            ...divider,
            beforeSignature: option2.signature,
          },
        ]);
        const { optionDividers: noValidDividers } = separateOptionsAndDividers([
          option1,
          option2,
          divider,
          divider,
          divider,
        ]);
        expect(noValidDividers).toEqual([]);
      });
    });
  });

  describe("filterData", () => {
    it("should be a function", () => {
      expect(filterData).toBeFunction();
    });
    it("should never throw", () => {
      expect(filterData).not.toThrow();
    });
    it("should return a valid filter data object", () => {
      const label = "filter";
      const option1 = filterOptionData<MockData>(
        "option 1",
        filterOptionMatch("value", "<", 32)
      );
      const option2 = filterOptionData<MockData>(
        "option 2",
        filterOptionMatch("value", ">=", 10)
      );
      const divider = filterOptionDividerData("divider");
      const optionOrSignatures = [option1, divider, option2.signature];
      const filter = filterData("filter", optionOrSignatures);
      expect(filter).toBeObject();
      expect(filter.label).toBe(label);
      expect(filter.optionSignatures).toEqual(
        new Set([option1.signature, option2.signature])
      );
      expect(filter.optionDividers).toBeArray();
      expect(filter.optionDividers).toHaveLength(1);
      expect(filter.optionDividers[0]).toEqual({
        ...divider,
        beforeSignature: option2.signature,
      });
    });
  });
});
