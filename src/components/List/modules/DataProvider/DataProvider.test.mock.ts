import { filterData, type Filter } from "../Filter";
import { filterOptionData, filterOptionMatch } from "../FilterOption";
import { filterPresetData, type FilterPreset } from "../FilterPreset";

import type { FilterOptionData } from "../FilterOption/FilterOption.types";

export type MockListItem = {
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

const mockItem: MockListItem = {
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

const isLessThan20 = filterOptionMatch<MockListItem>("number", "<", 20);
const isMoreThan5 = filterOptionMatch<MockListItem>("number", ">", 5);
const isEqualTo10 = filterOptionMatch<MockListItem>("number", "=", 10);
const isNotEqualToFalse = filterOptionMatch<MockListItem>(
  "boolean",
  "!=",
  false
);
const isEqualToString = filterOptionMatch<MockListItem>(
  "string",
  "=",
  "string"
);
const isBeforeNow = filterOptionMatch<MockListItem>(
  "object.date",
  "<",
  new Date(Date.now())
);
const isEqualToFalse = filterOptionMatch<MockListItem>(
  "object.boolean",
  "=",
  false
);
const isLessOrEqualTo420 = filterOptionMatch<MockListItem>(
  "object.number",
  "<=",
  420
);
const isMoreOrEqualTo420 = filterOptionMatch<MockListItem>(
  "object.number",
  ">=",
  420
);
const containsTri = filterOptionMatch<MockListItem>(
  "string",
  "contains",
  "tri"
);
const startsWithStr = filterOptionMatch<MockListItem>(
  "object.string",
  "startsWith",
  "stri"
);
const endsWithNg = filterOptionMatch<MockListItem>("string", "endsWith", "ng");

const mockMatches = {
  isLessThan20,
  isMoreThan5,
  isEqualTo10,
  isNotEqualToFalse,
  isEqualToString,
  isBeforeNow,
  isEqualToFalse,
  isLessOrEqualTo420,
  isMoreOrEqualTo420,
  containsTri,
  startsWithStr,
  endsWithNg,
};

const selectOption = (
  option: FilterOptionData<MockListItem>
): FilterOptionData<MockListItem> => {
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
const alwaysInvalidOption = filterOptionData<MockListItem>("always invalid", {
  property: "object.number",
  comparison: ">",
  value: 500,
});

export const mockOptions = {
  numberMoreThan5,
  objectDateBeforeNow,
  booleanNotEqualToFalse,
  alwaysInvalidOption,
};

const mockFilter = (
  label: string,
  options: FilterOptionData<MockListItem>[]
): Filter<MockListItem> => {
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

const mockFilters = {
  filter1,
  filter2,
  invalidFilter,
};

const selectFilter = (filter: Filter<MockListItem>) => {
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
  options: FilterOptionData<MockListItem>[]
): FilterPreset<MockListItem> => {
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

const mockFilterPresets = {
  filterPreset1,
  filterPreset2,
  invalidFilterPreset,
};

const selectFilterPreset = (filterPreset: FilterPreset<MockListItem>) => {
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

export const mockListData = {
  item: mockItem,
  items: mockItems,
  matches: mockMatches,
  options: mockOptions,
  filters: mockFilters,
  filterPresets: mockFilterPresets,
  selectOption,
  selectFilter,
  selectFilterPreset,
};
