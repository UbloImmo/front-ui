import { NullishPrimitives, objectEntries } from "@ubloimmo/front-util";
import { expect, mock } from "bun:test";
import { act } from "react";

import { testHookFactory } from "./test.utils";

import { UseMap, type UseAsyncData } from "@types";
import { delay, useAsyncData, useMap } from "@utils";

// useAsyncData tests

const testUseAsyncData = testHookFactory<
  Parameters<UseAsyncData>,
  ReturnType<UseAsyncData>,
  UseAsyncData
>("useAsyncData", useAsyncData);

const testUseAsyncDataEmpty = testUseAsyncData([]);

testUseAsyncDataEmpty(
  "should return a valid data state & refetch method",
  (result) => {
    expect(result).toBeObject();
    expect(result).toHaveProperty("data");
    expect(result).toHaveProperty("isLoading");
    expect(result).toHaveProperty("error");
    expect(result).toHaveProperty("refetch");
    expect(result.data).toBeArrayOfSize(0);
    expect(result.isLoading).toBeBoolean();
    expect(result.error).toBeNull();
    expect(result.refetch).toBeFunction();
  }
);
testUseAsyncDataEmpty("should be loaded when using static data", (result) => {
  expect(result).toBeObject();
  expect(result.data).toBeArrayOfSize(0);
  expect(result.isLoading).toBeFalse();
  expect(result.error).toBeNull();
  expect(result.refetch).toBeFunction();
});

const STATIC_DATA = ["a", "b", "c"];
const testUseAsyncDataStatic = testUseAsyncData(STATIC_DATA);
testUseAsyncDataStatic("should return static data", (result) => {
  expect(result).toBeObject();
  expect(result.data).toEqual(STATIC_DATA);
});

testUseAsyncDataStatic(
  "should return a valid state from refetch",
  async (result) => {
    expect(result.refetch).toBeFunction();
    const refetched = await act(result.refetch);
    expect(refetched).toBeObject();
    expect(refetched.data).toEqual(STATIC_DATA);
    expect(refetched.isLoading).toBeFalse();
    expect(refetched.error).toBeNull();
  }
);

testUseAsyncDataStatic(
  "should call on success callback upon refetch",
  async (result) => {
    const onSuccess = mock(() => {});
    await act(async () => result.refetch({ onSuccess }));
    expect(onSuccess).toHaveBeenCalled();
  }
);

const mockGetData = mock(async (param: NullishPrimitives) => {
  await delay(10);
  return { array: STATIC_DATA, param };
});

const testUseAsyncDataCallback = testUseAsyncData(mockGetData);

testUseAsyncDataCallback(
  "should call the provided load fn initially",
  async () => {
    expect(mockGetData).toHaveBeenCalledTimes(1);
  }
);

testUseAsyncDataCallback(
  "should be loading initially, then resolve with data",
  async (result, _, { getResult }) => {
    expect(result.isLoading).toBeTrue();
    expect(result.data).toBeUndefined();
    // wait for data to have loaded
    await act(async () => delay(20));
    const newResult = getResult();
    expect(newResult.isLoading).toBeFalse();
    expect(newResult.data).toBeObject();
    expect(newResult.data).toHaveProperty("array");
    expect(newResult.data).toHaveProperty("param");
    // @ts-expect-error base hook test factory call is untyped
    expect(newResult.data.array).toEqual(STATIC_DATA);
    // @ts-expect-error base hook test factory call is untyped
    expect(newResult.data.param).toBeUndefined();

    mockGetData.mockReset();
  }
);

testUseAsyncDataCallback(
  "should call the load fn with params during refetch",
  async (result) => {
    mockGetData.mockReset();
    const param = "REFETCH_PARAM";
    await act(async () => result.refetch({ params: [param] }));

    expect(mockGetData).toHaveBeenCalledWith(param);
  }
);

const mockSuccessOrError = mock(async (error = false) => {
  if (error) throw new Error("mock error");
  return { success: true };
});

const onSuccess = mock(() => {});
const onError = mock(() => {});

const testUseAsyncDataSuccess = testUseAsyncData(mockSuccessOrError, {
  onSuccess,
  onError,
});
const testUseAsyncDataError = testUseAsyncData(mockSuccessOrError, {
  onSuccess,
  onError,
  params: [true],
});

testUseAsyncDataSuccess(
  "should call onSuccess callback on first fetch",
  async (result) => {
    expect(result.error).toBeNull();
    expect(onSuccess).toHaveBeenCalledWith({ success: true });
    expect(onError).not.toHaveBeenCalled();
  }
);

testUseAsyncDataSuccess(
  "should call onSuccess upon refetch",
  async (result) => {
    onSuccess.mockReset();
    await act(result.refetch);
    expect(onSuccess).toHaveBeenCalledWith({ success: true });
    expect(onError).not.toHaveBeenCalled();
    onSuccess.mockReset();
  }
);
testUseAsyncDataError(
  "should call onError callback on first fetch",
  async (result) => {
    expect(result.error).toBeInstanceOf(Error);
    expect(onError).toHaveBeenCalled();
    expect(onSuccess).not.toHaveBeenCalled();
    onSuccess.mockReset();
  }
);

testUseAsyncDataError("should call onError upon refetch", async (result) => {
  onError.mockReset();
  await act(result.refetch);
  expect(onError).toHaveBeenCalled();
  expect(onSuccess).not.toHaveBeenCalled();
  onError.mockReset();
});

// useMap tests

const testUseMap = testHookFactory<
  Parameters<UseMap>,
  ReturnType<UseMap>,
  UseMap
>("useMap", useMap);

const testUseMapEmpty = testUseMap(Map);

testUseMapEmpty("should return an empty map", (result) => {
  expect(result).toHaveProperty("size", 0);
  expect(result).toHaveProperty("values");
  expect(result).toHaveProperty("entries");
  expect(result).toHaveProperty("keys");
  expect(result).toHaveProperty("get");
  expect(result).toHaveProperty("set");
  expect(result).toHaveProperty("clear");
  expect(result).toHaveProperty("delete");
  expect(result).toHaveProperty("has");
  expect(result).toHaveProperty("forEach");
});

testUseMapEmpty(
  "should set a new key/value pair",
  (result, _, { getResult }) => {
    act(() => result.set("key", "value"));
    const map = getResult();
    expect(map).toHaveProperty("size", 1);
    expect(map.get("key")).toBe("value");
  }
);

testUseMapEmpty("should return empty entries, values & keys", (result) => {
  const endReached = { value: undefined, done: true as const };
  expect(result.keys().next()).toEqual(endReached);
  expect(result.values().next()).toEqual(endReached);
  expect(result.entries().next()).toEqual(endReached);
});

const STATIC_MAP_ENTRIES = objectEntries({ a: 1, b: 2, c: 3 });

const testUseMapInitialValue = testUseMap(Map, {
  initialValue: new Map(STATIC_MAP_ENTRIES),
});

testUseMapInitialValue("should return a non-empty map", (result) => {
  expect(result.size).toBe(3);
});

testUseMapInitialValue(
  "should allow accessing initial map values",
  (result) => {
    expect(result.get("a")).toBe(1);
    expect(result.get("b")).toBe(2);
    expect(result.get("c")).toBe(3);
  }
);

testUseMapInitialValue("should overwrite initial values", (result) => {
  expect(result.set).toBeFunction();
  act(() => result.set("c", 4));
  expect(result.size).toBe(3);
  expect(result.get("c")).toBe(4);
});
