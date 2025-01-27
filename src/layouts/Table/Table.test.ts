import { expect } from "bun:test";

import {
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableScrollView,
} from "./components";
import { Table } from "./Table.layout";

import { testComponentFactory } from "@/tests";

const testTable = testComponentFactory("Table", Table);
const testId = "table";

testTable(Table.defaultProps)("should render", ({ queryByTestId }) => {
  expect(queryByTestId(testId)).not.toBeNull();
});

const testTableScrollView = testComponentFactory(
  "TableScrollView",
  TableScrollView,
);

testTableScrollView({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("table-scroll-view")).not.toBeNull();
});

const testTableHeader = testComponentFactory("TableHeader", TableHeader);

testTableHeader({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("table-header")).not.toBeNull();
});

const testTableHeaderCell = testComponentFactory(
  "TableHeaderCell",
  TableHeaderCell,
);

testTableHeaderCell({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("table-header-cell")).not.toBeNull();
});

const testTableBody = testComponentFactory("TableBody", TableBody);

testTableBody({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("table-body")).not.toBeNull();
});

const testTableRow = testComponentFactory("TableRow", TableRow);

testTableRow({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("table-row")).not.toBeNull();
});

const testTableCell = testComponentFactory("TableCell", TableCell);

testTableCell({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("table-cell")).not.toBeNull();
});

const testTableFooter = testComponentFactory("TableFooter", TableFooter);

testTableFooter({})("should render", ({ queryByTestId }) => {
  expect(queryByTestId("table-footer")).not.toBeNull();
});
