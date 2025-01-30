import { expect } from "bun:test";

import { EntityInfoCard } from "./EntityInfoCard.component";
import { Button } from "../Button";

import { testComponentFactory } from "@/tests";

const testCard = testComponentFactory("EntityInfoCard", EntityInfoCard);

const state = EntityInfoCard.defaultProps.state;

const testId = "entity-info-card";

testCard({ state })("should render", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
});

testCard({ state, name: "[Name]" })(
  "should display name",
  async ({ findByText }) => {
    expect(await findByText("[Name]")).not.toBeNull();
  }
);

testCard({ state, children: <Button label="Button" /> })(
  "should render children",
  async ({ findByText, findByTestId }) => {
    expect(await findByText("Button")).not.toBeNull();
    expect(await findByTestId("button")).not.toBeNull();
  }
);
