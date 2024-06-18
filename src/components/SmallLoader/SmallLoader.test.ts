import { expect } from "bun:test";

import { SmallLoader } from "./SmallLoader.component";

import { testComponentFactory } from "@/tests";

const testSmallLoader = testComponentFactory("SmallLoader", SmallLoader);

testSmallLoader({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("small-loader")).not.toBeNull();
});
