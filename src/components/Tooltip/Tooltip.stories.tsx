import { Meta, StoryObj } from "@storybook/react-vite";
import { isString } from "@ubloimmo/front-util";
import styled from "styled-components";

import { Tooltip } from "./Tooltip.component";
import { Badge } from "../Badge";
import { StaticIcon } from "../StaticIcon";
import { Text } from "../Text";

import { ComponentVariants } from "@docs/blocks";
import { FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { TooltipProps } from "./Tooltip.types";
import type { Direction } from "@types";

const Container = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const meta: Meta<typeof Tooltip> = {
  title: "Components/Feedbacks/Tooltip/Stories",
  component: Tooltip,
  argTypes: {
    direction: {
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const directions: Direction[] = ["top", "bottom", "left", "right"];

export const Directions = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, props);
  return (
    <Container>
      <ComponentVariants
        defaults={defaultProps}
        variants={directions}
        for="direction"
        of={Tooltip}
        scaling={1}
        justify="center"
        align="center"
        propLabels
      />
    </Container>
  );
};

const contents = [
  { value: "Some hint", label: "Some hint" },
  {
    value: "A much longer and much more descriptive hint",
    label: "A much longer and much more descriptive hint",
  },
  {
    value: (
      <FlexRowLayout gap="s-2" align="center" fill key="content">
        <StaticIcon name="Square" size="xs" stroke />
        <Text color="gray-50">Some hint</Text>
      </FlexRowLayout>
    ),
    label: "JSX example",
  },
];
export const Content = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, props);

  return (
    <Container>
      <ComponentVariants
        defaults={defaultProps}
        variants={contents}
        for="content"
        of={Tooltip}
        scaling={1}
        justify="center"
        align="center"
        forceCompound
      />
    </Container>
  );
};

const children = [
  { value: null, label: "null" },
  { value: <Badge />, label: "Badge" },
  { value: <Text>Text</Text>, label: "Text" },
];

export const Children = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, props);
  return (
    <Container>
      <ComponentVariants
        defaults={defaultProps}
        variants={children}
        for="children"
        of={Tooltip}
        scaling={1}
        justify="center"
        align="center"
        forceCompound
      />
    </Container>
  );
};

const TooltipIntersectionRenderer = (props: TooltipProps) => {
  const rootId = isString(props.intersectionRoot)
    ? props.intersectionRoot.replace("#", "")
    : undefined;
  return (
    <TooltipIntersectionContainer id={rootId}>
      <TooltipPaddedContainer>
        <Tooltip {...props} />
      </TooltipPaddedContainer>
    </TooltipIntersectionContainer>
  );
};

const TooltipIntersectionContainer = styled.div`
  max-height: 12rem;
  height: 12rem;
  overflow: auto;
  border-radius: var(--s-05);
  background: var(--white);
  position: relative;
`;

const TooltipPaddedContainer = styled.div`
  padding: 100% 100%;
  position: static;
`;

const intersectionRoots = [null, "#intersection-root"];
export const IntersectionRoots = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, {
    ...props,
    direction: props.direction ?? "top",
  });

  return (
    <ComponentVariants
      for="intersectionRoot"
      of={TooltipIntersectionRenderer}
      variants={intersectionRoots}
      defaults={defaultProps}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};
