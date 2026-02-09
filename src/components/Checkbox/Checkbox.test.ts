import { expect, mock } from "bun:test";

import { Checkbox } from "./Checkbox.component";

import { testComponentFactory } from "@/tests";

const testCheckbox = testComponentFactory("Checkbox", Checkbox);

testCheckbox(Checkbox.__DEFAULT_PROPS)("should render", ({ queryByTestId }) => {
  expect(queryByTestId("checkbox")).not.toBeNull();
});

testCheckbox({ ...Checkbox.__DEFAULT_PROPS, active: false })(
  "should toggle active state to true on click",
  async ({ queryByTestId }, { click }) => {
    const checkboxInput = (await queryByTestId(
      "checkbox-input"
    )) as HTMLInputElement;
    expect(checkboxInput).not.toBeNull();
    await click(checkboxInput);
    expect(checkboxInput.getAttribute("aria-checked")).toBe("true");
  }
);

testCheckbox({ ...Checkbox.__DEFAULT_PROPS, active: true, disabled: true })(
  "should not toggle active state when disabled",
  async ({ queryByTestId }, { click }) => {
    const checkboxInput = (await queryByTestId(
      "checkbox-input"
    )) as HTMLInputElement;
    expect(checkboxInput).not.toBeNull();
    await click(checkboxInput);
    expect(checkboxInput.getAttribute("aria-checked")).toBe("true");
    expect(checkboxInput.disabled).toBe(true);
  }
);

const onChange = mock(() => {});

testCheckbox({ ...Checkbox.__DEFAULT_PROPS, onChange })(
  "should trigger onChange and pass the active state as argument",
  async ({ queryByTestId }, { click }) => {
    const checkboxInput = (await queryByTestId(
      "checkbox-input"
    )) as HTMLInputElement;
    expect(checkboxInput).not.toBeNull();
    await click(checkboxInput);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(true);
    onChange.mockReset();
  }
);

testCheckbox({ ...Checkbox.__DEFAULT_PROPS, onChange, active: "mixed" })(
  "should trigger onChange and pass the active mixed state as argument",
  async ({ queryByTestId }, { click }) => {
    const checkboxInput = (await queryByTestId(
      "checkbox-input"
    )) as HTMLInputElement;
    expect(checkboxInput).not.toBeNull();
    await click(checkboxInput);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(false);
    onChange.mockReset();
  }
);
