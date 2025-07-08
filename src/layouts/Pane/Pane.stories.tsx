import { Pane } from "./Pane.component";
import { FlexColumnLayout, FlexLayout } from "../Flex";
import { GridLayout } from "../Grid";
import { GridItem } from "../GridItem";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { breakpointLabels } from "@types";
import { cssVarUsage, useMergedProps } from "@utils";

import { Badge, Button, Text } from "@components";

import type { PaneDefaultProps, PaneProps } from "./Pane.types";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";

const defaultProps: PaneDefaultProps = {
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
  expandedRatio: 0.5,
};

const componentSource = componentSourceFactory<PaneProps>(
  "Pane",
  {
    // TODO
  },
  defaultProps
);

const PaneRenderer = (props: PaneProps) => {
  return (
    <GridLayout
      columns={["auto", "1fr"]}
      justify="center"
      fill
      styleOverride={{ height: "100%", minHeight: "300px" }}
    >
      <Pane {...props} />
      <GridItem
        styleOverride={{
          background: cssVarUsage("gray-50"),
        }}
        align="center"
        justify="center"
        fill
      >
        <FlexLayout fill align="center" justify="center">
          <Text align="center" fill>
            [Page content]
          </Text>
        </FlexLayout>
      </GridItem>
    </GridLayout>
  );
};

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
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof Pane>;

export default meta;
type Story = StoryObj<typeof meta> | StoryFn<typeof meta>;

export const Default: Story = {};

export const Breakpoint: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={[null, ...breakpointLabels]}
      for="expandedBreakpoint"
      of={PaneRenderer}
      defaults={defaults}
      columns={1}
      propLabels
    />
  );
};

export const DynamicContent: Story = {
  args: {
    children: null,
    expandedBreakpoint: "LG",
    dynamicContent: ({ isCollapsed }) => (
      <FlexColumnLayout>
        <Text noWrap>Pane with dynamic content</Text>
        {isCollapsed ? (
          <Badge label="Collapsed" color="gray" />
        ) : (
          <Badge label="Expanded" color="primary" />
        )}
      </FlexColumnLayout>
    ),
  },
};

export const Headless: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={[false, true]}
      for="headLess"
      of={PaneRenderer}
      defaults={defaults}
      columns={1}
    />
  );
};
