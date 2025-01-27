import {
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./components";
import { TableCell } from "./components/TableCell";
import { TableScrollView } from "./components/TableScrollView/TableScrollView.component";
import { Table } from "./Table.layout";
import { FlexRowLayout } from "../Flex";

import { breakpointsPx } from "@/sizes";
import { componentSourceFactory } from "@docs/docs.utils";
import { arrayOf } from "@utils";

import { Avatar, Badge, Text } from "@components";

import type { TableProps } from "./Table.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";

const HeaderExample: ReactNode = (
  <TableHeader>
    <TableHeaderCell>Header 1</TableHeaderCell>
    <TableHeaderCell>Header 2</TableHeaderCell>
  </TableHeader>
);

const DefaultExample: ReactNode = (
  <TableBody>
    <TableRow>
      <TableCell padded>Data 1</TableCell>
      <TableCell padded>Data 2</TableCell>
    </TableRow>
    <TableRow>
      <TableCell padded>Data 3</TableCell>
      <TableCell padded>Data 4</TableCell>
    </TableRow>
  </TableBody>
);

const PaddingExample: ReactNode = (
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell padded>Data 2</TableCell>
    </TableRow>
  </TableBody>
);

const SpanExample: ReactNode = (
  <TableBody>
    <TableRow>
      <TableCell padded>Data 1</TableCell>
      <TableCell colSpan={2} padded>
        Data 2
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell padded>Data 3</TableCell>
      <TableCell padded>Data 4</TableCell>
      <TableCell padded>Data 5</TableCell>
    </TableRow>
  </TableBody>
);

const CustomContentExample: ReactNode = (
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

const ScrollViewExample: ReactNode = (
  <TableBody>
    {arrayOf(2, (index) => (
      <TableRow key={index}>
        {arrayOf(10, (index) => (
          <TableCell padded key={index}>
            Data {index + 1}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

const ListStyleExample: ReactNode = (
  <TableBody style="list">
    {arrayOf(2, (index) => (
      <TableRow style="list" key={index}>
        {arrayOf(10, (index) => (
          <TableCell padded key={index}>
            Data {index + 1}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

const componentSource = componentSourceFactory<TableProps>(
  "Table",
  Table.defaultProps,
);

const meta = {
  component: Table,
  title: "Layouts/Table/Stories",
  args: {
    children: DefaultExample,
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
    children: [HeaderExample, DefaultExample],
  },
  parameters: {
    docs: componentSource([{ children: [HeaderExample, DefaultExample] }]),
  },
};

export const WithPadding: Story = {
  args: {
    children: PaddingExample,
  },
  parameters: {
    docs: componentSource([{ children: PaddingExample }]),
  },
};

export const CustomContent: Story = {
  args: {
    children: [HeaderExample, CustomContentExample],
  },
  parameters: {
    docs: componentSource([
      { children: [HeaderExample, CustomContentExample] },
    ]),
  },
};

export const ColSpan: Story = {
  args: {
    children: SpanExample,
  },
  parameters: {
    docs: componentSource([{ children: SpanExample }]),
  },
};

export const ScrollView: Story = {
  args: {
    children: ScrollViewExample,
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: breakpointsPx.XXS }}>
        <TableScrollView>
          <Story />
        </TableScrollView>
      </div>
    ),
  ],
  parameters: {
    docs: componentSource([{ children: ScrollViewExample }]),
  },
};

export const ListStyle: Story = {
  args: {
    children: ListStyleExample,
  },
  parameters: {
    docs: componentSource([{ children: ListStyleExample }]),
  },
};
