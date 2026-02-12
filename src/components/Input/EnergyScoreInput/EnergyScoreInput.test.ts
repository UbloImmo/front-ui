import { describe, expect, mock } from "bun:test";

import { EnergyScoreInput } from "./EnergyScoreInput.component";

import { testComponentFactory } from "@/tests";

import type { EnergyScoreInputProps } from "./EnergyScoreInput.types";
import type { Nullable } from "@ubloimmo/front-util";

const testId = "input-energy-score";

describe("EnergyScoreInput", async () => {
  const testEnergyScoreInput = testComponentFactory<EnergyScoreInputProps>(
    "EnergyScoreInput",
    EnergyScoreInput,
    {
      props: EnergyScoreInput.__DEFAULT_PROPS,
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
  const onLabelChange = mock((_tag: Nullable<string>) => {});

  testEnergyScoreInput({
    value: 150,
    scoreType: "DPE",
    onChange,
    onLabelChange,
  })("should handle DPE value", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input.value).toBe("150");
    expect(onLabelChange).toHaveBeenCalledWith("C");
  });

  testEnergyScoreInput({
    value: 150,
    scoreType: "GES",
    onChange,
    onLabelChange,
  })("should handle GES value", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input.value).toBe("150");
    expect(onLabelChange).toHaveBeenCalledWith("G");
  });

  testEnergyScoreInput({
    value: 150,
    scoreType: "DPE",
    onChange,
    onLabelChange,
    disabled: true,
  })("should be disabled", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input.disabled).toBe(true);
  });

  testEnergyScoreInput({
    value: 150,
    scoreType: "DPE",
    onChange,
    onLabelChange,
    min: 100,
    max: 200,
  })("should respect min and max values", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input.min).toBe("100");
    expect(input.max).toBe("200");
  });

  testEnergyScoreInput({
    value: 150,
    scoreType: "DPE",
    onChange,
    onLabelChange,
    unit: "kWh/m²/an",
  })("should handle unit prop", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input).toBeDefined();
    // Note: Unit is only displayed in Form read mode, so we can't test its display here
  });

  testEnergyScoreInput({
    value: 150,
    scoreType: "DPE",
    onChange,
    onLabelChange,
    required: true,
  })("should handle required prop", async ({ findByTestId }) => {
    const input = (await findByTestId(testId)) as HTMLInputElement;
    expect(input.required).toBe(true);
  });
});
