import { describe, expect, it } from "bun:test";

import { filterOptionDividerData } from "./FilterOptionDivider.data";
import { isFilterOptionDividerData } from "./FilterOptionDivider.utils";

describe("FilterOptionDivider module", () => {
  describe("utils", () => {
    describe("isFilterOptionDividerData", () => {
      it("should be a function", () => {
        expect(isFilterOptionDividerData).toBeFunction();
      });
      it("should never throw", () => {
        // @ts-expect-error value is required
        expect(() => isFilterOptionDividerData()).not.toThrow();
        expect(() => isFilterOptionDividerData({})).not.toThrow();
        expect(() => isFilterOptionDividerData(null)).not.toThrow();
        expect(() => isFilterOptionDividerData(undefined)).not.toThrow();
      });
      it("should return true if the item is a FilterOptionDividerData object", () => {
        const item = { kind: "divider", label: "test" };
        expect(isFilterOptionDividerData(item)).toBe(true);
      });
      it("should return false if the item is not a FilterOptionDividerData object", () => {
        expect(isFilterOptionDividerData({ kind: "divider", label: 23 })).toBe(
          false
        );
        expect(
          isFilterOptionDividerData({ kind: "dividers", label: "label" })
        ).toBe(false);
      });
    });
  });

  describe("data", () => {
    describe("filterOptionDividerData", () => {
      it("should be a function", () => {
        expect(filterOptionDividerData).toBeFunction();
      });
      it("should never throw", () => {
        // @ts-expect-error label is required
        expect(() => filterOptionDividerData()).not.toThrow();
        // @ts-expect-error label should be a string
        expect(() => filterOptionDividerData(null)).not.toThrow();
        // @ts-expect-error label should be a string
        expect(() => filterOptionDividerData(undefined)).not.toThrow();
      });
      it("should return a FilterOptionDividerData object", () => {
        const data = filterOptionDividerData("test");
        expect(data).toBeObject();
        expect(data).toEqual({ kind: "divider", label: "test" });
      });
      it("should assigne a default label if the label is not provided", () => {
        // @ts-expect-error label should be a string
        const data = filterOptionDividerData();
        expect(data).toEqual({ kind: "divider", label: "[DIVIDER]" });
      });
    });
  });
});
