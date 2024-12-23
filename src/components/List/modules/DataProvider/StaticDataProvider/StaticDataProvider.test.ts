import { describe, expect, it, mock } from "bun:test";

import { useStaticDataProvider } from "./StaticDataProvider.hook";
import {
  arrayComparison,
  canCompare,
  compareItemValue,
  filterItems,
} from "./StaticDataProvider.utils";
import { filterData, type Filter } from "../../Filter";
import {
  filterOptionData,
  filterOptionMatch,
  type FilterOptionData,
} from "../../FilterOption";
import { filterPresetData, type FilterPreset } from "../../FilterPreset";

import { testHookFactory } from "@/tests";

type MockItem = {
  string: string;
  number: number;
  boolean: boolean;
  object: {
    date: Date;
    string: string;
    number: number;
    boolean: boolean;
  };
};

const mockItem: MockItem = {
  string: "string",
  number: 10,
  boolean: true,
  object: {
    date: new Date(0),
    string: "string",
    number: 420,
    boolean: false,
  },
};

const mockItems = [mockItem, mockItem, mockItem];

const isLessThan20 = filterOptionMatch<MockItem>("number", "<", 20);
const isMoreThan5 = filterOptionMatch<MockItem>("number", ">", 5);
const isEqualTo10 = filterOptionMatch<MockItem>("number", "=", 10);
const isNotEqualToFalse = filterOptionMatch<MockItem>("boolean", "!=", false);
const isEqualToString = filterOptionMatch<MockItem>("string", "=", "string");
const isBeforeNow = filterOptionMatch<MockItem>(
  "object.date",
  "<",
  new Date(Date.now())
);
const isEqualToFalse = filterOptionMatch<MockItem>(
  "object.boolean",
  "=",
  false
);
const isLessOrEqualTo420 = filterOptionMatch<MockItem>(
  "object.number",
  "<=",
  420
);
const isMoreOrEqualTo420 = filterOptionMatch<MockItem>(
  "object.number",
  ">=",
  420
);

const selectOption = (
  option: FilterOptionData<MockItem>
): FilterOptionData<MockItem> => {
  return {
    ...option,
    selected: true,
  };
};

const numberMoreThan5 = filterOptionData("is more than 5", isMoreThan5);
const objectDateBeforeNow = filterOptionData("is before now", isBeforeNow);
const booleanNotEqualToFalse = filterOptionData(
  "is not equal to false",
  isNotEqualToFalse
);
const alwaysInvalidOption = filterOptionData<MockItem>("always invalid", {
  property: "object.number",
  comparison: ">",
  value: 500,
});

const mockFilter = (
  label: string,
  options: FilterOptionData<MockItem>[]
): Filter<MockItem> => {
  const data = filterData(label, options);
  const filterOptions = options.map((option) => ({
    ...option,
    select: () => {},
    unselect: () => {},
  }));
  return {
    ...data,
    active: false,
    options: filterOptions,
    selectAll: () => {},
    clear: () => {},
    selectedOptions: [],
    optionDividers: [],
  };
};

const filter1 = mockFilter("filter 1", [numberMoreThan5, objectDateBeforeNow]);
const filter2 = mockFilter("filter 2", [booleanNotEqualToFalse]);
const invalidFilter = mockFilter("invalid filter", [alwaysInvalidOption]);

const selectFilter = (filter: Filter<MockItem>) => {
  const selectedOptions = filter.options.map((option) => ({
    ...option,
    selected: true,
  }));
  return {
    ...filter,
    selectedOptions,
    options: selectedOptions,
    active: true,
  };
};

const mockFilterPreset = (
  label: string,
  options: FilterOptionData<MockItem>[]
): FilterPreset<MockItem> => {
  const data = filterPresetData(label, options);
  return {
    ...data,
    loading: false,
    options,
    active: false,
    count: 0,
    select: () => {},
    unselect: () => {},
    toggle: () => {},
  };
};

const filterPreset1 = mockFilterPreset("filter preset 1", [
  objectDateBeforeNow,
]);
const filterPreset2 = mockFilterPreset("filter preset 2", [
  numberMoreThan5,
  booleanNotEqualToFalse,
]);
const invalidFilterPreset = mockFilterPreset("invalid filter preset", [
  alwaysInvalidOption,
]);

const selectFilterPreset = (filterPreset: FilterPreset<MockItem>) => {
  const selectedOptions = filterPreset.options.map((option) => ({
    ...option,
    selected: true,
  }));
  return {
    ...filterPreset,
    options: selectedOptions,
    active: true,
  };
};

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
        expect(compareItemValue(mockItem, isLessThan20)).toBe(true);
        expect(compareItemValue(mockItem, isMoreThan5)).toBe(true);
        expect(compareItemValue(mockItem, isEqualTo10)).toBe(true);
        expect(compareItemValue(mockItem, isNotEqualToFalse)).toBe(true);
        expect(compareItemValue(mockItem, isEqualToString)).toBe(true);
        expect(compareItemValue(mockItem, isBeforeNow)).toBe(true);
        expect(compareItemValue(mockItem, isEqualToFalse)).toBe(true);
        expect(compareItemValue(mockItem, isLessOrEqualTo420)).toBe(true);
        expect(compareItemValue(mockItem, isMoreOrEqualTo420)).toBe(true);
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
          filterItems(mockItems, { option: alwaysInvalidOption })
        ).toHaveLength(3);
        expect(
          filterItems(mockItems, { option: selectOption(alwaysInvalidOption) })
        ).toHaveLength(0);
      });
      it("should return all items if no filter is provided", () => {
        // @ts-expect-error - we are testing the default case
        expect(filterItems(mockItems, {})).toHaveLength(3);
      });
      it("should filter by a single option", () => {
        expect(
          filterItems(mockItems, { option: selectOption(numberMoreThan5) })
        ).toHaveLength(3);
        expect(
          filterItems(mockItems, { option: selectOption(alwaysInvalidOption) })
        ).toHaveLength(0);
      });
      it("should filter by multiple options", () => {
        expect(
          filterItems(mockItems, {
            options: [selectOption(numberMoreThan5), alwaysInvalidOption],
            operator: "AND",
          })
        ).toHaveLength(3);
        expect(
          filterItems(mockItems, {
            options: [
              selectOption(numberMoreThan5),
              selectOption(alwaysInvalidOption),
            ],
            operator: "AND",
          })
        ).toHaveLength(0);
        expect(
          filterItems(mockItems, {
            options: [
              selectOption(numberMoreThan5),
              selectOption(alwaysInvalidOption),
            ],
            operator: "OR",
          })
        ).toHaveLength(3);
      });
      it("should filter by a single filter", () => {
        expect(
          filterItems(mockItems, { filter: selectFilter(filter1) })
        ).toHaveLength(3);
        expect(filterItems(mockItems, { filter: invalidFilter })).toHaveLength(
          3
        );
        expect(
          filterItems(mockItems, { filter: selectFilter(invalidFilter) })
        ).toHaveLength(0);
      });
      it("should filter by multiple filters", () => {
        expect(
          filterItems(mockItems, {
            filters: [selectFilter(filter1), selectFilter(filter2)],
            operator: "AND",
          })
        ).toHaveLength(3);
        expect(
          filterItems(mockItems, {
            filters: [selectFilter(filter1), selectFilter(invalidFilter)],
            operator: "AND",
          })
        ).toHaveLength(0);
        expect(
          filterItems(mockItems, {
            filters: [selectFilter(filter2), selectFilter(invalidFilter)],
            operator: "OR",
          })
        ).toHaveLength(3);
      });
      it("should filter by a single filter preset", () => {
        expect(
          filterItems(mockItems, {
            filterPreset: selectFilterPreset(filterPreset1),
          })
        ).toHaveLength(3);
        expect(
          filterItems(mockItems, {
            filterPreset: invalidFilterPreset,
          })
        ).toHaveLength(3);
        expect(
          filterItems(mockItems, {
            filterPreset: selectFilterPreset(invalidFilterPreset),
          })
        ).toHaveLength(0);
      });
      it("should filter by multiple filter presets", () => {
        expect(
          filterItems(mockItems, {
            filterPresets: [
              selectFilterPreset(filterPreset1),
              selectFilterPreset(filterPreset2),
            ],
            operator: "AND",
          })
        ).toHaveLength(3);
        expect(
          filterItems(mockItems, {
            filterPresets: [
              selectFilterPreset(filterPreset1),
              selectFilterPreset(invalidFilterPreset),
            ],
            operator: "AND",
          })
        ).toHaveLength(0);
        expect(
          filterItems(mockItems, {
            filterPresets: [
              selectFilterPreset(filterPreset2),
              selectFilterPreset(invalidFilterPreset),
            ],
            operator: "OR",
          })
        ).toHaveLength(3);
      });
    });
  });

  type Hook = typeof useStaticDataProvider<MockItem>;
  type HookParams = Parameters<Hook>;
  type HookReturn = ReturnType<Hook>;
  const testHook = testHookFactory<HookParams, HookReturn, Hook>(
    "useStaticDataProvider",
    useStaticDataProvider<MockItem>
  );

  const setData = mock((_data: MockItem[]) => {});
  const initialData: MockItem[] = [mockItem, mockItem];

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
    result.filter({ option: selectOption(alwaysInvalidOption) });
    // rerender();
    expect(setData).toHaveBeenCalled();
  });

  testWithInitialData(
    "should fetch count without calling setData",
    async (result) => {
      expect(result.fetchCount).toBeFunction();
      setData.mockClear();
      const count = await result.fetchCount({
        option: selectOption(alwaysInvalidOption),
      });
      expect(setData).not.toHaveBeenCalled();
      expect(count).toEqual(0);
    }
  );
});
