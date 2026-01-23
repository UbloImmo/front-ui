import { fn } from "storybook/test";

import { ListFilterOptionItem } from "./ListFilterOptionItem.component";

import {
  filterOptionData,
  filterOptionMatch,
  type FilterOption,
  type FilterOptionConfig,
} from "@/components/List/modules";
import { ComponentVariants, type DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { ListFilterOptionItemProps } from "./ListFilterOptionItem.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

type MockData = {
  value: number;
};

const mockOption = (
  label: string = "A single option",
  config: FilterOptionConfig = {}
): FilterOption<MockData> => ({
  ...filterOptionData(
    label,
    filterOptionMatch<MockData>("value", "=", 0),
    config
  ),
  select: fn(),
  unselect: fn(),
});

const defaultOption: FilterOption<MockData> = mockOption("A single option");

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
    option: mockOption("Unselected single option"),
    __propVariantLabel: "option.selected:false",
  },
  {
    option: mockOption("Selected single option", { initial: true }),
    __propVariantLabel: "option.selected:true",
  },
  {
    option: mockOption("Unselected multi option"),
    multi: true,
    __propVariantLabel: "option.selected:false, multi:true",
  },
  {
    option: mockOption("Selected multi option", { initial: true }),
    multi: true,
    __propVariantLabel: "option.selected:true, multi:true",
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

const icons: DetailConfigVariants<ListFilterOptionItemProps<MockData>> = [
  {
    option: defaultOption,
    __propVariantLabel: "option.icon:null",
  },
  {
    option: mockOption("Icon option", { icon: "Triangle" }),
    __propVariantLabel: "option.icon:Triangle",
  },
];

export const Icons = () => {
  return (
    <ComponentVariants
      defaults={{ option: defaultOption }}
      variants={icons}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};

const colors: DetailConfigVariants<ListFilterOptionItemProps<MockData>> = [
  {
    option: defaultOption,
    __propVariantLabel: "color:null",
  },
  {
    option: mockOption("Primary option", {
      color: "primary",
    }),
    __propVariantLabel: "color:primary",
  },
  {
    option: mockOption("Warning option", {
      color: "warning-medium",
    }),
    __propVariantLabel: "color:warning-medium",
  },
  {
    option: mockOption("Success option", {
      color: "success-dark",
    }),
    __propVariantLabel: "color:success-dark",
  },
];

export const Colors = () => {
  return (
    <ComponentVariants
      defaults={{ option: defaultOption }}
      variants={colors}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};

const booleans = [false, true];

const disabled: DetailConfigVariants<ListFilterOptionItemProps<MockData>> =
  booleans.flatMap((disabled) => ({
    option: mockOption(`${disabled ? "Disabled" : "Enabled"} option`, {
      disabled,
    }),
    __propVariantLabel: `disabled:${disabled}`,
  }));

export const Disabled = () => {
  return (
    <ComponentVariants
      defaults={{ option: defaultOption }}
      variants={disabled}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};

const fixed: DetailConfigVariants<ListFilterOptionItemProps<MockData>> =
  booleans.map((fixed) => ({
    option: mockOption(`${fixed ? "Fixed" : "Unfixed"} option`, {
      fixed,
    }),
    __propVariantLabel: `fixed:${fixed}`,
  }));

export const Fixed = () => {
  return (
    <ComponentVariants
      defaults={{ option: defaultOption }}
      variants={fixed}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};

const multis: DetailConfigVariants<ListFilterOptionItemProps<MockData>> =
  booleans.map((multi) => ({
    option: mockOption(`${multi ? "Multi" : "Single"} option`),
    multi,
    __propVariantLabel: `multi:${multi}`,
  }));

export const Multi = () => {
  return (
    <ComponentVariants<ListFilterOptionItemProps<MockData>>
      defaults={{ option: defaultOption }}
      variants={multis}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};

const highlighted: DetailConfigVariants<ListFilterOptionItemProps<MockData>> =
  booleans.map((highlighted) => ({
    option: mockOption(
      `${highlighted ? "Highlighted" : "Unhighlighted"} option`
    ),
    highlighted,
    __propVariantLabel: `highlighted:${highlighted}`,
  }));

export const Highlighted = () => {
  return (
    <ComponentVariants<ListFilterOptionItemProps<MockData>>
      defaults={{ option: defaultOption }}
      variants={highlighted}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};

const labels = [
  "Short label",
  "A much longer label that may very well be truncated",
];

const labelVariants: DetailConfigVariants<ListFilterOptionItemProps<MockData>> =
  labels.map((label) => ({
    option: mockOption(label),
    __propVariantLabel: `option.label:${label}`,
  }));

export const Labels = () => {
  return (
    <ComponentVariants
      defaults={{ option: defaultOption }}
      variants={labelVariants}
      of={ListFilterOptionItem<MockData>}
      propLabels
      columns={2}
    />
  );
};
