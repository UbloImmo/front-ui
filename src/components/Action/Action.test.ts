import { cleanup } from "@testing-library/react";
import { afterEach, expect, mock } from "bun:test";

import { Action } from "./Action.component";

import { testComponentFactory } from "@/tests";

const testId = "action";
const labelTestId = "text action-label";
const badgeTestId = "badge action-badge";

const testAction = testComponentFactory("Action", Action);

const onClick = mock(() => {});

const testDefaultAction = testAction({ ...Action.defaultProps, onClick });

testDefaultAction("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(labelTestId)).not.toBeNull();
});

testAction({
  ...Action.defaultProps,
  badgeLabel: "Badge",
})("should render a badge", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
  expect(await findByTestId(labelTestId)).not.toBeNull();
  expect(await findByTestId(badgeTestId)).not.toBeNull();
});

testAction({
  ...Action.defaultProps,
  size: "large",
})("should render a large action", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
});

testDefaultAction(
  "should trigger onClick",
  async ({ queryByTestId }, { click }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    await click(queryByTestId(testId) as HTMLButtonElement);
    expect(onClick).toHaveBeenCalled();
  }
);

testAction({
  ...Action.defaultProps,
  iconTooltip: {
    content: "A tooltip on an action",
  },
})("should render a tooltip", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(`tooltip`)).not.toBeNull();
});

afterEach(cleanup);
