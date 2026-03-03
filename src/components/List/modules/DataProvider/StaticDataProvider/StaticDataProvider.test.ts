import { Nullish } from "@ubloimmo/front-util";
import { describe, expect, it, mock } from "bun:test";

import { useStaticDataProvider } from "./StaticDataProvider.hook";
import {
  arrayComparison,
  canCompare,
  compareItemValue,
  filterItems,
  sortItems,
} from "./StaticDataProvider.utils";
import { SortPayload } from "../../Sort";
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
          filterItems(items, {
            options: [options.alwaysInvalidOption],
            selectedOptions: [],
            search: null,
            activeSorts: null,
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            options: [selectOption(options.alwaysInvalidOption)],
            selectedOptions: [selectOption(options.alwaysInvalidOption)],
            search: null,
            activeSorts: null,
          })
        ).toHaveLength(0);
      });
      it("should return all items if no filter is provided", () => {
        // @ts-expect-error - we are testing the default case
        expect(filterItems(items, {})).toHaveLength(3);
      });
      // it("should filter by a single option", () => {
      //   expect(
      //     filterItems(items, {
      //       options: [selectOption(options.numberMoreThan5)],
      //       selectedOptions: [selectOption(options.numberMoreThan5)],
      //       search: null,
      //     })
      //   ).toHaveLength(3);
      //   expect(
      //     filterItems(items, {
      //       option: selectOption(options.alwaysInvalidOption),
      //       selectedOptions: [selectOption(options.alwaysInvalidOption)],
      //       search: null,
      //     })
      //   ).toHaveLength(0);
      // });
      it("should filter by multiple options", () => {
        expect(
          filterItems(items, {
            options: [
              selectOption(options.numberMoreThan5),
              options.alwaysInvalidOption,
            ],
            selectedOptions: [selectOption(options.numberMoreThan5)],
            search: null,
            operator: "AND",
            activeSorts: null,
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            options: [
              selectOption(options.numberMoreThan5),
              selectOption(options.alwaysInvalidOption),
            ],
            selectedOptions: [
              selectOption(options.numberMoreThan5),
              selectOption(options.alwaysInvalidOption),
            ],
            search: null,
            operator: "AND",
            activeSorts: null,
          })
        ).toHaveLength(0);
        expect(
          filterItems(items, {
            options: [
              selectOption(options.numberMoreThan5),
              selectOption(options.alwaysInvalidOption),
            ],
            selectedOptions: [
              selectOption(options.numberMoreThan5),
              selectOption(options.alwaysInvalidOption),
            ],
            search: null,
            operator: "OR",
            activeSorts: null,
          })
        ).toHaveLength(3);
      });
      // it("should filter by a single filter", () => {
      //   expect(
      //     filterItems(items, {
      //       filter: selectFilter(filters.filter1),
      //       selectedOptions: selectFilter(filters.filter1).selectedOptions,
      //       search: null,
      //     })
      //   ).toHaveLength(3);
      //   expect(
      //     filterItems(items, {
      //       filter: filters.invalidFilter,
      //       selectedOptions: [],
      //       search: null,
      //     })
      //   ).toHaveLength(3);
      //   expect(
      //     filterItems(items, {
      //       filter: selectFilter(filters.invalidFilter),
      //       selectedOptions: selectFilter(filters.invalidFilter)
      //         .selectedOptions,
      //       search: null,
      //     })
      //   ).toHaveLength(0);
      // });
      it("should filter by multiple filters", () => {
        expect(
          filterItems(items, {
            filters: [
              selectFilter(filters.filter1),
              selectFilter(filters.filter2),
            ],
            selectedOptions: [
              ...selectFilter(filters.filter1).selectedOptions,
              ...selectFilter(filters.filter2).selectedOptions,
            ],
            search: null,
            operator: "AND",
            activeSorts: null,
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filters: [
              selectFilter(filters.filter1),
              selectFilter(filters.invalidFilter),
            ],
            selectedOptions: [
              ...selectFilter(filters.filter1).selectedOptions,
              ...selectFilter(filters.invalidFilter).selectedOptions,
            ],
            search: null,
            operator: "AND",
            activeSorts: null,
          })
        ).toHaveLength(0);
        expect(
          filterItems(items, {
            filters: [
              selectFilter(filters.filter2),
              selectFilter(filters.invalidFilter),
            ],
            selectedOptions: [
              ...selectFilter(filters.filter2).selectedOptions,
              ...selectFilter(filters.invalidFilter).selectedOptions,
            ],
            search: null,
            operator: "OR",
            activeSorts: null,
          })
        ).toHaveLength(3);
      });
      it("should filter by a single filter preset", () => {
        expect(
          filterItems(items, {
            filterPresets: [selectFilterPreset(filterPresets.filterPreset1)],
            selectedOptions: selectFilterPreset(filterPresets.filterPreset1)
              .options,
            search: null,
            activeSorts: null,
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filterPresets: [filterPresets.invalidFilterPreset],
            selectedOptions: [],
            search: null,
            activeSorts: null,
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filterPresets: [
              selectFilterPreset(filterPresets.invalidFilterPreset),
            ],
            selectedOptions: selectFilterPreset(
              filterPresets.invalidFilterPreset
            ).options,
            search: null,
            activeSorts: null,
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
            selectedOptions: [
              ...selectFilterPreset(filterPresets.filterPreset1).options,
              ...selectFilterPreset(filterPresets.filterPreset2).options,
            ],
            search: null,
            operator: "AND",
            activeSorts: null,
          })
        ).toHaveLength(3);
        expect(
          filterItems(items, {
            filterPresets: [
              selectFilterPreset(filterPresets.filterPreset1),
              selectFilterPreset(filterPresets.invalidFilterPreset),
            ],
            selectedOptions: [
              ...selectFilterPreset(filterPresets.filterPreset1).options,
              ...selectFilterPreset(filterPresets.invalidFilterPreset).options,
            ],
            search: null,
            operator: "AND",
            activeSorts: null,
          })
        ).toHaveLength(0);
        expect(
          filterItems(items, {
            filterPresets: [
              selectFilterPreset(filterPresets.filterPreset2),
              selectFilterPreset(filterPresets.invalidFilterPreset),
            ],
            selectedOptions: [
              ...selectFilterPreset(filterPresets.filterPreset2).options,
              ...selectFilterPreset(filterPresets.invalidFilterPreset).options,
            ],
            search: null,
            operator: "OR",
            activeSorts: null,
          })
        ).toHaveLength(3);
      });
    });

    describe("sortItems", () => {
      it("should be a function", () => {
        expect(sortItems).toBeFunction();
      });
      it("should never throw", () => {
        expect(sortItems).not.toThrow();
      });
      it("should always return an array", () => {
        // @ts-expect-error testing undefined behavior
        expect(sortItems()).toBeArray();
        // @ts-expect-error testing undefined behavior
        expect(sortItems([])).toBeArray();
        expect(sortItems([], [])).toBeArray();
        expect(sortItems([], null)).toBeArray();
      });
      it("should returns items as is if no active sorts are provided", () => {
        // @ts-expect-error testing undefined behavior
        expect(sortItems(mockListData.items)).toEqual(mockListData.items);
        expect(sortItems(mockListData.items, [])).toEqual(mockListData.items);
        expect(sortItems(mockListData.items, null)).toEqual(mockListData.items);
      });

      type SortedItem = { v: Nullish<number>; v2: Nullish<string> };
      const makeItem = (
        v: Nullish<number>,
        v2: Nullish<string> = null
      ): SortedItem => ({ v, v2 });
      const negative = makeItem(-120),
        small = makeItem(1.2),
        medium = makeItem(12),
        large = makeItem(120),
        nullItem = makeItem(null),
        undefItem = makeItem(undefined);
      const ascSort: SortPayload<SortedItem, "v"> = {
          property: "v",
          computedOrder: "asc",
          priority: 0,
          prioritized: false,
        },
        descSort: SortPayload<SortedItem, "v"> = {
          property: "v",
          computedOrder: "desc",
          priority: 0,
          prioritized: false,
        };
      const ascStrSort: SortPayload<SortedItem, "v2"> = {
        property: "v2",
        computedOrder: "asc",
        priority: 1,
        prioritized: false,
      };
      const descStrSort: SortPayload<SortedItem, "v2"> = {
        property: "v2",
        computedOrder: "desc",
        priority: 1,
        prioritized: false,
      };

      it("should put sort numbers in ascending order", () => {
        const items = [small, large, medium, negative];
        expect(sortItems(items, [ascSort])).toEqual([
          negative,
          small,
          medium,
          large,
        ]);
      });

      it("should put sort numbers in descending order", () => {
        const items = [small, large, medium, negative];
        expect(sortItems(items, [descSort])).toEqual([
          large,
          medium,
          small,
          negative,
        ]);
      });
      it("should put sort put null items at the end in ascending order", () => {
        const items = [small, large, medium, nullItem, negative];
        expect(sortItems(items, [ascSort])).toEqual([
          negative,
          small,
          medium,
          large,
          nullItem,
        ]);
      });
      it("should put sort put null items at the end in descending order", () => {
        const items = [small, large, medium, nullItem, negative];
        expect(sortItems(items, [descSort])).toEqual([
          large,
          medium,
          small,
          negative,
          nullItem,
        ]);
      });
      it("should put sort put undefined items at the end in ascending order", () => {
        const items = [small, large, medium, undefItem, negative];
        expect(sortItems(items, [ascSort])).toEqual([
          negative,
          small,
          medium,
          large,
          undefItem,
        ]);
      });
      it("should put sort put undefined items at the end in descending order", () => {
        const items = [small, large, medium, undefItem, negative];
        expect(sortItems(items, [descSort])).toEqual([
          large,
          medium,
          small,
          negative,
          undefItem,
        ]);
      });
      it("should put null items before undefined items", () => {
        const items = [small, large, nullItem, undefItem, nullItem, undefItem];
        expect(sortItems(items, [descSort])).toEqual([
          large,
          small,
          nullItem,
          nullItem,
          undefItem,
          undefItem,
        ]);
        expect(sortItems(items, [ascSort])).toEqual([
          small,
          large,
          nullItem,
          nullItem,
          undefItem,
          undefItem,
        ]);
      });
      const first = makeItem(1, "a");
      const second = makeItem(1, "b");
      const third = makeItem(2, "a");
      const fourth = makeItem(2, "b");
      it("should combine multiple sorting orders", () => {
        const items = [second, fourth, first, third];
        expect(sortItems(items, [ascSort, ascStrSort])).toEqual([
          first,
          second,
          third,
          fourth,
        ]);
        expect(sortItems(items, [descSort, ascStrSort])).toEqual([
          third,
          fourth,
          first,
          second,
        ]);
        expect(sortItems(items, [ascSort, descStrSort])).toEqual([
          second,
          first,
          fourth,
          third,
        ]);
        expect(sortItems(items, [descSort, descStrSort])).toEqual([
          fourth,
          third,
          second,
          first,
        ]);
      });
      it("should sort nullish items to the end while combining sorts", () => {
        const items = [
          nullItem,
          second,
          undefItem,
          nullItem,
          fourth,
          undefItem,
          first,
          third,
        ];
        expect(sortItems(items, [ascSort, ascStrSort])).toEqual([
          first,
          second,
          third,
          fourth,
          nullItem,
          nullItem,
          undefItem,
          undefItem,
        ]);
        expect(sortItems(items, [descSort, ascStrSort])).toEqual([
          third,
          fourth,
          first,
          second,
          nullItem,
          nullItem,
          undefItem,
          undefItem,
        ]);
        expect(sortItems(items, [ascSort, descStrSort])).toEqual([
          second,
          first,
          fourth,
          third,
          nullItem,
          nullItem,
          undefItem,
          undefItem,
        ]);
        expect(sortItems(items, [descSort, descStrSort])).toEqual([
          fourth,
          third,
          second,
          first,
          nullItem,
          nullItem,
          undefItem,
          undefItem,
        ]);
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
      options: [selectOption(mockListData.options.alwaysInvalidOption)],
      selectedOptions: [selectOption(mockListData.options.alwaysInvalidOption)],
      search: null,
      activeSorts: null,
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
        options: [selectOption(mockListData.options.alwaysInvalidOption)],
        selectedOptions: [
          selectOption(mockListData.options.alwaysInvalidOption),
        ],
        search: null,
        activeSorts: null,
      });
      expect(setData).not.toHaveBeenCalled();
      expect(count).toEqual(0);
    }
  );
});
