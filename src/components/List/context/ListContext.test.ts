import { describe, expect, mock } from "bun:test";

import { useListOptions } from "./ListContext.options";
import {
  filterData,
  filterOptionData,
  filterOptionMatch,
  type FilterOptionData,
  type IDataProvider,
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

  const mockFilterFn = mock(() => []);
  const mockRefetchFn = mock(async () => []);
  const mockFetchCountFn = mock(() => 0);

  const mockDataProvider: IDataProvider<MockItem> = {
    filter: mockFilterFn,
    data: [],
    loading: false,
    refetch: mockRefetchFn,
    fetchCount: mockFetchCountFn,
  };

  const testHookBase = testHookFactory<HookParams, HookReturn, Hook>(
    "useListOptions",
    useListOptions
  );
  const testHookWithFilters = testHookBase(mockConfig, mockDataProvider);
  // const testHookWithoutFilters = testHookBase(
  //   { ...mockConfig, filters: [] },
  //   mockDataProvider
  // );
  const testHookWithMultiFilter = testHookBase(
    {
      ...mockConfig,
      options: mockConfig.options?.map((option) => ({
        ...option,
        selected: true,
      })),
    },
    mockDataProvider
  );

  testHookWithFilters("should return a valid object", (result) => {
    expect(result).toBeObject();
    expect(result).toHaveProperty("options");
    expect(result.options).toBeObject();
    expect(result.options).toHaveProperty("data");
    expect(result.options.data).toBeArray();
    expect(result.options.data).toHaveLength(2);
    expect(result).toHaveProperty("updateOptionSelection");
    expect(result.updateOptionSelection).toBeFunction();
    expect(result).toHaveProperty("getOptionBySignature");
    expect(result.getOptionBySignature).toBeFunction();
  });

  // mockFilterFn.mockReset();
  // mockRefetchFn.mockReset();
  // mockFetchCountFn.mockReset();

  // testHookWithFilters(
  //   "should call the dataProvider.filter() method with filters",
  //   () => {
  //     expect(mockFilterFn).toHaveBeenCalledWith({
  //       operator: mockConfig.operator,
  //       filters: [
  //         {
  //           selectedOptions: [],
  //           operator: filterA.operator,
  //         },
  //       ],
  //     });
  //   }
  // );

  // mockFilterFn.mockReset();
  // mockRefetchFn.mockReset();
  // mockFetchCountFn.mockReset();

  // testHookWithoutFilters(
  //   "should call the dataProvider.filter() method without filters",
  //   () => {
  //     expect(mockFilterFn).toHaveBeenCalled();
  //   }
  // );

  testHookWithFilters("should return a function by its signature", (result) => {
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
      expect(getResult().options.data).toEqual([
        { ...optionA, selected: true },
        optionB,
      ]);
    }
  );

  testHookWithFilters(
    "should unselect an option",
    (result, _params, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false);
      rerender();
      expect(getResult().options.data).toEqual([optionA, optionB]);
    }
  );

  testHookWithMultiFilter(
    "should keep other options selected upon unselection",
    (result, _params, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false, true);
      rerender();
      expect(getResult().options.data).toEqual([
        { ...optionA, selected: false },
        { ...optionB, selected: true },
      ]);
    }
  );

  testHookWithMultiFilter(
    "should unselect other options if not multi",
    (result, _params, { rerender, getResult }) => {
      expect(result.updateOptionSelection).toBeFunction();
      result.updateOptionSelection(optionA.signature, false, false, () => true);
      rerender();
      expect(getResult().options.data).toEqual([
        { ...optionA, selected: false },
        { ...optionB, selected: false },
      ]);
    }
  );
};

describe("List Context", () => {
  testListOptions();
});
