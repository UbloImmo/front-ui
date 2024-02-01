import type { Nullable } from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";
import { mergeDefaultProps } from "../utils/props.utils";

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
});
