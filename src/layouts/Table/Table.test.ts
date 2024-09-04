import { expect } from "bun:test";

import { Table } from "./Table.layout";

import { testComponentFactory } from "@/tests";

const testTable = testComponentFactory("Table", Table);
const testId = "table";

testTable(Table.defaultProps)("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});
