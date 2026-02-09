import { expect, mock } from "bun:test";

import { Switch } from "./Switch.component";

import { testComponentFactory } from "@/tests";

const testSwitch = testComponentFactory("Switch", Switch);

testSwitch(Switch.__DEFAULT_PROPS)("should render", ({ queryByTestId }) => {
  expect(queryByTestId("switch")).not.toBeNull();
});

testSwitch({ ...Switch.__DEFAULT_PROPS, active: false })(
  "should toggle active state to true on click",
  async ({ queryByTestId }, { click }) => {
    const switchContainer = (await queryByTestId(
      "switch-container"
    )) as HTMLButtonElement;
    expect(switchContainer).not.toBeNull();
    await click(switchContainer);
    expect(switchContainer.getAttribute("aria-checked")).toBe("true");
  }
);

testSwitch({ ...Switch.__DEFAULT_PROPS, active: true })(
  "should toggle active state to false on click",
  async ({ queryByTestId }, { click }) => {
    const switchContainer = (await queryByTestId(
      "switch-container"
    )) as HTMLButtonElement;
    expect(switchContainer).not.toBeNull();
    await click(switchContainer);
    expect(switchContainer.getAttribute("aria-checked")).toBe("false");
  }
);

testSwitch({ ...Switch.__DEFAULT_PROPS, disabled: true, active: false })(
  "should not toggle active state on click when disabled",
  async ({ queryByTestId }, { click }) => {
    const switchContainer = (await queryByTestId(
      "switch-container"
    )) as HTMLButtonElement;
    expect(switchContainer).not.toBeNull();
    await click(switchContainer);
    expect(switchContainer.getAttribute("aria-disabled")).toBe("true");
    expect(switchContainer.disabled).toBe(true);
  }
);

testSwitch({ ...Switch.__DEFAULT_PROPS, disabled: true, active: true })(
  "should not toggle active state on click when both disabled and active",
  async ({ queryByTestId }, { click }) => {
    const switchContainer = (await queryByTestId(
      "switch-container"
    )) as HTMLButtonElement;
    expect(switchContainer).not.toBeNull();
    await click(switchContainer);
    expect(switchContainer.getAttribute("aria-disabled")).toBe("true");
    expect(switchContainer.disabled).toBe(true);
  }
);

const onChange = mock(() => {});

testSwitch({ ...Switch.__DEFAULT_PROPS, onChange })(
  "should trigger onChange and pass the active state as argument",
  async ({ queryByTestId }, { click }) => {
    const switchContainer = (await queryByTestId(
      "switch-container"
    )) as HTMLButtonElement;
    expect(switchContainer).not.toBeNull();
    await click(switchContainer);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(true);
    onChange.mockReset();
  }
);

testSwitch({ ...Switch.__DEFAULT_PROPS, active: true, onChange })(
  "should trigger onChange and pass the inactive state as argument",
  async ({ queryByTestId }, { click }) => {
    const switchContainer = (await queryByTestId(
      "switch-container"
    )) as HTMLButtonElement;
    expect(switchContainer).not.toBeNull();
    await click(switchContainer);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(false);
    onChange.mockReset();
  }
);
