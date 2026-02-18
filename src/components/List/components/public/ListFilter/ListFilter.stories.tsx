import { fn } from "storybook/test";

import { ListFilter } from "./ListFilter.component";

import {
  type Filter,
  filterData,
  type FilterOption,
  filterOptionData,
  filterOptionMatch,
} from "@/components/List/modules";
import { ComponentVariants, type PropVariant } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { ListFilterProps } from "./ListFilter.types";
import type { Meta, StoryFn, StoryObj } from "@storybook/react-vite";

type MockData = { value: number };

const mockOptionData = filterOptionData(
  "My option with a really, really, extremely long label that is suuuuper long",
  filterOptionMatch<MockData>("value", "=", 0)
);

const mockOptionData2 = filterOptionData(
  "A shorter option",
  filterOptionMatch<MockData>("value", "=", 1),
  {
    default: true,
  }
);
const mockFilterData = filterData("My filter", [
  mockOptionData,
  mockOptionData2,
]);

const filterOption: FilterOption<MockData> = {
  ...mockOptionData,
  select: fn(),
  unselect: fn(),
};

const filterOption2: FilterOption<MockData> = {
  ...mockOptionData2,
  select: fn(),
  unselect: fn(),
};

const filter: Filter<MockData> = {
  ...mockFilterData,
  active: true,
  options: [filterOption, filterOption2],
  clear: fn(),
  selectAll: fn(),
  selectedOptions: [filterOption],
};

const defaultProps: Required<ListFilterProps<MockData>> = {
  filter,
  signature: "",
  open: false,
  onOpened: fn(),
  onClosed: fn(),
};

const componentSource = componentSourceFactory<
  ListFilterProps<MockData>,
  Required<ListFilterProps<MockData>>
>("ListFilter", defaultProps, defaultProps);

const meta = {
  component: ListFilter,
  title: "Components/List/Components/ListFilter/Stories",
  argTypes: {
    open: {
      type: "boolean",
    },
  },
  args: defaultProps as Partial<ListFilterProps>,
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ListFilter>;

type Story = StoryFn<typeof meta> | StoryObj<typeof meta>;

export default meta;

export const Default: Story = {
  args: defaultProps as Partial<ListFilterProps>,
};

const multiFilters: PropVariant<ListFilterProps>[] = [
  {
    __propVariantLabel: "filter.multi:false",
    filter: { ...filter, multi: false },
  },
  { __propVariantLabel: "filter.multi:true", filter },
] as PropVariant<ListFilterProps>[];
export const Multi = (props: ListFilterProps) => {
  const defaults = useMergedProps<Required<ListFilterProps>, ListFilterProps>(
    defaultProps as Required<ListFilterProps>,
    { ...props, open: true }
  );

  return (
    <ComponentVariants
      of={ListFilter}
      variants={multiFilters}
      defaults={defaults}
      columns={2}
      propLabels
    />
  );
};

const bools = [false, true];
export const Open = (props: ListFilterProps) => {
  const defaults = useMergedProps<Required<ListFilterProps>, ListFilterProps>(
    defaultProps as Required<ListFilterProps>,
    props
  );

  return (
    <ComponentVariants
      for="open"
      of={ListFilter}
      variants={bools}
      defaults={defaults}
      columns={2}
      propLabels
    />
  );
};
