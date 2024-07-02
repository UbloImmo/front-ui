import { renderHook } from "@testing-library/react";
import { LoggerFn, isFunction, objectValues } from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";

import { testPrimitives } from "./test.data";

import { useLogger } from "@utils";

describe("useLogger", () => {
  it("should be a valid react hook", () => {
    expect(useLogger).toBeDefined();
    expect(useLogger).toBeFunction();
  });
  it("should render without errors", () => {
    const { result } = renderHook(() => useLogger("test"));
    expect(result.current).toBeObject();
  });
  it("should return safe logging functions", () => {
    const { result } = renderHook(() => useLogger("test"));
    expect(result.current).not.toBeEmptyObject();
    expect(result.current).toContainKeys([
      "error",
      "warn",
      "info",
      "debug",
      "log",
    ]);
    objectValues(result.current).forEach((logFn) => {
      if (isFunction<LoggerFn>(logFn)) {
        expect(logFn).toBeFunction();
        expect(logFn).not.toThrow();
        objectValues(testPrimitives).forEach((primitive) => {
          expect(() => logFn(primitive)).not.toThrow();
        });
      }
    });
  });
});
