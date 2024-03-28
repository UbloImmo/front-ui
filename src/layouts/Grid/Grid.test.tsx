import { describe } from "bun:test";

import { testComponentFactory } from "@/tests";

import { GridLayout, GridLayoutProps } from ".";

describe("GridLayout", () => {
  testComponentFactory<GridLayoutProps>("GridLayout", GridLayout);
});
