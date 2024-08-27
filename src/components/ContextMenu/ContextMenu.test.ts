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
