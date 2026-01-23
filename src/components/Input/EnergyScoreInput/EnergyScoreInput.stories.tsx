import { EnergyScoreInput } from "./EnergyScoreInput.component";

import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Components/Forms/Input/EnergyScoreInput/Stories",
  component: EnergyScoreInput,
  args: {
    uncontrolled: true,
  },
  argTypes: {
    scoreType: {
      options: ["DPE", "GES"],
      description:
        "Type of score to calculate (energy consumption or climate impact)",
      table: {
        defaultValue: { summary: "DPE" },
      },
    },
  },
} satisfies Meta<typeof EnergyScoreInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scoreType: "DPE",
    placeholder: "Number input",
  },
};

export const Climate: Story = {
  args: {
    scoreType: "GES",
    placeholder: "Number input",
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Number input",
    disabled: true,
    value: 100,
  },
};
