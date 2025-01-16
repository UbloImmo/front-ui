import { describe, expect, it, mock } from "bun:test";

import { useStaticDataProvider } from "./StaticDataProvider.hook";
import {
  arrayComparison,
  canCompare,
  compareItemValue,
  filterItems,
} from "./StaticDataProvider.utils";
import { mockListData, type MockListItem } from "../DataProvider.test.mock";

import { testHookFactory } from "@/tests";
import { arrayOf } from "@utils";

const {
  item,
  items,
  matches,
  options,
  filterPresets,
  filters,
  selectOption,
  selectFilter,
  selectFilterPreset,
} = mockListData;

describe("StaticDataProvider", () => {
  describe("utils", () => {
    describe("canCompare", () => {
      it("should be a function", () => {
        expect(canCompare).toBeFunction();
      });
      it("should never throw", () => {
        expect(() => canCompare(null)).not.toThrow();
        expect(canCompare).not.toThrow();
      });
      it("should return true if the value is comparable", () => {
        expect(canCompare(1)).toBe(true);
        expect(canCompare("string")).toBe(true);
        expect(canCompare(new Date())).toBe(true);
        expect(canCompare({})).toBe(true);
      });
      it("should return false if the value is not comparable", () => {
        expect(canCompare(null)).toBe(false);
        expect(canCompare(undefined)).toBe(false);
      });
    });

    describe("compareItemValue", () => {
      it("should be a function", () => {
        expect(compareItemValue).toBeFunction();
      });
      it("should never throw", () => {
        expect(compareItemValue).not.toThrow();
      });
      it("should return true if the item matches the criteria", () => {
        expect(compareItemValue(item, matches.isLessThan20)).toBe(true);
        expect(compareItemValue(item, matches.isMoreThan5)).toBe(true);
        expect(compareItemValue(item, matches.isEqualTo10)).toBe(true);
        expect(compareItemValue(item, matches.isNotEqualToFalse)).toBe(true);
        expect(compareItemValue(item, matches.isEqualToString)).toBe(true);
        expect(compareItemValue(item, matches.isBeforeNow)).toBe(true);
        expect(compareItemValue(item, matches.isEqualToFalse)).toBe(true);
        expect(compareItemValue(item, matches.isLessOrEqualTo420)).toBe(true);
        expect(compareItemValue(item, matches.isMoreOrEqualTo420)).toBe(true);
        expect(compareItemValue(item, matches.containsTri)).toBe(true);
        expect(compareItemValue(item, matches.startsWithStr)).toBe(true);
        expect(compareItemValue(item, matches.endsWithNg)).toBe(true);
      });
    });

    describe("arrayComparison", () => {
      it("should be a function", () => {
        expect(arrayComparison).toBeFunction();
      });
      it("should never throw", () => {
        expect(arrayComparison).not.toThrow();
      });
      it("should return the correct array method name", () => {
        expect(arrayComparison("AND")).toBe("every");
        expect(arrayComparison("OR")).toBe("some");
      });
      it("should default to 'some'", () => {
        // @ts-expect-error - we are testing the default case
        expect(arrayComparison()).toBe("some");
        // @ts-expect-error - we are testing the default case
        expect(arrayComparison("something else")).toBe("some");
      });
    });

    describe("filterItems", () => {
      it("should be a function", () => {
        expect(filterItems).toBeFunction();
      });

      it("should never throw", () => {
        expect(filterItems).not.toThrow();
      });
      it("should always return an array", () => {
        // @ts-expect-error - we are testing the default case
        expect(filterItems([], {})).toBeArray();
        // @ts-expect-error - we are testing the default case
        expect(filterItems([], {})).toHaveLength(0);
      });
      it("should only take into account selected options", () => {
        expect(
          filterItems(items, { option: options.alwaysInvalidOption })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            option: selectOption(options.alwaysInvalidOption),
          })
        ).toHaveLength(0);
      });
      it("should return all items if no filter is provided", () => {
        // @ts-expect-error - we are testing the default case
        expect(filterItems(items, {})).toHaveLength(3);
      });
      it("should filter by a single option", () => {
        expect(
          filterItems(items, { option: selectOption(options.numberMoreThan5) })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            option: selectOption(options.alwaysInvalidOption),
          })
        ).toHaveLength(0);
      });
      it("should filter by multiple options", () => {
        expect(
          filterItems(items, {
            options: [
              selectOption(options.numberMoreThan5),
              options.alwaysInvalidOption,
            ],
            operator: "AND",
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            options: [
              selectOption(options.numberMoreThan5),
              selectOption(options.alwaysInvalidOption),
            ],
            operator: "AND",
          })
        ).toHaveLength(0);
        expect(
          filterItems(items, {
            options: [
              selectOption(options.numberMoreThan5),
              selectOption(options.alwaysInvalidOption),
            ],
            operator: "OR",
          })
        ).toHaveLength(3);
      });
      it("should filter by a single filter", () => {
        expect(
          filterItems(items, { filter: selectFilter(filters.filter1) })
        ).toHaveLength(3);
        expect(
          filterItems(items, { filter: filters.invalidFilter })
        ).toHaveLength(3);
        expect(
          filterItems(items, { filter: selectFilter(filters.invalidFilter) })
        ).toHaveLength(0);
      });
      it("should filter by multiple filters", () => {
        expect(
          filterItems(items, {
            filters: [
              selectFilter(filters.filter1),
              selectFilter(filters.filter2),
            ],
            operator: "AND",
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filters: [
              selectFilter(filters.filter1),
              selectFilter(filters.invalidFilter),
            ],
            operator: "AND",
          })
        ).toHaveLength(0);
        expect(
          filterItems(items, {
            filters: [
              selectFilter(filters.filter2),
              selectFilter(filters.invalidFilter),
            ],
            operator: "OR",
          })
        ).toHaveLength(3);
      });
      it("should filter by a single filter preset", () => {
        expect(
          filterItems(items, {
            filterPreset: selectFilterPreset(filterPresets.filterPreset1),
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filterPreset: filterPresets.invalidFilterPreset,
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filterPreset: selectFilterPreset(filterPresets.invalidFilterPreset),
          })
        ).toHaveLength(0);
      });
      it("should filter by multiple filter presets", () => {
        expect(
          filterItems(items, {
            filterPresets: [
              selectFilterPreset(filterPresets.filterPreset1),
              selectFilterPreset(filterPresets.filterPreset2),
            ],
            operator: "AND",
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filterPresets: [
              selectFilterPreset(filterPresets.filterPreset1),
              selectFilterPreset(filterPresets.invalidFilterPreset),
            ],
            operator: "AND",
          })
        ).toHaveLength(0);
        expect(
          filterItems(items, {
            filterPresets: [
              selectFilterPreset(filterPresets.filterPreset2),
              selectFilterPreset(filterPresets.invalidFilterPreset),
            ],
            operator: "OR",
          })
        ).toHaveLength(3);
      });
    });
  });

  type Hook = typeof useStaticDataProvider<MockListItem>;
  type HookParams = Parameters<Hook>;
  type HookReturn = ReturnType<Hook>;
  const testHook = testHookFactory<HookParams, HookReturn, Hook>(
    "useStaticDataProvider",
    useStaticDataProvider<MockListItem>
  );

  const setData = mock((_data: MockListItem[]) => {});
  const initialData: MockListItem[] = arrayOf(2, () => mockListData.item);

  const testWithInitialData = testHook(initialData, setData);
  testWithInitialData(
    "should return a valid object containg data and all methods",
    (result) => {
      expect(result).toBeObject();
      expect(result.data).toBeArray();
      expect(result.loading).toBeBoolean();
      expect(result.refetch).toBeFunction();
      expect(result.filter).toBeFunction();
      expect(result.fetchCount).toBeFunction();
    }
  );

  setData.mockReset();
  testWithInitialData("should call setData on initial load", () => {
    expect(setData).toHaveBeenCalledWith(initialData);
  });

  testWithInitialData("should filter and call setData", async (result) => {
    expect(result.filter).toBeFunction();
    setData.mockClear();
    result.filter({
      option: mockListData.selectOption(
        mockListData.options.alwaysInvalidOption
      ),
    });
    // rerender();
    expect(setData).toHaveBeenCalled();
  });

  testWithInitialData(
    "should fetch count without calling setData",
    async (result) => {
      expect(result.fetchCount).toBeFunction();
      setData.mockClear();
      const count = await result.fetchCount({
        option: mockListData.selectOption(
          mockListData.options.alwaysInvalidOption
        ),
      });
      expect(setData).not.toHaveBeenCalled();
      expect(count).toEqual(0);
    }
  );
});
