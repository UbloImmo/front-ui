import React from "react";

import { EnergyScoreInput } from "./EnergyScoreInput.component";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Forms/Input/EnergyScoreInput/Stories",
  component: EnergyScoreInput,
  decorators: [
    (Story, context) => {
      const [value, setValue] = React.useState<number | null>(
        context.args.value ?? 100
      );
      return <Story args={{ ...context.args, value, onChange: setValue }} />;
    },
  ],
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
    value: 100,
    placeholder: "Number input",
  },
};

export const Climate: Story = {
  args: {
    type: "climate",
    value: 100,
    placeholder: "Number input",
  },
};

export const Disabled: Story = {
  args: {
    type: "energy",
    value: 200,
    placeholder: "Number input",
    disabled: true,
  },
};
