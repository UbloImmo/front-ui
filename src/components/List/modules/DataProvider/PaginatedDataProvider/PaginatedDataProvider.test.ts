import { isNumber, type VoidFn } from "@ubloimmo/front-util";
import { expect, mock, type Mock } from "bun:test";

import { usePaginatedDataProvider } from "./PaginatedDataProvider.hook";
import { mockListData, type MockListItem } from "../DataProvider.test.mock";
import { filterItems } from "../StaticDataProvider/StaticDataProvider.utils";

import { testHookFactory } from "@/tests";
import { arrayOf, delay } from "@utils";

import type { DataProviderFilterFnConfig } from "../DataProvider.types";
import type { PaginationAfter } from "./PaginatedDataProvider.types";

type Hook = typeof usePaginatedDataProvider<MockListItem>;
type HookParams = Parameters<Hook>;
type HookReturn = ReturnType<Hook>;

const testHook = testHookFactory<HookParams, HookReturn, Hook>(
  "usePaginatedDataProvider",
  usePaginatedDataProvider<MockListItem>
);

const PAGE_SIZE = 20;

const setData = mock((_data: MockListItem[]) => {});
const fetchPage = mock(
  async (
    config: DataProviderFilterFnConfig<MockListItem>,
    after: PaginationAfter,
    pageSize: number
  ) => {
    const pageData = filterItems(
      arrayOf(pageSize, () => mockListData.item),
      config
    );
    const nextAfter =
      isNumber(after) && after >= 100
        ? null
        : ((after ?? 0) as number) + pageSize;
    return {
      pageData,
      after: nextAfter,
      pageSize: pageData.length,
    };
  }
);

const test = testHook(fetchPage, setData, PAGE_SIZE);

test("should return a valid dataProvider object", (result) => {
  expect(result).toBeObject();
  expect(result.data).toBeArray();
  expect(result.loading).toBeBoolean();
  expect(result.refetch).toBeFunction();
  expect(result.filter).toBeFunction();
  expect(result.fetchCount).toBeFunction();
});

test("shoud return an object containing pagination related properties", (result) => {
  expect(result).toBeObject();
  expect(result.hasNextPage).toBeBoolean();
  expect(result.nextPage).toBeFunction();
  expect(result.pageSize).toBeNumber();
  expect(result.pageSize).toBeGreaterThan(0);
});

fetchPage.mockClear();

global.console.error = mock(() => {});

test("should fetch the first page data only manually", async (result, _, {
  getResult,
  rerender,
}) => {
  expect(result.data).toBeArray();
  // wait for fetch + rerender
  await delay(20);
  expect(getResult().data).toBeArray();
  expect(getResult().data).toHaveLength(0);

  await getResult().refetch();
  await delay(20);
  expect(fetchPage).toHaveBeenCalled();
  rerender();
  expect(getResult().data).toHaveLength(PAGE_SIZE);
  expect(global.console.error).not.toHaveBeenCalled();
});

(global.console.error as Mock<VoidFn>).mockClear();

test("should fetch the next page when calling nextPage and contact the new data", (result) => {
  expect(result.nextPage).toBeFunction();
  result.nextPage();
  expect(fetchPage).toHaveBeenCalled();
  expect(global.console.error).not.toHaveBeenCalled();
});

(global.console.error as Mock<VoidFn>).mockClear();

const testError = testHook(
  () => {
    throw new Error("test error");
  },
  setData,
  PAGE_SIZE
);

testError(
  "should log an error if the fetchPage function throws an error",
  async (result) => {
    await result.refetch();
    expect(global.console.error).toHaveBeenCalled();
  }
);

(global.console.error as Mock<VoidFn>).mockClear();

test("should not reset pagination when calling filter() with the same config", async (result, _, {
  getResult,
  rerender,
}) => {
  rerender();
  await delay(0);
  expect(result.filter).toBeFunction();
  getResult().filter({ filters: [], selectedOptions: [], search: null });
  await delay(0);
  rerender();
  expect(getResult().hasNextPage).toBeBoolean();
  expect(getResult().hasNextPage).toBe(true);
});

test("should reset pagination when filters change", async (result, _, {
  rerender,
  getResult,
}) => {
  rerender();
  await delay(0);
  const res = getResult();
  expect(res.filter).toBeFunction();
  res.filter({
    filters: [mockListData.filters.filter1],
    selectedOptions: mockListData.filters.filter1.options.filter(
      ({ selected }) => selected
    ),
    search: null,
  });
  rerender();
  expect(getResult().hasNextPage).toBeBoolean();
  expect(getResult().hasNextPage).toBe(false);
});

test("should reset pagination when refetching", async (result, _, {
  rerender,
  getResult,
}) => {
  rerender();
  await delay(0);
  const res = getResult();
  res.refetch();
  rerender();
  expect(getResult().hasNextPage).toBeBoolean();
  expect(getResult().hasNextPage).toBe(false);
});
