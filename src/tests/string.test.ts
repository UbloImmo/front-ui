import { objectValues } from "@ubloimmo/front-util";
import { describe, it, expect } from "bun:test";

import { camelCase, capitalize } from "@utils";

const testStrings = {
  default: "this is a test string A 7897",
  camelCase: "thisIsATestStringA7897",
  kebabCase: "this-is-a-test-string-a-7897",
} as const;

const testSeparators = ["-", "_", ".", " "] as const;

const testStringArr = testStrings.default.split(" ");

describe("string utils", () => {
  describe("camel case", () => {
    it("sould be a function", () => {
      expect(camelCase).toBeDefined();
      expect(camelCase).toBeFunction();
    });

    it("should throw on invalid input", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore need to ignore in order to trigger throw
      expect(() => camelCase(null)).toThrow();
    });

    it("should not throw on valid input", () => {
      objectValues(testStrings).forEach((str) => {
        expect(() => camelCase(str)).not.toThrow();
        expect(camelCase(str)).toBeString();
      });
    });

    it("should handle an empty string", () => {
      expect(camelCase("")).toEqual("");
    });

    it("should convert any string to camel case", () => {
      objectValues(testStrings).forEach((str) => {
        expect(camelCase(str, { preserveConsecutiveUppercase: true })).toEqual(
          testStrings.camelCase,
        );
      });
    });

    it("should handle a string array", () => {
      expect(camelCase(testStringArr)).toEqual(testStrings.camelCase);
    });

    it("should handle a locale", () => {
      objectValues(testStrings).forEach((str) => {
        expect(
          camelCase(str, {
            preserveConsecutiveUppercase: true,
            locale: "fr-FR",
          }),
        ).toEqual(testStrings.camelCase);
        expect(
          camelCase(str, {
            preserveConsecutiveUppercase: true,
            locale: ["fr-FR", "en-US"],
          }),
        ).toEqual(testStrings.camelCase);
      });
    });

    it("should return empty on a single separator", () => {
      testSeparators.forEach((separator) => {
        expect(camelCase(separator)).toEqual("");
      });
    });

    it("should handle a string character", () => {
      expect(camelCase("a")).toEqual("a");
      expect(camelCase("a", { pascalCase: true })).toEqual("A");
    });

    it("should be able to return pascal case", () => {
      objectValues(testStrings).forEach((str) => {
        expect(
          camelCase(str, {
            preserveConsecutiveUppercase: true,
            pascalCase: true,
          }),
        ).toEqual(capitalize(testStrings.camelCase));
      });
    });
  });

  describe("capitalize", () => {
    it("should be a function", () => {
      expect(capitalize).toBeDefined();
      expect(capitalize).toBeFunction();
    });

    it("should throw on invalid input", () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore need to ignore in order to trigger throw
      expect(() => capitalize(null)).toThrow();
    });

    it("should not throw on valid input", () => {
      objectValues(testStrings).forEach((str) => {
        expect(() => capitalize(str)).not.toThrow();
        expect(capitalize(str)).toBeString();
      });
    });

    it("should handle an empty string", () => {
      expect(capitalize("")).toEqual("");
    });

    it("should capitalize a string", () => {
      objectValues(testStrings).forEach((str) => {
        expect(capitalize(str).charAt(0)).toEqual(str.charAt(0).toUpperCase());
      });
    });

    it("should retain the input string length", () => {
      objectValues(testStrings).forEach((str) => {
        expect(capitalize(str).length).toEqual(str.length);
      });
    });
  });
});
