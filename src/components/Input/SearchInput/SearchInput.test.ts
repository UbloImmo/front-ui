import { describe, expect } from "bun:test";

import { SearchInput } from "./SearchInput.component";

import { testComponentFactory } from "@/tests";

const testId = "input-search";
const testSearchInput = testComponentFactory("SearchInput", SearchInput);

describe("Input", () => {
  testSearchInput({})("should render", async ({ findByTestId }) => {
    expect(await findByTestId(testId)).not.toBeNull();
  });
});
