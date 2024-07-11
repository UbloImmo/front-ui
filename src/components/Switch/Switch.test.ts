import { expect } from "bun:test";

import { Switch } from "./Switch.component";

import { testComponentFactory } from "@/tests";

const testSwitch = testComponentFactory("Switch", Switch);

testSwitch(Switch.defaultProps)("should render", ({ queryByTestId }) => {
  expect(queryByTestId("switch")).not.toBeNull();
});

testSwitch({ ...Switch.defaultProps })(
  "should toggle active state on click",
  async ({ queryByTestId }, { click }) => {
    const switchContainer = (await queryByTestId(
      "switch-container"
    )) as HTMLButtonElement;
    expect(switchContainer).not.toBeNull();
    await click(switchContainer);
    expect(switchContainer.getAttribute("aria-checked")).toBe("true");
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
