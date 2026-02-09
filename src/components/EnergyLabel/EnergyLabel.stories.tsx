import { EnergyLabel } from "./EnergyLabel.component";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";

import type { EnergyLabelProps } from "./EnergyLabel.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const args = {
  ...EnergyLabel.__DEFAULT_PROPS,
};

const componentSource = componentSourceFactory<EnergyLabelProps>(
  "EnergyLabel",
  {
    value: "A",
    type: "DPE",
    state: "active",
  },
  EnergyLabel.__DEFAULT_PROPS
);

const meta = {
  argTypes: {
    value: {
      options: ["A", "B", "C", "D", "E", "F", "G"],
    },
  },
  component: EnergyLabel,
  title: "Components/States/EnergyLabel/Stories",
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

export const States = (props: EnergyLabelProps) => {
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

States.args = {
  state: "active",
  value: "A",
};

export const ValuesDPE = (props: EnergyLabelProps) => {
  return (
    <ComponentVariants
      defaults={props}
      variants={["A", "B", "C", "D", "E", "F", "G", null]}
      for="value"
      of={EnergyLabel}
      align="center"
      propLabels
    />
  );
};

ValuesDPE.args = {
  state: "active",
  type: "DPE",
};

export const ValuesGES = (props: EnergyLabelProps) => {
  return (
    <ComponentVariants
      defaults={props}
      variants={["A", "B", "C", "D", "E", "F", "G", null]}
      for="value"
      of={EnergyLabel}
      align="center"
      propLabels
    />
  );
};

ValuesGES.args = {
  state: "active",
  type: "GES",
};

export const Types = (props: EnergyLabelProps) => {
  return (
    <ComponentVariants
      defaults={props}
      variants={["DPE", "GES"]}
      for="type"
      of={EnergyLabel}
      align="center"
      propLabels
    />
  );
};

Types.args = {
  value: "A",
  state: "active",
};
