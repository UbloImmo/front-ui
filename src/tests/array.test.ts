import { describe, expect, it, mock, type Mock } from "bun:test";

import { testHookFactory } from "./test.utils";

import { arrayOf, delay, useDataArray } from "@utils";

import type { TestHookOptions, TestHookUtils } from "@types";
import type { MaybeAsyncFn, VoidFn } from "@ubloimmo/front-util";

describe("arrayOf", () => {
  it("should be a function", () => {
    expect(arrayOf).toBeFunction();
  });
  it("should return an array of the specified length", () => {
    expect(arrayOf(3, (index) => index)).toHaveLength(3);
  });
  it("should run the creator function for each index", () => {
    const creatorFn = mock((index: number) => index);
    arrayOf(3, creatorFn);
    expect(creatorFn).toHaveBeenCalledTimes(3);
  });
});

type MockItem = {
  index: number;
  selected: boolean;
};

const mockItems: MockItem[] = arrayOf(10, (index) => ({
  index,
  selected: index % 2 === 0,
}));

const DELAY = 5;
const FETCH_DELAY = DELAY - 1;

const mockItemQuery = async () => {
  await delay(FETCH_DELAY);
  return mockItems;
};

type Hook = typeof useDataArray<MockItem>;
type HookReturn = ReturnType<Hook>;
type HookParams = Parameters<Hook>;

const testHook = testHookFactory<HookParams, HookReturn, Hook>(
  "useDataArray",
  useDataArray<MockItem>
);
const testAsyncHook = testHookFactory<HookParams, HookReturn, Hook>(
  "useDataArray (async)",
  useDataArray<MockItem>
);

const onDataChangeSync = mock(() => {});
const onDataChangeAsync = mock(() => {});

const testHookSync = testHook(mockItems, true, onDataChangeSync);
const testHookAsync = testAsyncHook(mockItemQuery, true, onDataChangeAsync);

global.console.error = mock(() => {});
// @ts-expect-error - we are testing the default case
testHook("not an array")(
  "should log an error if data is not an array nor a function",
  () => {
    expect(global.console.error).toHaveBeenCalled();
  }
);

/**
 * Runs two tests in parallel, one sync and one async
 *
 * @param testName - the name of the test
 * @param test - the test to run
 * @param options - the options for the test
 */
const testInParallel = (
  testName: string,
  test: MaybeAsyncFn<
    [
      result: HookReturn,
      params: HookParams,
      utils: TestHookUtils<HookReturn, HookParams>,
    ]
  >,
  options?: TestHookOptions
) => {
  testHookSync(
    testName,
    async (result, params, utils) => {
      await test(result, params, utils);
    },
    options
  );
  testHookAsync(
    testName,
    async (result, params, utils) => {
      await test(result, params, utils);
    },
    options
  );
};

testInParallel(
  "should call onDataChange when data is loaded",
  async (result, [, , onDataChange], utils) => {
    await delay(DELAY);
    utils.rerender();
    expect(onDataChange).toHaveBeenCalledWith(mockItems);
    (onDataChange as Mock<VoidFn>).mockClear();
  }
);

testInParallel(
  "should return an object with data and methods",
  async (result, [, , onDataChange]) => {
    expect(result).toBeObject();
    expect(result.data).toBeArray();
    expect(result.setData).toBeFunction();
    expect(result.isLoading).toBeBoolean();
    expect(result.push).toBeFunction();
    expect(result.remove).toBeFunction();
    expect(result.updateItemWhere).toBeFunction();
    expect(result.unshift).toBeFunction();
    expect(result.find).toBeFunction();
    expect(result.findIndex).toBeFunction();
    expect(result.at).toBeFunction();
    expect(result.filter).toBeFunction();
    (onDataChange as Mock<VoidFn>).mockClear();
  }
);

testInParallel("should set data", async (result, [, , onDataChange], utils) => {
  (onDataChange as Mock<VoidFn>).mockClear();
  result.setData(mockItems);
  utils.rerender();
  await delay(0);
  expect(onDataChange).toHaveBeenCalledWith(mockItems);
  (onDataChange as Mock<VoidFn>).mockClear();
});

testInParallel(
  "should react to data param changes",
  async (firstResult, _params, { rerender, getResult }) => {
    // wait for async data to be loaded and next tick
    await delay(DELAY);
    await delay(0);
    const result = getResult();
    expect(result.data).toBe(mockItems);
    const emptied: MockItem[] = [];
    rerender(emptied, true);
    // wait for next tick
    await delay(0);
    const newResult = getResult();
    expect(newResult.data).toBe(emptied);
  }
);

testInParallel(
  "should update item based on predicate",
  async (result, _params, { getResult }) => {
    // wait for async data to be loaded
    await delay(DELAY);
    await delay(0);

    const predicate = (item: MockItem) => !item.selected;
    const updater = (item: MockItem) => ({
      ...item,
      selected: true,
      hasBeenUpdated: true,
    });
    result.updateItemWhere(predicate, updater);
    await delay(0);

    expect(getResult().data).toEqual(
      mockItems.map((item) => (predicate(item) ? updater(item) : item))
    );
  }
);

testInParallel(
  "should find item based on predicate",
  async (_result, _params, { getResult }) => {
    await delay(DELAY);
    await delay(0);

    const predicate = (item: MockItem) => item.selected;
    const found = getResult().find(predicate);

    expect(found).toBe(mockItems[0]);
  }
);

testInParallel(
  "should find index of item based on predicate",
  async (_result, _params, { getResult }) => {
    await delay(DELAY);
    await delay(0);

    const predicate = (item: MockItem) => item.index > 3 && item.selected;
    const found = getResult().findIndex(predicate);

    expect(found).toBeNumber();
    expect(found).toBe(4);
  }
);

testInParallel("should push item", async (result, _params, { getResult }) => {
  await delay(DELAY);
  await delay(0);
  const newItem: MockItem = { index: 10, selected: false };
  result.push(newItem);
  await delay(0);
  expect(getResult().data).toHaveLength(mockItems.length + 1);
  expect(getResult().data).toEqual([...mockItems, newItem]);
});

testInParallel(
  "should remove item based on predicate",
  async (result, _params, { getResult, rerender }) => {
    await delay(DELAY);
    await delay(0);
    const predicate = (item: MockItem) => item.index >= 4 || item.selected;
    result.remove(predicate);
    await delay(0);
    rerender();
    expect(getResult().data).toHaveLength(2);
    expect(getResult().data).toEqual(
      mockItems.filter((item) => !predicate(item))
    );
  }
);

testInParallel(
  "should unshift item",
  async (result, _params, { getResult }) => {
    await delay(DELAY);
    await delay(0);
    const newItem: MockItem = { index: 10, selected: false };
    result.unshift(newItem);
    await delay(0);
    expect(getResult().data).toHaveLength(mockItems.length + 1);
    expect(getResult().data).toEqual([newItem, ...mockItems]);
  }
);

testInParallel(
  "should get item at index",
  async (result, _params, { getResult }) => {
    await delay(DELAY);
    await delay(0);
    const index = 3;

    const item = getResult().at(index, { index: -1, selected: false });
    expect(item).toEqual(mockItems[index]);
  }
);

testInParallel(
  "should filter items based on predicate",
  async (result, _params, { getResult }) => {
    await delay(DELAY);
    await delay(0);
    const predicate = (item: MockItem) => item.selected;
    const filtered = getResult().filter(predicate);
    expect(filtered).toEqual(mockItems.filter(predicate));
  }
);
