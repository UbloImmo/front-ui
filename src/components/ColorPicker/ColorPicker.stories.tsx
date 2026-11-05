import { fn } from "storybook/test";

import { ColorPicker } from "./ColorPicker.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { ColorPickerProps } from "./ColorPicker.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<ColorPickerProps>(
  "ColorPicker",
  ColorPicker.__DEFAULT_PROPS
);

const meta = {
  component: ColorPicker,
  title: "Components/Forms/ColorPicker/Stories",
  args: {
    onChange: fn(),
    value: "maya",
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NoSelection: Story = {
  args: {
    value: null,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const Colors: Story = {
  args: {
    colors: ["gray", "maya", "mantis", "red"],
    value: "gray",
  },
};

export const Labels: Story = {
  args: {
    labels: {
      gray: "Grey",
      wisteria: "Purple",
      maya: "Blue",
      tiffany: "Teal",
      mantis: "Green",
      yellow: "Yellow",
      orange: "Orange",
      red: "Red",
      murrey: "Plum",
      kobicha: "Brown",
    },
  },
};
