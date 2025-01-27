import { expect, mock } from "bun:test";

import { ComboBoxButton } from "./ComboBoxButton.component";

import { testComponentFactory } from "@/tests";

import type { VoidFn } from "@ubloimmo/front-util";

const testComboBoxButton = testComponentFactory(
  "ComboBoxButton",
  ComboBoxButton,
);

testComboBoxButton({ ...ComboBoxButton.defaultProps })(
  "should render",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box-button")).not.toBeNull();
  },
);

testComboBoxButton({ ...ComboBoxButton.defaultProps, multi: true })(
  "should render as multi",
  ({ queryByTestId }) => {
    expect(queryByTestId("combo-box-button")).not.toBeNull();
  },
);

const onSelect = mock<VoidFn>(() => {});

testComboBoxButton({
  ...ComboBoxButton.defaultProps,
  disabled: true,
  onSelect,
})("should render and behave as disabled", ({ queryByTestId }) => {
  expect(queryByTestId("combo-box-button")).not.toBeNull();
  expect(onSelect).not.toHaveBeenCalled();
});

global.console.warn = mock(() => {});

testComboBoxButton({
  ...ComboBoxButton.defaultProps,
  // @ts-expect-error needed for testing missing label
  label: null,
})("should warn if label is missing", () => {
  expect(console.warn).toHaveBeenCalled();
});

testComboBoxButton({
  ...ComboBoxButton.defaultProps,
  onSelect,
})("should trigger onSelect on click", async ({ queryByTestId }, { click }) => {
  const comboBoxButton = queryByTestId("combo-box-button") as HTMLButtonElement;
  await click(comboBoxButton);
  expect(onSelect).toHaveBeenCalled();
});

const onEdit = mock<VoidFn>(() => {});

testComboBoxButton({
  ...ComboBoxButton.defaultProps,
  editable: true,
  deletable: true,
  onEdit,
  deleteLabel: "Test delete",
  editLabel: "Test edit",
})(
  "should render and open on click a context menu",
  async ({ queryByTestId, queryAllByTestId }, { click }) => {
    expect(queryByTestId("combo-box-button")).not.toBeNull();
    const contextMenuTrigger = queryByTestId(
      "combo-box-button-context-menu",
    ) as HTMLButtonElement;
    expect(contextMenuTrigger).not.toBeNull();
    await click(contextMenuTrigger);

    const openedContextMenu = queryByTestId("context-menu");
    expect(openedContextMenu).not.toBeNull();

    const contextMenuItems = queryAllByTestId("context-menu-item");
    expect(contextMenuItems[0].textContent).toBe("Test edit");
    expect(contextMenuItems[1].textContent).toBe("Test delete");

    await click(contextMenuItems[0]);
    expect(onEdit).toHaveBeenCalled();
    onEdit.mockReset();
  },
);
