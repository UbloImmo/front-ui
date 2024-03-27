import { objectValues, type Nullable } from "@ubloimmo/front-util";
import { describe, expect, it, mock } from "bun:test";

import { EmailInput } from "./EmailInput.component";
import { isEmailString } from "./EmailInput.utils";

import { testComponentFactory, testPrimitives } from "@/tests";

import type { InputProps } from "..";
import type { Email } from "@types";

const testId = "input-email";

describe("Input", () => {
  const testEmailInput = testComponentFactory<InputProps<"email">>(
    "EmailInput",
    EmailInput,
    {
      props: EmailInput.defaultProps,
      tests: [
        {
          name: "should render",
          test: ({ queryByTestId }) => {
            expect(queryByTestId(testId)).toBeDefined();
          },
        },
      ],
    }
  );

  testEmailInput({
    value: "example@mail.fr",
  })("should hold a given value", ({ queryByTestId }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toBe("example@mail.fr");
  });

  const onChange = mock((_value: Nullable<Email>) => {});

  testEmailInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      onChange.mockReset();
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("test");
      expect(onChange).toHaveBeenCalled();
    }
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
