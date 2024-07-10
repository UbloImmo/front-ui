import { expect } from "bun:test";

import { Switch } from "./Switch.component";

import { testComponentFactory } from "@/tests";

const testSwitch = testComponentFactory("Switch", Switch);

testSwitch(Switch.defaultProps)("should render", ({ queryByTestId }) => {
  expect(queryByTestId("switch")).not.toBeNull();
});

testSwitch({ ...Switch.defaultProps, disabled: true, active: false })(
  "should not toggle active state on click when disabled",
  async ({ queryByTestId }, { click }) => {
    expect(queryByTestId("switch-toggle")).not.toBeNull();
    await click(queryByTestId("switch-toggle") as HTMLDivElement);
    expect(queryByTestId("switch-toggle")?.getAttribute("aria-disabled")).toBe(
      "true"
    );
    expect(Switch.defaultProps.active).toBe(false);
  }
);

testSwitch({ ...Switch.defaultProps, disabled: true, active: true })(
  "should not toggle active state on click when both disabled and active",
  async ({ queryByTestId }, { click }) => {
    expect(queryByTestId("switch-toggle")).not.toBeNull();
    await click(queryByTestId("switch-toggle") as HTMLDivElement);
    expect(queryByTestId("switch-toggle")?.getAttribute("aria-disabled")).toBe(
      "true"
    );
  }
);
