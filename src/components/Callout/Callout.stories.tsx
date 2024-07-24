import { Callout } from "./Callout.component";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

import type { CalloutColor, CalloutProps } from "./Callout.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<CalloutProps>(
  "Callout",
  Callout.defaultProps
);

const calloutColors: CalloutColor[] = [
  "primary",
  "pending",
  "warning",
  "error",
  "gray",
];

const meta = {
  component: Callout,
  title: "Components/Callout/Stories",
  args: {
    label: "[Label]",
    color: "primary",
  },
  argTypes: {
    color: {
      options: calloutColors,
      defaultValue: Callout.defaultProps.color,
    },
    label: {
      type: "string",
      defaultValue: Callout.defaultProps.label,
    },
    icon: {
      options: ["auto", ...allIconNames],
      defaultValue: Callout.defaultProps.icon,
    },
    title: {
      type: "string",
      defaultValue: Callout.defaultProps.title,
    },
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Colors = () => {
  return (
    <ComponentVariants
      defaults={meta.args}
      variants={calloutColors}
      for="color"
      of={Callout}
      align="center"
      columns={2}
      propLabels
    />
  );
};

Colors.parameters = {
  docs: componentSource(
    calloutColors.map((color) => ({ ...Callout.defaultProps, color }))
  ),
};

const withCustomIcons: DetailConfigVariants<CalloutProps> = [
  {
    color: "primary",
    icon: "EmojiSmile",
    label: "This callout has a custom icon",
    __propVariantLabel: "Primary with custom icon",
  },
  {
    color: "pending",
    icon: "Calendar3",
    label: "The next meeting is set for next week",
    __propVariantLabel: "Pending with custom icon",
  },
  {
    color: "error",
    icon: "FiletypePdf",
    label: "Please upload your file in a PDF format",
    __propVariantLabel: "Error with custom icon",
  },
  {
    color: "gray",
    icon: "Archive",
    label: "The file you uploaded will be archived",
    __propVariantLabel: "Gray with custom icon",
  },
];

export const WithCustomIcon = (props: CalloutProps) => {
  const defaultProps = useMergedProps(Callout.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={withCustomIcons}
      of={Callout}
      align="center"
      columns={2}
      propLabels
    />
  );
};

WithCustomIcon.parameters = {
  docs: componentSource(
    withCustomIcons.map(
      ({ ...variant }): CalloutProps => ({
        ...Callout.defaultProps,
        ...variant,
      })
    )
  ),
};

export const WithoutIcon: Story = {
  args: { ...Callout.defaultProps, icon: null },
};

const labels = [
  "Callout short label",
  "This is a really, really, needlessly long label for a callout, to show how it behave with more text",
];

export const Labels = (props: CalloutProps) => {
  const defaultProps = useMergedProps(Callout.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={labels}
      for="label"
      of={Callout}
      columns={2}
      propLabels
    />
  );
};

Labels.parameters = {
  docs: componentSource(labels.map((label) => ({ label }))),
};

export const WithTitle: Story = {
  args: { ...Callout.defaultProps, title: "This is the callout's title" },
};
