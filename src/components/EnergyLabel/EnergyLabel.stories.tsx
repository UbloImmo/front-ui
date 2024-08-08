import { EnergyLabel } from "./EnergyLabel.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { EnergyLabelProps } from "./EnergyLabel.types";
import type { Meta, StoryObj } from "@storybook/react";

const args = {
  ...EnergyLabel.defaultProps,
};

const componentSource = componentSourceFactory<EnergyLabelProps>(
  "EnergyLabel",
  {
    value: "A",
    type: "DPE",
    state: "active",
  },
  EnergyLabel.defaultProps
);

const meta = {
  argTypes: {
    value: {
      options: ["A", "B", "C", "D", "E", "F", "G"],
    },
  },
  component: EnergyLabel,
  title: "Components/EnergyLabel/Stories",
  args: {
    type: "DPE",
    state: "inactive",
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof EnergyLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args,
};

export const ActiveState = (props: EnergyLabelProps) => {
  return (
    <ComponentVariants
      defaults={props}
      variants={["active", "inactive"]}
      for="state"
      of={EnergyLabel}
      align="center"
      propLabels
    />
  );
};
// <EnergyLabel {...args} state="active" />

ActiveState.args = {
  state: "active",
  value: "A",
};
