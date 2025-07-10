import { texts } from "@ubloimmo/front-tokens/lib/tokens.values";
import styled from "styled-components";

import { Pane } from "./Pane.component";
import { FlexLayout } from "../Flex";
import { GridLayout } from "../Grid";
import { GridItem } from "../GridItem";

import { ComponentVariants, type PropVariant } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { breakpointLabels, type FixedCssLength } from "@types";
import { cssVarUsage, useMergedProps, useStatic } from "@utils";

import { Badge, Text } from "@components";

import type {
  PaneDefaultProps,
  PaneDynamicContent,
  PaneDynamicContentProps,
  PaneProps,
} from "./Pane.types";
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
  const PageContent = useStatic(() => (
    <GridItem align="center" justify="center" fill>
      <Zone fill align="center" justify="center">
        <ZoneText align="center">Page content</ZoneText>
      </Zone>
    </GridItem>
  ));
  return (
    <GridLayout
      columns={props.anchor === "left" ? ["auto", "1fr"] : ["1fr", "auto"]}
      justify="center"
      fill
      gap="s-3"
    >
      {props.anchor === "left" ? (
        <>
          <Pane {...props} />
          {PageContent}
        </>
      ) : (
        <>
          {PageContent}
          <Pane {...props} />
        </>
      )}
    </GridLayout>
  );
};

const Zone = styled(FlexLayout)`
  background: var(--gray-50);
  min-height: 100px;
  padding: var(--s-3);
  border-radius: var(--s-1);
  border: 1px dashed var(--gray-200);
  overflow: hidden;
  transition: background 150ms var(--bezier);

  [data-expanded="true"] & {
    background: var(--primary-light);
  }
`;

const ZoneText = styled(Text)`
  ${texts.desktop.xs.medium.css.style};
  white-space: nowrap;
`;

const defaultArgs = {
  children: (
    <Zone align="center" justify="center" fill>
      <ZoneText>Pane content</ZoneText>
    </Zone>
  ),
};

const meta = {
  component: Pane,
  title: "Layouts/Pane/Stories",
  args: defaultArgs,
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
} satisfies Meta<typeof Pane>;

export default meta;
type Story = StoryObj<typeof meta> | StoryFn<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: componentSource([defaultArgs]),
  },
};

export const Breakpoint: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={breakpointLabels}
      for="expandedBreakpoint"
      of={PaneRenderer}
      defaults={defaults}
      columns={1}
      propLabels
    />
  );
};
Breakpoint.parameters = {
  docs: componentSource(
    breakpointLabels.map((breakpoint) => ({
      ...defaultArgs,
      expandedBreakpoint: breakpoint,
    }))
  ),
};

const Content: PaneDynamicContent = ({
  isCollapsed,
}: PaneDynamicContentProps) => (
  <Zone direction="column" align="center" justify="center" fill gap="s-3">
    <Text noWrap>Dynamic content</Text>
    {isCollapsed ? (
      <Badge label="Collapsed" color="error" />
    ) : (
      <Badge label="Expanded" color="success" />
    )}
  </Zone>
);

export const DynamicContent: Story = {
  args: {
    children: null,
    expandedBreakpoint: "LG",
    collapsedWidth: "s-20",
    dynamicContent: Content,
  },
};

const bools = [false, true];
export const Headless: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={bools}
      for="headLess"
      of={Pane}
      defaults={defaults}
      columns={2}
      propLabels
    />
  );
};
Headless.parameters = {
  docs: componentSource(
    bools.map((bool) => ({
      ...defaultArgs,
      headLess: bool,
    }))
  ),
};

const anchors = ["left", "right"] as const;
export const Anchor: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={anchors}
      for="anchor"
      of={PaneRenderer}
      defaults={defaults}
      columns={2}
      propLabels
    />
  );
};
Anchor.parameters = {
  docs: componentSource(
    anchors.map((anchor) => ({
      ...defaultArgs,
      anchor,
    }))
  ),
};

const collapsedWidthVariants: FixedCssLength[] = [
  "12px",
  "2rem",
  "s-20",
  "12rem",
];
export const CollapsedWidth: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={collapsedWidthVariants}
      for="collapsedWidth"
      of={Pane}
      defaults={defaults}
      columns="auto"
      propLabels
    />
  );
};
CollapsedWidth.parameters = {
  docs: componentSource(
    collapsedWidthVariants.map((collapsedWidth) => ({
      ...defaultArgs,
      collapsedWidth,
    }))
  ),
};

const expandedWidthVariants: FixedCssLength[] = [
  "s-10",
  "4rem",
  "100px",
  "12.5rem",
];
export const ExpandedWidth: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    collapsedWidth: "s-8",
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={expandedWidthVariants}
      for="expandedWidth"
      of={Pane}
      defaults={defaults}
      columns="auto"
      propLabels
    />
  );
};
ExpandedWidth.parameters = {
  docs: componentSource(
    expandedWidthVariants.map((expandedWidth) => ({
      ...defaultArgs,
      expandedWidth,
    }))
  ),
};

const expandedRatioVariants: number[] = [0, 0.25, 0.5, 0.75, 1];
export const ExpandedRatio: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={expandedRatioVariants}
      for="expandedRatio"
      of={Pane}
      defaults={defaults}
      columns="auto"
      propLabels
    />
  );
};
ExpandedRatio.parameters = {
  docs: componentSource(
    expandedRatioVariants.map((expandedRatio) => ({
      ...defaultArgs,
      expandedRatio,
    }))
  ),
};

export const ForceExpanded: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      variants={bools}
      for="forceExpanded"
      of={Pane}
      defaults={defaults}
      columns={2}
      propLabels
    />
  );
};
ForceExpanded.parameters = {
  docs: componentSource(
    bools.map((bool) => ({
      ...defaultArgs,
      forceExpanded: bool,
    }))
  ),
};
const stylingVariants: PropVariant<Partial<PaneProps>>[] = [
  {
    styleOverride: null,
    headLess: true,
    __propVariantLabel: "headless & unstyled",
  },
  {
    styleOverride: {
      borderRadius: 0,
      padding: cssVarUsage("s-6"),
      background: cssVarUsage("primary-medium"),
    },
    headLess: true,
    collapsedWidth: "s-20",
    __propVariantLabel: "headless & custom styling",
  },
];
export const Styling: Story = (props) => {
  const defaults = useMergedProps(defaultProps, {
    ...props,
    children: meta.args.children,
  });
  return (
    <ComponentVariants
      defaults={defaults}
      variants={stylingVariants}
      of={Pane}
      columns={2}
      propLabels
    />
  );
};
Styling.parameters = {
  docs: componentSource(
    stylingVariants.map(({ __propVariantLabel, ...props }) => ({
      ...defaultArgs,
      ...props,
    }))
  ),
};
