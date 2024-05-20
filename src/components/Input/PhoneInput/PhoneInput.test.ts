import { Nullable } from "@ubloimmo/front-util";
import { describe, expect, it, mock } from "bun:test";

import { PhoneInput } from "./PhoneInput.component";
import { defaultToFrenchPhone } from "./PhoneInput.utils";
import { InputProps } from "../Input.types";

import { testComponentFactory } from "@/tests";

const testId = "input-phone";

describe("Input", () => {
  const testPhoneInput = testComponentFactory<InputProps<"phone">>(
    "PhoneInput",
    PhoneInput,
    {
      props: PhoneInput.defaultProps,
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

  testPhoneInput({
    value: "+33612345678",
  })("should hold a given value", ({ queryByTestId }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("+33 6 12 34 56 78");
  });

  const onChange = mock((_value: Nullable<string>) => {});

  testPhoneInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      onChange.mockReset();
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("+33612345678");
      expect(onChange).toHaveBeenCalled();
    }
  );

  testPhoneInput({
    onChange,
    value: "",
  })(
    "should update phone value correctly",
    async ({ queryByTestId }, { click, keyboard }) => {
      onChange.mockReset();
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("[Backspace][Backspace][Backspace][Backspace]");
      await keyboard("0");
      expect(input.value).toBe("+33 ");
    }
  );

  testPhoneInput({
    onChange,
  })(
    "should trigger country control on click",
    async ({ queryByTestId, queryByRole }, { click }) => {
      onChange.mockReset();
      const input = queryByTestId(testId) as Nullable<HTMLInputElement>;
      expect(input).not.toBeNull();
      const container = queryByTestId("input-phone-container");
      expect(container).not.toBeNull();
      const button = queryByRole("combobox");
      expect(button).not.toBeNull();

      await click(button as HTMLButtonElement);
      const countryOption = container?.querySelector(
        `li[role="option"][data-country="ie"]`
      );
      expect(countryOption).not.toBeNull();
      expect(countryOption?.textContent).toBe("Ireland+353");
      await click(countryOption as HTMLLIElement);
      expect(input?.value).toBe("+353 ");

      expect(onChange).toHaveBeenCalledWith("+353");
    }
  );
});

describe("Input", () => {
  describe("PhoneInput", () => {
    describe("defaultToFrenchPhone", () => {
      it("should default to french phone", () => {
        expect(defaultToFrenchPhone("06 12 34 56 78")).toBe(
          "+33 6 12 34 56 78"
        );
      });

      it("should not change valid phone", () => {
        expect(defaultToFrenchPhone("+33 6 12 34 56 78")).toBe(
          "+33 6 12 34 56 78"
        );
        expect(defaultToFrenchPhone("+49 6 12 34 56 78")).toBe(
          "+49 6 12 34 56 78"
        );
      });
    });
  });
});
