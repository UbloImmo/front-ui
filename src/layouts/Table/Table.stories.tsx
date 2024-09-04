import {
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./components";
import { TableCell } from "./components/TableCell";
import { Table } from "./Table.layout";
import { FlexRowLayout } from "../Flex";

import { componentSourceFactory } from "@docs/docs.utils";

import { Avatar, Badge, Text } from "@components";

import type { TableProps } from "./Table.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

const TableHeaderExample: ReactNode = (
  <TableHeader>
    <TableHeaderCell>Header 1</TableHeaderCell>
    <TableHeaderCell>Header 2</TableHeaderCell>
  </TableHeader>
);

const TableBodyExample1: ReactNode = (
  <TableBody>
    <TableRow>
      <TableCell padded>Body 1</TableCell>
      <TableCell padded>Body 2</TableCell>
    </TableRow>
    <TableRow>
      <TableCell padded>Body 3</TableCell>
      <TableCell padded>Body 4</TableCell>
    </TableRow>
  </TableBody>
);

const SpanExample: ReactNode = (
  <TableBody>
    <TableRow>
      <TableCell padded>Body 1</TableCell>
      <TableCell colSpan={2} padded>
        Body 2
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell padded>Body 3</TableCell>
      <TableCell padded>Body 4</TableCell>
      <TableCell padded>Body 5</TableCell>
    </TableRow>
  </TableBody>
);

const TableBodyExample2: ReactNode = (
  <TableBody>
    <TableRow>
      <TableCell padded>
        <FlexRowLayout gap="s-2" align="center">
          <Avatar name="Mathilde Carbonet" />
          <Text>[Firstname Lastname]</Text>
        </FlexRowLayout>
      </TableCell>
      <TableCell padded>
        <Badge icon="Alarm" label="Planned" />
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell padded>
        <FlexRowLayout gap="s-2" align="center">
          <Avatar name="Mathilde Carbonet" />
          <Text>[Firstname Lastname]</Text>
        </FlexRowLayout>
      </TableCell>
      <TableCell padded>
        <Badge icon="Alarm" label="Overdue" color="warning" />
      </TableCell>
    </TableRow>
  </TableBody>
);

// TODO: Enable horizontal scroll for large tables
const TableScrollViewExample: ReactNode = (
  <TableBody>
    <TableRow>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
    </TableRow>
    <TableRow>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
      <TableCell padded>Data</TableCell>
    </TableRow>
  </TableBody>
);

const componentSource = componentSourceFactory<TableProps>(
  "Table",
  Table.defaultProps
);

const meta = {
  component: Table,
  title: "Layouts/Table/Stories",
  args: {
    children: TableBodyExample1,
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithHeader: Story = {
  args: {
    children: [TableHeaderExample, TableBodyExample1],
  },
};

export const CustomContent: Story = {
  args: {
    children: [TableHeaderExample, TableBodyExample2],
  },
};

export const ColSpan: Story = {
  args: {
    children: SpanExample,
  },
};

export const ScrollView: Story = {
  args: {
    children: TableScrollViewExample,
  },
};
