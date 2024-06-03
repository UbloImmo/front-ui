import { describe, expect, mock } from "bun:test";

import { NumberInput } from "./NumberInput.component";

import { testComponentFactory } from "@/tests";

import type { NumberInputProps } from "./NumberInput.types";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-number";

describe("Input", async () => {
  const testNumberInput = testComponentFactory<NumberInputProps>(
    "NumberInput",
    NumberInput,
    {
      props: NumberInput.defaultProps,
      tests: [
        {
          name: "should render",
          test: async ({ findByTestId }) => {
            expect(await findByTestId(testId)).not.toBeNull();
          },
        },
      ],
    }
  );

  const onChange = mock((_value: Nullable<number>) => {});

  testNumberInput({
    value: 15,
  })("should hold a given value", ({ queryByTestId }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    expect(input).toBeDefined();
    expect(input.value).toBe("15");
  });

  testNumberInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ queryByTestId }, { click, keyboard }) => {
      const input = queryByTestId(testId) as HTMLInputElement;
      await click(input);
      await keyboard("15");
      expect(onChange).toHaveBeenCalled();
    }
  );

  testNumberInput({
    onChange,
    value: 15,
  })("should increment", async ({ queryByTestId }, { click }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    const button = queryByTestId("input-control-increment") as HTMLDivElement;
    await click(button);
    expect(input.value).toBe("16");
  });

  testNumberInput({
    onChange,
    value: 15,
  })("should decrement", async ({ queryByTestId }, { click }) => {
    const input = queryByTestId(testId) as HTMLInputElement;
    const button = queryByTestId("input-control-decrement") as HTMLDivElement;
    await click(button);
    expect(input.value).toBe("14");
  });
});
