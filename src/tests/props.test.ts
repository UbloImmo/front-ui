import { objectValues, type Nullable, objectKeys } from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";
import {
  mergeDefaultProps,
  toStyleProps,
  fromStyleProps,
  useStyleProps,
} from "../utils/props.utils";
import type { StyleProps } from "../types";

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
        objectValues(styleProps)
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
        objectKeys(defaultProps)
      );
    });

    it("should preserve prop values ", () => {
      expect(objectValues(fromStyleProps(styleProps))).toEqual(
        objectValues(defaultProps)
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
      expect(() => useStyleProps({})).toThrow();
    });
  });
});
