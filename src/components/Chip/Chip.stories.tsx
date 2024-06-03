import { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { useState } from "react";

import { Chip } from "./Chip.component";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { ChipProps, IconPlacement } from "./Chip.types";
import type { ColorKey } from "@types";

const defaultMockProps = {
  ...Chip.defaultProps,
  onClick: fn(),
};

const componentSource = componentSourceFactory<ChipProps>(
  "Chip",
  {
    label: "[Chip]",
    icon: "Square",
  },
  Chip.defaultProps
);

const colors: ColorKey[] = [
  "primary",
  "success",
  "pending",
  "warning",
  "error",
  "gray",
];

const placement: IconPlacement[] = ["left", "right"];

const meta = {
  title: "Components/Chip/Stories",
  component: Chip,
  args: {
    ...defaultMockProps,
  },
  argTypes: {
    label: {
      control: "text",
    },
    iconPlacement: {
      options: placement,
    },
    color: {
      options: colors,
    },
    icon: {
      options: allIconNames,
    },
  },
  decorators: [
    (Story) => (
      <FlexColumnLayout gap="s-8">
        <Story />
      </FlexColumnLayout>
    ),
  ],
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors = (props: Partial<ChipProps>) => {
  const mergedProps = useMergedProps(Chip.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={colors}
      for="color"
      of={Chip}
      align="center"
      propLabels
    />
  );
};

Colors.parameters = {
  docs: componentSource(
    colors.flatMap((color) => ({ color, label: "[Chip]", icon: "Square" }))
  ),
};

export const Placement = (props: Partial<ChipProps>) => {
  const mergedProps = useMergedProps(Chip.defaultProps, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={placement}
      for="iconPlacement"
      of={Chip}
      align="center"
      propLabels
    />
  );
};

Placement.parameters = {
  docs: componentSource(
    placement.flatMap((placement) => ({
      iconPlacement: placement,
      label: "[Chip]",
      icon: "Square",
    }))
  ),
};

export const WithDelete = (props: Partial<ChipProps>) => {
  const [labels, setLabels] = useState(["Delete me ...", "... or Delete me!"]);

  const handleDelete = (label: string) => {
    const updatedLabel = labels.filter(
      (selectedLabel) => selectedLabel !== label
    );
    setLabels(updatedLabel);
  };

  const mergedProps = useMergedProps(Chip.defaultProps, props);
  return (
    <FlexRowLayout gap="s-8" align="center">
      {labels.map((label) => (
        <Chip
          {...mergedProps}
          key={label}
          label={label}
          onClick={() => handleDelete(label)}
        />
      ))}
    </FlexRowLayout>
  );
};
