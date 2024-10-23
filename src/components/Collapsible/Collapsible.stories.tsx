import { Collapsible } from "./Collapsible.component";
import { Badge } from "../Badge";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexRowLayout } from "@layouts";

import type {
  CollapsibleDefaultProps,
  CollapsibleProps,
} from "./Collapsible.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<CollapsibleProps>(
  "Collapsible",
  Collapsible.defaultProps
);

const defaultChildren = <Text>[children]</Text>;

const customChildren = (
  <FlexRowLayout align="center" fill gap="s-2">
    <StaticIcon name="BuildingBlocks" color="primary" />
    <Text>Collapsible children</Text>
  </FlexRowLayout>
);

const customChildren2 = (
  <FlexRowLayout align="center" fill gap="s-2" justify="space-between">
    <Text>Collapsible children 2</Text>
    <Badge label="Badge" />
  </FlexRowLayout>
);

const defaultCollapsibleComponent = {
  ...Collapsible.defaultProps,
  children: defaultChildren,
};

const defaultCollapsibleChildren: CollapsibleDefaultProps = {
  ...defaultCollapsibleComponent,
  subCollapsibles: [
    {
      ...defaultCollapsibleComponent,
      subCollapsibles: [defaultCollapsibleComponent],
    },
  ],
};

const CustomSubCollapsibles: CollapsibleDefaultProps[] = [
  {
    open: false,
    defaultOpen: false,
    onOpenChange: null,
    disabled: false,
    compact: false,
    children: customChildren2,
    subCollapsibles: [defaultCollapsibleComponent, defaultCollapsibleComponent],
  },
  {
    open: false,
    defaultOpen: false,
    onOpenChange: null,
    disabled: false,
    compact: false,
    children: customChildren2,
    subCollapsibles: [
      {
        ...Collapsible.defaultProps,
        children: customChildren,
      },
    ],
  },
];

const meta = {
  component: Collapsible,
  title: "Components/Collapsible/Stories",
  args: {
    ...defaultCollapsibleChildren,
    subCollapsibles: [defaultCollapsibleChildren],
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomChildren: Story = {
  args: {
    children: customChildren,
    subCollapsibles: CustomSubCollapsibles,
  },
};

export const Compact = () => {
  return (
    <ComponentVariants
      of={Collapsible}
      variants={[false, true]}
      for="compact"
      defaults={{ ...defaultCollapsibleChildren, open: true }}
      columns={2}
      propLabels
    />
  );
};
