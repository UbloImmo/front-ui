import { Nullish } from "@ubloimmo/front-util";
import { describe, expect, it } from "bun:test";

import { sortData } from "./Sort.data";
import {
  SortData,
  SortOrderBasic,
  SortOrderComplex,
  SortState,
  SortVisualData,
} from "./Sort.types";
import { isListConfigSortFnCompoundParams } from "./Sort.utils";

type MockEnum = "A" | "B" | "C";

type MockData = {
  number: number;
  string: string;
  enum: MockEnum;
  nullishNumber?: Nullish<number>;
  nullishString?: Nullish<string>;
  enumNullish?: Nullish<MockEnum>;
};

const defaults: SortData<MockData, "enumNullish"> = {
  property: "enumNullish",
  order: "asc",
  priority: 0,
  active: false,
  inverted: false,
  defaultState: {
    active: false,
    inverted: false,
  },
  defaultPriority: 0,
  iconSet: "unknown",
  label: null,
};

describe("Sort module", () => {
  describe("utils", () => {
    describe("isListConfigSortFnCompoundParams", () => {
      it("should be a function", () => {
        expect(isListConfigSortFnCompoundParams).toBeFunction();
      });
      it("should not throw", () => {
        expect(isListConfigSortFnCompoundParams).not.toThrow();
        expect(() =>
          // @ts-expect-error needed to test undefined behavior
          isListConfigSortFnCompoundParams<MockData, "string">([])
        ).not.toThrow();
        expect(() =>
          // @ts-expect-error needed to test undefined behavior
          isListConfigSortFnCompoundParams<MockData, "string">("")
        ).not.toThrow();
        expect(() =>
          // @ts-expect-error needed to test undefined behavior
          isListConfigSortFnCompoundParams<MockData, "string">(null)
        ).not.toThrow();
        expect(() =>
          // @ts-expect-error needed to test undefined behavior
          isListConfigSortFnCompoundParams<MockData, "string">(undefined)
        ).not.toThrow();
        expect(() =>
          // @ts-expect-error needed to test undefined behavior
          isListConfigSortFnCompoundParams<MockData, "string">({})
        ).not.toThrow();
        expect(() =>
          // @ts-expect-error needed to test undefined behavior
          isListConfigSortFnCompoundParams<MockData, "string">(false)
        ).not.toThrow();
        expect(() =>
          // @ts-expect-error needed to test undefined behavior
          isListConfigSortFnCompoundParams<MockData, "string">(42)
        ).not.toThrow();
        expect(() =>
          isListConfigSortFnCompoundParams<MockData, "string">(["string"])
        ).not.toThrow();
        expect(() =>
          isListConfigSortFnCompoundParams<MockData, "string">([
            "string",
            "desc",
          ])
        ).not.toThrow();
        expect(() =>
          isListConfigSortFnCompoundParams<MockData, "string">([
            "string",
            "asc",
            1,
          ])
        ).not.toThrow();
        expect(() =>
          isListConfigSortFnCompoundParams<MockData, "string">([
            { property: "string" },
          ])
        ).not.toThrow();
      });
      it("should return false when provided with flattened params", () => {
        expect(
          isListConfigSortFnCompoundParams<MockData, "string">(["string"])
        ).toBeFalse();
        expect(
          isListConfigSortFnCompoundParams<MockData, "string">([
            "string",
            "desc",
          ])
        ).toBeFalse();
        expect(
          isListConfigSortFnCompoundParams<MockData, "nullishNumber">([
            "nullishNumber",
            [0, 12, 24],
          ])
        ).toBeFalse();
        expect(
          isListConfigSortFnCompoundParams<MockData, "enum">([
            "enum",
            ["B", "C", "A"],
            1,
            { active: true },
          ])
        ).toBeFalse();
      });
      it("should return true when provided with compound params", () => {
        expect(
          isListConfigSortFnCompoundParams<MockData, "string">([
            { property: "string" },
          ])
        ).toBeTrue();
        expect(
          isListConfigSortFnCompoundParams<MockData, "string">([
            { property: "string", order: "desc" },
          ])
        ).toBeTrue();
        expect(
          isListConfigSortFnCompoundParams<MockData, "nullishNumber">([
            { property: "nullishNumber", order: [0, 12, 24] },
          ])
        ).toBeTrue();
        expect(
          isListConfigSortFnCompoundParams<MockData, "enum">([
            { property: "enum", order: ["B", "C", "A"], priority: 1 },
            { active: true },
          ])
        ).toBeTrue();
      });
    });
    describe("sortData", () => {
      it("should be a function", () => {
        expect(sortData).toBeFunction();
      });
      it("should throw if missing first parameter", () => {
        expect(sortData).toThrowError("Missing first required parameter");
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData()).toThrowError(
          "Missing first required parameter"
        );
      });
      it("should throw if provided with a malformed property", () => {
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData(true)).toThrowError("Malformed property");
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData(null)).toThrowError("Malformed property");
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData(undefined)).toThrowError("Malformed property");
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData([])).toThrowError("Malformed property");
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData({})).toThrowError("Malformed property");
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData({ property: true })).toThrowError(
          "Malformed property"
        );
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData({ property: null })).toThrowError(
          "Malformed property"
        );
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData({ property: undefined })).toThrowError(
          "Malformed property"
        );
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData({ property: [] })).toThrowError(
          "Malformed property"
        );
        // @ts-expect-error needed to test undefined behavior
        expect(() => sortData({ property: {} })).toThrowError(
          "Malformed property"
        );
      });
      it("should return a SortDataObject with default values", () => {
        expect(
          sortData<MockData, "enumNullish">({ property: "enumNullish" })
        ).toEqual(defaults);
        expect(sortData<MockData, "enumNullish">("enumNullish")).toEqual(
          defaults
        );
      });
      it("should accept base orders", () => {
        const order: SortOrderBasic = "desc";
        const overridden = { ...defaults, order };
        expect(
          sortData<MockData, "enumNullish">({ property: "enumNullish", order })
        ).toEqual(overridden);
        expect(sortData<MockData, "enumNullish">("enumNullish", order)).toEqual(
          overridden
        );
      });
      it("should accept complex orders", () => {
        const order: SortOrderComplex<MockData, "enumNullish"> = [
          "B",
          "A",
          null,
          "C",
        ];
        const overridden = { ...defaults, order };
        expect(
          sortData<MockData, "enumNullish">({ property: "enumNullish", order })
        ).toEqual(overridden);
        expect(sortData<MockData, "enumNullish">("enumNullish", order)).toEqual(
          overridden
        );
      });
      it("should accept a custom priority", () => {
        const order: SortOrderBasic = "desc";
        const priority = 45;
        const overridden = {
          ...defaults,
          order,
          priority,
          defaultPriority: priority,
        };
        expect(
          sortData<MockData, "enumNullish">({
            property: "enumNullish",
            order,
            priority,
          })
        ).toEqual(overridden);
        expect(
          sortData<MockData, "enumNullish">("enumNullish", order, priority)
        ).toEqual(overridden);
      });
      it("should accept a clamp priority between 0 and Infinity", () => {
        const order: SortOrderBasic = "desc";
        const priority = -450;
        const overridden = {
          ...defaults,
          order,
          priority: 0,
          defaultPriority: 0,
        };
        expect(
          sortData<MockData, "enumNullish">({
            property: "enumNullish",
            order,
            priority,
          })
        ).toEqual(overridden);
        expect(
          sortData<MockData, "enumNullish">("enumNullish", order, priority)
        ).toEqual(overridden);
      });
      it("should accept a partial default state", () => {
        const order: SortOrderBasic = "desc";
        const priority = 45;
        const state: SortState = { inverted: true };
        const overridden = {
          ...defaults,
          order,
          priority,
          ...state,
          defaultState: { ...defaults.defaultState, ...state },
          defaultPriority: priority,
        };
        expect(
          sortData<MockData, "enumNullish">(
            {
              property: "enumNullish",
              order,
              priority,
            },
            state
          )
        ).toEqual(overridden);
        expect(
          sortData<MockData, "enumNullish">(
            "enumNullish",
            order,
            priority,
            state
          )
        ).toEqual(overridden);
      });
      it("should accept a complete default state", () => {
        const order: SortOrderBasic = "desc";
        const priority = 45;
        const state: SortState = { active: true, inverted: true };
        const overridden = {
          ...defaults,
          order,
          priority,
          ...state,
          defaultState: { ...defaults.defaultState, ...state },
          defaultPriority: priority,
        };
        expect(
          sortData<MockData, "enumNullish">(
            {
              property: "enumNullish",
              order,
              priority,
            },
            state
          )
        ).toEqual(overridden);
        expect(
          sortData<MockData, "enumNullish">(
            "enumNullish",
            order,
            priority,
            state
          )
        ).toEqual(overridden);
      });
      it("should accept visual data", () => {
        const order: SortOrderBasic = "desc";
        const priority = 45;
        const state: SortState = { active: true, inverted: true };
        const visualData: SortVisualData = {
          label: "Sorting label",
          iconSet: "number",
        };
        const overridden = {
          ...defaults,
          order,
          priority,
          ...state,
          ...visualData,
          defaultState: { ...defaults.defaultState, ...state },
          defaultPriority: priority,
        };
        expect(
          sortData<MockData, "enumNullish">(
            {
              property: "enumNullish",
              order,
              priority,
            },
            state,
            visualData
          )
        ).toEqual(overridden);
        expect(
          sortData<MockData, "enumNullish">(
            "enumNullish",
            order,
            priority,
            state,
            visualData
          )
        ).toEqual(overridden);
      });
    });
  });
});
