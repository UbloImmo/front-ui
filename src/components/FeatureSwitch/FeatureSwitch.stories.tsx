import { FeatureSwitch } from "./FeatureSwitch.component";
import { type FeatureSwitchProps } from "./FeatureSwitch.types";

import { componentSourceFactory } from "@docs/docs.utils";

import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<FeatureSwitchProps>(
  "FeatureSwitch",
  FeatureSwitch.defaultProps
);

const meta = {
  component: FeatureSwitch,
  title: "Components/FeatureSwitch/Stories",
  args: {
    icon: "Square",
    name: "Feature Switch",
    description: "Description",
    variant: "switch",
  },
  parameters: {
    docs: componentSource(),
  },
  argTypes: {
    variant: {
      options: ["checkbox", "switch", "select"],
      control: {
        type: "select",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    compact: {
      control: {
        type: "boolean",
      },
    },
    tooltipText: {
      control: {
        type: "text",
      },
    },
    icon: {
      control: {
        type: "text",
      },
    },
    name: {
      control: {
        type: "text",
      },
    },
    description: {
      control: {
        type: "text",
      },
    },
  },
} satisfies Meta<typeof FeatureSwitch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
