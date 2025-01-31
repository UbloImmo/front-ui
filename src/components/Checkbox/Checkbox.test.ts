import { expect, mock } from "bun:test";

import { Checkbox } from "./Checkbox.component";

import { testComponentFactory } from "@/tests";

const testCheckbox = testComponentFactory("Checkbox", Checkbox);

testCheckbox(Checkbox.defaultProps)("should render", ({ queryByTestId }) => {
  expect(queryByTestId("checkbox")).not.toBeNull();
});

testCheckbox({ ...Checkbox.defaultProps, active: false })(
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

testCheckbox({ ...Checkbox.defaultProps, active: true, disabled: true })(
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

testCheckbox({ ...Checkbox.defaultProps, onChange })(
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

testCheckbox({ ...Checkbox.defaultProps, onChange, active: "mixed" })(
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
