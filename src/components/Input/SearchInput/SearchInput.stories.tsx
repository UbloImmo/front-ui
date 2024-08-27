import { fn } from "@storybook/test";

import { SearchInput } from "./SearchInput.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { SearchInputProps } from "./SearchInput.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<SearchInputProps>(
  "SearchInput",
  {
    // TODO
  },
  SearchInput.defaultProps
);

const meta = {
  component: SearchInput,
  title: "Components/Input/SearchInput/Stories",
  args: {
    placeholder: "Type your query...",
    options: [
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
    ],
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
