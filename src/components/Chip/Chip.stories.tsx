import { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { fn } from "storybook/test";

import { Chip } from "./Chip.component";
import { GENERATED_ICON_NAMES } from "../Icon/__generated__/iconName.types";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { ChipProps } from "./Chip.types";
import type { DirectionHorizontal } from "@/types/global/direction.types";
import type { ColorKey } from "@types";

const defaultMockProps = {
  ...Chip.__DEFAULT_PROPS,
  onClick: fn(),
};

const componentSource = componentSourceFactory<ChipProps>(
  "Chip",
  {
    label: "[Chip]",
    icon: "Square",
  },
  Chip.__DEFAULT_PROPS
);

const colors: ColorKey[] = [
  "primary",
  "success",
  "pending",
  "warning",
  "error",
  "gray",
];

const placements: DirectionHorizontal[] = ["left", "right"];

const meta = {
  title: "Components/Actions/Chip/Stories",
  component: Chip,
  args: {
    ...defaultMockProps,
  },
  argTypes: {
    label: {
      control: "text",
    },
    iconPlacement: {
      options: placements,
    },
    color: {
      options: colors,
    },
    icon: {
      options: GENERATED_ICON_NAMES,
    },
  },
  decorators: [
    (Story) => (
      <FlexColumnLayout gap="s-2">
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
  const mergedProps = useMergedProps(Chip.__DEFAULT_PROPS, props);
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
    colors.flatMap((color) => ({
      color,
      label: "[Chip]",
      icon: "Square",
      deleteButtonTitle: "[Delete action]",
    }))
  ),
};

export const Placement = (props: Partial<ChipProps>) => {
  const mergedProps = useMergedProps(Chip.__DEFAULT_PROPS, {
    ...props,
    icon: "Square",
  });
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={placements}
      for="iconPlacement"
      of={Chip}
      align="center"
      propLabels
    />
  );
};

Placement.parameters = {
  docs: componentSource(
    placements.flatMap((placement) => ({
      iconPlacement: placement,
      label: "[Chip]",
      icon: "Square",
      deleteButtonTitle: "[Delete action]",
    }))
  ),
};

export const Disabled = (props: Partial<ChipProps>) => {
  const mergedProps = useMergedProps(Chip.__DEFAULT_PROPS, props);
  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={[false, true]}
      for="disabled"
      of={Chip}
      align="center"
      propLabels
    />
  );
};

export const WithDelete = (props: Partial<ChipProps>) => {
  const [labels, setLabels] = useState(["Delete me ...", "... or Delete me!"]);

  const handleDelete = (label: string) => {
    const updatedLabel = labels.filter(
      (selectedLabel) => selectedLabel !== label
    );
    setLabels(updatedLabel);
  };

  const mergedProps = useMergedProps(Chip.__DEFAULT_PROPS, props);
  return (
    <FlexRowLayout gap="s-2" align="center">
      {labels.map((label) => (
        <Chip
          {...mergedProps}
          key={label}
          label={label}
          onDelete={() => handleDelete(label)}
        />
      ))}
    </FlexRowLayout>
  );
};
