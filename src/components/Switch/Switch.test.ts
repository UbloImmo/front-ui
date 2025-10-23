import { expect, mock } from "bun:test";

import { Switch } from "./Switch.component";
import { SwitchProps } from "./Switch.types";

import { testComponentFactory } from "@/tests";

const testSwitch = testComponentFactory("Switch", Switch);

testSwitch(Switch.defaultProps)("should render", ({ queryByTestId }) => {
  expect(queryByTestId("switch")).not.toBeNull();
});

testSwitch({ ...Switch.defaultProps, active: false })(
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

testSwitch({ ...Switch.defaultProps, active: true })(
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

testSwitch({ ...Switch.defaultProps, disabled: true, active: false })(
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

testSwitch({ ...Switch.defaultProps, disabled: true, active: true })(
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

testSwitch({ ...Switch.defaultProps, onChange })(
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

testSwitch({ ...Switch.defaultProps, active: true, onChange })(
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

const testSwitchDefault = testSwitch({});

testSwitchDefault("should hide helper text", ({ queryByTestId }) => {
  const helperText = queryByTestId("switch-helper");
  expect(helperText).toBeNull();
});

testSwitch({ withHelper: true })(
  "should show the helper text",
  ({ queryByTestId }) => {
    const helperText = queryByTestId("switch-helper");
    expect(helperText).not.toBeNull();
  }
);

const testSwitchReadonly = (overrides: SwitchProps = {}) =>
  testSwitch({ readonly: true, ...overrides });

testSwitchReadonly()(
  "should hide the switch container",
  ({ queryByTestId }) => {
    const container = queryByTestId("switch-container");
    expect(container).toBeNull();
  }
);

testSwitchReadonly({ withHelper: false })(
  "should still show the helper text",
  ({ queryByTestId }) => {
    const helperText = queryByTestId("switch-helper");
    expect(helperText).not.toBeNull();
  }
);
