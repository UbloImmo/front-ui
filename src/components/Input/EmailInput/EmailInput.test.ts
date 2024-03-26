import { describe, it, expect } from "bun:test";
import { componentTestFactory, testPrimitives } from "src/tests";
import { EmailInput, defaultEmailInputProps } from "./EmailInput.component";
import { isEmailString } from "./EmailInput.utils";
import { objectValues } from "@ubloimmo/front-util";

describe("Email Input", () => {
  componentTestFactory(
    "EmailInput",
    "input-email",
    EmailInput,
    defaultEmailInputProps
  );

  describe("isEmailString", () => {
    it("should be a function", () => {
      expect(isEmailString).toBeDefined();
      expect(isEmailString).toBeFunction();
    });
    it("should never throw", () => {
      objectValues(testPrimitives).forEach((primitive) => {
        expect(() => isEmailString(primitive)).not.toThrow();
      });
    });
    it("should always return a boolean", () => {
      objectValues(testPrimitives).forEach((primitive) => {
        expect(isEmailString(primitive)).toBeBoolean();
      });
    });
    it("should return false for invalid values", () => {
      objectValues(testPrimitives).forEach((primitive) => {
        expect(isEmailString(primitive)).toBeFalse();
      });
    });
    it("should return true for a kinda valid email", () => {
      const validEmails = [
        "example@mail.fr",
        "a@aa.co",
        "a3@tes5t.www1",
        "example1.878676arta@side.extension",
      ];

      validEmails.forEach((email) => {
        expect(isEmailString(email)).toBeTrue();
      });
    });
  });
});
