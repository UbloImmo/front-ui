import { expect } from "bun:test";

import { ContextMenu } from "./ContextMenu.component";

import { testComponentFactory } from "@/tests";

const testId = "context-menu";
const triggerTestId = `${testId}-trigger`;

const testContextMenu = testComponentFactory("ContextMenu", ContextMenu);

testContextMenu({ items: [] })(
  "should render trigger",
  async ({ findByTestId }) => {
    expect(await findByTestId(triggerTestId)).not.toBeNull();
  }
);

testContextMenu({ items: [] })(
  "should render popover when open",
  async ({ findByTestId }, { click }) => {
    const trigger = await findByTestId(triggerTestId);
    await click(trigger);
    expect(await findByTestId(testId)).not.toBeNull();
  }
);

testContextMenu({
  items: [
    {
      label: "Item 1",
    },
  ],
})(
  "should render popover item when open",
  async ({ findByTestId, findByText }, { click }) => {
    const trigger = await findByTestId(triggerTestId);
    await click(trigger);
    expect(await findByTestId(testId)).not.toBeNull();
    expect(await findByTestId(`${testId}-item`)).not.toBeNull();
    expect(await findByText("Item 1")).not.toBeNull();
  }
);

testContextMenu({
  items: [
    {
      label: "Item 1",
    },
  ],
  size: "m",
})(
  "should render larger popover item when size is m",
  async ({ findByTestId, findByText }, { click }) => {
    const trigger = await findByTestId(triggerTestId);
    await click(trigger);
    expect(await findByTestId(testId)).not.toBeNull();
    expect(await findByTestId(`${testId}-item`)).not.toBeNull();
    expect(await findByText("Item 1")).not.toBeNull();
  }
);

testContextMenu({
  items: [
    {
      label: "Item 1",
    },
  ],
})("should close popover on click", async ({ findByTestId }, { click }) => {
  const trigger = await findByTestId(triggerTestId);
  await click(trigger);
  expect(await findByTestId(testId)).not.toBeNull();
});

testContextMenu({
  items: [
    {
      label: "Item 1",
      disabled: true,
    },
  ],
})(
  "should not close popover on click if item is disabled",
  async ({ findByTestId, findByText }, { click }) => {
    const trigger = await findByTestId(triggerTestId);

    await click(trigger);
    expect(await findByTestId(testId)).not.toBeNull();
    const item = await findByTestId(`${testId}-item`);
    expect(item).not.toBeNull();
    expect(await findByText("Item 1")).not.toBeNull();
    await click(item);
    expect(await findByTestId(testId)).not.toBeNull();
  }
);

testContextMenu({
  items: [
    {
      label: "Item 1",
    },
  ],
  defaultOpen: true,
})(
  "should close popover on click on item",
  async ({ findByTestId, queryByTestId }, { click }) => {
    const trigger = await findByTestId(triggerTestId);

    await click(trigger);
    expect(await findByTestId(testId)).not.toBeNull();
    const item = await findByTestId(`${testId}-item`);
    await click(item);

    const closedPopover = await queryByTestId(testId);
    expect(closedPopover).toBeNull();
  }
);
