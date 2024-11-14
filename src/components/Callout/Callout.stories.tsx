import { Callout } from "./Callout.component";
import { Hypertext } from "../Hypertext";
import {
  calloutSizes,
  type CalloutColor,
  type CalloutProps,
} from "./Callout.types";
import { allIconNames } from "../Icon/Icon.types";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { useMergedProps } from "@utils";

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
    children: "[Label]",
    color: "primary",
  },
  argTypes: {
    color: {
      options: calloutColors,
      defaultValue: Callout.defaultProps.color,
    },
    icon: {
      options: ["auto", ...allIconNames],
      defaultValue: Callout.defaultProps.icon,
    },
    title: {
      type: "string",
      defaultValue: Callout.defaultProps.title,
    },
    size: {
      options: calloutSizes,
      defaultValue: Callout.defaultProps.size,
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
    calloutColors.map((color) => ({ ...meta.args, color }))
  ),
};

const withCustomIcons: DetailConfigVariants<CalloutProps> = [
  {
    color: "primary",
    icon: "EmojiSmile",
    children: "This callout has a custom icon",
    __propVariantLabel: "Primary with custom icon",
  },
  {
    color: "pending",
    icon: "Calendar3",
    children: "The next meeting is set for next week",
    __propVariantLabel: "Pending with custom icon",
  },
  {
    color: "error",
    icon: "FiletypePdf",
    children: "Please upload your file in a PDF format",
    __propVariantLabel: "Error with custom icon",
  },
  {
    color: "gray",
    icon: "Archive",
    children: "The file you uploaded will be archived",
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

const children = [
  "Callout short label",
  "This is a really, really, needlessly long label for a callout, to show how it behave with more text",
  <>
    This callout contains an embedded&nbsp;
    <Hypertext
      href="/?path=/docs/components-hypertext-usage--docs"
      title="Go to component"
    >
      Hypertext component
    </Hypertext>
    .
  </>,
  <>
    This one has <em>italics</em> and <strong>bold</strong> text.
  </>,
];

export const Labels = (props: CalloutProps) => {
  const defaultProps = useMergedProps(Callout.defaultProps, props);

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={children}
      for="children"
      of={Callout}
      columns={2}
      propLabels
    />
  );
};

Labels.parameters = {
  docs: componentSource(children.map((content) => ({ children: content }))),
};

export const WithTitle: Story = {
  args: { ...Callout.defaultProps, title: "This is the callout's title" },
};

export const WithHypertext: Story = {
  args: {
    ...Callout.defaultProps,
    size: "l",
    hyperText: { href: "/", title: "Go to link", children: "Go to link" },
  },
};

export const Sizes = () => {
  const defaultProps = useMergedProps(Callout.defaultProps, {
    title: "This is the callout's title",
    children: "This is the callout's content",
    hyperText: { href: "/", title: "Go to link", children: "Go to link" },
  });

  return (
    <ComponentVariants
      defaults={defaultProps}
      variants={calloutSizes}
      for="size"
      of={Callout}
      columns={1}
      propLabels
    />
  );
};

Sizes.args = {
  title: "This is the callout's title",
  children: "This is the callout's content",
  href: { href: "/", title: "Go to link", children: "Go to link" },
};

Sizes.parameters = {
  docs: componentSource(calloutSizes.map((size) => ({ ...Sizes.args, size }))),
};
