import { Nullable } from "@ubloimmo/front-util";
import { describe, expect, mock } from "bun:test";

import { PhoneInput } from "./PhoneInput.component";
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
    expect(input).toBeDefined();
    expect(input.value).toBe("+33 6 12 34 56 78");
  });

  const onChange = mock((_value: Nullable<string>) => {});

  testPhoneInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("+33612345678");
      expect(onChange).toHaveBeenCalled();
    }
  );

  // testPhoneInput({
  //   onChange,
  //   value: "",
  // })(
  //   "should update phone value correctly",
  //   async ({ queryByTestId }, { click, keyboard }) => {
  //     const input = queryByTestId(testId) as HTMLInputElement;
  //     await click(input);
  //     // adding deleting behavior
  //     await keyboard("0");
  //     expect(input.value).toBe("+33 ");
  //   }
  // );
});
