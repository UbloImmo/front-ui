import { StateIndicator } from "./StateIndicator.component";
import { GENERATED_ICON_NAMES } from "../Icon/__generated__/iconName.types";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { StateIndicatorProps } from "./StateIndicator.types";
import type { IconName } from "../Icon/Icon.types";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ColorKeyOrWhite } from "@types";

const componentTemplate = componentSourceFactory(
  "StateIndicator",
  {},
  StateIndicator.__DEFAULT_PROPS
);

const colors: ColorKeyOrWhite[] = [
  "primary",
  "success",
  "pending",
  "warning",
  "error",
  "gray",
  "white",
];

const meta = {
  title: "Components/States/StateIndicator/Stories",
  component: StateIndicator,
  argTypes: {
    label: {
      control: "text",
    },
    icon: {
      options: GENERATED_ICON_NAMES,
    },
    color: {
      options: colors,
    },
  },
  parameters: {
    docs: componentTemplate(),
  },
} satisfies Meta<typeof StateIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: StateIndicator.__DEFAULT_PROPS,
  parameters: {
    docs: componentTemplate(),
  },
};

export const Colors = (props: StateIndicatorProps) => {
  const mergedProps = useMergedProps(StateIndicator.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={colors}
      for="color"
      of={StateIndicator}
      align="center"
      columns={4}
      propLabels
      scaling={1}
    />
  );
};

const icons: IconName[] = [
  "Circle",
  "CircleHalf",
  "CircleFill",
  "HexagonHalf",
  "HexagonFill",
  "ArchiveFill",
];
export const Icons = (props: StateIndicatorProps) => {
  const mergedProps = useMergedProps(StateIndicator.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={icons}
      for="icon"
      of={StateIndicator}
      align="center"
      columns={4}
      propLabels
      scaling={1}
    />
  );
};

const labels = [
  "A random label",
  "A really, really, really needlessly long label",
  "Some state's label",
  "Another really, really, really needlessly long label",
  "A somewhat long label",
  "Yet another really, really, really needlessly long and exhaustive label",
];
export const Labels = (props: StateIndicatorProps) => {
  const mergedProps = useMergedProps(StateIndicator.__DEFAULT_PROPS, props);

  return (
    <ComponentVariants
      defaults={mergedProps}
      variants={labels}
      for="label"
      of={StateIndicator}
      align="center"
      columns={2}
      propLabels
      scaling={1}
    />
  );
};
