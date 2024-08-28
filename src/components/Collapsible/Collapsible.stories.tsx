import { Collapsible } from "./Collapsible.component";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";

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

const defaultChildrenProperty = <Text>[children]</Text>;

const defaultCollapsibleComponent = {
  ...Collapsible.defaultProps,
  children: defaultChildrenProperty,
};

const defaultCollapsibleChildren: CollapsibleDefaultProps = {
  ...defaultCollapsibleComponent,
  subCollapsibles: [
    {
      ...Collapsible.defaultProps,
      children: defaultChildrenProperty,
      subCollapsibles: [defaultCollapsibleComponent],
    },
  ],
};

const CustomCollapsibleChildren = (
  <FlexRowLayout align="center" fill gap="s-2">
    <StaticIcon name="BuildingBlocks" color="primary" />
    <Text>Collapsible children</Text>
  </FlexRowLayout>
);

const CustomSubCollapsibles: CollapsibleDefaultProps[] = [
  {
    isOpen: false,
    onOpenChange: false,
    disabled: false,
    compact: false,
    children: CustomCollapsibleChildren,
    subCollapsibles: [defaultCollapsibleComponent, defaultCollapsibleComponent],
  },
  {
    isOpen: false,
    onOpenChange: false,
    disabled: false,
    compact: false,
    children: <Text>Sub collapsible children 2</Text>,
    subCollapsibles: null,
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
    children: CustomCollapsibleChildren,
    subCollapsibles: CustomSubCollapsibles,
  },
};
