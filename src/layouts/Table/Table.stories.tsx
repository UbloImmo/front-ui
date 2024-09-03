import { Table } from "./Table.layout";

import { componentSourceFactory } from "@docs/docs.utils";

import type { TableProps } from "./Table.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<TableProps>(
  "Table",
  {
    // TODO
  },
  Table.defaultProps
);

const meta = {
  component: Table,
  title: "Layouts/Table/Stories",
  args: {
    // TODO
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
