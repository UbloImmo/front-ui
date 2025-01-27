import { renderHook } from "@testing-library/react";
import {
  objectValues,
  objectKeys,
  objectEntries,
  isUndefined,
  isNull,
} from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";

import { testPrimitives } from "./test.data";
import { testHookFactory } from "./test.utils";

import {
  mergeDefaultProps,
  toStyleProps,
  fromStyleProps,
  useStyleProps,
  useMergedProps,
  useStatic,
  useTestId,
  useClassName,
  useHtmlAttribute,
} from "@utils";

import type { StyleProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

type TestProps = {
  a?: string;
  b: Nullable<string>;
  c: number;
};

type TestDefaultProps = Required<TestProps>;

const defaultProps: TestDefaultProps = {
  a: "a",
  b: "b",
  c: 3,
};

const styleProps: StyleProps<TestDefaultProps> = {
  $a: "a",
  $b: "b",
  $c: 3,
};

describe("prop utils", () => {
  describe("mergeDefaultProps", () => {
    it("should be a function", () => {
      expect(mergeDefaultProps).toBeDefined();
      expect(mergeDefaultProps).toBeFunction();
      expect(() => mergeDefaultProps(defaultProps)).not.toThrow();
    });

    it("should return default props when no props are provided", () => {
      expect(mergeDefaultProps(defaultProps)).toBeObject();
      expect(mergeDefaultProps(defaultProps)).not.toBeEmptyObject();
      expect(mergeDefaultProps(defaultProps)).toContainKeys(["a", "b", "c"]);
      expect(mergeDefaultProps(defaultProps)).toEqual(defaultProps);
    });

    it("should return default props when props is an empty object", () => {
      expect(mergeDefaultProps(defaultProps, {})).toBeObject();
      expect(mergeDefaultProps(defaultProps, {})).not.toBeEmptyObject();
      expect(mergeDefaultProps(defaultProps, {})).toContainKeys([
        "a",
        "b",
        "c",
      ]);
      expect(mergeDefaultProps(defaultProps, {})).toEqual(defaultProps);
    });

    describe("useMergedProps", () => {
      it("should be a function", () => {
        expect(useMergedProps).toBeDefined();
        expect(useMergedProps).toBeFunction();
      });

      it("should throw outside of react", () => {
        expect(() => useMergedProps(defaultProps, {})).toThrow();
      });

      it("should be a valid react hook", () => {
        const { result } = renderHook(() => useMergedProps(defaultProps, {}));
        expect(result.current).toEqual(defaultProps);
      });
    });
  });

  describe("toStyleProps", () => {
    it("should be a function", () => {
      expect(toStyleProps).toBeDefined();
      expect(toStyleProps).toBeFunction();
      expect(() => toStyleProps(defaultProps)).not.toThrow();
    });

    it("should correctly convert prop keys ", () => {
      expect(toStyleProps(defaultProps)).toContainKeys(objectKeys(styleProps));
    });

    it("should preserve prop values ", () => {
      expect(objectValues(toStyleProps(defaultProps))).toEqual(
        objectValues(styleProps),
      );
    });

    it("should preserve the props' shape", () => {
      expect(toStyleProps(defaultProps)).toStrictEqual(styleProps);
    });
  });

  describe("fromStyleProps", () => {
    it("should be a function", () => {
      expect(fromStyleProps).toBeDefined();
      expect(fromStyleProps).toBeFunction();
      expect(() => fromStyleProps(defaultProps)).not.toThrow();
    });

    it("should correctly convert prop keys ", () => {
      expect(fromStyleProps(styleProps)).toContainKeys(
        objectKeys(defaultProps),
      );
    });

    it("should preserve prop values ", () => {
      expect(objectValues(fromStyleProps(styleProps))).toEqual(
        objectValues(defaultProps),
      );
    });

    it("should preserve the props' shape", () => {
      expect(fromStyleProps(styleProps)).toStrictEqual(defaultProps);
    });
  });

  describe("useStyleProps", () => {
    it("should be a function", () => {
      expect(useStyleProps).toBeDefined();
      expect(useStyleProps).toBeFunction();
      // throws outside of react
    });

    it("should throw outside of react", () => {
      expect(() => useStyleProps({})).toThrow();
    });

    it("should be a valid react hook", () => {
      const { result } = renderHook(() => useStyleProps(defaultProps));
      expect(result.current).toEqual(styleProps);
    });
  });

  describe("useStatic", () => {
    const testHook = testHookFactory("useStatic", useStatic);
    objectEntries(testPrimitives).forEach(([key, value]) => {
      testHook(value)(`should return ${key}`, (result) => {
        expect(result).toBe(value);
      });
    });
  });

  describe("useTestId", () => {
    type Hook = typeof useTestId;
    const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
      "useTestId",
      useTestId,
    );
    const baseTestId = "base";
    const customTestId = "custom";
    const testBaseId = testHook(baseTestId);

    testBaseId("should return a string with base test id", (result) => {
      expect(result).toBeString();
      expect(result).toBe(baseTestId);
    });

    const testMissingCustomId = testHook(baseTestId, {});
    testMissingCustomId(
      "should return a string with base test id",
      (result) => {
        expect(result).toBeString();
        expect(result).toBe(baseTestId);
      },
    );

    const testEmptySting = testHook(baseTestId, { testId: "" });
    testEmptySting("should return a string with base test id", (result) => {
      expect(result).toBeString();
      expect(result).toBe(baseTestId);
    });

    const testCustomId = testHook(baseTestId, { testId: customTestId });
    testCustomId("should return a string with both test ids", (result) => {
      expect(result).toBeString();
      expect(result).toBe(`${baseTestId} ${customTestId}`);
    });
  });

  describe("useClassname", () => {
    type Hook = typeof useClassName;
    const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
      "useClassname",
      useClassName,
    );

    const validProps = {
      className: "override",
    };

    testHook(validProps)("should extract className from props", (result) => {
      expect(result).toBe(validProps.className);
    });

    const nullableProps = {
      className: null,
    };

    testHook(nullableProps)(
      "should convert null className to undefined",
      (result) => {
        expect(result).toBeUndefined();
      },
    );

    testHook()("should return undefined if missing props", (result) => {
      expect(result).toBeUndefined();
    });

    const missingProps = {
      a: "not a className",
    };

    // @ts-expect-error needs an invalid type in order to test guard
    testHook(missingProps)(
      "should return undefined is no className in props",
      (result) => {
        expect(result).toBeUndefined();
      },
    );
  });

  describe("useHtmlAttribute", () => {
    type Hook = typeof useHtmlAttribute;
    const testHook = testHookFactory<Parameters<Hook>, ReturnType<Hook>, Hook>(
      "useHtmlAttribute",
      useHtmlAttribute,
    );

    objectEntries(testPrimitives).forEach(([key, value]) => {
      const isNullValue = isNull(value);
      const isOptionalValue = isUndefined(value);
      const nullableValue = isUndefined(value) ? null : value;
      testHook(nullableValue)(
        `should return ${key === "null" ? "undefined" : key} for ${key} value`,
        (result) => {
          if (isNullValue || isOptionalValue) {
            expect(result).toBeUndefined();
          } else {
            expect(result).toBeDefined();
            expect(result).not.toBeNull();
            expect(result).toBe(value);
          }
        },
      );
    });
  });
});
