import { fn } from "@storybook/test";

import { ListFilterOptionItem } from "./ListFilterOptionItem.component";

import {
  filterOptionData,
  filterOptionMatch,
  type FilterOption,
} from "@/components/List/modules";
import { ComponentVariants, type DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { ListFilterOptionItemProps } from "./ListFilterOptionItem.types";
import type { Meta, StoryObj } from "@storybook/react";

type MockData = {
  value: number;
};

const defaultOption: FilterOption<MockData> = {
  ...filterOptionData(
    "A single option",
    filterOptionMatch<MockData>("value", "=", 0),
  ),
  select: fn(),
  unselect: fn(),
};

const componentSource = componentSourceFactory<
  ListFilterOptionItemProps<MockData>,
  Required<ListFilterOptionItemProps<MockData>>
>("ListFilterOptionItemProps");

const meta = {
  component: ListFilterOptionItem<MockData>,
  title: "Components/List/Components/ListFilterOptionItem/Stories",
  argTypes: {
    highlighted: {
      type: "boolean",
    },
    multi: {
      type: "boolean",
    },
  },
  args: {
    closeFilter: fn(),
  },
} satisfies Meta<typeof ListFilterOptionItem<MockData>>;
type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: {
    option: defaultOption,
  },
  parameters: {
    docs: componentSource([{ option: defaultOption }]),
  },
};

const selections: DetailConfigVariants<ListFilterOptionItemProps<MockData>> = [
  {
    option: defaultOption,
    __propVariantLabel: "unselected",
  },
  {
    option: { ...defaultOption, selected: true },
    __propVariantLabel: "selected",
  },
  {
    option: defaultOption,
    multi: true,
    __propVariantLabel: "unselected & multi",
  },
  {
    option: { ...defaultOption, selected: true },
    multi: true,
    __propVariantLabel: "selected & multi",
  },
];

export const Selections = () => {
  return (
    <ComponentVariants
      defaults={{ option: defaultOption }}
      variants={selections}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};
