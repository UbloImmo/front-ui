import { VoidFn } from "@ubloimmo/front-util";
import { expect, mock, type Mock } from "bun:test";

import { ActionIcon } from "./ActionIcon.component";

import { testComponentFactory } from "@/tests";

import type { ActionIconProps } from "./ActionIcon.types";

const testId = "action-icon";

const testActionIcon = testComponentFactory<ActionIconProps>(
  "ActionIcon",
  ActionIcon
);

testActionIcon(ActionIcon.__DEFAULT_PROPS)(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
  }
);

const onClick = mock<VoidFn>(() => {});
testActionIcon({ ...ActionIcon.__DEFAULT_PROPS, onClick })(
  "should trigger onClick",
  async ({ findByTestId }, { click }) => {
    onClick.mockReset();
    const actionIcon = (await findByTestId(testId)) as HTMLButtonElement;
    expect(actionIcon).not.toBeNull();

    await click(actionIcon);
    expect(onClick).toHaveBeenCalled();
    onClick.mockReset();
  }
);

testActionIcon({ ...ActionIcon.__DEFAULT_PROPS, disabled: true })(
  "should not trigger onClick",
  async ({ findByTestId }, { click }) => {
    onClick.mockReset();
    const actionIcon = (await findByTestId(testId)) as HTMLButtonElement;
    expect(actionIcon).not.toBeNull();
    expect(actionIcon.disabled).toBeTrue();
    await click(actionIcon);
    expect(onClick).not.toHaveBeenCalled();
    onClick.mockReset();
  }
);

global.console.warn = mock(() => {});
global.console.error = mock(() => {});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore need this to check for unhandled props
testActionIcon({ ...ActionIcon.__DEFAULT_PROPS, icon: null })(
  "should error if missing required icon",
  async ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(global.console.error).toHaveBeenCalled();
    (global.console.error as Mock<VoidFn>).mockReset();
  }
);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore need this to check for unhandled props
testActionIcon({ ...ActionIcon.__DEFAULT_PROPS, title: null })(
  "should warn if missing required title",
  ({ queryByTestId }) => {
    expect(queryByTestId(testId)).not.toBeNull();
    expect(global.console.warn).toHaveBeenCalled();
    (global.console.warn as Mock<VoidFn>).mockReset();
  }
);
