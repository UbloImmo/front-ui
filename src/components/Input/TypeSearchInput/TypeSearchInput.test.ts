import { describe, expect, mock } from "bun:test";

import { TypeSearchInput } from "./TypeSearchInput.component";

import { testComponentFactory } from "@/tests";

import type { InputProps } from "../Input.types";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-type-search";

describe("Input", () => {
  const testTypeSearchInput = testComponentFactory<InputProps<"type-search">>(
    "TypeSearchInput",
    TypeSearchInput,
    {
      props: TypeSearchInput.defaultProps,
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

  const onChange = mock((_value: Nullable<string>) => {});

  testTypeSearchInput({
    value: "test",
  })("should hold a given value", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.value).toBe("test");
  });

  testTypeSearchInput({
    onChange,
  })(
    "should trigger onChange",
    async ({ findByTestId }, { click, keyboard }) => {
      const input = (await findByTestId(testId)) as HTMLInputElement;
      await click(input);
      await keyboard("test");
      expect(onChange).toHaveBeenCalled();
    }
  );
});
