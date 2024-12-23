import { isString, objectValues } from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";

import { defaultTranslations } from "@/utils/translation/translation.defaults";
import {
  makeTranslationFnMap,
  mergeTranslationMap,
} from "@/utils/translation/translation.utils";

describe("translation", () => {
  describe("makeTranslationFnMap", () => {
    it("should be a function", () => {
      expect(makeTranslationFnMap).toBeDefined();
      expect(makeTranslationFnMap).toBeFunction();
      expect(makeTranslationFnMap).not.toThrow();
    });

    it("should convert string maps to fn maps", () => {
      objectValues(
        makeTranslationFnMap<"global">(defaultTranslations.global)
      ).forEach((translation) => {
        expect(translation).toBeFunction();
        expect(translation).not.toThrow();
        expect(translation()).toBeString();
      });
    });
    it("should return an empty object if the input is not an object", () => {
      // @ts-expect-error - input is not an object
      expect(makeTranslationFnMap(null)).toEqual({});
      // @ts-expect-error - input is not an object
      expect(makeTranslationFnMap(null)).toBeEmptyObject();
    });
  });

  describe("mergeTranslationMap", () => {
    it("should be a function", () => {
      expect(mergeTranslationMap).toBeDefined();
      expect(mergeTranslationMap).toBeFunction();
      expect(mergeTranslationMap).not.toThrow();
    });
    it("should return a default translation map if the input is not an object", () => {
      // @ts-expect-error - input is not an object
      expect(mergeTranslationMap(null)).toBeObject();
    });
  });

  describe("default translations", () => {
    it("should contain maps that contain strins or functions that return keys", () => {
      for (const map of objectValues(defaultTranslations)) {
        expect(map).toBeObject();
        Object.entries(map).map(([key, translation]) => {
          expect(key).toBeString();
          if (isString(translation)) {
            expect(translation).not.toBeEmpty();
            return;
          }
          expect(translation).toBeFunction();
          expect(translation).not.toThrow();
          expect(translation()).toBeString();
        });
      }
    });
  });
});
