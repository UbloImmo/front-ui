import { Callout } from "./Callout.component";
import { Hypertext } from "../Hypertext";
import {
  calloutSizes,
  type CalloutColor,
  type CalloutProps,
} from "./Callout.types";
import { Icon } from "../Icon";
import { allIconNames } from "../Icon/Icon.types";
import { Text } from "../Text";

import { ComponentVariants, DetailConfigVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { Meta, StoryObj } from "@storybook/react-vite";

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

const defaults: CalloutProps = {
  children: "[Label]",
  color: "primary",
};

const meta = {
  component: Callout,
  title: "Components/Feedbacks/Callout/Stories",
  args: defaults,
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
      defaults={defaults}
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

const customChildren = (
  <FlexColumnLayout gap="s-2" fill>
    <FlexRowLayout gap="s-2" fill align="center">
      <Icon name="ArrowRight" />
      <Text weight="medium" color="gray-900">
        This callout&apos;s content is custom :
      </Text>
    </FlexRowLayout>
    <div>
      <Hypertext href="#" title="This is a Hypertext in a callout">
        Custom content
      </Hypertext>
    </div>
  </FlexColumnLayout>
);

export const WithCustomChildren: Story = {
  args: {
    ...Callout.defaultProps,
    children: customChildren,
  },
};

export const Sizes = () => {
  const defaultProps = useMergedProps(Callout.defaultProps, {
    title: "This is the callout's title",
    children: "This is the callout's content",
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
};

Sizes.parameters = {
  docs: componentSource(calloutSizes.map((size) => ({ ...Sizes.args, size }))),
};
