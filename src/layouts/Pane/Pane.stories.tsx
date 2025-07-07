import { Pane } from "./Pane.component";
import { FlexColumnLayout } from "../Flex";
import { GridLayout } from "../Grid";
import { GridItem } from "../GridItem";

import { componentSourceFactory } from "@docs/docs.utils";
import { breakpointLabels } from "@types";
import { cssVarUsage } from "@utils";

import { Button, Text } from "@components";

import type { PaneProps } from "./Pane.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource = componentSourceFactory<PaneProps>(
  "Pane",
  {
    // TODO
  },
  {
    expandedWidth: "15rem",
    collapsedWidth: "s-11",
    forceExpanded: false,
    children: null,
    dynamicContent: null,
    headLess: false,
    expandedBreakpoint: null,
    className: null,
    styleOverride: null,
    anchor: "left",
    top: 0,
    bottom: 0,
  }
);

const meta = {
  component: Pane,
  title: "Layouts/Pane/Stories",
  args: {
    children: (
      <FlexColumnLayout>
        <Text noWrap>Pane content</Text>
        <Button label="click me" />
      </FlexColumnLayout>
    ),
  },
  argTypes: {
    expandedBreakpoint: {
      options: breakpointLabels,
    },
    anchor: {
      options: ["left", "right"],
    },
    forceExpanded: {
      control: "boolean",
    },
    headLess: {
      control: "boolean",
    },
    expandedWidth: {
      control: "number",
    },
    collapsedWidth: {
      control: "number",
    },
  },
  decorators: [
    (Story) => (
      <GridLayout
        columns={["auto", "1fr"]}
        justify="center"
        fill
        styleOverride={{ height: "100%", minHeight: "300px" }}
      >
        <Story />
        <GridItem
          styleOverride={{
            background: cssVarUsage("gray-50"),
          }}
          align="center"
          justify="center"
          fill
        >
          <Text align="center" fill>
            [Page content]
          </Text>
        </GridItem>
      </GridLayout>
    ),
  ],
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Pane>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Breakpoint: Story = {
  args: {
    expandedBreakpoint: "MD",
  },
};

export const DynamicContent: Story = {
  args: {
    expandedBreakpoint: "LG",
    dynamicContent: ({ isCollapsed }) => (
      <FlexColumnLayout>
        <Text noWrap>Pane content</Text>
        <Text noWrap>is collapsed: {isCollapsed ? "true" : "false"}</Text>
      </FlexColumnLayout>
    ),
  },
};
