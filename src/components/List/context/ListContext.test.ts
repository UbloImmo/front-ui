import { describe, expect, mock } from "bun:test";

import { useListOptions } from "./ListContext.options";
import {
  filterData,
  filterOptionData,
  filterOptionMatch,
  type FilterOptionData,
} from "../modules";

import { testHookFactory } from "@/tests";

import type { ListContextConfig } from "./ListContext.types";

type MockItem = {
  value: number;
  index: number;
  selected: boolean;
};

const testListOptions = () => {
  type Hook = typeof useListOptions<MockItem>;
  type HookReturn = ReturnType<Hook>;
  type HookParams = Parameters<Hook>;

  const optionA = filterOptionData(
    "A",
    filterOptionMatch<MockItem>("value", "<", 10)
  ) as FilterOptionData<MockItem>;
  const optionB = filterOptionData(
    "B",
    filterOptionMatch<MockItem>("value", ">=", 15)
  ) as FilterOptionData<MockItem>;

  const filterA = filterData<MockItem>("A", [optionA, optionB]);

  const mockConfig: Pick<
    ListContextConfig<MockItem>,
    "options" | "filters" | "operator"
  > = {
    options: [optionA, optionB],
    filters: [filterA],
    operator: "AND",
  };

  const mockFilterFn = mock(() => {});

  const testHookBase = testHookFactory<HookParams, HookReturn, Hook>(
    "useListOptions",
    useListOptions
  );
  const testHookWithFilters = testHookBase(mockConfig, mockFilterFn);
  const testHookWithoutFilters = testHookBase(
    { ...mockConfig, filters: [] },
    mockFilterFn
  );
  const testHookWithMultiFilter = testHookBase(
    {
      ...mockConfig,
      options: mockConfig.options?.map((option) => ({
        ...option,
        selected: true,
      })),
    },
    mockFilterFn
  );

  testHookWithFilters(
    "should return a valid object",
    (result, _, { getResult, rerender }) => {
      rerender();
      result = getResult();
      expect(result).toBeObject();
      expect(result).toHaveProperty("optionsMap");
      expect(result.optionsMap).toBeObject();
      expect(result.optionsMap.size).toEqual(2);
      expect(result).toHaveProperty("updateOptionSelection");
      expect(result.updateOptionSelection).toBeFunction();
      expect(result).toHaveProperty("getOptionBySignature");
      expect(result.getOptionBySignature).toBeFunction();
    }
  );

  testHookWithFilters("should return an option by its signature", (result) => {
    expect(result.getOptionBySignature).toBeFunction();
    expect(result.getOptionBySignature(optionA.signature)).toEqual(optionA);
    expect(result.getOptionBySignature(optionB.signature)).toEqual(optionB);
  });

  testHookWithFilters(
    "should return null if the option is not found",
    (result) => {
      expect(result.getOptionBySignature).toBeFunction();
      expect(result.getOptionBySignature("unknown")).toBeNull();
    }
  );

  testHookWithFilters(
    "should return null and not throw if no valid option signature is provided",
    (result) => {
      expect(result.getOptionBySignature).toBeFunction();
      expect(result.getOptionBySignature).not.toThrow();
      // @ts-expect-error needed to test the function
      expect(result.getOptionBySignature(null)).toBeNull();
      // @ts-expect-error needed to test the function
      expect(result.getOptionBySignature()).toBeNull();
      // @ts-expect-error needed to test the function
      expect(result.getOptionBySignature(undefined)).toBeNull();
      // @ts-expect-error needed to test the function
      expect(result.getOptionBySignature(1)).toBeNull();
    }
  );

  testHookWithFilters(
    "should select an option",
    (result, _params, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, true);
      rerender();
      expect(getResult().selectedOptionSignatures).toEqual(
        new Set([optionA.signature])
      );
    }
  );

  testHookWithFilters(
    "should unselect an option",
    (result, _params, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false);
      rerender();
      expect(getResult().selectedOptionSignatures).toEqual(new Set());
    }
  );

  testHookWithMultiFilter(
    "should keep other options selected upon unselection",
    (result, _params, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false, {
        multi: true,
        optionSignatures: new Set([optionA.signature, optionB.signature]),
      });
      rerender();
      expect(getResult().selectedOptionSignatures).toEqual(
        new Set([optionB.signature])
      );
    }
  );

  testHookWithMultiFilter(
    "should unselect other options if not multi",
    (result, _params, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false, {
        multi: false,
        optionSignatures: new Set([optionA.signature, optionB.signature]),
      });
      rerender();
      expect(getResult().selectedOptionSignatures).toEqual(new Set());
    }
  );

  mockFilterFn.mockClear();

  testHookWithMultiFilter(
    "should call dataProvider.filter() when applying options",
    (result, _, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false, {
        multi: false,
        optionSignatures: new Set([optionA.signature, optionB.signature]),
      });
      rerender();
      expect(result.applyOptions).toBeFunction();
      getResult().applyOptions();
      expect(mockFilterFn).toHaveBeenCalled();
    }
  );

  testHookWithoutFilters(
    "should still call dataProvider.filter() when applying options without filters",
    (result, _, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false);
      rerender();
      expect(result.applyOptions).toBeFunction();
      getResult().applyOptions([]);
      expect(mockFilterFn).toHaveBeenCalled();
    }
  );
};

describe("List Context", () => {
  testListOptions();
});
