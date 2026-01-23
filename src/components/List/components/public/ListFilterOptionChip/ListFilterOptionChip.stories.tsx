import { isNull, type Nullable } from "@ubloimmo/front-util";

import { ListFilterOptionChip } from "./ListFilterOptionChip.component";

import {
  filterOptionData,
  filterOptionMatch,
  type FilterOption,
} from "@/components/List/modules";
import { ComponentVariants, type DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type {
  ListFilterOptionChipDefaultProps,
  ListFilterOptionChipProps,
} from "./ListFilterOptionChip.types";
import type { IconName } from "@/components/Icon";
import type { Meta } from "@storybook/react-vite";
import type { ColorKey } from "@types";

type MockData = { value: number };

const mockOptionData = filterOptionData(
  "My option",
  filterOptionMatch<MockData>("value", "=", 0)
);

const filterOption: FilterOption<MockData> = {
  ...mockOptionData,
  select: () => {},
  unselect: () => {},
};

const defaultProps: ListFilterOptionChipDefaultProps<MockData> = {
  filterOption,
  filterDisabled: false,
};

const componentSource = componentSourceFactory<
  ListFilterOptionChipProps<MockData>,
  ListFilterOptionChipDefaultProps<MockData>
>("ListFilterOptionChip", defaultProps, defaultProps);

const meta = {
  component: ListFilterOptionChip,
  title: "Components/List/Components/ListFilterOptionChip/Stories",
  argTypes: {
    filterDisabled: {
      type: "boolean",
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ListFilterOptionChip<MockData>>;

export default meta;

export const Default = () => (
  <ListFilterOptionChip filterOption={filterOption} />
);

const labels = [
  "My option",
  "My other option",
  "My third option",
  "A very very veeeerryyy long option",
];

const labeledOptions = labels.map(
  (label): FilterOption<MockData> => ({
    ...filterOption,
    label,
  })
);

export const Labels = () => (
  <ComponentVariants
    for="filterOption"
    of={ListFilterOptionChip<MockData>}
    variants={labeledOptions}
    defaults={defaultProps}
    columns={2}
    propLabels
  />
);
Labels.parameters = {
  docs: componentSource(
    labeledOptions.map((option) => ({ filterOption: option }))
  ),
};

const colors: ColorKey[] = [
  "primary",
  "error",
  "warning",
  "pending",
  "success",
  "gray",
];
const coloredOptions = colors.map(
  (color): FilterOption<MockData> => ({
    ...filterOptionData(
      `A ${color} option`,
      filterOptionMatch<MockData>("value", "=", 0),
      {
        color,
      }
    ),
    select: () => {},
    unselect: () => {},
  })
);

export const Colors = () => (
  <ComponentVariants
    for="filterOption"
    of={ListFilterOptionChip<MockData>}
    variants={coloredOptions}
    defaults={defaultProps}
    columns={2}
    propLabels
  />
);
Colors.parameters = {
  docs: componentSource(
    coloredOptions.map((option) => ({ filterOption: option }))
  ),
};

const icons: Nullable<IconName>[] = [
  "Circle",
  "Triangle",
  "Square",
  "PersonCircle",
];

const iconOptions = icons.map(
  (icon): FilterOption<MockData> => ({
    ...filterOptionData(
      `A option with "${isNull(icon) ? "no" : icon}" icon`,
      filterOptionMatch<MockData>("value", "=", 0),
      {
        icon,
      }
    ),
    select: () => {},
    unselect: () => {},
  })
);

export const Icons = () => (
  <ComponentVariants
    for="filterOption"
    of={ListFilterOptionChip<MockData>}
    variants={iconOptions}
    defaults={defaultProps}
    columns={2}
    propLabels
  />
);
Icons.parameters = {
  docs: componentSource(
    iconOptions.map((option) => ({ filterOption: option }))
  ),
};

const disabledOptions: DetailConfigVariants<
  ListFilterOptionChipProps<MockData>
> = [
  {
    __propVariantLabel: "Disabled option",
    filterOption: {
      ...filterOption,
      disabled: true,
    },
  },
  {
    __propVariantLabel: "Disabled filter",
    filterOption,
    filterDisabled: true,
  },
  {
    __propVariantLabel: "Fixed option",
    filterOption: {
      ...filterOption,
      fixed: true,
    },
  },
];

export const Disabled = () => (
  <ComponentVariants
    variants={disabledOptions}
    defaults={defaultProps}
    of={ListFilterOptionChip<MockData>}
    propLabels
  />
);
Disabled.parameters = {
  docs: componentSource(
    disabledOptions.map(({ filterOption, filterDisabled }) => ({
      filterOption: filterOption as FilterOption<MockData>,
      filterDisabled,
    }))
  ),
};
