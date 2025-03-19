import { expect } from "bun:test";

import { VirtualTable } from "./VirtualTable.layout";

import { Text } from "@/components/Text";
import { testComponentFactory } from "@/tests";

import type { VirtualTableProps } from "./VirtualTable.types";

const testId = "virtual-table";
const tableTestId = "table virtual";
const headerTestId = "table-header virtual";
const bodyTestId = "table-body virtual";
const headerCellTestId = "table-header-cell virtual";
const rowTestId = "table-row virtual";
const cellTestId = "table-cell virtual";

type TestItem = {
  id: number;
};

const testVirtualTable = testComponentFactory<VirtualTableProps<TestItem>>(
  "VirtualTable",
  VirtualTable<TestItem>
);

const testEmpty = testVirtualTable({
  data: [],
  columns: [],
});

testEmpty("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(tableTestId)).not.toBeNull();
  expect(queryByTestId(bodyTestId)).toBeNull();
  expect(queryByTestId(headerTestId)).toBeNull();
  expect(queryByTestId(headerCellTestId)).toBeNull();
  expect(queryByTestId(rowTestId)).toBeNull();
  expect(queryByTestId(cellTestId)).toBeNull();
});

// Need to test with only a single item and column to make rtl match test ids
const testFilled = testVirtualTable({
  data: [{ id: 1 }],
  height: "200px",
  columns: [
    {
      HeaderContent: "Id",
      // eslint-disable-next-line react/prop-types
      CellContent: ({ item }) => <Text>{item.id}</Text>,
    },
  ],
});

testFilled("should render", async ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
  expect(queryByTestId(tableTestId)).not.toBeNull();
  expect(queryByTestId(headerTestId)).not.toBeNull();
  expect(queryByTestId(headerCellTestId)).not.toBeNull();
});

// TODO: Test more use cases & internal utils
