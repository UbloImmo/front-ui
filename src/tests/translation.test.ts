import { objectValues } from "@ubloimmo/front-util";
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
  });

  describe("mergeTranslationMap", () => {
    it("should be a function", () => {
      expect(mergeTranslationMap).toBeDefined();
      expect(mergeTranslationMap).toBeFunction();
      expect(mergeTranslationMap).not.toThrow();
    });
  });
});
