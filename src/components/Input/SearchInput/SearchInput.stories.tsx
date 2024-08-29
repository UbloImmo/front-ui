import { fn } from "@storybook/test";

import { SearchInput } from "./SearchInput.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { SearchInputProps } from "./SearchInput.types";
import type { IconName } from "@/components/Icon";
import type { Meta, StoryObj } from "@storybook/react";
import type { NullishPrimitives } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<
  SearchInputProps<NullishPrimitives>
>("SearchInput", SearchInput.defaultProps);

const getResults = () => {
  return [
    {
      label: "Option 1",
      value: "option-1",
    },
    {
      label: "Option 2",
      value: "option-2",
    },
    {
      label: "Option 3",
      value: "option-3",
    },
  ];
};

const meta = {
  component: SearchInput,
  title: "Components/Input/SearchInput/Stories",
  args: {
    placeholder: "Type your query...",
    results: getResults,
    onChange: fn(),
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    error: {
      type: "boolean",
    },
    disabled: {
      type: "boolean",
    },
    required: {
      type: "boolean",
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const controlIcons: IconName[] = ["Search", "Person", "BuildingAdd", "Bank"];

export const ControlIcon = () => {
  return (
    <ComponentVariants
      defaults={meta.args}
      variants={controlIcons}
      of={SearchInput}
      for="controlIcon"
      propLabels
    />
  );
};
