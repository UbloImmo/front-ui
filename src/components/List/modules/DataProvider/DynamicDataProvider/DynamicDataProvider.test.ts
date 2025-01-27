import { mock, expect, type Mock } from "bun:test";

import { useDynamicDataProvider } from "./DynamicDataProvider.hook";
import { type MockListItem, mockListData } from "../DataProvider.test.mock";
import { filterItems } from "../StaticDataProvider/StaticDataProvider.utils";

import { testHookFactory } from "@/tests";
import { arrayOf } from "@/utils/array.utils";
import { delay } from "@utils";

import type { DataProviderFilterFnConfig } from "../DataProvider.types";
import type { VoidFn } from "@ubloimmo/front-util";

type Hook = typeof useDynamicDataProvider<MockListItem>;
type HookParams = Parameters<Hook>;
type HookReturn = ReturnType<Hook>;

const testHook = testHookFactory<HookParams, HookReturn, Hook>(
  "useDynamicDataProvider",
  useDynamicDataProvider<MockListItem>,
);

const fetchData = mock((config: DataProviderFilterFnConfig<MockListItem>) => {
  return filterItems(
    arrayOf(20, () => mockListData.item),
    config,
  );
});

const setData = mock((_data: MockListItem[]) => {});

const test = testHook(fetchData, setData);

global.console.error = mock(() => {});

const testError = testHook(() => {
  throw new Error("test error");
}, setData);

test("should return a valid dataProvider object", (result) => {
  expect(result).toBeObject();
  expect(result.data).toBeArray();
  expect(result.loading).toBeBoolean();
  expect(result.refetch).toBeFunction();
  expect(result.filter).toBeFunction();
  expect(result.fetchCount).toBeFunction();
});

(global.console.error as Mock<VoidFn>).mockClear();

testError(
  "should log an error when the fetchData function throws an error",
  ({ refetch }) => {
    refetch();
    expect(global.console.error).toHaveBeenCalled();
  },
);

test("should call fetchData and return data when calling refetch", async (_, __, {
  getResult,
  rerender,
}) => {
  rerender();
  await delay(0);
  fetchData.mockClear();
  const data = await getResult().refetch();
  expect(data).toBeArray();
  expect(data).toHaveLength(20);
});

test("should call fetchData and return count when calling fetchCount", async (_, __, {
  getResult,
  rerender,
}) => {
  rerender();
  await delay(0);
  fetchData.mockClear();
  const count = await getResult().fetchCount({
    filterPreset: mockListData.filterPresets.filterPreset1,
  });
  expect(count).toBeNumber();
  expect(count).toBeGreaterThan(0);
});
