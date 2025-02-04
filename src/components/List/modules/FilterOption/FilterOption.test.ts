import { objectEntries } from "@ubloimmo/front-util";
import { describe, it, expect, mock } from "bun:test";

import {
  defaultFilterOptionBehavior,
  defaultFilterOptionVisualData,
  filterOptionData,
  filterOptionMatch,
} from "./FilterOption.data";
import {
  CLEAR_FILTER_OPTION_SIGNATURE,
  useClearFilterOption,
} from "./FilterOption.hook";
import {
  computeFilterOptionMatchSignature,
  computeFilterOptionSignature,
  extractFilterOptionSignature,
  invertMatchComparison,
  isFilterOptionData,
} from "./FilterOption.utils";
import { BooleanOperators, ComparisonOperators } from "../../List.enums";
import { filterData } from "../Filter/Filter.data";

import { testHookFactory } from "@/tests";

import type {
  FilterOptionConfig,
  FilterOptionMatch,
} from "./FilterOption.types";
import type { Filter } from "../Filter";

type MockData = {
  value: number;
};

const label = "Filter option";
const match: FilterOptionMatch<MockData> = {
  property: "value",
  comparison: ComparisonOperators.eq,
  value: 1,
};
const operator = BooleanOperators.AND;

describe("FilterOption module", () => {
  describe("utils", () => {
    describe("computeFilterOptionMatchSignature", () => {
      it("should be a function", () => {
        expect(computeFilterOptionMatchSignature).toBeFunction();
      });
      it("should throw if match is not provided", () => {
        // @ts-expect-error - match is required
        expect(() => computeFilterOptionMatchSignature()).toThrow();
      });
      it("should throw if match property is not provided", () => {
        // @ts-expect-error - match property is required
        expect(() => computeFilterOptionMatchSignature({})).toThrow();
      });
      it("should throw if match comparison is not provided", () => {
        expect(() =>
          // @ts-expect-error - match comparison is required
          computeFilterOptionMatchSignature({ property: "value" })
        ).toThrow();
      });
      it("should throw if match value is not provided", () => {
        expect(() =>
          // @ts-expect-error - match value is required
          computeFilterOptionMatchSignature({
            property: "value",
            comparison: ComparisonOperators.eq,
          })
        ).toThrow();
      });
      it("should throw if match value is an object", () => {
        expect(() =>
          computeFilterOptionMatchSignature({
            property: "value",
            comparison: ComparisonOperators.eq,
            // @ts-expect-error - value must be a primitive
            value: {},
          })
        ).toThrow();
      });

      it("should compute a signature when all match properties are provided", () => {
        const signature = computeFilterOptionMatchSignature(match);
        expect(signature).toBeString();
        expect(signature).toBe(
          match.property + "_" + match.comparison + "_" + match.value
        );
      });
    });

    describe("computeFilterOptionSignature", () => {
      it("should be a function", () => {
        expect(computeFilterOptionSignature).toBeFunction();
      });

      it("should throw if label is not a string or missing", () => {
        // @ts-expect-error - label is required
        expect(() => computeFilterOptionSignature({ label: 1 })).toThrow();
        // @ts-expect-error - label is required
        expect(() => computeFilterOptionSignature({})).toThrow();
      });
      it("should throw if operator is not provided", () => {
        expect(() =>
          // @ts-expect-error - operator is required
          computeFilterOptionSignature({ label, matches: [match] })
        ).toThrow();
      });
      it("should throw if matches is not provided", () => {
        expect(() =>
          // @ts-expect-error - matches is required
          computeFilterOptionSignature({ label, operator })
        ).toThrow();
      });
      it("should throw if matches is not an array", () => {
        expect(() =>
          // @ts-expect-error - matches is required
          computeFilterOptionSignature({ label, matches: match })
        ).toThrow();
      });
      it("should compute a signature with an empty match array", () => {
        const signature = computeFilterOptionSignature({
          label,
          matches: [],
          operator,
        });
        expect(signature).toBeString();
        expect(signature).toBe(label);
      });
      it("should compute a signature with a match", () => {
        const signature = computeFilterOptionSignature({
          label,
          matches: [match],
          operator,
        });
        expect(signature).toBeString();
        expect(signature).toBe(
          `${label}-${match.property}_${match.comparison}_${match.value}`
        );
      });
      it("should compute a signature with multiple matches", () => {
        const signature = computeFilterOptionSignature({
          label,
          matches: [match, match],
          operator,
        });
        expect(signature).toBeString();
        expect(signature).toBe(
          `${label}-${match.property}_${match.comparison}_${match.value}${operator}${match.property}_${match.comparison}_${match.value}`
        );
      });
    });

    describe("invertMatchComparison", () => {
      it("should be a function", () => {
        expect(invertMatchComparison).toBeFunction();
      });
      it("should throw if comparison is not provided", () => {
        // @ts-expect-error - comparison is required
        expect(() => invertMatchComparison()).toThrow();
      });
      it("should return the inverse comparison operator", () => {
        expect(invertMatchComparison(ComparisonOperators.eq)).toBe(
          ComparisonOperators.neq
        );
        expect(invertMatchComparison(ComparisonOperators.neq)).toBe(
          ComparisonOperators.eq
        );
        expect(invertMatchComparison(ComparisonOperators.gt)).toBe(
          ComparisonOperators.lt
        );
        expect(invertMatchComparison(ComparisonOperators.lt)).toBe(
          ComparisonOperators.gt
        );
        expect(invertMatchComparison(ComparisonOperators.gte)).toBe(
          ComparisonOperators.lte
        );
        expect(invertMatchComparison(ComparisonOperators.lte)).toBe(
          ComparisonOperators.gte
        );
      });
    });

    describe("isFilterOptionData", () => {
      it("should be a function", () => {
        expect(isFilterOptionData).toBeFunction();
      });
      it("should return false if the input is a not a filterOptionData object", () => {
        // @ts-expect-error - input is not a filterOptionData object
        expect(isFilterOptionData(null)).toBe(false);
        // @ts-expect-error - input is not a filterOptionData object
        expect(isFilterOptionData(undefined)).toBe(false);
        // @ts-expect-error - input is not a filterOptionData object
        expect(isFilterOptionData({})).toBe(false);
        // @ts-expect-error - input is not a filterOptionData object
        expect(isFilterOptionData({ signature: "test" })).toBe(false);
      });
      it("should return false if provided with a signature", () => {
        expect(isFilterOptionData("test")).toBe(false);
      });
      it("should return true if the input is a filterOptionData object", () => {
        expect(isFilterOptionData(filterOptionData(label, [match]))).toBe(true);
      });
    });

    describe("extractFilterOptionSignature", () => {
      it("should be a function", () => {
        expect(extractFilterOptionSignature).toBeFunction();
      });
      it("should not throw if the input is valid", () => {
        expect(() =>
          extractFilterOptionSignature("test signature")
        ).not.toThrow();
        expect(() =>
          extractFilterOptionSignature(filterOptionData(label, [match]))
        ).not.toThrow();
      });
      it("should throw if the input is not a filterOptionData object or a signature", () => {
        // @ts-expect-error - input is not a filterOptionData object or a signature
        expect(() => extractFilterOptionSignature(null)).toThrow();
        // @ts-expect-error - input is not a filterOptionData object or a signature
        expect(() => extractFilterOptionSignature(undefined)).toThrow();
        // @ts-expect-error - input is not a filterOptionData object or a signature
        expect(() => extractFilterOptionSignature({})).toThrow();
      });
      it("should return the signature if the input is a filterOptionData object", () => {
        const data = filterOptionData(label, [match]);
        expect(extractFilterOptionSignature(data)).toBe(data.signature);
      });
      it("should return the signature if provided with it", () => {
        const signature = computeFilterOptionSignature({
          label,
          matches: [match, match],
          operator: "AND",
        });
        expect(extractFilterOptionSignature(signature)).toBe(signature);
      });
    });
  });

  describe("data", () => {
    describe("filterOptionMatch", () => {
      it("should be a function", () => {
        expect(filterOptionMatch).toBeFunction();
      });
      it("should throw if provided with an invalid number of arguments", () => {
        // @ts-expect-error - invalid number of arguments
        expect(() => filterOptionMatch()).toThrow();
        // @ts-expect-error - invalid number of arguments
        expect(() => filterOptionMatch<MockData>("value", "=")).toThrow();
      });
      it("should return the match if provided with a single match", () => {
        expect(filterOptionMatch(match)).toBe(match);
      });
      it("should return the match if provided with a property, comparison operator and value", () => {
        expect(
          filterOptionMatch(match.property, match.comparison, match.value)
        ).toEqual(match);
      });
    });

    describe("filterOptionData", () => {
      it("should be a function", () => {
        expect(filterOptionData).toBeFunction();
      });
      it("should throw if label is not a string", () => {
        // @ts-expect-error - label is not a string
        expect(() => filterOptionData(1, [match])).toThrow();
      });
      it("should throw if matchOrMatches is not provided", () => {
        // @ts-expect-error - matchOrMatches is not provided
        expect(() => filterOptionData(label)).toThrow();
      });
      it("should return a filterOptionData object if provided with a label, matchOrMatches and config", () => {
        const data = filterOptionData(label, match);
        expect(data).toBeObject();
        expect(data.label).toBe(label);
        expect(data.matches).toEqual([match]);
      });
      it("should convert a single match to an array", () => {
        const data = filterOptionData(label, match);
        expect(data.matches).toEqual([match]);
        expect(data.matches[0]).toEqual(match);
      });
      it("should handle multiple matches", () => {
        const data = filterOptionData(label, [match, match]);
        expect(data.matches).toEqual([match, match]);
        expect(data.matches[0]).toEqual(match);
        expect(data.matches[1]).toEqual(match);
      });
      it("should include default operator, behavior and visual data if no config is provided", () => {
        const data = filterOptionData(label, match);
        objectEntries(defaultFilterOptionBehavior).forEach(([key, value]) => {
          expect(data[key]).toBe(value);
        });
        objectEntries(defaultFilterOptionVisualData).forEach(([key, value]) => {
          expect(data[key]).toBe(key === "label" ? label : value);
        });
      });
      it("should respect the provided config", () => {
        const config: Required<FilterOptionConfig> = {
          operator: BooleanOperators.OR,
          disabled: true,
          fixed: true,
          color: "primary",
          icon: "Alarm",
          hidden: true,
          default: true,
          initial: true,
        };
        const data = filterOptionData(label, match, config);
        expect(data.operator).toBe(config.operator);
        expect(data.disabled).toBe(config.disabled);
        expect(data.fixed).toBe(config.fixed);
        expect(data.color).toBe(config.color);
        expect(data.icon).toBe(config.icon);
        expect(data.hidden).toBe(config.hidden);
        expect(data.default).toBe(config.default);
        expect(data.initial).toBe(config.initial);
      });
      it("should respect disabled and fixed behavior", () => {
        const data = filterOptionData(label, match, {
          disabled: true,
          fixed: true,
        });
        expect(data.disabled).toBe(true);
        expect(data.fixed).toBe(true);
        expect(data.selected).toBe(true);
      });
    });
  });
  describe("hook", () => {
    type Hook = typeof useClearFilterOption;
    const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
      "useClearFilterOption",
      useClearFilterOption
    );

    const mockSelectAll = mock(() => {});
    const mockClear = mock(() => {});
    const mockFilterData = filterData<MockData>("filter", []);
    const filter: Filter<MockData> = {
      ...mockFilterData,
      active: false,
      options: [],
      selectAll: mockSelectAll,
      clear: mockClear,
      selectedOptions: [],
      optionDividers: [],
    };

    const testWithFilter = testHook(filter);
    testWithFilter("should return an clear filter option ", (result) => {
      expect(result).toBeObject();
      expect(result.signature).toBe(CLEAR_FILTER_OPTION_SIGNATURE);
      expect(result.colorKey).toBe("gray");
      expect(result.icon).toBe("CircleDashed");
    });
    testWithFilter("should clear the filter when selected", (result) => {
      expect(result.select).toBeFunction();
      expect(mockClear).not.toHaveBeenCalled();
      result.select();
      expect(mockClear).toHaveBeenCalled();
    });
    testWithFilter("should have a noop unselect method", (result) => {
      expect(result.unselect).toBeFunction();
      expect(result.unselect).not.toThrow();
    });
    testHook({
      ...filter,
      allowCompleteSelection: true,
    })(
      "should select all options when allowCompleteSelection is true",
      (result) => {
        expect(result.select).toBeFunction();
        expect(mockSelectAll).not.toHaveBeenCalled();
        result.select();
        expect(mockSelectAll).toHaveBeenCalled();
      }
    );
  });
});
