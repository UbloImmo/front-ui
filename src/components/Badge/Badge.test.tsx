import { expect } from "bun:test";

import { Badge } from "./Badge.component";

import { testComponentFactory } from "@/tests";

const testBadge = testComponentFactory("Badge", Badge);

testBadge({ label: "badge" })("should render", ({ queryByTestId }) => {
  expect(queryByTestId("badge")).not.toBeNull();
});
