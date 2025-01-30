import { cleanup } from "@testing-library/react";
import { afterEach, expect, mock } from "bun:test";

import { Action } from "./Action.component";

import { testComponentFactory } from "@/tests";

import type { VoidFn } from "@ubloimmo/front-util";
import type { Mock } from "bun:test";

const testId = "action";
const labelTestId = "action-label";
const badgeTestId = "action-badge";
const descriptionTestId = "action-description";

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
})("should render the large size", async ({ findByTestId }) => {
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

testAction({
  ...Action.defaultProps,
  description: "A description",
  size: "large",
})("should render a description with a large size", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(descriptionTestId)).not.toBeNull();
});

testAction({
  ...Action.defaultProps,
  description: "A description",
})(
  "should not render a description with a default size",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryByTestId(descriptionTestId)).toBeNull();
  }
);

global.console.warn = mock(() => {});

testAction({
  ...Action.defaultProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore need this to check for unhandled props
  icon: null,
})("should warn if missing required icon", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
  (global.console.warn as Mock<VoidFn>).mockReset();
});

testAction({
  ...Action.defaultProps,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore need this to check for unhandled props
  label: null,
})("should warn if missing required label", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(global.console.warn).toHaveBeenCalled();
  (global.console.warn as Mock<VoidFn>).mockReset();
});

testAction({
  ...Action.defaultProps,
  description: "A description",
  size: "default",
})(
  "should warn if description is set with default size",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(queryByTestId(descriptionTestId)).toBeNull();
    expect(global.console.warn).toHaveBeenCalled();
    (global.console.warn as Mock<VoidFn>).mockReset();
  }
);

testAction({
  ...Action.defaultProps,
  indicator: {
    name: "Circle2NdHalf",
    color: "pending-base",
    tooltip: {
      content: "Tooltip content",
    },
  },
})("should render an indicator with a tooltip", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId("static-icon-indicator")).not.toBeNull();
  expect(queryByTestId("tooltip static-icon-indicator-tooltip")).not.toBeNull();
});

afterEach(cleanup);
