import { useState } from "react";

import { ListFilterPreset } from "./ListFilterPreset.component";
import { ListFilterPresetProps } from "./ListFilterPreset.types";

import {
  filterOptionData,
  filterOptionMatch,
  filterPresetData,
  type FilterOption,
  type FilterPreset,
} from "@/components/List/modules";
import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { Meta } from "@storybook/react";

type MockData = { value: number };

const mockOptionData = filterOptionData("Option 1", [
  filterOptionMatch<MockData>("value", "=", 1),
]);

const filterOption: FilterOption<MockData> = {
  ...mockOptionData,
  select: () => {},
  unselect: () => {},
};

const mockFilterPreset = filterPresetData("My filter preset", [mockOptionData]);

const filterPreset: FilterPreset<MockData> = {
  ...mockFilterPreset,
  options: [filterOption],
  active: false,
  count: 12,
  select: () => {},
  unselect: () => {},
  toggle: () => {},
};

const componentSource = componentSourceFactory<
  ListFilterPresetProps<MockData>,
  Required<ListFilterPresetProps<MockData>>
>("ListFilterPreset");

const meta = {
  component: ListFilterPreset,
  title: "Components/List/Components/ListFilterPreset/Stories",
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ListFilterPreset>;

export default meta;

const defaultProps: ListFilterPresetProps<MockData> = {
  filterPreset,
};

export const Default = () => <ListFilterPreset filterPreset={filterPreset} />;

export const Active = () => (
  <ComponentVariants
    for="filterPreset"
    of={ListFilterPreset<MockData>}
    variants={[
      filterPreset,
      {
        ...filterPreset,
        active: true,
      },
    ]}
    defaults={defaultProps}
    propLabels
  />
);

export const Disabled = () => (
  <ComponentVariants
    for="filterPreset"
    of={ListFilterPreset<MockData>}
    variants={[
      filterPreset,
      {
        ...filterPreset,
        disabled: true,
      },
    ]}
    defaults={defaultProps}
    propLabels
  />
);

export const Toggle = () => {
  const [active, setActive] = useState(false);
  const preset: FilterPreset<MockData> = {
    ...filterPreset,
    active,
    toggle: () => setActive(!active),
  };
  return <ListFilterPreset filterPreset={preset} />;
};
