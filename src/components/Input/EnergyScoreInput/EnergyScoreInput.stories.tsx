import { fn } from "@storybook/test";

import { EnergyScoreInput } from "./EnergyScoreInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Forms/Input/EnergyScoreInput/Stories",
  component: EnergyScoreInput,
  args: {
    uncontrolled: true,
  },
  argTypes: {
    type: {
      options: ["energy", "climate"],
      description:
        "Type of score to calculate (energy consumption or climate impact)",
      table: {
        defaultValue: { summary: "energy" },
      },
    },
  },
} satisfies Meta<typeof EnergyScoreInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: "energy",
    placeholder: "Number input",
    onLabelChange: fn(),
  },
};

export const Climate: Story = {
  args: {
    type: "climate",
    placeholder: "Number input",
    onLabelChange: fn(),
  },
};

export const Disabled: Story = {
  args: {
    type: "energy",
    placeholder: "Number input",
    disabled: true,
    onLabelChange: fn(),
  },
};
