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
  })("should hold a given value", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("15");
  });

  testNumberInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ findByTestId }, { click, keyboard }) => {
      const input = (await findByTestId(testId)) as HTMLInputElement;
      await click(input);
      await keyboard("15");
      expect(onChange).toHaveBeenCalled();
    }
  );

  testNumberInput({
    onChange,
    value: 15,
  })("should increment", async ({ findByTestId }, { click }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    const button = (await findByTestId(
      "input-control-increment"
    )) as HTMLDivElement;
    await click(button);
    expect(input.value).toBe("16");
  });

  testNumberInput({
    onChange,
    value: 15,
  })(
    "should increment on arrow up (keyboard)",
    async ({ findByTestId }, { click, keyboard }) => {
      const input = (await findByTestId(testId)) as HTMLInputElement;

      await click(input);
      await keyboard("[ArrowUp]");
      expect(input.value).toBe("16");
    }
  );

  testNumberInput({
    onChange,
    value: 15,
  })("should decrement", async ({ findByTestId }, { click }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    const button = (await findByTestId(
      "input-control-decrement"
    )) as HTMLDivElement;
    await click(button);
    expect(input.value).toBe("14");
  });

  testNumberInput({
    onChange,
    value: 15,
  })(
    "should decrement on arrow down (keyboard)",
    async ({ findByTestId }, { click, keyboard }) => {
      const input = (await findByTestId(testId)) as HTMLInputElement;

      await click(input);
      await keyboard("[ArrowDown]");
      expect(input.value).toBe("14");
    }
  );

  testNumberInput({
    onChange,
    value: 15,
    scale: 3,
  })("should scale value", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input.value).toBe("0.015");
  });
});
