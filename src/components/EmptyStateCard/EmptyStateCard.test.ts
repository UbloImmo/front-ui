import { expect } from "bun:test";

import { EmptyStateCard } from "./EmptyStateCard.component";

import { testComponentFactory } from "@/tests";

const testId = "empty-state-card";
const titleTestId = "empty-state-card-title";
const descriptionTestId = "empty-state-card-description";
const assetTestId = "empty-state-card-asset";

const testCard = testComponentFactory("EmptyStateCard", EmptyStateCard);

const testDefault = testCard({});

testDefault("should render", ({ getByTestId }) => {
  expect(getByTestId(testId)).not.toBeNull();
});

testDefault("should render title", ({ getByTestId }) => {
  expect(getByTestId(titleTestId)).not.toBeNull();
});

testDefault(
  "should not render description nor asset",
  async ({ findByTestId }) => {
    expect(async () => await findByTestId(descriptionTestId)).toThrow();
    expect(async () => await findByTestId(assetTestId)).toThrow();
  }
);

testCard({
  description: "test description",
  editingDescription: "test editing description",
})("should render description", ({ getByTestId }) => {
  expect(getByTestId(descriptionTestId)).not.toBeNull();
});

testCard({
  asset: "EmptyBox",
  color: "primary",
})("should render asset", ({ getByTestId }) => {
  expect(getByTestId(assetTestId)).not.toBeNull();
});

testCard({
  asset: "TaskSleepingCat",
  color: "primary",
})("should render asset", ({ getByTestId }) => {
  expect(getByTestId(assetTestId)).not.toBeNull();
});
