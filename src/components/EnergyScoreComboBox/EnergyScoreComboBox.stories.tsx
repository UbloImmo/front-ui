import { useState } from "react";

import { FlexColumnLayout, FlexRowLayout } from "../../layouts";
import { Text } from "../Text";
import { EnergyScoreComboBox } from "./EnergyScoreComboBox.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { EnergyScoreComboBoxProps } from "./EnergyScoreComboBox.types";
import type { EnergyLabelValue } from "../EnergyLabel/EnergyLabel.types";
import type { Meta, StoryObj } from "@storybook/react-vite";

const componentSource = componentSourceFactory<EnergyScoreComboBoxProps>(
  "EnergyScoreComboBox",
  {
    type: "DPE",
    value: "B",
  },
  EnergyScoreComboBox.__DEFAULT_PROPS
);

const meta = {
  title: "Components/States/EnergyScoreComboBox/Stories",
  component: EnergyScoreComboBox,
  args: { ...EnergyScoreComboBox.__DEFAULT_PROPS },
  argTypes: {
    type: { options: ["DPE", "GES"] },
    value: { options: ["A", "B", "C", "D", "E", "F", "G", null] },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof EnergyScoreComboBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = (props: Partial<EnergyScoreComboBoxProps>) => {
  const [value, setValue] = useState<EnergyLabelValue | null>(null);

  return (
    <FlexRowLayout gap="s-4" align="center" justify="start" wrap>
      <EnergyScoreComboBox
        {...EnergyScoreComboBox.__DEFAULT_PROPS}
        {...props}
        value={value}
        onChange={setValue}
      />
    </FlexRowLayout>
  );
};
Default.args = { type: "DPE" };

export const ColorCategories = () => {
  const [dpeValue, setDpeValue] = useState<EnergyLabelValue | null>(null);
  const [gesValue, setGesValue] = useState<EnergyLabelValue | null>(null);

  return (
    <FlexColumnLayout gap="s-4" align="start" justify="start">
      <FlexRowLayout gap="s-3" align="center" justify="start">
        <Text weight="bold" size="m" color="gray-800">
          DPE
        </Text>
        <EnergyScoreComboBox
          type="DPE"
          value={dpeValue}
          onChange={setDpeValue}
        />
      </FlexRowLayout>
      <FlexRowLayout gap="s-3" align="center" justify="start">
        <Text weight="bold" size="m" color="gray-800">
          GES
        </Text>
        <EnergyScoreComboBox
          type="GES"
          value={gesValue}
          onChange={setGesValue}
        />
      </FlexRowLayout>
    </FlexColumnLayout>
  );
};

export const ViewOnly: Story = {
  args: { type: "DPE", value: "C", readOnly: true },
};

export const Empty: Story = {
  args: { type: "DPE", value: null, readOnly: true },
};

export const Error: Story = {
  args: { type: "DPE", value: null, error: true },
};
